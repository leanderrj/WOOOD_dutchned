import { pipe, map } from "wonka";
import { assert, GadgetConnection, AuthenticationMode, InternalModelManager, enqueueActionRunner, BackgroundActionHandle } from "@gadgetinc/api-client-core";
import { buildGlobalAction, buildInlineComputedView } from "./builder.js";
import { SessionManager } from "./models/Session.js";
import { CurrentSessionManager } from "./models/CurrentSession.js";
import { ShopifyGdprRequestManager } from "./models/ShopifyGdprRequest.js";
import { ShopifyProductManager } from "./models/ShopifyProduct.js";
import { ShopifyShopManager } from "./models/ShopifyShop.js";
import { ShopifySyncManager } from "./models/ShopifySync.js";
import { ShopifyOrderManager } from "./models/ShopifyOrder.js";
import { ShopifyCheckoutLineItemManager } from "./models/ShopifyCheckoutLineItem.js";
import { ShopifyCheckoutManager } from "./models/ShopifyCheckout.js";
import { DefaultSessionSelection as DefaultSessionSelection2 } from "./models/Session.js";
import { DefaultShopifyGdprRequestSelection as DefaultShopifyGdprRequestSelection2 } from "./models/ShopifyGdprRequest.js";
import { DefaultShopifyProductSelection as DefaultShopifyProductSelection2 } from "./models/ShopifyProduct.js";
import { DefaultShopifyShopSelection as DefaultShopifyShopSelection2 } from "./models/ShopifyShop.js";
import { DefaultShopifySyncSelection as DefaultShopifySyncSelection2 } from "./models/ShopifySync.js";
import { DefaultShopifyOrderSelection as DefaultShopifyOrderSelection2 } from "./models/ShopifyOrder.js";
import { DefaultShopifyCheckoutLineItemSelection as DefaultShopifyCheckoutLineItemSelection2 } from "./models/ShopifyCheckoutLineItem.js";
import { DefaultShopifyCheckoutSelection as DefaultShopifyCheckoutSelection2 } from "./models/ShopifyCheckout.js";
const productionEnv = "production";
const fallbackEnv = "development";
const getImplicitEnv = () => {
  try {
    return process.env.GADGET_ENV;
  } catch (error) {
    return void 0;
  }
};
class WooodClient {
  constructor(options) {
    this.options = options;
    /** Executes the getDeliveryDates global action. */
    this.getDeliveryDates = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "getDeliveryDates",
      operationName: "getDeliveryDates",
      operationReturnType: "GetDeliveryDates",
      namespace: null,
      variables: {}
    });
    /** Executes the processOrderPayment global action. */
    this.processOrderPayment = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "processOrderPayment",
      operationName: "processOrderPayment",
      operationReturnType: "ProcessOrderPayment",
      namespace: null,
      variables: {}
    });
    /** Executes the setOrderDeliveryDateMetafield global action. */
    this.setOrderDeliveryDateMetafield = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "setOrderDeliveryDateMetafield",
      operationName: "setOrderDeliveryDateMetafield",
      operationReturnType: "SetOrderDeliveryDateMetafield",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        deliveryDate: { required: false, type: "String" },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the setOrderShippingMethodMetafield global action. */
    this.setOrderShippingMethodMetafield = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "setOrderShippingMethodMetafield",
      operationName: "setOrderShippingMethodMetafield",
      operationReturnType: "SetOrderShippingMethodMetafield",
      namespace: null,
      variables: {
        orderId: { required: false, type: "String" },
        cartItems: {
          required: false,
          type: "[SetOrderShippingMethodMetafieldCartItemsElementTypeInput!]"
        },
        shopId: { required: false, type: "String" }
      }
    });
    /** Executes the writeToShopify global action. */
    this.writeToShopify = buildGlobalAction(this, {
      type: "globalAction",
      functionName: "writeToShopify",
      operationName: "writeToShopify",
      operationReturnType: "WriteToShopify",
      namespace: null,
      variables: {
        shopId: { required: false, type: "String" },
        mutation: { required: false, type: "String" },
        variables: { required: false, type: "JSONObject" }
      }
    });
    /** Executes an inline computed view. */
    this.view = buildInlineComputedView(this, {
      type: "computedView",
      operationName: "gellyView",
      functionName: "view",
      gqlFieldName: "gellyView",
      namespace: null,
      variables: {
        query: { type: "String", required: true },
        args: { type: "JSONObject" }
      }
    });
    /**
     * The list of environments with a customized API root endpoint
     */
    this.apiRoots = { "development": "https://woood--development.gadget.app/", "production": "https://woood.gadget.app/" };
    this.applicationId = "239827";
    /** Start a transaction against the Gadget backend which will atomically commit (or rollback). */
    this.transaction = async (callback) => {
      return await this.connection.transaction(callback);
    };
    /**
    * Get a new direct upload token for file uploads to directly to cloud storage.
    * See https://docs.gadget.dev/guides/storing-files#direct-uploads-using-tokens for more information
    * @return { url: string, token: string } A `url` to upload one file to, and a token for that file to pass back to Gadget as an action input.
    */
    this.getDirectUploadToken = async () => {
      const result = await this.query("query GetDirectUploadToken($nonce: String) { gadgetMeta { directUploadToken(nonce: $nonce) { url, token } } }", { nonce: Math.random().toString(36).slice(2, 7) }, {
        requestPolicy: "network-only"
      });
      return result.gadgetMeta.directUploadToken;
    };
    let inSSRContext = false;
    try {
      inSSRContext = !!(import.meta.env && import.meta.env.SSR);
    } catch (error) {
    }
    if (inSSRContext) {
      const api = globalThis.GadgetGlobals?.api;
      if (api) {
        return api.actAsSession;
      }
    }
    this.environment = (options?.environment ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
    let apiRoot;
    if (this.apiRoots[this.environment]) {
      apiRoot = this.apiRoots[this.environment];
    } else {
      const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
      apiRoot = `https://woood${envPart}.gadget.app`;
    }
    const exchanges = { ...options?.exchanges };
    if (this.environment !== productionEnv) {
      const devHarnessExchange = ({ forward }) => {
        return (operations$) => {
          const operationResult$ = forward(operations$);
          return pipe(
            operationResult$,
            map((result) => {
              try {
                if (typeof window !== "undefined" && typeof CustomEvent === "function") {
                  const event = new CustomEvent("gadget:devharness:graphqlresult", { detail: result });
                  window.dispatchEvent(event);
                }
              } catch (error) {
                console.warn("[gadget] error dispatching gadget dev harness event", error);
              }
              return result;
            })
          );
        };
      };
      exchanges.beforeAll = [
        devHarnessExchange,
        ...exchanges.beforeAll ?? []
      ];
    }
    this.connection = new GadgetConnection({
      endpoint: new URL("api/graphql", apiRoot).toString(),
      applicationId: this.applicationId,
      authenticationMode: options?.authenticationMode ?? (typeof window == "undefined" ? { anonymous: true } : { browserSession: true }),
      ...options,
      exchanges,
      environment: this.environment
    });
    if (typeof window != "undefined" && this.connection.authenticationMode == AuthenticationMode.APIKey && !options?.authenticationMode?.dangerouslyAllowBrowserApiKey) {
      throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.");
    }
    if (typeof options?.authenticationMode === "undefined" && typeof window !== "undefined" && window.shopify?.idToken) {
      this.connection.setAuthenticationMode({
        custom: {
          async processFetch(_input, init) {
            const headers = new Headers(init.headers);
            const idToken = await window.shopify.idToken();
            headers.append("Authorization", "ShopifySessionToken " + idToken);
            init.headers ?? (init.headers = {});
            headers.forEach(function(value, key) {
              init.headers[key] = value;
            });
          },
          async processTransactionConnectionParams(params) {
            const idToken = await window.shopify.idToken();
            params.auth.shopifySessionToken = idToken;
          }
        }
      });
    }
    this.session = new SessionManager(this.connection);
    this.currentSession = new CurrentSessionManager(this.connection);
    this.shopifyGdprRequest = new ShopifyGdprRequestManager(this.connection);
    this.shopifyProduct = new ShopifyProductManager(this.connection);
    this.shopifyShop = new ShopifyShopManager(this.connection);
    this.shopifySync = new ShopifySyncManager(this.connection);
    this.shopifyOrder = new ShopifyOrderManager(this.connection);
    this.shopifyCheckoutLineItem = new ShopifyCheckoutLineItemManager(this.connection);
    this.shopifyCheckout = new ShopifyCheckoutManager(this.connection);
    this.internal = {
      session: new InternalModelManager("session", this.connection, { "pluralApiIdentifier": "sessions", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyGdprRequest: new InternalModelManager("shopifyGdprRequest", this.connection, { "pluralApiIdentifier": "shopifyGdprRequests", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyProduct: new InternalModelManager("shopifyProduct", this.connection, { "pluralApiIdentifier": "shopifyProducts", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyShop: new InternalModelManager("shopifyShop", this.connection, { "pluralApiIdentifier": "shopifyShops", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifySync: new InternalModelManager("shopifySync", this.connection, { "pluralApiIdentifier": "shopifySyncs", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyOrder: new InternalModelManager("shopifyOrder", this.connection, { "pluralApiIdentifier": "shopifyOrders", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyCheckoutLineItem: new InternalModelManager("shopifyCheckoutLineItem", this.connection, { "pluralApiIdentifier": "shopifyCheckoutLineItems", "hasAmbiguousIdentifiers": false, "namespace": [] }),
      shopifyCheckout: new InternalModelManager("shopifyCheckout", this.connection, { "pluralApiIdentifier": "shopifyCheckouts", "hasAmbiguousIdentifiers": false, "namespace": [] })
    };
  }
  /**
   * Returns a new Client instance that will call the Gadget API as the application's admin user.
   * This can only be used for API clients using internal authentication.
   * @returns {WooodClient} A new WooodClient instance with admin authentication
   */
  get actAsAdmin() {
    assert(this.options?.authenticationMode?.internal, `actAsAdmin can only be used for API clients using internal authentication, this client is using ${JSON.stringify(this.options?.authenticationMode)}`);
    return new WooodClient({
      ...this.options,
      authenticationMode: {
        internal: {
          ...this.options.authenticationMode.internal,
          actAsSession: false
        }
      }
    });
  }
  /**
   * Returns a new WooodClient instance that will call the Gadget API as with the permission of the current session.
   * This can only be used for API clients using internal authentication.
   * @returns {WooodClient} A new WooodClient instance with session authentication
   */
  get actAsSession() {
    assert(this.options?.authenticationMode?.internal, "actAsSession can only be used for API clients using internal authentication");
    return new WooodClient({
      ...this.options,
      authenticationMode: {
        internal: {
          ...this.options.authenticationMode.internal,
          actAsSession: true
        }
      }
    });
  }
  /** Run an arbitrary GraphQL query. */
  async query(graphQL, variables, options) {
    const { data, error } = await this.connection.currentClient.query(graphQL, variables, options).toPromise();
    if (error)
      throw error;
    return data;
  }
  /** Run an arbitrary GraphQL mutation. */
  async mutate(graphQL, variables, options) {
    const { data, error } = await this.connection.currentClient.mutation(graphQL, variables, options).toPromise();
    if (error)
      throw error;
    return data;
  }
  /**
   * `fetch` function that works the same as the built-in `fetch` function, but automatically passes authentication information for this API client.
   *
   * @example
   * await api.fetch("https://myapp--development.gadget.app/foo/bar");
   *
   * @example
   * // fetch a relative URL from the endpoint this API client is configured to fetch from
   * await api.fetch("/foo/bar");
   **/
  async fetch(input, init = {}) {
    return await this.connection.fetch(input, init);
  }
  async enqueue(action, inputOrOptions, maybeOptions) {
    assert(action, ".enqueue must be passed an action as the first argument but was passed undefined");
    let input;
    let options;
    if (typeof maybeOptions !== "undefined") {
      input = inputOrOptions;
      options = maybeOptions;
    } else if (!action.variables || Object.keys(action.variables).length == 0) {
      input = {};
      options = inputOrOptions;
    } else {
      if (typeof inputOrOptions == "string") {
        input = { id: inputOrOptions };
      } else {
        input = inputOrOptions;
      }
      options = {};
    }
    return await enqueueActionRunner(this.connection, action, input, options);
  }
  /**
   * Returns a handle for a given background action id
   *
   * @param action The action that was enqueued
   * @param id The id of the background action
   *
   * @example
   * const handle = api.handle(api.widget.update, "app-job-12346");
   *
   * @example
   * const handle = api.handle(api.someGlobalAction, "app-job-56789");
   **/
  handle(action, id) {
    return new BackgroundActionHandle(this.connection, action, id);
  }
  toString() {
    return `WooodClient<${this.environment}>`;
  }
  toJSON() {
    return this.toString();
  }
}
WooodClient.prototype[Symbol.for("gadget/modelRelationships")] = { "session": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyGdprRequest": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyProduct": { "checkoutLineItems": { "type": "HasMany", "model": "shopifyCheckoutLineItem" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyShop": { "gdprRequests": { "type": "HasMany", "model": "shopifyGdprRequest" }, "products": { "type": "HasMany", "model": "shopifyProduct" }, "syncs": { "type": "HasMany", "model": "shopifySync" }, "orders": { "type": "HasMany", "model": "shopifyOrder" }, "checkoutLineItems": { "type": "HasMany", "model": "shopifyCheckoutLineItem" }, "checkouts": { "type": "HasMany", "model": "shopifyCheckout" } }, "shopifySync": { "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyOrder": { "shop": { "type": "BelongsTo", "model": "shopifyShop" }, "checkouts": { "type": "HasMany", "model": "shopifyCheckout" } }, "shopifyCheckoutLineItem": { "checkout": { "type": "BelongsTo", "model": "shopifyCheckout" }, "product": { "type": "BelongsTo", "model": "shopifyProduct" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } }, "shopifyCheckout": { "lineItems": { "type": "HasMany", "model": "shopifyCheckoutLineItem" }, "order": { "type": "BelongsTo", "model": "shopifyOrder" }, "shop": { "type": "BelongsTo", "model": "shopifyShop" } } };
const Client = WooodClient;
export {
  Client,
  DefaultSessionSelection2 as DefaultSessionSelection,
  DefaultShopifyCheckoutLineItemSelection2 as DefaultShopifyCheckoutLineItemSelection,
  DefaultShopifyCheckoutSelection2 as DefaultShopifyCheckoutSelection,
  DefaultShopifyGdprRequestSelection2 as DefaultShopifyGdprRequestSelection,
  DefaultShopifyOrderSelection2 as DefaultShopifyOrderSelection,
  DefaultShopifyProductSelection2 as DefaultShopifyProductSelection,
  DefaultShopifyShopSelection2 as DefaultShopifyShopSelection,
  DefaultShopifySyncSelection2 as DefaultShopifySyncSelection,
  WooodClient
};
//# sourceMappingURL=Client.js.map
