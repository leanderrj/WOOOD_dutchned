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
  ShopifyCheckoutLineItem,
  AvailableShopifyCheckoutLineItemSelection,
  ShopifyCheckoutLineItemSort,
  ShopifyCheckoutLineItemFilter
} from "../types.js";

import { buildModelManager } from "../builder.js";
import { AvailableSelection, AllFieldsSelected, DefaultSelection, Select, DeepFilterNever } from "../utils.js";

/**
* A type that holds only the selected fields (and nested fields) of shopifyCheckoutLineItem. The present fields in the result type of this are dynamic based on the options to each call that uses it.
* The selected fields are sometimes given by the `Options` at `Options["select"]`, and if a selection isn't made in the options, we use the default selection from above.
*/
export type SelectedShopifyCheckoutLineItemOrDefault<Options extends Selectable<AvailableShopifyCheckoutLineItemSelection>> = DeepFilterNever<
    Select<
      ShopifyCheckoutLineItem,
      DefaultSelection<
        AvailableShopifyCheckoutLineItemSelection,
        Options,
        typeof DefaultShopifyCheckoutLineItemSelection
      >
    >
  >;

/**
 * A type that represents a `GadgetRecord` type for shopifyCheckoutLineItem.
 * It selects all fields of the model by default. If you want to represent a record type with a subset of fields, you could pass in an object in the `Selection` type parameter.
 *
 * @example
 * ```ts
 * const someFunction = (record: ShopifyCheckoutLineItemRecord, recordWithName: ShopifyCheckoutLineItemRecord<{ select: { name: true; } }>) => {
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
export type ShopifyCheckoutLineItemRecord<Selection extends AvailableShopifyCheckoutLineItemSelection | undefined = typeof DefaultShopifyCheckoutLineItemSelection> = DeepFilterNever<
  GadgetRecord<
    SelectedShopifyCheckoutLineItemOrDefault<{
      select: Selection;
    }>
  >
>;

export const DefaultShopifyCheckoutLineItemSelection = {
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
   } as const;
const modelApiIdentifier = "shopifyCheckoutLineItem" as const;
const pluralModelApiIdentifier = "shopifyCheckoutLineItems" as const;
/** Options that can be passed to the `ShopifyCheckoutLineItemManager#findOne` method */
 export interface FindOneShopifyCheckoutLineItemOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutLineItemSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyCheckoutLineItemManager#maybeFindOne` method */
 export interface MaybeFindOneShopifyCheckoutLineItemOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutLineItemSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
};
/** Options that can be passed to the `ShopifyCheckoutLineItemManager#findMany` method */
 export interface FindManyShopifyCheckoutLineItemsOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutLineItemSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyCheckoutLineItemSort | ShopifyCheckoutLineItemSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCheckoutLineItemFilter | ShopifyCheckoutLineItemFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
};
/** Options that can be passed to the `ShopifyCheckoutLineItemManager#findFirst` method */
 export interface FindFirstShopifyCheckoutLineItemOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutLineItemSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyCheckoutLineItemSort | ShopifyCheckoutLineItemSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCheckoutLineItemFilter | ShopifyCheckoutLineItemFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
/** Options that can be passed to the `ShopifyCheckoutLineItemManager#maybeFindFirst` method */
 export interface MaybeFindFirstShopifyCheckoutLineItemOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutLineItemSelection;
  /** Run a realtime query instead of running the query only once. Returns an AsyncIterator of new results when the result changes on the backend. */
  live?: boolean;
  /** Return records sorted by these sorts */
  sort?: ShopifyCheckoutLineItemSort | ShopifyCheckoutLineItemSort[] | null;
  /** Only return records matching these filters. */
  filter?: ShopifyCheckoutLineItemFilter | ShopifyCheckoutLineItemFilter[] | null;
  /** Only return records matching this freeform search string */
  search?: string | null;
};
export interface CreateShopifyCheckoutLineItemOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutLineItemSelection;
};
export interface UpdateShopifyCheckoutLineItemOptions {
  /** Select fields other than the defaults of the record to return */
  select?: AvailableShopifyCheckoutLineItemSelection;
};
export interface DeleteShopifyCheckoutLineItemOptions {

};

/**
 * A manager for the shopifyCheckoutLineItem model with all the available operations for reading and writing to it.*/
export type ShopifyCheckoutLineItemManager = {
  readonly connection: GadgetConnection;

  findOne: {
      /**
       * Finds one shopifyCheckoutLineItem by ID. Returns a `Promise` that resolves to the record if found and rejects the promise if the record isn't found.
       **/
      <Options extends FindOneShopifyCheckoutLineItemOptions>(id: string, options?: LimitToKnownKeys<Options, FindOneShopifyCheckoutLineItemOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutLineItemRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyCheckoutLineItemSelection;
      namespace: null;
      optionsType: FindOneShopifyCheckoutLineItemOptions;
      selectionType: AvailableShopifyCheckoutLineItemSelection;
      schemaType: Query["shopifyCheckoutLineItem"];
    }
  maybeFindOne: {
      /**
       * Finds one shopifyCheckoutLineItem by ID. Returns a `Promise` that resolves to the record if found and returns null otherwise.
       **/
      <Options extends MaybeFindOneShopifyCheckoutLineItemOptions>(id: string, options?: LimitToKnownKeys<Options, MaybeFindOneShopifyCheckoutLineItemOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutLineItemRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof modelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: MaybeFindOneShopifyCheckoutLineItemOptions;
      findByVariableName: 'id';
      defaultSelection: typeof DefaultShopifyCheckoutLineItemSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutLineItemSelection;
      schemaType: Query["shopifyCheckoutLineItem"];
    }
  findMany: {
      /**
       * Finds many shopifyCheckoutLineItem. Returns a `Promise` for a `GadgetRecordList` of objects according to the passed `options`. Optionally filters the returned records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindManyShopifyCheckoutLineItemsOptions>(options?: LimitToKnownKeys<Options, FindManyShopifyCheckoutLineItemsOptions>): PromiseOrLiveIterator<Options,GadgetRecordList<ShopifyCheckoutLineItemRecord<Options["select"]>>>;
      type: 'findMany';
      operationName: typeof pluralModelApiIdentifier;
      modelApiIdentifier: typeof modelApiIdentifier;
      optionsType: FindManyShopifyCheckoutLineItemsOptions;
      defaultSelection: typeof DefaultShopifyCheckoutLineItemSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutLineItemSelection;
      schemaType: Query["shopifyCheckoutLineItem"];
    }
  findFirst: {
      /**
       * Finds the first matching shopifyCheckoutLineItem. Returns a `Promise` that resolves to a record if found and rejects the promise if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` and `first`/`after` pagination options.
       **/
      <Options extends FindFirstShopifyCheckoutLineItemOptions>(options?: LimitToKnownKeys<Options, FindFirstShopifyCheckoutLineItemOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutLineItemRecord<Options["select"]>>;
      type: 'findFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: FindFirstShopifyCheckoutLineItemOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCheckoutLineItemSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutLineItemSelection;
      schemaType: Query["shopifyCheckoutLineItem"];
    }
  maybeFindFirst: {
      /**
       * Finds the first matching shopifyCheckoutLineItem. Returns a `Promise` that resolves to a record if found, or null if a record isn't found, according to the passed `options`. Optionally filters the searched records using `filter` option, sorts records using the `sort` option, searches using the `search` options, and paginates using the `last`/`before` pagination options.
       **/
      <Options extends MaybeFindFirstShopifyCheckoutLineItemOptions>(options?: LimitToKnownKeys<Options, MaybeFindFirstShopifyCheckoutLineItemOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutLineItemRecord<Options["select"]> | null>;
      type: 'maybeFindFirst';
      operationName: typeof pluralModelApiIdentifier;
      optionsType: MaybeFindFirstShopifyCheckoutLineItemOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCheckoutLineItemSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutLineItemSelection;
      schemaType: Query["shopifyCheckoutLineItem"];
    }
  findById: {
      /**
      * Finds one shopifyCheckoutLineItem by its id. Returns a Promise that resolves to the record if found and rejects the promise if the record isn't found.
      **/
      <Options extends FindOneShopifyCheckoutLineItemOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyCheckoutLineItemOptions>): PromiseOrLiveIterator<Options,ShopifyCheckoutLineItemRecord<Options["select"]>>;
      type: 'findOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyCheckoutLineItemOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCheckoutLineItemSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutLineItemSelection;
      schemaType: Query["shopifyCheckoutLineItem"];
    }
  maybeFindById: {
      /**
      * Finds one shopifyCheckoutLineItem by its id. Returns a Promise that resolves to the record if found and returns null if the record isn't found.
      **/
      <Options extends FindOneShopifyCheckoutLineItemOptions>(value: string, options?: LimitToKnownKeys<Options, FindOneShopifyCheckoutLineItemOptions>): Promise<ShopifyCheckoutLineItemRecord<Options["select"]> | null>;
      type: 'maybeFindOne';
      operationName: typeof pluralModelApiIdentifier;
      findByField: 'id';
      findByVariableName: 'id';
      optionsType: FindOneShopifyCheckoutLineItemOptions;
      modelApiIdentifier: typeof modelApiIdentifier;
      defaultSelection: typeof DefaultShopifyCheckoutLineItemSelection;
      namespace: null;
      selectionType: AvailableShopifyCheckoutLineItemSelection;
      schemaType: Query["shopifyCheckoutLineItem"];
    }
  create: {
      /**
       * @deprecated The action create on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'createShopifyCheckoutLineItem';
      errorMessage: 'The action create on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyCheckoutLineItemOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckoutLineItem.create';
    }
  bulkCreate: {
      /**
       * @deprecated The action create on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkCreateShopifyCheckoutLineItems';
      errorMessage: 'The action create on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: CreateShopifyCheckoutLineItemOptions;
      actionApiIdentifier: 'create';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckoutLineItem.bulkCreate';
    }
  update: {
      /**
       * @deprecated The action update on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'updateShopifyCheckoutLineItem';
      errorMessage: 'The action update on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyCheckoutLineItemOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckoutLineItem.update';
    }
  bulkUpdate: {
      /**
       * @deprecated The action update on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkUpdateShopifyCheckoutLineItems';
      errorMessage: 'The action update on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: UpdateShopifyCheckoutLineItemOptions;
      actionApiIdentifier: 'update';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckoutLineItem.bulkUpdate';
    }
  delete: {
      /**
       * @deprecated The action delete on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'deleteShopifyCheckoutLineItem';
      errorMessage: 'The action delete on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyCheckoutLineItemOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckoutLineItem.delete';
    }
  bulkDelete: {
      /**
       * @deprecated The action delete on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers
       */
      (...args: any[]): never;
      type: 'stubbedAction';
      operationName: 'bulkDeleteShopifyCheckoutLineItems';
      errorMessage: 'The action delete on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers';
      optionsType: DeleteShopifyCheckoutLineItemOptions;
      actionApiIdentifier: 'delete';
      modelApiIdentifier: typeof modelApiIdentifier;
      schemaType: null;
      selectionType: Record<string, never>;
      variables: {};
      reason: 'MissingApiTrigger';
      dataPath: 'shopifyCheckoutLineItem.bulkDelete';
    }
  view: {
      (query: string, variables?: Record<string, unknown>): Promise<unknown>
      type: 'computedView';
      operationName: 'view';
      gqlFieldName: 'shopifyCheckoutLineItemGellyView';
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
 * A manager for the shopifyCheckoutLineItem model with all the available operations for reading and writing to it.*/
export const ShopifyCheckoutLineItemManager = buildModelManager(
  modelApiIdentifier,
  pluralModelApiIdentifier,
  DefaultShopifyCheckoutLineItemSelection,
  [
    {
      type: 'findOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: modelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      findByVariableName: 'id',
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: 'findMany',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: 'findFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: 'maybeFindFirst',
      operationName: pluralModelApiIdentifier,
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: 'findOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'findById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: 'maybeFindOne',
      operationName: pluralModelApiIdentifier,
      functionName: 'maybeFindById',
      findByField: 'id',
      findByVariableName: 'id',
      modelApiIdentifier: modelApiIdentifier,
      defaultSelection: DefaultShopifyCheckoutLineItemSelection,
      namespace: null
    },
    {
      type: 'stubbedAction',
      operationName: 'createShopifyCheckoutLineItem',
      functionName: 'create',
      errorMessage: 'The action create on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckoutLineItem.create'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkCreateShopifyCheckoutLineItems',
      functionName: 'bulkCreate',
      errorMessage: 'The action create on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'create',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckoutLineItem.bulkCreate'
    },
    {
      type: 'stubbedAction',
      operationName: 'updateShopifyCheckoutLineItem',
      functionName: 'update',
      errorMessage: 'The action update on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckoutLineItem.update'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkUpdateShopifyCheckoutLineItems',
      functionName: 'bulkUpdate',
      errorMessage: 'The action update on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'update',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckoutLineItem.bulkUpdate'
    },
    {
      type: 'stubbedAction',
      operationName: 'deleteShopifyCheckoutLineItem',
      functionName: 'delete',
      errorMessage: 'The action delete on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckoutLineItem.delete'
    },
    {
      type: 'stubbedAction',
      operationName: 'bulkDeleteShopifyCheckoutLineItems',
      functionName: 'bulkDelete',
      errorMessage: 'The action delete on model shopifyCheckoutLineItem does not have an api trigger and cannot be called from this api client. If you are the developer of this application and want api clients to call this action add an api trigger to the action. For more information see: https://docs.gadget.dev/guides/actions/triggers',
      actionApiIdentifier: 'delete',
      modelApiIdentifier: modelApiIdentifier,
      variables: {},
      reason: 'MissingApiTrigger',
      dataPath: 'shopifyCheckoutLineItem.bulkDelete'
    },
    {
      type: 'computedView',
      operationName: 'view',
      functionName: 'view',
      gqlFieldName: 'shopifyCheckoutLineItemGellyView',
      namespace: null,
      variables: {
        query: { type: 'String', required: true },
        args: { type: 'JSONObject' }
      }
    }
  ] as const
) as unknown as {
  // Gadget generates these model manager classes at runtime dynamically, which means there is no source code for the class. This is done to make the bundle size of the client as small as possible, avoiding a bunch of repeated source code in favour of one small builder function. The TypeScript types above document the exact interface of the constructed class.
  new(connection: GadgetConnection): ShopifyCheckoutLineItemManager;
};