export const run: ActionRun = async ({ params, logger, api, connections }) => {
  const { orderId, cartItems, shopId: paramShopId } = params;

  if (!orderId) {
    throw new Error("orderId parameter is required");
  }

  // Get the shop ID from params or fall back to connection context
  const shopId = paramShopId || connections.shopify.currentShopId;
  if (!shopId) {
    throw new Error("shopId must be provided as parameter when connection context is not available");
  }

  logger.info(`Processing delivery customization for order ${orderId}`);

  // Fetch the order
  const order = await api.shopifyOrder.findFirst({
    filter: {
      id: { equals: orderId },
      shopId: { equals: shopId }
    }
  });

  if (!order) {
    throw new Error(`Order ${orderId} not found`);
  }

  // Get line items from order (they should be in order data structure)
  // Since we don't have a direct line items model, we'll work with the order's line item data
  // For now, we'll use the cartItems parameter if provided, otherwise we'll need to fetch from Shopify
  let lineItems = cartItems || [];

  if (!lineItems || lineItems.length === 0) {
    logger.warn("No line items provided - cannot process delivery customization");
    return { success: false, message: "No line items to process" };
  }

  let highestPriority = -1;
  let selectedShippingMethod = null;
  let selectedMethodDisplay = null;
  let productsProcessed = 0;
  let productsWithoutMethod = 0;

  // Process each line item
  for (const lineItem of lineItems) {
    if (!lineItem.productId) {
      logger.warn("Line item missing productId, skipping");
      continue;
    }

    try {
      // Fetch the product
      const product = await api.shopifyProduct.findFirst({
        filter: {
          id: { equals: lineItem.productId },
          shopId: { equals: shopId }
        },
        select: {
          id: true,
          title: true
        }
      });

      if (!product) {
        logger.warn(`Product ${lineItem.productId} not found`);
        continue;
      }

      productsProcessed++;

      // Since shippingMethod2 field doesn't exist on the shopifyProduct model,
      // we'll need to fetch this information from Shopify directly via metafields
      // For now, we'll log that the shipping method field is not available
      logger.warn(`Product ${product.title} (${product.id}) - shipping method metafield not available in current model`);
      productsWithoutMethod++;

    } catch (error) {
      logger.error(`Error processing product ${lineItem.productId}:`, error);
    }
  }

  // Log summary
  logger.info(`Processed ${productsProcessed} products, ${productsWithoutMethod} without shipping method`);

  if (selectedShippingMethod) {
    logger.info(`Selected shipping method: ${selectedShippingMethod} (priority: ${highestPriority})`);

    // Prepare the GraphQL mutation to update order attributes
    const mutation = `
      mutation orderUpdate($input: OrderInput!) {
        orderUpdate(input: $input) {
          order {
            id
            customAttributes {
              key
              value
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
        customAttributes: [
          {
            key: "custom.delivery_method_priority",
            value: highestPriority.toString()
          },
          {
            key: "custom.delivery_method_name",
            value: selectedShippingMethod
          },
          {
            key: "custom.delivery_method_display",
            value: selectedMethodDisplay
          }
        ]
      }
    };

    // Use writeToShopify action to update the order
    await api.enqueue(api.writeToShopify, {
      shopId,
      mutation,
      variables
    });

    logger.info(`Enqueued order update for ${orderId} with delivery method: ${selectedMethodDisplay}`);

    return {
      success: true,
      orderId,
      selectedMethod: {
        priority: highestPriority,
        name: selectedShippingMethod,
        display: selectedMethodDisplay
      },
      stats: {
        productsProcessed,
        productsWithoutMethod
      }
    };

  } else {
    logger.warn(`No shipping methods found for order ${orderId}`);

    return {
      success: false,
      message: "No products with valid shipping methods found - shipping method metafield not available in current model",
      stats: {
        productsProcessed,
        productsWithoutMethod
      }
    };
  }
};

export const params = {
  orderId: {
    type: "string"
  },
  cartItems: {
    type: "array",
    items: {
      type: "object",
      properties: {
        productId: { type: "string" },
        variantId: { type: "string" },
        quantity: { type: "number" },
        title: { type: "string" }
      }
    }
  },
  shopId: {
    type: "string"
  }
};
