import {
  FunctionRunResult,
  Product,
  CartDeliveryGroup,
  CartDeliveryOption,
} from "../generated/api";

const NO_CHANGES: FunctionRunResult = {
  operations: [],
};

export function run(input: any): FunctionRunResult {
  const cartLines = input.cart.lines;
  if (!cartLines || cartLines.length === 0) {
    return NO_CHANGES;
  }

  const highestShippingMethodValue = cartLines.reduce((max: number, line: any) => {
    const product = line.merchandise.product as Product;
    const metafieldValue = product.metafield?.value;

    if (metafieldValue) {
      const value = parseInt(metafieldValue, 10);
      if (!isNaN(value) && value > max) {
        return value;
      }
    }
    return max;
  }, 0);

  if (highestShippingMethodValue === 0) {
    return NO_CHANGES;
  }

  let targetOptionHandle: string | null = null;

  for (const group of input.cart.deliveryGroups) {
    for (const option of group.deliveryOptions) {
      const title = option.title;
      if (typeof title !== 'string') continue;

      const parts = title.split(' - ');
      if (parts.length < 2) continue;

      const optionValue = parseInt(parts[0], 10);
      if (!isNaN(optionValue) && optionValue === highestShippingMethodValue) {
        targetOptionHandle = option.handle;
        break;
      }
    }
    if (targetOptionHandle) break;
  }

  const operations = input.cart.deliveryGroups.flatMap((group: CartDeliveryGroup) => {
    const optionsToHide = group.deliveryOptions
      .filter((option: CartDeliveryOption) => option.handle !== targetOptionHandle)
      .map((option: CartDeliveryOption) => ({
        hide: {
          deliveryOptionHandle: option.handle,
        },
      }));
    return optionsToHide;
  });

  return { operations };
}