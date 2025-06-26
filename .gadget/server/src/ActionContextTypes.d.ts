import "path";

import { CreateShopifyGdprRequestActionContext } from "./models/ShopifyGdprRequest";

import { UpdateShopifyGdprRequestActionContext } from "./models/ShopifyGdprRequest";

import { CreateShopifyProductActionContext } from "./models/ShopifyProduct";

import { UpdateShopifyProductActionContext } from "./models/ShopifyProduct";

import { DeleteShopifyProductActionContext } from "./models/ShopifyProduct";

import { UpdateShopifyShopActionContext } from "./models/ShopifyShop";

import { InstallShopifyShopActionContext } from "./models/ShopifyShop";

import { ReinstallShopifyShopActionContext } from "./models/ShopifyShop";

import { UninstallShopifyShopActionContext } from "./models/ShopifyShop";

import { AbortShopifySyncActionContext } from "./models/ShopifySync";

import { CompleteShopifySyncActionContext } from "./models/ShopifySync";

import { ErrorShopifySyncActionContext } from "./models/ShopifySync";

import { RunShopifySyncActionContext } from "./models/ShopifySync";

import { CreateShopifyOrderActionContext } from "./models/ShopifyOrder";

import { UpdateShopifyOrderActionContext } from "./models/ShopifyOrder";

import { DeleteShopifyOrderActionContext } from "./models/ShopifyOrder";

import { CreateShopifyCheckoutLineItemActionContext } from "./models/ShopifyCheckoutLineItem";

import { UpdateShopifyCheckoutLineItemActionContext } from "./models/ShopifyCheckoutLineItem";

import { DeleteShopifyCheckoutLineItemActionContext } from "./models/ShopifyCheckoutLineItem";

import { CreateShopifyCheckoutActionContext } from "./models/ShopifyCheckout";

import { UpdateShopifyCheckoutActionContext } from "./models/ShopifyCheckout";

import { DeleteShopifyCheckoutActionContext } from "./models/ShopifyCheckout";

import { GetDeliveryDatesGlobalActionContext } from "./global-actions";

import { ProcessOrderPaymentGlobalActionContext } from "./global-actions";

import { SetOrderDeliveryDateMetafieldGlobalActionContext } from "./global-actions";

import { SetOrderShippingMethodMetafieldGlobalActionContext } from "./global-actions";

import { WriteToShopifyGlobalActionContext } from "./global-actions";




declare module "../../../api/models/shopifyGdprRequest/actions/create" {
  export type ActionRun = (params: CreateShopifyGdprRequestActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyGdprRequestActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyGdprRequest/actions/update" {
  export type ActionRun = (params: UpdateShopifyGdprRequestActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyGdprRequestActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyProduct/actions/create" {
  export type ActionRun = (params: CreateShopifyProductActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyProductActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyProduct/actions/update" {
  export type ActionRun = (params: UpdateShopifyProductActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyProductActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyProduct/actions/delete" {
  export type ActionRun = (params: DeleteShopifyProductActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyProductActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyShop/actions/update" {
  export type ActionRun = (params: UpdateShopifyShopActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyShopActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyShop/actions/install" {
  export type ActionRun = (params: InstallShopifyShopActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: InstallShopifyShopActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyShop/actions/reinstall" {
  export type ActionRun = (params: ReinstallShopifyShopActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ReinstallShopifyShopActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyShop/actions/uninstall" {
  export type ActionRun = (params: UninstallShopifyShopActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UninstallShopifyShopActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifySync/actions/abort" {
  export type ActionRun = (params: AbortShopifySyncActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: AbortShopifySyncActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifySync/actions/complete" {
  export type ActionRun = (params: CompleteShopifySyncActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CompleteShopifySyncActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifySync/actions/error" {
  export type ActionRun = (params: ErrorShopifySyncActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ErrorShopifySyncActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifySync/actions/run" {
  export type ActionRun = (params: RunShopifySyncActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: RunShopifySyncActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyOrder/actions/create" {
  export type ActionRun = (params: CreateShopifyOrderActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyOrderActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyOrder/actions/update" {
  export type ActionRun = (params: UpdateShopifyOrderActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyOrderActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyOrder/actions/delete" {
  export type ActionRun = (params: DeleteShopifyOrderActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyOrderActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyCheckoutLineItem/actions/create" {
  export type ActionRun = (params: CreateShopifyCheckoutLineItemActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyCheckoutLineItemActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyCheckoutLineItem/actions/update" {
  export type ActionRun = (params: UpdateShopifyCheckoutLineItemActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyCheckoutLineItemActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyCheckoutLineItem/actions/delete" {
  export type ActionRun = (params: DeleteShopifyCheckoutLineItemActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyCheckoutLineItemActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyCheckout/actions/create" {
  export type ActionRun = (params: CreateShopifyCheckoutActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: CreateShopifyCheckoutActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyCheckout/actions/update" {
  export type ActionRun = (params: UpdateShopifyCheckoutActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: UpdateShopifyCheckoutActionContext) => Promise<any>;
}


declare module "../../../api/models/shopifyCheckout/actions/delete" {
  export type ActionRun = (params: DeleteShopifyCheckoutActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: DeleteShopifyCheckoutActionContext) => Promise<any>;
}


declare module "../../../api/actions/getDeliveryDates" {
  export type ActionRun = (params: GetDeliveryDatesGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: GetDeliveryDatesGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/processOrderPayment" {
  export type ActionRun = (params: ProcessOrderPaymentGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: ProcessOrderPaymentGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/setOrderDeliveryDateMetafield" {
  export type ActionRun = (params: SetOrderDeliveryDateMetafieldGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: SetOrderDeliveryDateMetafieldGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/setOrderShippingMethodMetafield" {
  export type ActionRun = (params: SetOrderShippingMethodMetafieldGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: SetOrderShippingMethodMetafieldGlobalActionContext) => Promise<any>;
}


declare module "../../../api/actions/writeToShopify" {
  export type ActionRun = (params: WriteToShopifyGlobalActionContext) => Promise<any>;
  export type ActionOnSuccess = (params: WriteToShopifyGlobalActionContext) => Promise<any>;
}

