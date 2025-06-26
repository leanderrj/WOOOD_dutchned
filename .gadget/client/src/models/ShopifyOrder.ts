import {
  GadgetConnection,
  GadgetRecord,
  GadgetRecordImplementation,
  GadgetRecordList,
  GadgetNonUniqueDataError,
  actionRunner,
  findManyRunner,
  findOneRunner,
  findOneByFieldRunner,
  FieldSelection,
  LimitToKnownKeys,
  Selectable
} from "@gadgetinc/api-client-core";

import {
  Query,
  ExplicitNestingRequired,

  IDsList,
  PromiseOrLiveIterator,
  ShopifyOrder,
  AvailableShopifyOrderSelection,
  ShopifyOrderSort,
  ShopifyOrderFilter
} from "../types.js";

import { buildModelManager } from "../builder.js";
import { AvailableSelection, AllFieldsSelected, DefaultSelection, Select, DeepFilterNever } from "../utils.js";

/**
* A type that holds only the selected fields (and nested fields) of shopifyOrder. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyOrderOrDefault<Options extends Selectable<AvailableShopifyOrderSelection>> = DeepFilterNever<
    Select<
      ShopifyOrder,
      DefaultSelection<
        AvailableShopifyOrderSelection,
        Options,
        typeof DefaultShopifyOrderSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for shopifyOrder.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyOrderRecord, recordWithName: ShopifyOrderRecord<{ select: { name: true; } }>) => {
 *   // The type of the `record` variable will include all fields of the model.
 *   const name = record.name;
 *   const otherField = record.otherField;
 *
 *   // The type of the `recordWithName` variable will only include the selected fields.
 *   const name = recordWithName.name;
 *   const otherField = recordWithName.otherField; // Type error: Property 'otherField' does not exist on type 'GadgetRecord<{ name: true; }>'.
 * }
 * ```
 */
export type ShopifyOrderRecord<Selection extends AvailableShopifyOrderSelection | undefined = typeof DefaultShopifyOrderSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedShopifyOrderOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultShopifyOrderSelection = {
     __typename: true,
     id: true,
     additionalFees: true,
     alerts: true,
     billingAddress: true,
     billingStatusMatchesShippingAddress: true,
     browserIp: true,
     buyerAcceptsMarketing: true,
     canMarkAsPaid: true,
     canNotifyCustomer: true,
     cancelReason: true,
     cancellation: true,
     cancelledAt: true,
     capturable: true,
     cartDiscountAmountSet: true,
     cartToken: true,
     checkoutToken: true,
     clientDetails: true,
     closed: true,
     closedAt: true,
     confirmationNumber: true,
     confirmed: true,
     createdAt: true,
     currency: true,
     currentCartDiscountAmountSet: true,
     currentShippingPriceSet: true,
     currentSubtotalLineItemsQuantity: true,
     currentSubtotalPrice: true,
     currentSubtotalPriceSet: true,
     currentTotalAdditionalFeesSet: true,
     currentTotalDiscounts: true,
     currentTotalDiscountsSet: true,
     currentTotalDutiesSet: true,
     currentTotalPrice: true,
     currentTotalPriceSet: true,
     currentTotalTax: true,
     currentTotalTaxSet: true,
     currentTotalWeight: true,
     customerLocale: true,
     discountApplications: true,
     discountCodes: true,
     dutiesIncluded: true,
     edited: true,
     email: true,
     estimatedTaxes: true,
     financialStatus: true,
     fulfillable: true,
     fulfillmentStatus: true,
     fulfillmentsCount: true,
     fullyPaid: true,
     hasTimelineComment: true,
     landingSite: true,
     legacyResourceId: true,
     merchantEditable: true,
     merchantEditableErrors: true,
     merchantOfRecordAppId: true,
     name: true,
     netPaymentSet: true,
     note: true,
     noteAttributes: true,
     orderStatusUrl: true,
     originalTotalAdditionalFeesSet: true,
     originalTotalDutiesSet: true,
     originalTotalPriceSet: true,
     paymentGatewayNames: true,
     phone: true,
     poNumber: true,
     presentmentCurrency: true,
     processedAt: true,
     processingMethod: true,
     referringSite: true,
     refundDiscrepencySet: true,
     refundable: true,
     requiresShipping: true,
     restockable: true,
     returnStatus: true,
     risk: true,
     shippingAddress: true,
     shopId: true,
     shopifyCreatedAt: true,
     shopifyProtect: true,
     shopifyUpdatedAt: true,
     sourceIdentifier: true,
     sourceName: true,
     sourceUrl: true,
     subtotalPrice: true,
     subtotalPriceSet: true,
     tags: true,
     taxExempt: true,
     taxLines: true,
     taxesIncluded: true,
     test: true,
     token: true,
     totalCapturableSet: true,
     totalCashRoundingAdjustment: true,
     totalDiscounts: true,
     totalDiscountsSet: true,
     totalLineItemsPrice: true,
     totalLineItemsPriceSet: true,
     totalOutstanding: true,
     totalOutstandingSet: true,
     totalPrice: true,
     totalPriceSet: true,
     totalReceivedSet: true,
     totalRefundedSet: true,
     totalRefundedShippingSet: true,
     totalShippingPriceSet: true,
     totalTax: true,
     totalTaxSet: true,
     totalTipReceived: true,
     totalTipReceivedSet: true,
     totalWeight: true,
     transactionsCount: true,
     unpaid: true,
     updatedAt: true
   } as const;
const modelApiIdentifier = "shopifyOrder" as const;
const pluralModelApiIdentifier = "shopifyOrders" as const;
/** Options that can be passed to the `ShopifyOrderManager#findOne` method */
 export interface FindOneShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyOrderManager#maybeFindOne` method */
 export interface MaybeFindOneShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyOrderManager#findMany` method */
 export interface FindManyShopifyOrdersOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyOrderSort | ShopifyOrderSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyOrderFilter | ShopifyOrderFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `ShopifyOrderManager#findFirst` method */
 export interface FindFirstShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyOrderSort | ShopifyOrderSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyOrderFilter | ShopifyOrderFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `ShopifyOrderManager#maybeFindFirst` method */
 export interface MaybeFindFirstShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyOrderSort | ShopifyOrderSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyOrderFilter | ShopifyOrderFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
};
export interface UpdateShopifyOrderOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyOrderSelection;
};
export interface DeleteShopifyOrderOptions {

};

/**
 * A manager for the shopifyOrder model with all the available operations for reading and writing to it.*/
export type ShopifyOrderManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one shopifyOrder by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneShopifyOrderOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      optionsType: FindOneShopifyOrderOptions;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  maybeFindOne: {
      /**
       * Finds one shopifyOrder by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneShopifyOrderOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneShopifyOrderOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  findMany: {
      /**
       * Finds many shopifyOrder. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyShopifyOrdersOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyOrdersOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<ShopifyOrderRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyShopifyOrdersOptions;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  findFirst: {
      /**
       * Finds the first matching shopifyOrder. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstShopifyOrderOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstShopifyOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching shopifyOrder. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstShopifyOrderOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstShopifyOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  findById: {
      /**
      * Finds one shopifyOrder by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneShopifyOrderOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyOrderOptions>): PromiseOrLiveIterator<Options,ShopifyOrderRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  maybeFindById: {
      /**
      * Finds one shopifyOrder by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneShopifyOrderOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyOrderOptions>): Promise<ShopifyOrderRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyOrderOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyOrderSelection;
      namespace: null;
      selectionType: AvailableShopifyOrderSelection;
      schemaType: Query["shopifyOrder"];
    }
  create: {
      /**
       * @deprecated The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'createShopifyOrder';
      errorMessage: 'The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyOrderOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.create';
    }
  bulkCreate: {
      /**
       * @deprecated The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkCreateShopifyOrders';
      errorMessage: 'The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyOrderOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.bulkCreate';
    }
  update: {
      /**
       * @deprecated The action update on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'updateShopifyOrder';
      errorMessage: 'The action update on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyOrderOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.update';
    }
  bulkUpdate: {
      /**
       * @deprecated The action update on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkUpdateShopifyOrders';
      errorMessage: 'The action update on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyOrderOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.bulkUpdate';
    }
  delete: {
      /**
       * @deprecated The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'deleteShopifyOrder';
      errorMessage: 'The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyOrderOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.delete';
    }
  bulkDelete: {
      /**
       * @deprecated The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkDeleteShopifyOrders';
      errorMessage: 'The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyOrderOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyOrder.bulkDelete';
    }
  view: {
      (query: string, variables?: Record<string, unknown>): Promise<unknown>
      type: 'computedView';
      operationName: 'view';
      gqlFieldName: 'shopifyOrderGellyView';
      namespace: null;
      imports: [];
      variables: {
          query: { type: 'String', required: true },
          args: { type: 'JSONObject' }
        };
      variablesType: Record<string, unknown>;
      resultType: Promise<unknown>;
      plan: never;
    }
};

/**
 * A manager for the shopifyOrder model with all the available operations for reading and writing to it.*/
export const ShopifyOrderManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyOrderSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyOrderSelection,
      namespace: null
    },
    {
      type: 'stubbedAction',
      operationName: 'createShopifyOrder',
      functionName: 'create',
      errorMessage: 'The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.create'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkCreateShopifyOrders',
      functionName: 'bulkCreate',
      errorMessage: 'The action create on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.bulkCreate'
    },
    {
      type: 'stubbedAction',
      operationName: 'updateShopifyOrder',
      functionName: 'update',
      errorMessage: 'The action update on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.update'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkUpdateShopifyOrders',
      functionName: 'bulkUpdate',
      errorMessage: 'The action update on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.bulkUpdate'
    },
    {
      type: 'stubbedAction',
      operationName: 'deleteShopifyOrder',
      functionName: 'delete',
      errorMessage: 'The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.delete'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkDeleteShopifyOrders',
      functionName: 'bulkDelete',
      errorMessage: 'The action delete on model shopifyOrder does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyOrder.bulkDelete'
    },
    {
      type: 'computedView',
      operationName: 'view',
      functionName: 'view',
      gqlFieldName: 'shopifyOrderGellyView',
      namespace: null,
      variables: {
        query: { type: 'String', required: true },
        args: { type: 'JSONObject' }
      }
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): ShopifyOrderManager;
};