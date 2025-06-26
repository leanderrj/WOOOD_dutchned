/// <reference path="./ActionContextTypes.d.ts" />
/**
* This is the Gadget server side types library for:
*
*                                 _ 
*  __      _____   ___   ___   __| |
*  \ \ /\ / / _ \ / _ \ / _ \ / _` |
*   \ V  V / (_) | (_) | (_) | (_| |
*    \_/\_/ \___/ \___/ \___/ \__,_|
*                                   
*
* Built for environment `Development` at version 907
* Framework version: ^1.4.0
* Edit this app here: https://woood.gadget.dev/edit
*/
import type { WooodClient } from "@gadget-client/woood";
import { Logger } from "./AmbientContext.js";
export { InvalidRecordError } from "@gadgetinc/api-client-core";
export * from "./metadataFileTypes.js";
export * from "./AmbientContext.js";
export * from "./AppConfigs.js";
export * from "./AppConfiguration.js";
export * from "./AppConnections.js";
import { AppConnections } from "./AppConnections.js";
export * from "./auth.js";
export * as DefaultEmailTemplates from "./email-templates/index.js";
export * from "./emails.js";
export { InvalidStateTransitionError } from "./errors.js";
export * from "./global-actions.js";
export * from "./routes.js";
export * from "./state-chart/index.js";
export * from "./types.js";
export * from "./ActionOptions.js";
export * from "./effects.js";
export * from "./utils.js";
import type { RouteContext } from "./routes.js";
export * from "./WebhookPayloadTypes.js";
export { preventCrossShopDataAccess, ShopifyBulkOperationState, ShopifySellingPlanGroupProductState, ShopifySellingPlanGroupProductVariantState, ShopifyShopState, ShopifySyncState, abortSync, finishBulkOperation, globalShopifySync, shopifySync } from "./shopify/index.js";
/**
* @internal
*/
import { Globals, actionContextLocalStorage } from "./globals.js";
export * from "./models/Session.js";
export * from "./models/ShopifyGdprRequest.js";
export * from "./models/ShopifyProduct.js";
export * from "./models/ShopifyShop.js";
export * from "./models/ShopifySync.js";
export * from "./models/ShopifyOrder.js";
export * from "./models/ShopifyCheckoutLineItem.js";
export * from "./models/ShopifyCheckout.js";
/**
* A map of connection name to instantiated connection objects for the app.
*/
declare let connections: AppConnections;
/**
* An instance of the Gadget logger
*/
declare let logger: Logger;
/**
* An instance of the Gadget API client that has admin permissions
*/
declare let api: WooodClient;
/**
* This is used internally to set the connections.
* @internal
*/
export declare const setConnections: (appConnections: AppConnections) => void;
/**
* This is used internally to set the rootLogger.
* @internal
*/
export declare const setLogger: (rootLogger: Logger) => void;
/**
* This is used internally to set the client Instance
* @internal
*/
export declare const setApiClient: (client: WooodClient) => void;
export { api, logger, connections };
/**
* @internal
*/
export { Globals, actionContextLocalStorage };
declare module "@remix-run/server-runtime" {
	interface AppLoadContext extends RouteContext {}
}
