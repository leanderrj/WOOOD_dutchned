import { ActionOptions } from "gadget-server";

export const run: ActionRun = async ({ params, logger, api, connections, trigger }) => {
  logger.info("Processing order payment webhook");

  try {
    // Extract order data from webhook payload
    const orderData = trigger?.payload;
    if (!orderData || !orderData.id) {
      logger.error("No order data found in webhook payload");
      throw new Error("Missing order data in webhook payload");
    }

    // Get shopId from connections
    const shopId = connections?.shopify?.currentShopId;
    if (!shopId) {
      logger.error("No shopId found in connections");
      throw new Error("Missing shopId in webhook context");
    }
    logger.info(`Processing payment for order ${orderData.id} in shop ${shopId}`);

    const lineItems = orderData.line_items || [];
    logger.info(`Found ${lineItems.length} line items in order`);

    // Extract delivery date from note_attributes if present
    let deliveryDate: string | undefined;
    if (orderData.note_attributes && Array.isArray(orderData.note_attributes)) {
      const deliveryDateAttr = orderData.note_attributes.find(
        (attr: any) => attr.name === "delivery_date" || attr.name === "deliveryDate"
      );
      deliveryDate = deliveryDateAttr?.value;
    }

    if (deliveryDate) {
      logger.info(`Found delivery date: ${deliveryDate}`);
      
      try {
        // Call setOrderDeliveryDateMetafield with order ID, delivery date, and shopId
        await api.setOrderDeliveryDateMetafield({
          orderId: orderData.id.toString(),
          deliveryDate: deliveryDate,
          shopId: shopId.toString()
        });
        logger.info("Successfully set order delivery date metafield");
      } catch (error) {
        logger.error(`Failed to set order delivery date metafield: ${error}`);
        throw error;
      }
    } else {
      logger.info("No delivery date found in order note attributes");
    }
};

export const options: ActionOptions = {
  triggers: {
    shopify: {
      webhooks: ["orders/paid"]
    }
  }
};
