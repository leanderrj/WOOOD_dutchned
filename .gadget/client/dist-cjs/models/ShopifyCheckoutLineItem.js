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
var ShopifyCheckoutLineItem_exports = {};
__export(ShopifyCheckoutLineItem_exports, {
  DefaultShopifyCheckoutLineItemSelection: () => DefaultShopifyCheckoutLineItemSelection,
  ShopifyCheckoutLineItemManager: () => ShopifyCheckoutLineItemManager
});
module.exports = __toCommonJS(ShopifyCheckoutLineItem_exports);
var import_builder = require("../builder.js");
const DefaultShopifyCheckoutLineItemSelection = {
  __typename: true,
  id: true,
  appliedDiscounts: true,
  checkoutId: true,
  compareAtPrice: true,
  createdAt: true,
  discountAllocations: true,
  fulfillmentService: true,
  grams: true,
  key: true,
  linePrice: true,
  price: true,
  productId: true,
  quantity: true,
  requiresShipping: true,
  shopId: true,
  sku: true,
  taxable: true,
  title: true,
  updatedAt: true,
  variantTitle: true,
  vendor: true
};
const modelApiIdentifier = "shopifyCheckoutLineItem";
const pluralModelApiIdentifier = "shopifyCheckoutLineItems";
;
;
;
;
;
;
;
;
const ShopifyCheckoutLineItemManager = (0, import_builder.buildModelManager)(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyCheckoutLineItemSelection,
  [
    {
      type: "findOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: modelApiIdentifier,
      modelApiIdentifier,
      findByVariableName: "id",
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: "findMany",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: "findFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: "maybeFindFirst",
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: "findOne",
      operationName: pluralModelApiIdentifier,
      functionName: "findById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: "maybeFindOne",
      operationName: pluralModelApiIdentifier,
      functionName: "maybeFindById",
      findByField: "id",
      findByVariableName: "id",
      modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: "stubbedAction",
      operationName: "createShopifyCheckoutLineItem",
      functionName: "create",
      errorMessage: "The action create on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckoutLineItem.create"
    },
    {
      type: "stubbedAction",
      operationName: "bulkCreateShopifyCheckoutLineItems",
      functionName: "bulkCreate",
      errorMessage: "The action create on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "create",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckoutLineItem.bulkCreate"
    },
    {
      type: "stubbedAction",
      operationName: "updateShopifyCheckoutLineItem",
      functionName: "update",
      errorMessage: "The action update on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckoutLineItem.update"
    },
    {
      type: "stubbedAction",
      operationName: "bulkUpdateShopifyCheckoutLineItems",
      functionName: "bulkUpdate",
      errorMessage: "The action update on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "update",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckoutLineItem.bulkUpdate"
    },
    {
      type: "stubbedAction",
      operationName: "deleteShopifyCheckoutLineItem",
      functionName: "delete",
      errorMessage: "The action delete on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckoutLineItem.delete"
    },
    {
      type: "stubbedAction",
      operationName: "bulkDeleteShopifyCheckoutLineItems",
      functionName: "bulkDelete",
      errorMessage: "The action delete on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers",
      actionApiIdentifier: "delete",
      modelApiIdentifier,
      variables: {},
      reason: "MissingApiTrigger",
      dataPath: "shopifyCheckoutLineItem.bulkDelete"
    },
    {
      type: "computedView",
      operationName: "view",
      functionName: "view",
      gqlFieldName: "shopifyCheckoutLineItemGellyView",
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
  DefaultShopifyCheckoutLineItemSelection,
  ShopifyCheckoutLineItemManager
});
//# sourceMappingURL=ShopifyCheckoutLineItem.js.map
