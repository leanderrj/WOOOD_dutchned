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
  ShopifyCheckout,
  AvailableShopifyCheckoutSelection,
  ShopifyCheckoutSort,
  ShopifyCheckoutFilter
} from "../types.js";

import { buildModelManager } from "../builder.js";
import { AvailableSelection, AllFieldsSelected, DefaultSelection, Select, DeepFilterNever } from "../utils.js";

/**
* A type that holds only the selected fields (and nested fields) of shopifyCheckout. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyCheckoutOrDefault<Options extends Selectable<AvailableShopifyCheckoutSelection>> = DeepFilterNever<
    Select<
      ShopifyCheckout,
      DefaultSelection<
        AvailableShopifyCheckoutSelection,
        Options,
        typeof DefaultShopifyCheckoutSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for shopifyCheckout.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyCheckoutRecord, recordWithName: ShopifyCheckoutRecord<{ select: { name: true; } }>) => {
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
export type ShopifyCheckoutRecord<Selection extends AvailableShopifyCheckoutSelection | undefined = typeof DefaultShopifyCheckoutSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedShopifyCheckoutOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultShopifyCheckoutSelection = {
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
   } as const;
const modelApiIdentifier = "shopifyCheckout" as const;
const pluralModelApiIdentifier = "shopifyCheckouts" as const;
/** Options that can be passed to the `ShopifyCheckoutManager#findOne` method */
 export interface FindOneShopifyCheckoutOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyCheckoutManager#maybeFindOne` method */
 export interface MaybeFindOneShopifyCheckoutOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyCheckoutManager#findMany` method */
 export interface FindManyShopifyCheckoutsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyCheckoutSort | ShopifyCheckoutSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCheckoutFilter | ShopifyCheckoutFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `ShopifyCheckoutManager#findFirst` method */
 export interface FindFirstShopifyCheckoutOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyCheckoutSort | ShopifyCheckoutSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCheckoutFilter | ShopifyCheckoutFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `ShopifyCheckoutManager#maybeFindFirst` method */
 export interface MaybeFindFirstShopifyCheckoutOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyCheckoutSort | ShopifyCheckoutSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCheckoutFilter | ShopifyCheckoutFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateShopifyCheckoutOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutSelection;
};
export interface UpdateShopifyCheckoutOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutSelection;
};
export interface DeleteShopifyCheckoutOptions {

};

/**
 * A manager for the shopifyCheckout model with all the available operations for reading and writing to it.*/
export type ShopifyCheckoutManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one shopifyCheckout by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneShopifyCheckoutOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyCheckoutOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyCheckoutSelection;
      namespace: null;
      optionsType: FindOneShopifyCheckoutOptions;
      selectionType: AvailableShopifyCheckoutSelection;
      schemaType: Query["shopifyCheckout"];
    }
  maybeFindOne: {
      /**
       * Finds one shopifyCheckout by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneShopifyCheckoutOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyCheckoutOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneShopifyCheckoutOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyCheckoutSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutSelection;
      schemaType: Query["shopifyCheckout"];
    }
  findMany: {
      /**
       * Finds many shopifyCheckout. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyShopifyCheckoutsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyCheckoutsOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<ShopifyCheckoutRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyShopifyCheckoutsOptions;
      defaultSelection: typeof DefaultShopifyCheckoutSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutSelection;
      schemaType: Query["shopifyCheckout"];
    }
  findFirst: {
      /**
       * Finds the first matching shopifyCheckout. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstShopifyCheckoutOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyCheckoutOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstShopifyCheckoutOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCheckoutSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutSelection;
      schemaType: Query["shopifyCheckout"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching shopifyCheckout. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstShopifyCheckoutOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyCheckoutOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstShopifyCheckoutOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCheckoutSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutSelection;
      schemaType: Query["shopifyCheckout"];
    }
  findById: {
      /**
      * Finds one shopifyCheckout by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneShopifyCheckoutOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyCheckoutOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyCheckoutOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCheckoutSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutSelection;
      schemaType: Query["shopifyCheckout"];
    }
  maybeFindById: {
      /**
      * Finds one shopifyCheckout by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneShopifyCheckoutOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyCheckoutOptions>): Promise<ShopifyCheckoutRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyCheckoutOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCheckoutSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutSelection;
      schemaType: Query["shopifyCheckout"];
    }
  create: {
      /**
       * @deprecated The action create on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'createShopifyCheckout';
      errorMessage: 'The action create on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyCheckoutOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckout.create';
    }
  bulkCreate: {
      /**
       * @deprecated The action create on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkCreateShopifyCheckouts';
      errorMessage: 'The action create on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyCheckoutOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckout.bulkCreate';
    }
  update: {
      /**
       * @deprecated The action update on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'updateShopifyCheckout';
      errorMessage: 'The action update on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyCheckoutOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckout.update';
    }
  bulkUpdate: {
      /**
       * @deprecated The action update on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkUpdateShopifyCheckouts';
      errorMessage: 'The action update on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyCheckoutOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckout.bulkUpdate';
    }
  delete: {
      /**
       * @deprecated The action delete on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'deleteShopifyCheckout';
      errorMessage: 'The action delete on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyCheckoutOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckout.delete';
    }
  bulkDelete: {
      /**
       * @deprecated The action delete on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkDeleteShopifyCheckouts';
      errorMessage: 'The action delete on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyCheckoutOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckout.bulkDelete';
    }
  view: {
      (query: string, variables?: Record<string, unknown>): Promise<unknown>
      type: 'computedView';
      operationName: 'view';
      gqlFieldName: 'shopifyCheckoutGellyView';
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
 * A manager for the shopifyCheckout model with all the available operations for reading and writing to it.*/
export const ShopifyCheckoutManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyCheckoutSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutSelection,
      namespace: null
    },
    {
      type: 'stubbedAction',
      operationName: 'createShopifyCheckout',
      functionName: 'create',
      errorMessage: 'The action create on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckout.create'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkCreateShopifyCheckouts',
      functionName: 'bulkCreate',
      errorMessage: 'The action create on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckout.bulkCreate'
    },
    {
      type: 'stubbedAction',
      operationName: 'updateShopifyCheckout',
      functionName: 'update',
      errorMessage: 'The action update on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckout.update'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkUpdateShopifyCheckouts',
      functionName: 'bulkUpdate',
      errorMessage: 'The action update on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckout.bulkUpdate'
    },
    {
      type: 'stubbedAction',
      operationName: 'deleteShopifyCheckout',
      functionName: 'delete',
      errorMessage: 'The action delete on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckout.delete'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkDeleteShopifyCheckouts',
      functionName: 'bulkDelete',
      errorMessage: 'The action delete on model shopifyCheckout does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckout.bulkDelete'
    },
    {
      type: 'computedView',
      operationName: 'view',
      functionName: 'view',
      gqlFieldName: 'shopifyCheckoutGellyView',
      namespace: null,
      variables: {
        query: { type: 'String', required: true },
        args: { type: 'JSONObject' }
      }
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): ShopifyCheckoutManager;
};