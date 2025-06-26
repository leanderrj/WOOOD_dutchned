// All the generated types for the "shopifyCheckout" model preconditions, actions, params, etc
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, ValidationErrors, ActionTrigger, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/woood";
import { GadgetRecord, ShopifyCheckout } from "@gadget-client/woood";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";

export type DefaultShopifyCheckoutServerSelection = {
  readonly __typename: true;
      readonly id: true;
      readonly createdAt: true;
      readonly updatedAt: true;
      readonly abandonedCheckoutUrl: true;
      readonly appliedDiscount: true;
      readonly buyerAcceptsMarketing: true;
      readonly completedAt: true;
      readonly shopifyCreatedAt: true;
      readonly creditCard: true;
      readonly currency: true;
      readonly customerLocale: true;
      readonly device: true;
      readonly discountCode: true;
      readonly discountCodes: true;
      readonly email: true;
      readonly legalNoticeUrl: true;
      readonly lineItems: false;
      readonly name: true;
      readonly note: true;
      readonly noteAttributes: true;
      readonly orderStatusUrl: true;
      readonly paymentDue: true;
      readonly paymentUrl: true;
      readonly payments: true;
      readonly phone: true;
      readonly presentmentCurrency: true;
      readonly privacyPolicyUrl: true;
      readonly refundPolicyUrl: true;
      readonly requiresShipping: true;
      readonly reservationTime: true;
      readonly reservationTimeLeft: true;
      readonly shippingLine: true;
      readonly shippingPolicyUrl: true;
      readonly shopifyPaymentsAccountId: true;
      readonly sourceIdentifier: true;
      readonly sourceName: true;
      readonly sourceUrl: true;
      readonly subscriptionPolicyUrl: true;
      readonly subtotalPrice: true;
      readonly taxExempt: true;
      readonly taxLines: true;
      readonly taxManipulations: true;
      readonly taxesIncluded: true;
      readonly termsOfSaleUrl: true;
      readonly termsOfServiceUrl: true;
      readonly token: true;
      readonly totalLineItemsPrice: true;
      readonly totalPrice: true;
      readonly totalTax: true;
      readonly totalTipReceived: true;
      readonly shopifyUpdatedAt: true;
      readonly userId: true;
      readonly webUrl: true;
      readonly shopId: true;
    readonly shop: false;
      readonly orderId: true;
    readonly order: false;
  };

  
/** Context of the `create` action on the `shopifyCheckout` model. */
export interface CreateShopifyCheckoutActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyCheckout` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyCheckout, DefaultShopifyCheckoutServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ShopifyWebhookTriggerForTopic<"checkouts/create"> | ShopifyWebhookTriggerForTopic<"checkouts/update"> | TriggerWithType<"shopify_sync">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
shopifyCheckout?: { id?: string;email?: string;shopifyCreatedAt?: Date;device?: number;discountCodes?: Scalars["JSON"];sourceIdentifier?: string;sourceName?: string;sourceUrl?: string;subtotalPrice?: string;shopifyUpdatedAt?: Date;name?: string;taxLines?: Scalars["JSON"];taxesIncluded?: boolean;token?: string;totalLineItemsPrice?: string;totalPrice?: string;totalTax?: string;userId?: string;currency?: string;customerLocale?: string;note?: string;noteAttributes?: Scalars["JSON"];phone?: string;presentmentCurrency?: string;abandonedCheckoutUrl?: string;appliedDiscount?: Scalars["JSON"];buyerAcceptsMarketing?: boolean;completedAt?: Date;creditCard?: string;discountCode?: string;legalNoticeUrl?: string;order?: { _link: string | null };orderStatusUrl?: string;paymentDue?: string;paymentUrl?: string;payments?: Scalars["JSON"];privacyPolicyUrl?: string;refundPolicyUrl?: string;requiresShipping?: boolean;reservationTime?: number;reservationTimeLeft?: number;shippingLine?: Scalars["JSON"];shippingPolicyUrl?: string;shopifyPaymentsAccountId?: string;subscriptionPolicyUrl?: string;taxExempt?: boolean;taxManipulations?: Scalars["JSON"];termsOfSaleUrl?: string;termsOfServiceUrl?: string;totalTipReceived?: string;webUrl?: string;shop?: { _link: string | null }; };
};
  /**
  * @private The context of this action.
  */
  context: CreateShopifyCheckoutActionContext;
};


    
/** Context of the `update` action on the `shopifyCheckout` model. */
export interface UpdateShopifyCheckoutActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyCheckout` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyCheckout, DefaultShopifyCheckoutServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ShopifyWebhookTriggerForTopic<"checkouts/update"> | TriggerWithType<"shopify_sync">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
shopifyCheckout?: { id?: string;email?: string;shopifyCreatedAt?: Date;device?: number;discountCodes?: Scalars["JSON"];sourceIdentifier?: string;sourceName?: string;sourceUrl?: string;subtotalPrice?: string;shopifyUpdatedAt?: Date;name?: string;taxLines?: Scalars["JSON"];taxesIncluded?: boolean;token?: string;totalLineItemsPrice?: string;totalPrice?: string;totalTax?: string;userId?: string;currency?: string;customerLocale?: string;note?: string;noteAttributes?: Scalars["JSON"];phone?: string;presentmentCurrency?: string;abandonedCheckoutUrl?: string;appliedDiscount?: Scalars["JSON"];buyerAcceptsMarketing?: boolean;completedAt?: Date;creditCard?: string;discountCode?: string;legalNoticeUrl?: string;order?: { _link: string | null };orderStatusUrl?: string;paymentDue?: string;paymentUrl?: string;payments?: Scalars["JSON"];privacyPolicyUrl?: string;refundPolicyUrl?: string;requiresShipping?: boolean;reservationTime?: number;reservationTimeLeft?: number;shippingLine?: Scalars["JSON"];shippingPolicyUrl?: string;shopifyPaymentsAccountId?: string;subscriptionPolicyUrl?: string;taxExempt?: boolean;taxManipulations?: Scalars["JSON"];termsOfSaleUrl?: string;termsOfServiceUrl?: string;totalTipReceived?: string;webUrl?: string;shop?: { _link: string | null }; };    
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: UpdateShopifyCheckoutActionContext;
};


    
/** Context of the `delete` action on the `shopifyCheckout` model. */
export interface DeleteShopifyCheckoutActionContext extends AmbientContext {
  /**
  * The model this action is operating on
  */
  model: NotYetTyped;
  /**
  * An object specifying the `shopifyCheckout` record this action is operating on.
  */
  record: GadgetRecord<Select<ShopifyCheckout, DefaultShopifyCheckoutServerSelection>>;
  /**
  * @deprecated Use 'return' instead.
  */
  scope: ActionExecutionScope;
  /**
  * An object specifying the trigger to this action (e.g. API call, webhook events etc.).
  */
  trigger: ShopifyWebhookTriggerForTopic<"checkouts/delete">;
  /**
  * An object containing the incoming data(this models fields) passed by triggers or user inputs.
  */
  params: {
id?: string;
};
  /**
  * @private The context of this action.
  */
  context: DeleteShopifyCheckoutActionContext;
};


  