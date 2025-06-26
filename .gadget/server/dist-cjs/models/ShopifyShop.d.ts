
import { AmbientContext } from "../AmbientContext";
import { ActionExecutionScope, NotYetTyped, TriggerWithType } from "../types";
import type { Scalars } from "@gadget-client/woood";
import { GadgetRecord, ShopifyShop } from "@gadget-client/woood";
import { Select } from "@gadgetinc/api-client-core";
import { ShopifyWebhookTriggerForTopic } from "../WebhookPayloadTypes";
export type DefaultShopifyShopServerSelection = {
	readonly __typename: true
	readonly id: true
	readonly createdAt: true
	readonly updatedAt: true
	readonly state: true
	readonly alerts: true
	readonly billingAddress: true
	readonly checkoutApiSupported: true
	readonly countriesInShippingZones: true
	readonly currencyFormats: true
	readonly customerAccounts: true
	readonly description: true
	readonly orderNumberFormatPrefix: true
	readonly orderNumberFormatSuffix: true
	readonly resourceLimits: true
	readonly richTextEdiorUrl: true
	readonly shipsToCountries: true
	readonly customerAccountsV2: true
	readonly plan: true
	readonly timezoneAbbreviation: true
	readonly taxesOffset: true
	readonly timezoneOffsetMinutes: true
	readonly unitSystem: true
	readonly url: true
	readonly accessToken: true
	readonly address1: true
	readonly address2: true
	readonly city: true
	readonly country: true
	readonly countryCode: true
	readonly countryName: true
	readonly countyTaxes: true
	readonly shopifyCreatedAt: true
	readonly currency: true
	readonly customerEmail: true
	readonly disabledWebhooks: true
	readonly domain: true
	readonly eligibleForPayments: true
	readonly email: true
	readonly enabledPresentmentCurrencies: true
	readonly finances: true
	readonly googleAppsDomain: true
	readonly googleAppsLoginEnabled: true
	readonly grantedScopes: true
	readonly hasDiscounts: true
	readonly hasGiftCards: true
	readonly hasStorefront: true
	readonly ianaTimezone: true
	readonly installedViaApiKey: true
	readonly latitude: true
	readonly longitude: true
	readonly marketingSmsContentEnabledAtCheckout: true
	readonly moneyFormat: true
	readonly moneyInEmailsFormat: true
	readonly moneyWithCurrencyFormat: true
	readonly moneyWithCurrencyInEmailsFormat: true
	readonly multiLocationEnabled: true
	readonly myshopifyDomain: true
	readonly name: true
	readonly passwordEnabled: true
	readonly phone: true
	readonly planDisplayName: true
	readonly planName: true
	readonly preLaunchEnabled: true
	readonly primaryLocale: true
	readonly province: true
	readonly provinceCode: true
	readonly registeredWebhooks: true
	readonly requiresExtraPaymentsAgreement: true
	readonly setupRequired: true
	readonly shopOwner: true
	readonly source: true
	readonly taxShipping: true
	readonly taxesIncluded: true
	readonly timezone: true
	readonly transactionalSmsDisabled: true
	readonly shopifyUpdatedAt: true
	readonly weightUnit: true
	readonly zipCode: true
	readonly gdprRequests: false
	readonly products: false
	readonly syncs: false
	readonly orders: false
	readonly checkoutLineItems: false
	readonly checkouts: false
};
/** Context of the `update` action on the `shopifyShop` model. */
export interface UpdateShopifyShopActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyShop` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyShop, DefaultShopifyShopServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"shop/update"> | TriggerWithType<"shopify_sync">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyShop?: {
			id?: string
			alerts?: Scalars["JSON"]
			billingAddress?: Scalars["JSON"]
			checkoutApiSupported?: Scalars["JSON"]
			countriesInShippingZones?: Scalars["JSON"]
			currencyFormats?: Scalars["JSON"]
			customerAccounts?: string
			description?: string
			orderNumberFormatPrefix?: string
			orderNumberFormatSuffix?: string
			resourceLimits?: Scalars["JSON"]
			richTextEdiorUrl?: string
			shipsToCountries?: string[]
			customerAccountsV2?: Scalars["JSON"]
			plan?: Scalars["JSON"]
			timezoneAbbreviation?: string
			taxesOffset?: string
			timezoneOffsetMinutes?: number
			unitSystem?: string
			url?: string
			address1?: string
			address2?: string
			city?: string
			country?: string
			countryCode?: string
			countryName?: string
			countyTaxes?: Scalars["JSON"]
			shopifyCreatedAt?: Date
			currency?: string
			customerEmail?: string
			domain?: string
			eligibleForPayments?: boolean
			email?: string
			enabledPresentmentCurrencies?: string[]
			finances?: boolean
			googleAppsDomain?: string
			googleAppsLoginEnabled?: boolean
			hasDiscounts?: boolean
			hasGiftCards?: boolean
			hasStorefront?: boolean
			ianaTimezone?: string
			latitude?: number
			longitude?: number
			marketingSmsContentEnabledAtCheckout?: boolean
			moneyFormat?: string
			moneyInEmailsFormat?: string
			moneyWithCurrencyFormat?: string
			moneyWithCurrencyInEmailsFormat?: string
			multiLocationEnabled?: boolean
			myshopifyDomain?: string
			name?: string
			passwordEnabled?: boolean
			phone?: string
			planDisplayName?: string
			planName?: string
			preLaunchEnabled?: boolean
			primaryLocale?: string
			province?: string
			provinceCode?: string
			requiresExtraPaymentsAgreement?: boolean
			setupRequired?: boolean
			shopOwner?: string
			source?: string
			taxShipping?: boolean
			taxesIncluded?: boolean
			timezone?: string
			transactionalSmsDisabled?: boolean
			shopifyUpdatedAt?: Date
			weightUnit?: string
			zipCode?: string
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UpdateShopifyShopActionContext;
}
/** Context of the `install` action on the `shopifyShop` model. */
export interface InstallShopifyShopActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyShop` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyShop, DefaultShopifyShopServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: TriggerWithType<"shopify_oauth">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyShop?: {
			id?: string
			alerts?: Scalars["JSON"]
			billingAddress?: Scalars["JSON"]
			checkoutApiSupported?: Scalars["JSON"]
			countriesInShippingZones?: Scalars["JSON"]
			currencyFormats?: Scalars["JSON"]
			customerAccounts?: string
			description?: string
			orderNumberFormatPrefix?: string
			orderNumberFormatSuffix?: string
			resourceLimits?: Scalars["JSON"]
			richTextEdiorUrl?: string
			shipsToCountries?: string[]
			customerAccountsV2?: Scalars["JSON"]
			plan?: Scalars["JSON"]
			timezoneAbbreviation?: string
			taxesOffset?: string
			timezoneOffsetMinutes?: number
			unitSystem?: string
			url?: string
			address1?: string
			address2?: string
			city?: string
			country?: string
			countryCode?: string
			countryName?: string
			countyTaxes?: Scalars["JSON"]
			shopifyCreatedAt?: Date
			currency?: string
			customerEmail?: string
			domain?: string
			eligibleForPayments?: boolean
			email?: string
			enabledPresentmentCurrencies?: string[]
			finances?: boolean
			googleAppsDomain?: string
			googleAppsLoginEnabled?: boolean
			hasDiscounts?: boolean
			hasGiftCards?: boolean
			hasStorefront?: boolean
			ianaTimezone?: string
			latitude?: number
			longitude?: number
			marketingSmsContentEnabledAtCheckout?: boolean
			moneyFormat?: string
			moneyInEmailsFormat?: string
			moneyWithCurrencyFormat?: string
			moneyWithCurrencyInEmailsFormat?: string
			multiLocationEnabled?: boolean
			myshopifyDomain?: string
			name?: string
			passwordEnabled?: boolean
			phone?: string
			planDisplayName?: string
			planName?: string
			preLaunchEnabled?: boolean
			primaryLocale?: string
			province?: string
			provinceCode?: string
			requiresExtraPaymentsAgreement?: boolean
			setupRequired?: boolean
			shopOwner?: string
			source?: string
			taxShipping?: boolean
			taxesIncluded?: boolean
			timezone?: string
			transactionalSmsDisabled?: boolean
			shopifyUpdatedAt?: Date
			weightUnit?: string
			zipCode?: string
		}
	};
	/**
	* @private The context of this action.
	*/
	context: InstallShopifyShopActionContext;
}
/** Context of the `reinstall` action on the `shopifyShop` model. */
export interface ReinstallShopifyShopActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyShop` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyShop, DefaultShopifyShopServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: TriggerWithType<"shopify_oauth">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyShop?: {
			id?: string
			alerts?: Scalars["JSON"]
			billingAddress?: Scalars["JSON"]
			checkoutApiSupported?: Scalars["JSON"]
			countriesInShippingZones?: Scalars["JSON"]
			currencyFormats?: Scalars["JSON"]
			customerAccounts?: string
			description?: string
			orderNumberFormatPrefix?: string
			orderNumberFormatSuffix?: string
			resourceLimits?: Scalars["JSON"]
			richTextEdiorUrl?: string
			shipsToCountries?: string[]
			customerAccountsV2?: Scalars["JSON"]
			plan?: Scalars["JSON"]
			timezoneAbbreviation?: string
			taxesOffset?: string
			timezoneOffsetMinutes?: number
			unitSystem?: string
			url?: string
			address1?: string
			address2?: string
			city?: string
			country?: string
			countryCode?: string
			countryName?: string
			countyTaxes?: Scalars["JSON"]
			shopifyCreatedAt?: Date
			currency?: string
			customerEmail?: string
			domain?: string
			eligibleForPayments?: boolean
			email?: string
			enabledPresentmentCurrencies?: string[]
			finances?: boolean
			googleAppsDomain?: string
			googleAppsLoginEnabled?: boolean
			hasDiscounts?: boolean
			hasGiftCards?: boolean
			hasStorefront?: boolean
			ianaTimezone?: string
			latitude?: number
			longitude?: number
			marketingSmsContentEnabledAtCheckout?: boolean
			moneyFormat?: string
			moneyInEmailsFormat?: string
			moneyWithCurrencyFormat?: string
			moneyWithCurrencyInEmailsFormat?: string
			multiLocationEnabled?: boolean
			myshopifyDomain?: string
			name?: string
			passwordEnabled?: boolean
			phone?: string
			planDisplayName?: string
			planName?: string
			preLaunchEnabled?: boolean
			primaryLocale?: string
			province?: string
			provinceCode?: string
			requiresExtraPaymentsAgreement?: boolean
			setupRequired?: boolean
			shopOwner?: string
			source?: string
			taxShipping?: boolean
			taxesIncluded?: boolean
			timezone?: string
			transactionalSmsDisabled?: boolean
			shopifyUpdatedAt?: Date
			weightUnit?: string
			zipCode?: string
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: ReinstallShopifyShopActionContext;
}
/** Context of the `uninstall` action on the `shopifyShop` model. */
export interface UninstallShopifyShopActionContext extends AmbientContext {
	/**
	* The model this action is operating on
	*/
	model: NotYetTyped;
	/**
	* An object specifying the `shopifyShop` record this action is operating on.
	*/
	record: GadgetRecord<Select<ShopifyShop, DefaultShopifyShopServerSelection>>;
	/**
	* @deprecated Use 'return' instead.
	*/
	scope: ActionExecutionScope;
	/**
	* An object specifying the trigger to this action (e.g. API call, webhook events etc.).
	*/
	trigger: ShopifyWebhookTriggerForTopic<"app/uninstalled">;
	/**
	* An object containing the incoming data(this models fields) passed by triggers or user inputs.
	*/
	params: {
		shopifyShop?: {
			id?: string
			alerts?: Scalars["JSON"]
			billingAddress?: Scalars["JSON"]
			checkoutApiSupported?: Scalars["JSON"]
			countriesInShippingZones?: Scalars["JSON"]
			currencyFormats?: Scalars["JSON"]
			customerAccounts?: string
			description?: string
			orderNumberFormatPrefix?: string
			orderNumberFormatSuffix?: string
			resourceLimits?: Scalars["JSON"]
			richTextEdiorUrl?: string
			shipsToCountries?: string[]
			customerAccountsV2?: Scalars["JSON"]
			plan?: Scalars["JSON"]
			timezoneAbbreviation?: string
			taxesOffset?: string
			timezoneOffsetMinutes?: number
			unitSystem?: string
			url?: string
			address1?: string
			address2?: string
			city?: string
			country?: string
			countryCode?: string
			countryName?: string
			countyTaxes?: Scalars["JSON"]
			shopifyCreatedAt?: Date
			currency?: string
			customerEmail?: string
			domain?: string
			eligibleForPayments?: boolean
			email?: string
			enabledPresentmentCurrencies?: string[]
			finances?: boolean
			googleAppsDomain?: string
			googleAppsLoginEnabled?: boolean
			hasDiscounts?: boolean
			hasGiftCards?: boolean
			hasStorefront?: boolean
			ianaTimezone?: string
			latitude?: number
			longitude?: number
			marketingSmsContentEnabledAtCheckout?: boolean
			moneyFormat?: string
			moneyInEmailsFormat?: string
			moneyWithCurrencyFormat?: string
			moneyWithCurrencyInEmailsFormat?: string
			multiLocationEnabled?: boolean
			myshopifyDomain?: string
			name?: string
			passwordEnabled?: boolean
			phone?: string
			planDisplayName?: string
			planName?: string
			preLaunchEnabled?: boolean
			primaryLocale?: string
			province?: string
			provinceCode?: string
			requiresExtraPaymentsAgreement?: boolean
			setupRequired?: boolean
			shopOwner?: string
			source?: string
			taxShipping?: boolean
			taxesIncluded?: boolean
			timezone?: string
			transactionalSmsDisabled?: boolean
			shopifyUpdatedAt?: Date
			weightUnit?: string
			zipCode?: string
		}
		id?: string
	};
	/**
	* @private The context of this action.
	*/
	context: UninstallShopifyShopActionContext;
}
