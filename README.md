- **[`delivery-customization`](./woood/extensions/delivery-customization)**: A Shopify Function that filters delivery options based on cart contents.
- **[`checkout-ui`](./woood/extensions/checkout-ui)**: A Checkout UI extension that adds a delivery date picker for specific shipping methods.

---

## 1. `delivery-customization` – Prioritized Delivery Function

### Purpose

This Shopify Function ensures that customers are only shown the single, correct delivery option based on the contents of their cart. It uses a `custom.ShippingMethod2` product metafield to determine the highest-priority shipping requirement and dynamically transforms a placeholder shipping rate.

### Shopify Configuration

To use this function, you must first configure your shipping zones in the Shopify Admin:

1.  Go to `Settings` -> `Shipping and delivery`.
2.  In the desired shipping profiles and zones, create a single shipping rate named **"WOOOD Standard"**.
3.  The handle for this rate should be `woood-standard`. This exact name is what the function will look for. This rate acts as a placeholder that will be dynamically updated at checkout.

### Business Rules

1.  **Find Placeholder**: The function begins by searching for the delivery option with the handle `woood-standard`.
2.  **Highest Priority Wins**: It inspects the `custom.ShippingMethod2` metafield on all cart items to find the one with the highest numerical priority.
3.  **Transform or Pass Through**:
    -   If a high-priority shipping method is found in the cart, the function **renames and reprices** the "WOOOD Standard" option to match it (e.g., renames it to "Expeditie 2-Mans"). It then hides all other delivery options.
    -   If **no** cart items have the `custom.ShippingMethod2` metafield, the "WOOOD Standard" option is left untouched and visible as the default shipping method.
4.  **Error Handling**: If the cart requires a special shipping method (based on its metafields) but the function **cannot find** the `"WOOOD Standard"` placeholder option, it will hide the placeholder to prevent checkout with an incorrect rate.
5.  **Preserve Data**: The original `custom.ShippingMethod2` value from the highest-priority item is saved as a checkout attribute on the order for fulfillment records.

### Metafield Examples

Here are some examples of `custom.ShippingMethod2` values:
- `11 - PAKKET POST`
- `15 - PAKKET POST GROOT`
- `30 - EXPEDITIE STANDAARD`
- `31 - EXPEDITIE GESTOFFEERD`
- `32 - EXPEDITIE 2-MANS`

### Logic Example

Consider a cart containing:
- **Product A** (a chair): `custom.ShippingMethod2` = `"31 - EXPEDITIE GESTOFFEERD"`
- **Product B** (a table): `custom.ShippingMethod2` = `"32 - EXPEDITIE 2-MANS"`

The function will:
1.  Find the delivery option named "WOOOD Standard".
2.  Compare the priorities `31` and `32` from the products in the cart.
3.  Determine that `32` is the highest priority.
4.  Rename "WOOOD Standard" to "EXPEDITIE 2-MANS" (and update its price if necessary). The function capitalizes the shipping method name for consistent display.
5.  Hide all other shipping options.
6.  Save the full string `"32 - EXPEDITIE 2-MANS"` as a checkout attribute on the resulting order.

---

## 2. `checkout-ui` – Delivery Date Picker

### Purpose

This extension adds a date picker to the checkout, allowing customers in specific regions to select a preferred delivery date.

### Business Rules

- **Geographic Activation**: The date picker's visibility is determined solely by the customer's shipping destination. It does **not** depend on the products in the cart or the final shipping option titles.
- **Activation Condition**: The component will appear if the customer's shipping address is in a country where a date picker is required (e.g., a hardcoded list of countries such as `['NL', 'BE', 'DE']`). This logic is self-contained within the UI extension.
- **API Integration**: When activated, the extension fetches a list of available delivery dates from an external API (e.g., DutchNed's).
- **Fallback Dates**: If the API is unavailable, it generates a list of fallback dates (e.g., the next 14 business days) to prevent the checkout process from being blocked.
- **Saves to Order**: The selected date is saved as a `custom.dutchned_delivery_date` attribute on the checkout.
