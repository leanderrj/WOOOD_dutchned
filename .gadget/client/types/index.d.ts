/**
* This is the Gadget API client library for:
*
*                                 _
*  __      _____   ___   ___   __| |
*  \ \ /\ / / _ \ / _ \ / _ \ / _` |
*   \ V  V / (_) | (_) | (_) | (_| |
*    \_/\_/ \___/ \___/ \___/ \__,_|
*
*
* Built for environment "Development" at version 907
* API docs: https://docs.gadget.dev/api/woood
* Edit this app here: https://woood.gadget.app/edit
*/
export { BrowserSessionStorageType, GadgetClientError, GadgetConnection, GadgetInternalError, GadgetOperationError, GadgetRecord, GadgetRecordList, GadgetValidationError, InvalidRecordError, ChangeTracking } from "@gadgetinc/api-client-core";
export type { AuthenticationModeOptions, BrowserSessionAuthenticationModeOptions, ClientOptions, InvalidFieldError, Select } from "@gadgetinc/api-client-core";
export * from "./Client.js";
export * from "./types.js";
declare global {
    interface Window {
        gadgetConfig: {
            apiKeys: {
                shopify: string;
            };
            environment: string;
            env: Record<string, any>;
            authentication?: {
                signInPath: string;
                redirectOnSuccessfulSignInPath: string;
            };
            shopifyInstallState?: {
                redirectToOauth: boolean;
                isAuthenticated: boolean;
                missingScopes: string[];
                shopExists: boolean;
            };
            shopifyAppBridgeCDNScriptSrc?: string;
        };
    }
}
