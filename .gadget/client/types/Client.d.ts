import type { OperationContext } from "@urql/core";
import { GadgetConnection, GadgetTransaction, InternalModelManager, ActionFunctionMetadata, GlobalActionFunction, BackgroundActionHandle } from "@gadgetinc/api-client-core";
import type { ClientOptions as ApiClientOptions, AnyClient, EnqueueBackgroundActionOptions, AnyActionFunction } from '@gadgetinc/api-client-core';
import type { DocumentNode } from 'graphql';
import { Scalars, SetOrderShippingMethodMetafieldCartItemsElementTypeInput } from "./types.js";
import { SessionManager } from "./models/Session.js";
import { CurrentSessionManager } from "./models/CurrentSession.js";
import { ShopifyGdprRequestManager } from "./models/ShopifyGdprRequest.js";
import { ShopifyProductManager } from "./models/ShopifyProduct.js";
import { ShopifyShopManager } from "./models/ShopifyShop.js";
import { ShopifySyncManager } from "./models/ShopifySync.js";
import { ShopifyOrderManager } from "./models/ShopifyOrder.js";
import { ShopifyCheckoutLineItemManager } from "./models/ShopifyCheckoutLineItem.js";
import { ShopifyCheckoutManager } from "./models/ShopifyCheckout.js";
export { DefaultSessionSelection, type SessionRecord } from "./models/Session.js";
export { DefaultShopifyGdprRequestSelection, type ShopifyGdprRequestRecord } from "./models/ShopifyGdprRequest.js";
export { DefaultShopifyProductSelection, type ShopifyProductRecord } from "./models/ShopifyProduct.js";
export { DefaultShopifyShopSelection, type ShopifyShopRecord } from "./models/ShopifyShop.js";
export { DefaultShopifySyncSelection, type ShopifySyncRecord } from "./models/ShopifySync.js";
export { DefaultShopifyOrderSelection, type ShopifyOrderRecord } from "./models/ShopifyOrder.js";
export { DefaultShopifyCheckoutLineItemSelection, type ShopifyCheckoutLineItemRecord } from "./models/ShopifyCheckoutLineItem.js";
export { DefaultShopifyCheckoutSelection, type ShopifyCheckoutRecord } from "./models/ShopifyCheckout.js";
type ClientOptions = Omit<ApiClientOptions, "environment"> & {
    environment?: string;
};
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
/**
 * Function type for the inline view execution function.
 * Includes overloads for all known instances collected from call sites.
 **/
type InlineViewFunction = {
    (query: string, variables?: Record<string, unknown>): Promise<unknown>;
};
/**
 * Root object used for interacting with the woood API. `WooodClient` has `query` and `mutation` functions for executing raw GraphQL queries and mutations, as well as `ModelManager` objects for manipulating models with a JavaScript API. `WooodClient` also has a `fetch` function for making raw requests to your backend.
 * */
export declare class WooodClient implements AnyClient {
    readonly options?: ClientOptions | undefined;
    connection: GadgetConnection;
    /** Executes the getDeliveryDates global action. */
    getDeliveryDates: {
        (): Promise<any>;
        type: "globalAction";
        operationName: "getDeliveryDates";
        operationReturnType: "GetDeliveryDates";
        namespace: null;
        typesImports: [];
        variables: {};
        variablesType: Record<string, never>;
    };
    /** Executes the processOrderPayment global action. */
    processOrderPayment: {
        (): Promise<any>;
        type: "globalAction";
        operationName: "processOrderPayment";
        operationReturnType: "ProcessOrderPayment";
        namespace: null;
        typesImports: [];
        variables: {};
        variablesType: Record<string, never>;
    };
    /** Executes the setOrderDeliveryDateMetafield global action. */
    setOrderDeliveryDateMetafield: {
        (variables?: {
            orderId?: (Scalars["String"] | null) | null;
            deliveryDate?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "setOrderDeliveryDateMetafield";
        operationReturnType: "SetOrderDeliveryDateMetafield";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            orderId: {
                required: false;
                type: "String";
            };
            deliveryDate: {
                required: false;
                type: "String";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderId?: (Scalars["String"] | null) | null;
            deliveryDate?: (Scalars["String"] | null) | null;
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the setOrderShippingMethodMetafield global action. */
    setOrderShippingMethodMetafield: {
        (variables?: {
            orderId?: (Scalars["String"] | null) | null;
            cartItems?: (SetOrderShippingMethodMetafieldCartItemsElementTypeInput)[];
            shopId?: (Scalars["String"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "setOrderShippingMethodMetafield";
        operationReturnType: "SetOrderShippingMethodMetafield";
        namespace: null;
        typesImports: ["SetOrderShippingMethodMetafieldCartItemsElementTypeInput", "Scalars"];
        variables: {
            orderId: {
                required: false;
                type: "String";
            };
            cartItems: {
                required: false;
                type: "[SetOrderShippingMethodMetafieldCartItemsElementTypeInput!]";
            };
            shopId: {
                required: false;
                type: "String";
            };
        };
        variablesType: {
            orderId?: (Scalars["String"] | null) | null;
            cartItems?: (SetOrderShippingMethodMetafieldCartItemsElementTypeInput)[];
            shopId?: (Scalars["String"] | null) | null;
        } | null | undefined;
    };
    /** Executes the writeToShopify global action. */
    writeToShopify: {
        (variables?: {
            shopId?: (Scalars["String"] | null) | null;
            mutation?: (Scalars["String"] | null) | null;
            variables?: (Scalars["JSONObject"] | null) | null;
        } | null): Promise<any>;
        type: "globalAction";
        operationName: "writeToShopify";
        operationReturnType: "WriteToShopify";
        namespace: null;
        typesImports: ["Scalars"];
        variables: {
            shopId: {
                required: false;
                type: "String";
            };
            mutation: {
                required: false;
                type: "String";
            };
            variables: {
                required: false;
                type: "JSONObject";
            };
        };
        variablesType: {
            shopId?: (Scalars["String"] | null) | null;
            mutation?: (Scalars["String"] | null) | null;
            variables?: (Scalars["JSONObject"] | null) | null;
        } | null | undefined;
    };
    /** Executes an inline computed view. */
    view: InlineViewFunction;
    session: SessionManager;
    currentSession: CurrentSessionManager;
    shopifyGdprRequest: ShopifyGdprRequestManager;
    shopifyProduct: ShopifyProductManager;
    shopifyShop: ShopifyShopManager;
    shopifySync: ShopifySyncManager;
    shopifyOrder: ShopifyOrderManager;
    shopifyCheckoutLineItem: ShopifyCheckoutLineItemManager;
    shopifyCheckout: ShopifyCheckoutManager;
    /**
    * Namespaced object for accessing models via the Gadget internal APIs, which provide lower level and higher privileged operations directly against the database. Useful for maintenance operations like migrations or correcting broken data, and for implementing the high level actions.
    *
    * Returns an object of model API identifiers to `InternalModelManager` objects.
    *
    * Example:
    * `api.internal.user.findOne(...)`
    */
    internal: InternalModelManagers;
    /**
     * The list of environments with a customized API root endpoint
     */
    apiRoots: Record<string, string>;
    applicationId: string;
    environment: string;
    constructor(options?: ClientOptions | undefined);
    /**
     * Returns a new Client instance that will call the Gadget API as the application's admin user.
     * This can only be used for API clients using internal authentication.
     * @returns {WooodClient} A new WooodClient instance with admin authentication
     */
    get actAsAdmin(): WooodClient;
    /**
     * Returns a new WooodClient instance that will call the Gadget API as with the permission of the current session.
     * This can only be used for API clients using internal authentication.
     * @returns {WooodClient} A new WooodClient instance with session authentication
     */
    get actAsSession(): WooodClient;
    /** Run an arbitrary GraphQL query. */
    query<T = any>(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>): Promise<T>;
    /** Run an arbitrary GraphQL mutation. */
    mutate<T = any>(graphQL: string | DocumentNode, variables?: Record<string, any>, options?: Partial<OperationContext>): Promise<T>;
    /** Start a transaction against the Gadget backend which will atomically commit (or rollback). */
    transaction: <T>(callback: (transaction: GadgetTransaction) => Promise<T>) => Promise<T>;
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
    fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    /**
    * Get a new direct upload token for file uploads to directly to cloud storage.
    * See https://docs.gadget.dev/guides/storing-files#direct-uploads-using-tokens for more information
    * @return { url: string, token: string } A `url` to upload one file to, and a token for that file to pass back to Gadget as an action input.
    */
    getDirectUploadToken: () => Promise<{
        url: string;
        token: string;
    }>;
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
    enqueue<SchemaT, Action extends AnyActionFunction & AllOptionalVariables<Action['variablesType']>>(action: Action, input?: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
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
    enqueue<SchemaT, Action extends AnyActionFunction & {
        variablesType: {
            id: string;
        };
    }>(action: Action, id: string, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
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
    enqueue<SchemaT, Action extends ActionFunctionMetadata<any, Record<string, never>, any, any, any, any> | GlobalActionFunction<Record<string, never>>>(action: Action, options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
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
    enqueue<SchemaT, Action extends ActionFunctionMetadata<any, any, any, any, any, true>>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>[]>;
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
    enqueue<SchemaT, Action extends AnyActionFunction>(action: Action, input: Action["variablesType"], options?: EnqueueBackgroundActionOptions<Action>): Promise<BackgroundActionHandle<SchemaT, Action>>;
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
    handle<SchemaT, Action extends AnyActionFunction>(action: Action, id: string): BackgroundActionHandle<SchemaT, Action>;
    toString(): string;
    toJSON(): string;
}
/** Legacy export under the `Client` name for backwards compatibility. */
export declare const Client: typeof WooodClient;
export type Client = InstanceType<typeof WooodClient>;
