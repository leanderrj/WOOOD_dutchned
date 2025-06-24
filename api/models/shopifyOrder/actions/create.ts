import { applyParams, save, ActionOptions } from "gadget-server";
import { preventCrossShopDataAccess } from "gadget-server/shopify";

export const run: ActionRun = async ({ params, record, logger, api, connections }) => {
  applyParams(params, record);
  await preventCrossShopDataAccess(params, record);
  await save(record);
};

export const onSuccess: ActionOnSuccess = async ({ params, record, logger, api, connections }) => {
  // Process delivery date
  try {
    logger.info(`Processing delivery date for order ${record.id}`);

    let deliveryDate = null;

    // Check noteAttributes for delivery date
    if (record.noteAttributes && Array.isArray(record.noteAttributes)) {
      logger.info(`Checking note attributes: ${JSON.stringify(record.noteAttributes)}`);

      for (const attr of record.noteAttributes) {
        if (attr.name === 'deliveryDate' && attr.value) {
          deliveryDate = attr.value;
          logger.info(`Found delivery date in note attributes: ${deliveryDate}`);
          break;
        }
      }
    } else {
      logger.info(`No note attributes found for order ${record.id}`);
    }

    // If delivery date is found, set the metafield
    if (deliveryDate) {
      logger.info(`Setting delivery date metafield for order ${record.id} with date ${deliveryDate}`);

      await api.setOrderDeliveryDateMetafield({
        orderId: record.id,
        shopId: record.shopId,
        deliveryDate: deliveryDate
      });

      logger.info(`Successfully set delivery date metafield for order ${record.id}`);
    } else {
      logger.info(`No delivery date found in order ${record.id} note attributes`);
    }

  } catch (error) {
    logger.error(`Error processing delivery date for order ${record.id}: ${error.message}`, { error });
    // Don't throw the error to avoid failing the order creation
  }

  // Process shipping method metafield
  try {
    logger.info(`Processing shipping method metafield for order ${record.id}`);

    // Extract line items from the order (from JSONValue fields)
    let cartItems: any[] = [];
    let rawLineItems: any = null;

    // Try to get line items from a JSON field (e.g., record.data?.line_items)
    const data = (record as any).data || (record as any).rawData || {};
    if (data.line_items && Array.isArray(data.line_items)) {
      rawLineItems = data.line_items;
    }

    if (rawLineItems) {
      cartItems = rawLineItems.map((item: any) => ({
        product_id: item.product_id || item.productId || '',
        quantity: item.quantity || 1
      }));
      logger.info(`Extracted ${cartItems.length} cart items from order ${record.id}`);
    } else {
      logger.info(`No cart items found for order ${record.id}`);
    }

    if (cartItems.length > 0 && record.shopId) {
      logger.info(`Calling setOrderShippingMethodMetafield for order ${record.id}`);
      await api.setOrderShippingMethodMetafield({
        orderId: record.id,
        cartItems,
        shopId: record.shopId
      });
      logger.info(`Successfully set shipping method metafield for order ${record.id}`);
    } else {
      logger.info(`No cart items or shopId found for order ${record.id}, skipping shipping method metafield processing`);
    }
  } catch (error: any) {
    logger.error(`Error processing shipping method metafield for order ${record.id}: ${error?.message}`, { error });
    // Don't throw the error to avoid failing the order creation
  }
};

export const options: ActionOptions = { actionType: "create" };
