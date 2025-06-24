import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shopifyProduct" model, go to https://woood.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "DataModel-Shopify-Product",
  fields: {
    shippingMethod2: {
      type: "string",
      shopifyMetafield: {
        privateMetafield: false,
        namespace: "custom",
        key: "ShippingMethod2",
        metafieldType: "single_line_text_field",
        allowMultipleEntries: false,
      },
      storageKey: "Qi9KlM6EmrO9",
    },
  },
  shopify: {
    fields: [
      "body",
      "category",
      "checkoutLineItems",
      "compareAtPriceRange",
      "handle",
      "hasVariantsThatRequiresComponents",
      "productCategory",
      "productType",
      "publishedAt",
      "shop",
      "shopifyCreatedAt",
      "shopifyUpdatedAt",
      "status",
      "tags",
      "templateSuffix",
      "title",
      "vendor",
    ],
  },
};
