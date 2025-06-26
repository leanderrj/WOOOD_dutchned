import { ActionOptions } from "gadget-server";

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  const { shopId, functionId } = params;

  if (!shopId || !functionId) {
    throw new Error("Both shopId and functionId are required parameters");
  }

  logger.info(`Activating Shopify function ${functionId} for shop ${shopId}`);

  try {
    // Validate that the shop exists
    const shop = await api.shopifyShop.findOne(shopId);
    if (!shop) {
      throw new Error(`Shop with ID ${shopId} not found`);
    }

    // Create the delivery customization mutation
    const mutation = `
      mutation deliveryCustomizationCreate($input: DeliveryCustomizationInput!) {
        deliveryCustomizationCreate(input: $input) {
          deliveryCustomization {
            id
            title
            enabled
            functionId
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
        functionId: functionId,
        title: `Delivery Customization for Function ${functionId}`,
        enabled: true
      }
    };

    // Use writeToShopify to handle rate limiting and retries
    const result = await api.enqueue(api.writeToShopify, {
      shopId,
      mutation,
      variables
    });

    logger.info(`Successfully enqueued delivery customization creation for shop ${shopId}`, { result });

    return {
      success: true,
      message: "Delivery customization creation has been queued successfully",
      shopId,
      functionId
    };

  } catch (error) {
    logger.error(`Failed to activate Shopify function: ${error.message}`, { shopId, functionId, error });
    
    return {
      success: false,
      message: `Failed to activate Shopify function: ${error.message}`,
      shopId,
      functionId
    };
  }
};

export const params = {
  shopId: { type: "string" },
  functionId: { type: "string" }
};

export const options: ActionOptions = {
  returnType: true
};
