import type { GadgetSettings } from "gadget-server";

export const settings: GadgetSettings = {
  type: "gadget/settings/v1",
  frameworkVersion: "v1.4.0",
  plugins: {
    connections: {
      shopify: {
        apiVersion: "2025-04",
        enabledModels: [
          "shopifyCheckout",
          "shopifyCheckoutLineItem",
          "shopifyProduct",
        ],
        type: "partner",
        scopes: [
          "read_checkouts",
          "write_checkouts",
          "read_orders",
          "read_products",
          "write_delivery_customizations",
          "read_delivery_customizations",
        ],
      },
    },
  },
};
