
import type { AmbientContext } from "./AmbientContext.js";
import type { TriggerWithType, ActionExecutionScope } from "./types.js";
import type { Scalars } from "@gadget-client/woood";
import { ShopifyWebhookTriggerForTopic } from "./WebhookPayloadTypes.js";
/** Context of the `getDeliveryDates` action. */
export interface GetDeliveryDatesGlobalActionContext extends AmbientContext {
	/**
	* @deprecated Use 'returnType' instead.
	* Useful for returning data from this action by setting `scope.result`.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, custom params).
	*/
	params: {};
	/**
	* An object specifying the trigger to this action (e.g. api call, scheduler etc.)
	*/
	trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
	/**
	* @private The context of this action.
	*/
	context: GetDeliveryDatesGlobalActionContext;
}
/** Context of the `processOrderPayment` action. */
export interface ProcessOrderPaymentGlobalActionContext extends AmbientContext {
	/**
	* @deprecated Use 'returnType' instead.
	* Useful for returning data from this action by setting `scope.result`.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, custom params).
	*/
	params: {};
	/**
	* An object specifying the trigger to this action (e.g. api call, scheduler etc.)
	*/
	trigger: TriggerWithType<"api"> | TriggerWithType<"background-action"> | ShopifyWebhookTriggerForTopic<"orders/paid">;
	/**
	* @private The context of this action.
	*/
	context: ProcessOrderPaymentGlobalActionContext;
}
/** Context of the `setOrderDeliveryDateMetafield` action. */
export interface SetOrderDeliveryDateMetafieldGlobalActionContext extends AmbientContext {
	/**
	* @deprecated Use 'returnType' instead.
	* Useful for returning data from this action by setting `scope.result`.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, custom params).
	*/
	params: {
		orderId?: string
		deliveryDate?: string
		shopId?: string
	};
	/**
	* An object specifying the trigger to this action (e.g. api call, scheduler etc.)
	*/
	trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
	/**
	* @private The context of this action.
	*/
	context: SetOrderDeliveryDateMetafieldGlobalActionContext;
}
/** Context of the `setOrderShippingMethodMetafield` action. */
export interface SetOrderShippingMethodMetafieldGlobalActionContext extends AmbientContext {
	/**
	* @deprecated Use 'returnType' instead.
	* Useful for returning data from this action by setting `scope.result`.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, custom params).
	*/
	params: {
		orderId?: string
		cartItems?: {
			product_id?: string
			quantity?: number
		}[]
		shopId?: string
	};
	/**
	* An object specifying the trigger to this action (e.g. api call, scheduler etc.)
	*/
	trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
	/**
	* @private The context of this action.
	*/
	context: SetOrderShippingMethodMetafieldGlobalActionContext;
}
/** Context of the `writeToShopify` action. */
export interface WriteToShopifyGlobalActionContext extends AmbientContext {
	/**
	* @deprecated Use 'returnType' instead.
	* Useful for returning data from this action by setting `scope.result`.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, custom params).
	*/
	params: {
		shopId?: string
		mutation?: string
		variables?: Scalars["JSONObject"]
	};
	/**
	* An object specifying the trigger to this action (e.g. api call, scheduler etc.)
	*/
	trigger: TriggerWithType<"api"> | TriggerWithType<"background-action">;
	/**
	* @private The context of this action.
	*/
	context: WriteToShopifyGlobalActionContext;
}
