// generated with metadata generator for woood for fv ^1.4.0
import type { OperationContext, Exchange } from "@urql/core";
import { pipe, map } from "wonka";
import { assert, GadgetConnection, AuthenticationMode, GadgetTransaction, InternalModelManager, ActionFunctionMetadata, GlobalActionFunction, enqueueActionRunner, BackgroundActionHandle } from "@gadgetinc/api-client-core";
import type { ClientOptions as ApiClientOptions, AnyClient, EnqueueBackgroundActionOptions, AnyActionFunction } from '@gadgetinc/api-client-core';
import type { DocumentNode } from 'graphql';

import { buildGlobalAction, buildInlineComputedView } from "./builder.js";
import { Scalars, SetOrderShippingMethodMetafieldCartItemsElementTypeInput } from "./types.js";
import { DefaultSessionSelection, SessionManager } from "./models/Session.js";
import { CurrentSessionManager } from "./models/CurrentSession.js";
import { DefaultShopifyGdprRequestSelection, ShopifyGdprRequestManager } from "./models/ShopifyGdprRequest.js";
import { DefaultShopifyProductSelection, ShopifyProductManager } from "./models/ShopifyProduct.js";
import { DefaultShopifyShopSelection, ShopifyShopManager } from "./models/ShopifyShop.js";
import { DefaultShopifySyncSelection, ShopifySyncManager } from "./models/ShopifySync.js";
import { DefaultShopifyOrderSelection, ShopifyOrderManager } from "./models/ShopifyOrder.js";
import { DefaultShopifyCheckoutLineItemSelection, ShopifyCheckoutLineItemManager } from "./models/ShopifyCheckoutLineItem.js";
import { DefaultShopifyCheckoutSelection, ShopifyCheckoutManager } from "./models/ShopifyCheckout.js";
export { DefaultSessionSelection, type SessionRecord } from "./models/Session.js";
export { DefaultShopifyGdprRequestSelection, type ShopifyGdprRequestRecord } from "./models/ShopifyGdprRequest.js";
export { DefaultShopifyProductSelection, type ShopifyProductRecord } from "./models/ShopifyProduct.js";
export { DefaultShopifyShopSelection, type ShopifyShopRecord } from "./models/ShopifyShop.js";
export { DefaultShopifySyncSelection, type ShopifySyncRecord } from "./models/ShopifySync.js";
export { DefaultShopifyOrderSelection, type ShopifyOrderRecord } from "./models/ShopifyOrder.js";
export { DefaultShopifyCheckoutLineItemSelection, type ShopifyCheckoutLineItemRecord } from "./models/ShopifyCheckoutLineItem.js";
export { DefaultShopifyCheckoutSelection, type ShopifyCheckoutRecord } from "./models/ShopifyCheckout.js";

type ClientOptions = Omit<ApiClientOptions, "environment"> & { environment?: string };
type AllOptionalVariables<T> = Partial<T> extends T ? object : never;
export type InternalModelManagers = {
   /** The internal API model manager for the session model */
   session: InternalModelManager;
   /** The internal API model manager for the shopifyGdprRequest model */
   shopifyGdprRequest: InternalModelManager;
   /** The internal API model manager for the shopifyProduct model */
   shopifyProduct: InternalModelManager;
   /** The internal API model manager for the shopifyShop model */
   shopifyShop: InternalModelManager;
   /** The internal API model manager for the shopifySync model */
   shopifySync: InternalModelManager;
   /** The internal API model manager for the shopifyOrder model */
   shopifyOrder: InternalModelManager;
   /** The internal API model manager for the shopifyCheckoutLineItem model */
   shopifyCheckoutLineItem: InternalModelManager;
   /** The internal API model manager for the shopifyCheckout model */
   shopifyCheckout: InternalModelManager;
 };

const productionEnv = "production";
const fallbackEnv = "development";

/**
 * Return the implicit environment
 * We specifically use an environment variable  `process.env.GADGET_ENV` or similar so that bundlers like webpack or vite can string replace this value in built source codes with the user's desired value.
 */
const getImplicitEnv = () => {
  try {
    return process.env.GADGET_ENV;
  } catch (error) {
    return undefined;
  }
}

/**
 * Function type for the inline view execution function.
 * Includes overloads for all known instances collected from call sites.
 **/
type InlineViewFunction = {
  (query: string, variables?: Record<string, unknown>): Promise<unknown>
}

/**
 * Root object used for interacting with the woood API. `WooodClient` has `query` and `mutation` functions for executing raw GraphQL queries and mutations, as well as `ModelManager` objects for manipulating models with a JavaScript API. `WooodClient` also has a `fetch` function for making raw requests to your backend.
 * */
export class WooodClient implements AnyClient {
  connection!: GadgetConnection;

  /** Executes the getDeliveryDates global action. */
  getDeliveryDates = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'getDeliveryDates',
                       operationName: 'getDeliveryDates',
                       operationReturnType: 'GetDeliveryDates',
                       namespace: null,
                       variables: {}
                     } as const) as unknown as {
                     (): Promise<any>;
                     type: 'globalAction';
                     operationName: 'getDeliveryDates';
                     operationReturnType: 'GetDeliveryDates';
                     namespace: null;
                     typesImports: [];
                     variables: {};
                     variablesType: Record<string, never>;
                   };
  /** Executes the processOrderPayment global action. */
  processOrderPayment = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'processOrderPayment',
                       operationName: 'processOrderPayment',
                       operationReturnType: 'ProcessOrderPayment',
                       namespace: null,
                       variables: {}
                     } as const) as unknown as {
                     (): Promise<any>;
                     type: 'globalAction';
                     operationName: 'processOrderPayment';
                     operationReturnType: 'ProcessOrderPayment';
                     namespace: null;
                     typesImports: [];
                     variables: {};
                     variablesType: Record<string, never>;
                   };
  /** Executes the setOrderDeliveryDateMetafield global action. */
  setOrderDeliveryDateMetafield = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'setOrderDeliveryDateMetafield',
                       operationName: 'setOrderDeliveryDateMetafield',
                       operationReturnType: 'SetOrderDeliveryDateMetafield',
                       namespace: null,
                       variables: {
                         orderId: { required: false, type: 'String' },
                         deliveryDate: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        orderId?: (Scalars['String'] | null) | null;
                                        deliveryDate?: (Scalars['String'] | null) | null;
                                        shopId?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'setOrderDeliveryDateMetafield';
                     operationReturnType: 'SetOrderDeliveryDateMetafield';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         orderId: { required: false, type: 'String' },
                         deliveryDate: { required: false, type: 'String' },
                         shopId: { required: false, type: 'String' }
                       };
                     variablesType: {
                             orderId?: (Scalars['String'] | null) | null;
                             deliveryDate?: (Scalars['String'] | null) | null;
                             shopId?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the setOrderShippingMethodMetafield global action. */
  setOrderShippingMethodMetafield = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'setOrderShippingMethodMetafield',
                       operationName: 'setOrderShippingMethodMetafield',
                       operationReturnType: 'SetOrderShippingMethodMetafield',
                       namespace: null,
                       variables: {
                         orderId: { required: false, type: 'String' },
                         cartItems: {
                           required: false,
                           type: '[SetOrderShippingMethodMetafieldCartItemsElementTypeInput!]'
                         },
                         shopId: { required: false, type: 'String' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        orderId?: (Scalars['String'] | null) | null;
                                        cartItems?: (SetOrderShippingMethodMetafieldCartItemsElementTypeInput)[];
                                        shopId?: (Scalars['String'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'setOrderShippingMethodMetafield';
                     operationReturnType: 'SetOrderShippingMethodMetafield';
                     namespace: null;
                     typesImports: [
                         'SetOrderShippingMethodMetafieldCartItemsElementTypeInput',
                         'Scalars'
                       ];
                     variables: {
                         orderId: { required: false, type: 'String' },
                         cartItems: {
                           required: false,
                           type: '[SetOrderShippingMethodMetafieldCartItemsElementTypeInput!]'
                         },
                         shopId: { required: false, type: 'String' }
                       };
                     variablesType: {
                             orderId?: (Scalars['String'] | null) | null;
                             cartItems?: (SetOrderShippingMethodMetafieldCartItemsElementTypeInput)[];
                             shopId?: (Scalars['String'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes the writeToShopify global action. */
  writeToShopify = buildGlobalAction(this, {
                       type: 'globalAction',
                       functionName: 'writeToShopify',
                       operationName: 'writeToShopify',
                       operationReturnType: 'WriteToShopify',
                       namespace: null,
                       variables: {
                         shopId: { required: false, type: 'String' },
                         mutation: { required: false, type: 'String' },
                         variables: { required: false, type: 'JSONObject' }
                       }
                     } as const) as unknown as {
                     (variables?: {
                                        shopId?: (Scalars['String'] | null) | null;
                                        mutation?: (Scalars['String'] | null) | null;
                                        variables?: (Scalars['JSONObject'] | null) | null;
                                      } | null): Promise<any>;
                     type: 'globalAction';
                     operationName: 'writeToShopify';
                     operationReturnType: 'WriteToShopify';
                     namespace: null;
                     typesImports: [ 'Scalars' ];
                     variables: {
                         shopId: { required: false, type: 'String' },
                         mutation: { required: false, type: 'String' },
                         variables: { required: false, type: 'JSONObject' }
                       };
                     variablesType: {
                             shopId?: (Scalars['String'] | null) | null;
                             mutation?: (Scalars['String'] | null) | null;
                             variables?: (Scalars['JSONObject'] | null) | null;
                           }
                             | null
                             | undefined;
                   };
  /** Executes an inline computed view. */
  view: InlineViewFunction = buildInlineComputedView(this, {
                             type: 'computedView',
                             operationName: 'gellyView',
                             functionName: 'view',
                             gqlFieldName: 'gellyView',
                             namespace: null,
                             variables: {
                               query: { type: 'String', required: true },
                               args: { type: 'JSONObject' }
                             }
                           } as const);
  session!: SessionManager;
  currentSession!: CurrentSessionManager;
  shopifyGdprRequest!: ShopifyGdprRequestManager;
  shopifyProduct!: ShopifyProductManager;
  shopifyShop!: ShopifyShopManager;
  shopifySync!: ShopifySyncManager;
  shopifyOrder!: ShopifyOrderManager;
  shopifyCheckoutLineItem!: ShopifyCheckoutLineItemManager;
  shopifyCheckout!: ShopifyCheckoutManager;

  /**
  * Namespaced object for accessing models via the Gadget internal APIs, which provide lower level and higher privileged operations directly against the database. Useful for maintenance operations like migrations or correcting broken data, and for implementing the high level actions.
  *
  * Returns an object of model API identifiers to `InternalModelManager` objects.
  *
  * Example:
  * `api.internal.user.findOne(...)`
  */
  internal!: InternalModelManagers;

  /**
   * The list of environments with a customized API root endpoint
   */
  apiRoots: Record<string, string> = {"development":"https://woood--development.gadget.app/","production":"https://woood.gadget.app/"};



  applicationId: string = "239827";
  environment!: string;

  constructor(readonly options?: ClientOptions | undefined) {
    let inSSRContext = false;

    try {
      // @ts-ignore
      inSSRContext = !!(import.meta.env && import.meta.env.SSR);
    } catch (error) {
      // no-op; this try-catch is here to prevent the empty-import-meta esbuild warning:
    }

    // Inside Vite SSR contexts on Gadget's app sandboxes, we use the global api client set up
    // by the gadget-server package. This is so that the api client used in i.e. Remix loaders
    // has all of the same auth and functionality as any other sandbox api client.
    if (inSSRContext) {
      const api = (globalThis as any).GadgetGlobals?.api;

      if (api) {
        return api.actAsSession;
      }
    }

    // for multi environment apps (this one), we accept any 'ole string as an environment, and we look in GADGET_ENV to determine the environment if not passed explicitly
    this.environment = (options?.environment ?? getImplicitEnv() ?? fallbackEnv).toLocaleLowerCase();
    let apiRoot: string;
    if (this.apiRoots[this.environment]) {
      apiRoot = this.apiRoots[this.environment];
    } else {
      const envPart = this.environment == productionEnv ? "" : `--${this.environment}`;
      apiRoot = `https://woood${envPart}.gadget.app`;
    }

    const exchanges = {...options?.exchanges};
    if (this.environment !== productionEnv) {
      const devHarnessExchange: Exchange = ({ forward }) => {
        return operations$ => {
          const operationResult$ = forward(operations$)

          return pipe(
            operationResult$,
            map(result => {
              try {
                if (typeof window !== "undefined" && typeof CustomEvent === "function") {
                  const event = new CustomEvent("gadget:devharness:graphqlresult", { detail: result });
                  window.dispatchEvent(event);
                }
              } catch (error: any) {
                // gracefully handle environments where CustomEvent is misbehaved like jsdom
                console.warn("[gadget] error dispatching gadget dev harness event", error)
              }

              return result;
            })
          );
        };
      };

      exchanges.beforeAll = [
        devHarnessExchange,
        ...(exchanges.beforeAll ?? []),
      ];
    }

    this.connection = new GadgetConnection({
      endpoint: new URL("api/graphql", apiRoot).toString(),
      applicationId: this.applicationId,
      authenticationMode: options?.authenticationMode ?? (typeof window == 'undefined' ? { anonymous: true } : { browserSession: true }),
      ...options,
      exchanges,
      environment: this.environment,
    });

    if (typeof window != 'undefined' && this.connection.authenticationMode == AuthenticationMode.APIKey && !(options as any)?.authenticationMode?.dangerouslyAllowBrowserApiKey) {
      throw new Error("GGT_BROWSER_API_KEY_USAGE: Using a Gadget API key to authenticate this client object is insecure and will leak your API keys to attackers. Please use a different authentication mode.")
    }

    // automatically use shopify authentication if no authentication method has been passed and the shopify app bridge is available
    if (typeof options?.authenticationMode === "undefined" && typeof window !== "undefined" && (window as any).shopify?.idToken) {
      this.connection.setAuthenticationMode({
        custom: {
          async processFetch(_input, init) {
            const headers = new Headers(init.headers);
            const idToken = await (window as any).shopify.idToken();
            headers.append("Authorization", "ShopifySessionToken "+ idToken);
            init.headers ??= {};
            headers.forEach(function (value, key) {
              (init.headers as Record<string, string>)[key] = value;
            });
          },
          async processTransactionConnectionParams(params) {
            const idToken = await (window as any).shopify.idToken();
            params.auth.shopifySessionToken = idToken;
          },
        },
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
                      session: new InternalModelManager("session", this.connection, {"pluralApiIdentifier":"sessions","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyGdprRequest: new InternalModelManager("shopifyGdprRequest", this.connection, {"pluralApiIdentifier":"shopifyGdprRequests","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyProduct: new InternalModelManager("shopifyProduct", this.connection, {"pluralApiIdentifier":"shopifyProducts","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyShop: new InternalModelManager("shopifyShop", this.connection, {"pluralApiIdentifier":"shopifyShops","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifySync: new InternalModelManager("shopifySync", this.connection, {"pluralApiIdentifier":"shopifySyncs","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyOrder: new InternalModelManager("shopifyOrder", this.connection, {"pluralApiIdentifier":"shopifyOrders","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyCheckoutLineItem: new InternalModelManager("shopifyCheckoutLineItem", this.connection, {"pluralApiIdentifier":"shopifyCheckoutLineItems","hasAmbiguousIdentifiers":false,"namespace":[]}),
                      shopifyCheckout: new InternalModelManager("shopifyCheckout", this.connection, {"pluralApiIdentifier":"shopifyCheckouts","hasAmbiguousIdentifiers":false,"namespace":[]}),
                    };
  }

  /**
   * Returns a new Client instance that will call the Gadget API as the application's admin user.
   * This can only be used for API clients using internal authentication.
   * @returns {WooodClient} A new WooodClient instance with admin authentication
   */
  get actAsAdmin(): WooodClient {
    assert(this.options?.authenticationMode?.internal, `actAsAdmin can only be used for API clients using internal authentication, this client is using ${JSON.stringify(this.options?.authenticationMode)}`)

    return new WooodClient({
    ...this.options,
    authenticationMode: {
      internal: {
        ...this.options!.authenticationMode!.internal!,
        actAsSession: false,
      }
    }
    });
  }

  /**
   * Returns a new WooodClient instance that will call the Gadget API as with the permission of the current session.
   * This can only be used for API clients using internal authentication.
   * @returns {WooodClient} A new WooodClient instance with session authentication
   */
  get actAsSession(): WooodClient {
    assert(this.options?.authenticationMode?.internal, "actAsSession can only be used for API clients using internal authentication")

    return new WooodClient({
      ...this.options,
      authenticationMode: {
        internal: {
          ...this.options!.authenticationMode!.internal!,
          actAsSession: true,
        }
      }
    })
  }

  /** Run an arbitrary GraphQL query. */
  async query<T = any>(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>): Promise<T> {
    const {data, error} = await this.connection.currentClient.query(graphQL, variables, options).toPromise();
    if (error) throw error
    return data as T;
  }

  /** Run an arbitrary GraphQL mutation. */
  async mutate<T = any>(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>): Promise<T> {
    const {data, error} = await this.connection.currentClient.mutation(graphQL, variables, options).toPromise();
    if (error) throw error
    return data as T;
  }

  /** Start a transaction against the Gadget backend which will atomically commit (or rollback). */
  transaction = async <T>(callback: (transaction: GadgetTransaction) => Promise<T>): Promise<T> => {
    return await this.connection.transaction(callback)
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
  async fetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
    return await this.connection.fetch(input, init);
  }

  /**
  * Get a new direct upload token for file uploads to directly to cloud storage.
  * See https://docs.gadget.dev/guides/storing-files#direct-uploads-using-tokens for more information
  * @return { url: string, token: string } A `url` to upload one file to, and a token for that file to pass back to Gadget as an action input.
  */
  getDirectUploadToken = async (): Promise<{url: string, token: string}> => {
    const result = await this.query("query GetDirectUploadToken($nonce: String) { gadgetMeta { directUploadToken(nonce: $nonce) { url, token } } }", {nonce: Math.random().toString(36).slice(2, 7)}, {
      requestPolicy: "network-only",
    });
    return (result as any).gadgetMeta.directUploadToken;
  }

  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status.
   *
   * @param action The action to enqueue
   * @param input The input variables for the action, in object form. Optional for actions that have only optional params, but required for actions with required params.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" }, { retries: 3, priority: "HIGH" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { retries: 3, priority: "LOW" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "new name b" }, { name: "new name b" }]);
   **/
  async enqueue<SchemaT, Action extends AnyActionFunction & AllOptionalVariables<Action['variablesType']>>(action: Action, input?: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status.
   *
   * @param action The action to enqueue
   * @param input The id for the record to run the action on. This is only one overload of this function, see the other forms for other input types.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" }, { retries: 3, priority: "HIGH" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, "123");
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { retries: 3, priority: "LOW" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "new name b" }, { name: "new name b" }]);
   **/
  async enqueue<SchemaT, Action extends AnyActionFunction & {variablesType: {id: string}}>(action: Action, id: string, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status. This is the variant of enqueue for actions which accept no inputs.
   *
   * @param action The action to enqueue.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction);
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "new name b" }, { name: "new name b" }]);
   **/
  async enqueue<SchemaT, Action extends ActionFunctionMetadata<any, Record<string, never>, any, any, any, any> | GlobalActionFunction<Record<string, never>>>(action: Action, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  /**
   * Enqueue a set of actions in bulk for execution. The backend will run each action as soon as possible, and return an array of handles to each action right away that can be used to check their statuses.
   *
   * @param bulkAction The bulk action to enqueue
   * @param input The input variables for the action, in array or object form.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkCreate, [{ name: "foo" }, {name: "bar"}], { retries: 3, priority: "HIGH" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.bulkDelete, [2, 42]);
   *
   * @example
   * const handle = await api.enqueue(api.widget.addInventory, [{id: 1, amount: 10}, {id: 2, amount: 15}]);
   *
  **/
  async enqueue<SchemaT, Action extends ActionFunctionMetadata<any, any, any, any, any, true>>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>[]>;
  /**
   * Enqueue one action for execution in the backend. The backend will run the action as soon as possible, and return a handle to the action right away that can be used to check its status.
   *
   * @param action The action to enqueue
   * @param input The input variables for the action, in object form. Optional for actions that have only optional params, but required for actions with required params.
   * @param options Background execution options for the action
   *
   * @example
   * const handle = await api.enqueue(api.widget.update, { id: "123", name: "new name" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.create, { input: "value" });
   *
   * @example
   * const handle = await api.enqueue(api.widget.delete, { id: "123" });
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction);
   *
   * @example
   * const handle = await api.enqueue(api.someGlobalAction, { input: "value" });
   **/
  async enqueue<SchemaT, Action extends AnyActionFunction>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
  async enqueue<SchemaT, Action extends AnyActionFunction>(action: Action, inputOrOptions?: Action["variablesType"] | EnqueueBackgroundActionOptions<Action>, maybeOptions?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action> | BackgroundActionHandle<SchemaT, Action>[]> {
    assert(action, ".enqueue must be passed an action as the first argument but was passed undefined");
  
    let input: Action["variablesType"] | undefined;
    let options: EnqueueBackgroundActionOptions<Action> | undefined;
  
    // process different overloads to pull out the input and or options
    if (typeof maybeOptions !== "undefined") {
      input = inputOrOptions;
      options = maybeOptions;
    } else if (!action.variables || Object.keys(action.variables).length == 0) {
      input = {};
      options = inputOrOptions;
    } else {
      if (typeof inputOrOptions == "string") {
        // id input shorthand passes just the id as a string, wrap it into a variables object
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
  handle<SchemaT, Action extends AnyActionFunction>(action: Action, id: string): BackgroundActionHandle<SchemaT, Action> {
    return new BackgroundActionHandle(this.connection, action, id);
  }

  toString(): string {
    return `WooodClient<${this.environment}>`;
  }

  toJSON(): string {
    return this.toString()
  }
}

(WooodClient.prototype as any)[Symbol.for("gadget/modelRelationships")] = {"session":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyGdprRequest":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyProduct":{"checkoutLineItems":{"type":"HasMany","model":"shopifyCheckoutLineItem"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyShop":{"gdprRequests":{"type":"HasMany","model":"shopifyGdprRequest"},"products":{"type":"HasMany","model":"shopifyProduct"},"syncs":{"type":"HasMany","model":"shopifySync"},"orders":{"type":"HasMany","model":"shopifyOrder"},"checkoutLineItems":{"type":"HasMany","model":"shopifyCheckoutLineItem"},"checkouts":{"type":"HasMany","model":"shopifyCheckout"}},"shopifySync":{"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyOrder":{"shop":{"type":"BelongsTo","model":"shopifyShop"},"checkouts":{"type":"HasMany","model":"shopifyCheckout"}},"shopifyCheckoutLineItem":{"checkout":{"type":"BelongsTo","model":"shopifyCheckout"},"product":{"type":"BelongsTo","model":"shopifyProduct"},"shop":{"type":"BelongsTo","model":"shopifyShop"}},"shopifyCheckout":{"lineItems":{"type":"HasMany","model":"shopifyCheckoutLineItem"},"order":{"type":"BelongsTo","model":"shopifyOrder"},"shop":{"type":"BelongsTo","model":"shopifyShop"}}};

/** Legacy export under the `Client` name for backwards compatibility. */
export const Client: typeof WooodClient = WooodClient;
export type Client = InstanceType<typeof WooodClient>;