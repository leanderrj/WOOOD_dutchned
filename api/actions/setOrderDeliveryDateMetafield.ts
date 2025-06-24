import { ActionOptions, assert } from "gadget-server";

export const run: ActionRun = async ({ params, logger, api, connections }) => {
  logger.info("Setting delivery date metafield on Shopify order", { orderId: params.orderId, deliveryDate: params.deliveryDate, shopId: params.shopId });

  const orderId = assert(params.orderId, "orderId is required");
  const deliveryDate = assert(params.deliveryDate, "deliveryDate is required");
  const shopId = assert(params.shopId, "shopId is required");

  // Construct the Shopify GraphQL ID for the order
  const shopifyOrderId = `gid://shopify/Order/${orderId}`;

  // Define the GraphQL mutation for setting metafields
  const mutation = `
    mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
      metafieldsSet(metafields: $metafields) {
        metafields {
          id
          namespace
          key
          value
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  // Define the variables for the mutation
  const variables = {
    metafields: [
      {
        ownerId: shopifyOrderId,
        namespace: "custom",
        key: "dutchned_delivery_date",
        value: deliveryDate,
        type: "single_line_text_field"
      }
    ]
  };

  try {
    await api.enqueue(api.writeToShopify, {
      shopId,
      mutation,
      variables
    });

    logger.info("Successfully enqueued delivery date metafield update", { orderId, shopId });

    return {
      success: true,
      message: "Delivery date metafield update enqueued successfully"
    };
  } catch (error) {
    logger.error("Failed to enqueue delivery date metafield update", { error, orderId, shopId });
    throw error;
  }
};

export const params = {
  orderId: {
    type: "string"
  },
  deliveryDate: {
    type: "string"
  },
  shopId: {
    type: "string"
  }
};

export const options: ActionOptions = {
  returnType: true
};
