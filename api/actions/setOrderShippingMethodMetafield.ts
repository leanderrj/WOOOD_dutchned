import { ActionOptions } from "gadget-server";

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  const { orderId, cartItems, shopId } = params;
  
  if (!orderId || !cartItems || !shopId) {
    throw new Error("Missing required parameters: orderId, cartItems, and shopId");
  }

  logger.info({ orderId, shopId, cartItemsCount: cartItems.length }, "Starting to set order shipping method metafield");

  try {
    const processedItems = [];
    const shippingMethods = [];
    let highestPriority = 0;
    let selectedShippingMethod = null;

    // Process each cart item to find shipping methods
    for (const item of cartItems) {
      try {
        if (!item.product_id) {
          logger.warn({ item }, "Cart item missing product_id, skipping");
          continue;
        }

        // Find the product with shippingMethod2 metafield
        const product = await api.shopifyProduct.findFirst({
          filter: {
            id: { equals: item.product_id.toString() },
            shopId: { equals: shopId }
          },
          select: {
            id: true,
            title: true,
            shippingMethod2: true
          }
        });

        if (!product) {
          logger.warn({ productId: item.product_id }, "Product not found");
          processedItems.push({
            productId: item.product_id,
            status: "product_not_found"
          });
          continue;
        }

        if (!product.shippingMethod2) {
          logger.info({ productId: product.id, title: product.title }, "Product has no shippingMethod2 metafield");
          processedItems.push({
            productId: product.id,
            title: product.title,
            status: "no_shipping_method"
          });
          continue;
        }

        // Parse the priority number from the shipping method (before ' - ' separator)
        const shippingMethodValue = product.shippingMethod2;
        const parts = shippingMethodValue.split(' - ');
        
        if (parts.length >= 2) {
          const priorityStr = parts[0].trim();
          const priority = parseInt(priorityStr, 10);
          
          if (!isNaN(priority)) {
            const methodName = parts.slice(1).join(' - ').trim();
            
            shippingMethods.push({
              priority,
              name: methodName,
              display: shippingMethodValue,
              productId: product.id,
              productTitle: product.title
            });

            // Track highest priority
            if (priority > highestPriority) {
              highestPriority = priority;
              selectedShippingMethod = {
                priority,
                name: methodName,
                display: shippingMethodValue
              };
            }

            processedItems.push({
              productId: product.id,
              title: product.title,
              shippingMethod: shippingMethodValue,
              priority,
              status: "processed"
            });

            logger.info({ 
              productId: product.id, 
              title: product.title,
              shippingMethod: shippingMethodValue,
              priority 
            }, "Processed product shipping method");
          } else {
            logger.warn({ 
              productId: product.id, 
              shippingMethod: shippingMethodValue,
              priorityStr 
            }, "Could not parse priority number from shipping method");
            processedItems.push({
              productId: product.id,
              title: product.title,
              shippingMethod: shippingMethodValue,
              status: "invalid_priority"
            });
          }
        } else {
          logger.warn({ 
            productId: product.id, 
            shippingMethod: shippingMethodValue 
          }, "Shipping method does not contain ' - ' separator");
          processedItems.push({
            productId: product.id,
            title: product.title,
            shippingMethod: shippingMethodValue,
            status: "invalid_format"
          });
        }
      } catch (error) {
        logger.error({ error, item }, "Error processing cart item");
        processedItems.push({
          productId: item.product_id,
          status: "error",
          error: error.message
        });
      }
    }

    // Set metafields on the order if we found a shipping method
    if (selectedShippingMethod) {
      logger.info({ 
        orderId,
        selectedShippingMethod,
        highestPriority 
      }, "Setting order shipping method metafields");

      // Prepare metafields to set
      const metafields = [
        {
          namespace: "custom",
          key: "shipping_method_priority",
          value: selectedShippingMethod.priority.toString(),
          type: "single_line_text_field"
        },
        {
          namespace: "custom",
          key: "shipping_method_name", 
          value: selectedShippingMethod.name,
          type: "single_line_text_field"
        },
        {
          namespace: "custom",
          key: "shipping_method_display",
          value: selectedShippingMethod.display,
          type: "single_line_text_field"
        }
      ];

      // Use writeToShopify to set metafields
      const mutation = `
        mutation orderUpdate($input: OrderInput!) {
          orderUpdate(input: $input) {
            order {
              id
              metafields(first: 10) {
                edges {
                  node {
                    namespace
                    key
                    value
                  }
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const variables = {
        input: {
          id: `gid://shopify/Order/${orderId}`,
          metafields: metafields
        }
      };

      const result = await api.enqueue(api.writeToShopify, {
        shopId,
        mutation,
        variables
      });

      logger.info({ 
        orderId,
        result: result.success,
        metafieldsSet: metafields.length 
      }, "Completed setting order shipping method metafields");

      return {
        success: true,
        orderId,
        selectedShippingMethod,
        processedItems,
        stats: {
          totalItems: cartItems.length,
          processedItems: processedItems.length,
          shippingMethodsFound: shippingMethods.length,
          highestPriority,
          metafieldsSet: metafields.length
        }
      };
    } else {
      logger.info({ orderId }, "No valid shipping methods found, no metafields set");
      
      return {
        success: false,
        orderId,
        message: "No valid shipping methods found",
        processedItems,
        stats: {
          totalItems: cartItems.length,
          processedItems: processedItems.length,
          shippingMethodsFound: shippingMethods.length,
          highestPriority: 0,
          metafieldsSet: 0
        }
      };
    }
  } catch (error) {
    logger.error({ error, orderId, shopId }, "Error setting order shipping method metafield");
    throw error;
  }
};

export const params = {
  orderId: { type: "string" },
  cartItems: { 
    type: "array",
    items: {
      type: "object",
      properties: {
        product_id: { type: "string" },
        quantity: { type: "number" }
      }
    }
  },
  shopId: { type: "string" }
};

export const options: ActionOptions = {
  timeoutMS: 180000,
  returnType: true
};
