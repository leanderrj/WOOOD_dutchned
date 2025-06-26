"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ShopifyCheckout_exports = {};
__export(ShopifyCheckout_exports, {
  DefaultShopifyCheckoutSelection: () => DefaultShopifyCheckoutSelection,
  ShopifyCheckoutManager: () => ShopifyCheckoutManager
});
module.exports = __toCommonJS(ShopifyCheckout_exports);
var import_builder = require("../builder.js");
const DefaultShopifyCheckoutSelection = {
  __typename: true,
  id: true,
  abandonedCheckoutUrl: true,
  appliedDiscount: true,
  buyerAcceptsMarketing: true,
  completedAt: true,
  createdAt: true,
  creditCard: true,
  currency: true,
  customerLocale: true,
  device: true,
  discountCode: true,
  discountCodes: true,
  email: true,
  legalNoticeUrl: true,
  name: true,
  note: true,
  noteAttributes: true,
  orderId: true,
  orderStatusUrl: true,
  paymentDue: true,
  paymentUrl: true,
  payments: true,
  phone: true,
  presentmentCurrency: true,
  privacyPolicyUrl: true,
  refundPolicyUrl: true,
  requiresShipping: true,
  reservationTime: true,
  reservationTimeLeft: true,
  shippingLine: true,
  shippingPolicyUrl: true,
  shopId: true,
  shopifyCreatedAt: true,
  shopifyPaymentsAccountId: true,
  shopifyUpdatedAt: true,
  sourceIdentifier: true,
  sourceName: true,
  sourceUrl: true,
  subscriptionPolicyUrl: true,
  subtotalPrice: true,
  taxExempt: true,
  taxLines: true,
  taxManipulations: true,
  taxesIncluded: true,
  termsOfSaleUrl: true,
  termsOfServiceUrl: true,
  token: true,
  totalLineItemsPrice: true,
  totalPrice: true,
  totalTax: true,
  totalTipReceived: true,
  updatedAt: true,
  userId: true,
  webUrl: true
};
const modelApiIdentifier = "shopifyCheckout";
const pluralModelApiIdentifier = "shopifyCheckouts";
;
;
;
;
;
;
;
;
const ShopifyCheckoutManager = (0, import_builder.buildModelManager)(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyCheckoutSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyCheckout",
      functionName: "create",
      errorMessage: "The action create on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckout.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyCheckouts",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckout.bulkCreate"
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyCheckout",
      functionName: "update",
      errorMessage: "The action update on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckout.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyCheckouts",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckout.bulkUpdate"
    },
    {
      type: "stubbedAction",
      operationName: "deleteShopifyCheckout",
      functionName: "delete",
      errorMessage: "The action delete on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckout.delete"
    },
    {
      type: "stubbedAction",
      operationName: "bulkDeleteShopifyCheckouts",
      functionName: "bulkDelete",
      errorMessage: "The action delete on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckout.bulkDelete"
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "shopifyCheckoutGellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    }
  ]
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultShopifyCheckoutSelection,
  ShopifyCheckoutManager
});
//# sourceMappingURL=ShopifyCheckout.js.map
