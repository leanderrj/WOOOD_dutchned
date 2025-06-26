// All the generated types for the "shopifyOrder" model preconditions, actions, params, etc
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/woood";
import { GadgetRecord, ShopifyOrder } from "@gadget-client/woood";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";

export type DefaultShopifyOrderServerSelection = {
  readonly __typename: true;
      readonly id: true;
      readonly createdAt: true;
      readonly updatedAt: true;
      readonly additionalFees: true;
      readonly fulfillmentsCount: true;
      readonly cancellation: true;
      readonly risk: true;
      readonly shopifyProtect: true;
      readonly totalCashRoundingAdjustment: true;
      readonly transactionsCount: true;
      readonly alerts: true;
      readonly billingStatusMatchesShippingAddress: true;
      readonly billingAddress: true;
      readonly browserIp: true;
      readonly buyerAcceptsMarketing: true;
      readonly canMarkAsPaid: true;
      readonly canNotifyCustomer: true;
      readonly cancelReason: true;
      readonly cancelledAt: true;
      readonly capturable: true;
      readonly cartDiscountAmountSet: true;
      readonly cartToken: true;
      readonly checkoutToken: true;
      readonly clientDetails: true;
      readonly closed: true;
      readonly closedAt: true;
      readonly confirmationNumber: true;
      readonly confirmed: true;
      readonly shopifyCreatedAt: true;
      readonly currency: true;
      readonly currentCartDiscountAmountSet: true;
      readonly currentSubtotalLineItemsQuantity: true;
      readonly currentTotalWeight: true;
      readonly currentShippingPriceSet: true;
      readonly currentSubtotalPrice: true;
      readonly currentSubtotalPriceSet: true;
      readonly currentTotalAdditionalFeesSet: true;
      readonly currentTotalDiscounts: true;
      readonly currentTotalDiscountsSet: true;
      readonly currentTotalDutiesSet: true;
      readonly currentTotalPrice: true;
      readonly currentTotalPriceSet: true;
      readonly currentTotalTax: true;
      readonly currentTotalTaxSet: true;
      readonly customerLocale: true;
      readonly discountApplications: true;
      readonly discountCodes: true;
      readonly dutiesIncluded: true;
      readonly edited: true;
      readonly email: true;
      readonly estimatedTaxes: true;
      readonly financialStatus: true;
      readonly fulfillable: true;
      readonly fulfillmentStatus: true;
      readonly fullyPaid: true;
      readonly hasTimelineComment: true;
      readonly landingSite: true;
      readonly legacyResourceId: true;
      readonly merchantEditable: true;
      readonly merchantEditableErrors: true;
      readonly merchantOfRecordAppId: true;
      readonly name: true;
      readonly netPaymentSet: true;
      readonly note: true;
      readonly noteAttributes: true;
      readonly orderStatusUrl: true;
      readonly originalTotalPriceSet: true;
      readonly originalTotalAdditionalFeesSet: true;
      readonly originalTotalDutiesSet: true;
      readonly paymentGatewayNames: true;
      readonly phone: true;
      readonly poNumber: true;
      readonly presentmentCurrency: true;
      readonly processedAt: true;
      readonly processingMethod: true;
      readonly referringSite: true;
      readonly refundDiscrepencySet: true;
      readonly refundable: true;
      readonly requiresShipping: true;
      readonly restockable: true;
      readonly returnStatus: true;
      readonly shippingAddress: true;
      readonly sourceIdentifier: true;
      readonly sourceName: true;
      readonly sourceUrl: true;
      readonly subtotalPrice: true;
      readonly subtotalPriceSet: true;
      readonly tags: true;
      readonly taxExempt: true;
      readonly taxLines: true;
      readonly taxesIncluded: true;
      readonly test: true;
      readonly token: true;
      readonly totalCapturableSet: true;
      readonly totalOutstandingSet: true;
      readonly totalReceivedSet: true;
      readonly totalRefundedSet: true;
      readonly totalRefundedShippingSet: true;
      readonly totalTipReceivedSet: true;
      readonly totalDiscounts: true;
      readonly totalDiscountsSet: true;
      readonly totalLineItemsPrice: true;
      readonly totalLineItemsPriceSet: true;
      readonly totalOutstanding: true;
      readonly totalPrice: true;
      readonly totalPriceSet: true;
      readonly totalShippingPriceSet: true;
      readonly totalTax: true;
      readonly totalTaxSet: true;
      readonly totalTipReceived: true;
      readonly totalWeight: true;
      readonly unpaid: true;
      readonly shopifyUpdatedAt: true;
      readonly shopId: true;
    readonly shop: false;
      readonly checkouts: false;
  };

  
/** Context of the `create` action on the `shopifyOrder` model. */
export interface CreateShopifyOrderActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyOrder` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyOrder, DefaultShopifyOrderServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ShopifyWebhookTriggerForTopic<"orders/create"> | ShopifyWebhookTriggerForTopic<"orders/updated"> | ShopifyWebhookTriggerForTopic<"orders/risk_assessment_changed"> | TriggerWithType<"shopify_sync">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
shopifyOrder?: { id?: string;additionalFees?: Scalars["JSON"];fulfillmentsCount?: Scalars["JSON"];cancellation?: Scalars["JSON"];risk?: Scalars["JSON"];shopifyProtect?: Scalars["JSON"];totalCashRoundingAdjustment?: Scalars["JSON"];transactionsCount?: Scalars["JSON"];alerts?: Scalars["JSON"];billingStatusMatchesShippingAddress?: boolean;billingAddress?: Scalars["JSON"];browserIp?: string;buyerAcceptsMarketing?: boolean;canMarkAsPaid?: boolean;canNotifyCustomer?: boolean;cancelReason?: string;cancelledAt?: Date;capturable?: boolean;cartDiscountAmountSet?: Scalars["JSON"];cartToken?: string;checkoutToken?: string;clientDetails?: Scalars["JSON"];closed?: boolean;closedAt?: Date;confirmationNumber?: string;confirmed?: boolean;shopifyCreatedAt?: Date;currency?: string;currentCartDiscountAmountSet?: Scalars["JSON"];currentSubtotalLineItemsQuantity?: number;currentTotalWeight?: string;currentShippingPriceSet?: Scalars["JSON"];currentSubtotalPrice?: string;currentSubtotalPriceSet?: Scalars["JSON"];currentTotalAdditionalFeesSet?: Scalars["JSON"];currentTotalDiscounts?: string;currentTotalDiscountsSet?: Scalars["JSON"];currentTotalDutiesSet?: Scalars["JSON"];currentTotalPrice?: string;currentTotalPriceSet?: Scalars["JSON"];currentTotalTax?: string;currentTotalTaxSet?: Scalars["JSON"];customerLocale?: string;discountApplications?: Scalars["JSON"];discountCodes?: Scalars["JSON"];dutiesIncluded?: boolean;edited?: boolean;email?: string;estimatedTaxes?: boolean;financialStatus?: string;fulfillable?: boolean;fulfillmentStatus?: string;fullyPaid?: boolean;hasTimelineComment?: boolean;landingSite?: string;legacyResourceId?: string;merchantEditable?: boolean;merchantEditableErrors?: Scalars["JSON"];merchantOfRecordAppId?: number;name?: string;netPaymentSet?: Scalars["JSON"];note?: string;noteAttributes?: Scalars["JSON"];orderStatusUrl?: string;originalTotalPriceSet?: Scalars["JSON"];originalTotalAdditionalFeesSet?: Scalars["JSON"];originalTotalDutiesSet?: Scalars["JSON"];paymentGatewayNames?: Scalars["JSON"];phone?: string;poNumber?: string;presentmentCurrency?: string;processedAt?: Date;processingMethod?: string;referringSite?: string;refundDiscrepencySet?: Scalars["JSON"];refundable?: boolean;requiresShipping?: boolean;restockable?: boolean;returnStatus?: string;shippingAddress?: Scalars["JSON"];sourceIdentifier?: string;sourceName?: string;sourceUrl?: string;subtotalPrice?: string;subtotalPriceSet?: Scalars["JSON"];tags?: Scalars["JSON"];taxExempt?: boolean;taxLines?: Scalars["JSON"];taxesIncluded?: boolean;test?: boolean;token?: string;totalCapturableSet?: Scalars["JSON"];totalOutstandingSet?: Scalars["JSON"];totalReceivedSet?: Scalars["JSON"];totalRefundedSet?: Scalars["JSON"];totalRefundedShippingSet?: Scalars["JSON"];totalTipReceivedSet?: Scalars["JSON"];totalDiscounts?: string;totalDiscountsSet?: Scalars["JSON"];totalLineItemsPrice?: string;totalLineItemsPriceSet?: Scalars["JSON"];totalOutstanding?: string;totalPrice?: string;totalPriceSet?: Scalars["JSON"];totalShippingPriceSet?: Scalars["JSON"];totalTax?: string;totalTaxSet?: Scalars["JSON"];totalTipReceived?: string;totalWeight?: number;unpaid?: boolean;shopifyUpdatedAt?: Date;shop?: { _link: string | null }; };
};
  /**
  * @private The context of this action.
  */
  context: CreateShopifyOrderActionContext;
};


    
/** Context of the `update` action on the `shopifyOrder` model. */
export interface UpdateShopifyOrderActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyOrder` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyOrder, DefaultShopifyOrderServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ShopifyWebhookTriggerForTopic<"orders/updated"> | ShopifyWebhookTriggerForTopic<"orders/risk_assessment_changed"> | TriggerWithType<"shopify_sync">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
shopifyOrder?: { id?: string;additionalFees?: Scalars["JSON"];fulfillmentsCount?: Scalars["JSON"];cancellation?: Scalars["JSON"];risk?: Scalars["JSON"];shopifyProtect?: Scalars["JSON"];totalCashRoundingAdjustment?: Scalars["JSON"];transactionsCount?: Scalars["JSON"];alerts?: Scalars["JSON"];billingStatusMatchesShippingAddress?: boolean;billingAddress?: Scalars["JSON"];browserIp?: string;buyerAcceptsMarketing?: boolean;canMarkAsPaid?: boolean;canNotifyCustomer?: boolean;cancelReason?: string;cancelledAt?: Date;capturable?: boolean;cartDiscountAmountSet?: Scalars["JSON"];cartToken?: string;checkoutToken?: string;clientDetails?: Scalars["JSON"];closed?: boolean;closedAt?: Date;confirmationNumber?: string;confirmed?: boolean;shopifyCreatedAt?: Date;currency?: string;currentCartDiscountAmountSet?: Scalars["JSON"];currentSubtotalLineItemsQuantity?: number;currentTotalWeight?: string;currentShippingPriceSet?: Scalars["JSON"];currentSubtotalPrice?: string;currentSubtotalPriceSet?: Scalars["JSON"];currentTotalAdditionalFeesSet?: Scalars["JSON"];currentTotalDiscounts?: string;currentTotalDiscountsSet?: Scalars["JSON"];currentTotalDutiesSet?: Scalars["JSON"];currentTotalPrice?: string;currentTotalPriceSet?: Scalars["JSON"];currentTotalTax?: string;currentTotalTaxSet?: Scalars["JSON"];customerLocale?: string;discountApplications?: Scalars["JSON"];discountCodes?: Scalars["JSON"];dutiesIncluded?: boolean;edited?: boolean;email?: string;estimatedTaxes?: boolean;financialStatus?: string;fulfillable?: boolean;fulfillmentStatus?: string;fullyPaid?: boolean;hasTimelineComment?: boolean;landingSite?: string;legacyResourceId?: string;merchantEditable?: boolean;merchantEditableErrors?: Scalars["JSON"];merchantOfRecordAppId?: number;name?: string;netPaymentSet?: Scalars["JSON"];note?: string;noteAttributes?: Scalars["JSON"];orderStatusUrl?: string;originalTotalPriceSet?: Scalars["JSON"];originalTotalAdditionalFeesSet?: Scalars["JSON"];originalTotalDutiesSet?: Scalars["JSON"];paymentGatewayNames?: Scalars["JSON"];phone?: string;poNumber?: string;presentmentCurrency?: string;processedAt?: Date;processingMethod?: string;referringSite?: string;refundDiscrepencySet?: Scalars["JSON"];refundable?: boolean;requiresShipping?: boolean;restockable?: boolean;returnStatus?: string;shippingAddress?: Scalars["JSON"];sourceIdentifier?: string;sourceName?: string;sourceUrl?: string;subtotalPrice?: string;subtotalPriceSet?: Scalars["JSON"];tags?: Scalars["JSON"];taxExempt?: boolean;taxLines?: Scalars["JSON"];taxesIncluded?: boolean;test?: boolean;token?: string;totalCapturableSet?: Scalars["JSON"];totalOutstandingSet?: Scalars["JSON"];totalReceivedSet?: Scalars["JSON"];totalRefundedSet?: Scalars["JSON"];totalRefundedShippingSet?: Scalars["JSON"];totalTipReceivedSet?: Scalars["JSON"];totalDiscounts?: string;totalDiscountsSet?: Scalars["JSON"];totalLineItemsPrice?: string;totalLineItemsPriceSet?: Scalars["JSON"];totalOutstanding?: string;totalPrice?: string;totalPriceSet?: Scalars["JSON"];totalShippingPriceSet?: Scalars["JSON"];totalTax?: string;totalTaxSet?: Scalars["JSON"];totalTipReceived?: string;totalWeight?: number;unpaid?: boolean;shopifyUpdatedAt?: Date;shop?: { _link: string | null }; };    
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: UpdateShopifyOrderActionContext;
};


    
/** Context of the `delete` action on the `shopifyOrder` model. */
export interface DeleteShopifyOrderActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyOrder` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyOrder, DefaultShopifyOrderServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ShopifyWebhookTriggerForTopic<"orders/delete">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: DeleteShopifyOrderActionContext;
};


  