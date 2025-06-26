import type { ShopifyWebhookActionTrigger } from "./types";
/**
 * Shopify webhook payload for the "app/uninstalled" topic
 */

export interface ShopifyAppUninstalledPayload {
  address1: string;
  address2: null | string;
  auto_configure_tax_inclusivity: boolean | null;
  checkout_api_supported: boolean;
  city: string;
  country: string;
  country_code: string;
  country_name: string;
  county_taxes: boolean | null;
  created_at: null | string;
  currency: string;
  customer_email: string;
  domain: null | string;
  eligible_for_payments: boolean;
  email: string;
  enabled_presentment_currencies: string[];
  finances: boolean;
  google_apps_domain: null | string;
  google_apps_login_enabled: boolean | null;
  has_discounts: boolean;
  has_gift_cards: boolean;
  has_storefront: boolean;
  iana_timezone: null | string;
  id: number;
  latitude: null | number;
  longitude: null | number;
  marketing_sms_consent_enabled_at_checkout: boolean;
  money_format: string;
  money_in_emails_format: string;
  money_with_currency_format: string;
  money_with_currency_in_emails_format: string;
  multi_location_enabled: boolean;
  myshopify_domain: null | string;
  name: string;
  password_enabled: boolean | null;
  phone: string;
  plan_display_name: string;
  plan_name: string;
  pre_launch_enabled: boolean;
  primary_locale: string;
  primary_location_id: number;
  province: string;
  province_code: string;
  requires_extra_payments_agreement: boolean;
  setup_required: boolean;
  shop_owner: string;
  source: null | string;
  tax_shipping: boolean | null;
  taxes_included: boolean | null;
  timezone: string;
  transactional_sms_disabled: boolean;
  updated_at: null | string;
  weight_unit: string;
  zip: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "app/uninstalled" topic
 */
export interface ShopifyAppUninstalledTrigger extends ShopifyWebhookActionTrigger {
  topic: "app/uninstalled";
  payload: ShopifyAppUninstalledPayload;
}
/**
 * Shopify webhook payload for the "checkouts/create" topic
 */

export interface ShopifyCheckoutsCreatePayload {
  abandoned_checkout_url: string;
  billing_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: null | string;
    province_code: null | string;
    zip: string;
    [k: string]: unknown;
  };
  buyer_accepts_marketing: boolean;
  buyer_accepts_sms_marketing: boolean;
  cart_token: null | string;
  closed_at: null | string;
  completed_at: null | string;
  created_at: string;
  currency: string;
  customer: {
    accepts_marketing?: boolean;
    accepts_marketing_updated_at?: null | string;
    admin_graphql_api_id: string;
    created_at: null | string;
    currency: string;
    default_address: {
      address1: string;
      address2: null | string;
      city: string;
      company: null | string;
      country: string;
      country_code: string;
      country_name: string;
      customer_id: number;
      default: boolean;
      first_name: null | string;
      id: number | null;
      last_name: null | string;
      name: string;
      phone: null | string;
      province: null | string;
      province_code: null | string;
      zip: string;
      [k: string]: unknown;
    };
    email: string;
    email_marketing_consent?: {
      consent_updated_at: string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    first_name: string;
    id: number;
    last_name: string;
    last_order_id?: number | null;
    last_order_name?: null | string;
    marketing_opt_in_level?: null | string;
    multipass_identifier: null | string;
    note: null | string;
    orders_count?: number;
    phone: null | string;
    sms_marketing_consent?: null | {
      consent_collected_from: string;
      consent_updated_at: string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    state: string;
    tags?: string;
    tax_exempt: boolean;
    tax_exemptions: never[];
    total_spent?: string;
    updated_at: null | string;
    verified_email: boolean;
    [k: string]: unknown;
  };
  customer_locale: null | string;
  device_id: null | string;
  discount_codes: {
    amount: string;
    code: string;
    type: string;
    [k: string]: unknown;
  }[];
  email: null | string;
  gateway: null | string;
  id: number;
  landing_site: null | string;
  line_items: {
    applied_discounts: never[];
    compare_at_price: null | string;
    destination_location_id: number | null;
    discount_allocations?: {
      amount: string;
      application_type: string;
      created_at: null;
      description: string;
      discount_class: string;
      id: null;
      [k: string]: unknown;
    }[];
    fulfillment_service: string;
    gift_card: boolean;
    grams: number;
    id?: string;
    key: string;
    line_price: string;
    origin_location_id: number | null;
    presentment_title: string;
    presentment_variant_title: string;
    price: string;
    product_id: number;
    properties:
      | {
          name: string;
          value: string;
          [k: string]: unknown;
        }[]
      | {
          [k: string]: unknown;
        };
    quantity: number;
    rank: number | null;
    requires_shipping: boolean;
    sku: string;
    tax_lines: {
      channel_liable: boolean;
      compare_at: null | number;
      identifier?: null;
      jurisdiction_id?: null | string;
      jurisdiction_source?: null | string;
      jurisdiction_type?: null | string;
      position: number;
      price: string;
      rate: number;
      reporting_exempt_amount?: null | string;
      reporting_jurisdiction_code?: null;
      reporting_jurisdiction_name?: null;
      reporting_jurisdiction_type?: null;
      reporting_non_taxable_amount?: null | string;
      reporting_taxable_amount?: null | string;
      source: string;
      tax_api_client_id?: number | null;
      tax_calculation_price?: string;
      tax_registration_id?: null;
      tax_type?: null;
      title: string;
      zone: null | string;
      [k: string]: unknown;
    }[];
    taxable: boolean;
    title: string;
    unit_price_measurement: {
      measured_type: null;
      quantity_unit: null;
      quantity_value: null;
      reference_unit: null;
      reference_value: null;
      [k: string]: unknown;
    };
    user_id: null;
    variant_id: number;
    variant_price: string;
    variant_title: string;
    vendor: string;
    [k: string]: unknown;
  }[];
  location_id: number | null;
  name: string;
  note: null | string;
  note_attributes: {
    name: string;
    value: string;
    [k: string]: unknown;
  }[];
  phone: null | string;
  presentment_currency: string;
  referring_site: null | string;
  reservation_token: null | string;
  shipping_address: {
    address1?: string;
    address2?: null | string;
    city?: string;
    company?: null | string;
    country?: string;
    country_code?: string;
    first_name?: string;
    last_name?: string;
    latitude?: null | number;
    longitude?: null | number;
    name?: string;
    phone?: string;
    province?: string;
    province_code?: string;
    zip?: string;
    [k: string]: unknown;
  };
  shipping_lines: {
    api_client_id: null | string;
    applied_discounts: never[];
    carrier_identifier: null | string;
    carrier_service_id: null | string;
    code: string;
    custom_tax_lines: null;
    delivery_category: null;
    delivery_expectation_range: number[] | null;
    delivery_expectation_type: null | string;
    delivery_option_group?: {
      token: string;
      type: string;
      [k: string]: unknown;
    };
    delivery_option_group_type?: null | string;
    estimated_delivery_time_range?: null;
    id: null | string;
    markup: string;
    original_rate_price?: null | string;
    original_shop_markup: null | string;
    original_shop_price: null | string;
    phone: null | string;
    presentment_title: null | string;
    price: string;
    requested_fulfillment_service_id: null;
    source: string;
    tax_lines: {
      channel_liable: boolean;
      compare_at: null | number;
      identifier: null;
      jurisdiction_id?: null;
      jurisdiction_source?: null;
      jurisdiction_type?: null;
      position: number;
      price: string;
      rate: number;
      reporting_exempt_amount?: null;
      reporting_jurisdiction_code?: null;
      reporting_jurisdiction_name?: null;
      reporting_jurisdiction_type?: null;
      reporting_non_taxable_amount?: null;
      reporting_taxable_amount?: null;
      source: string;
      tax_api_client_id?: number | null;
      tax_calculation_price?: string;
      tax_type?: null;
      title: string;
      zone: null | string;
      [k: string]: unknown;
    }[];
    title: string;
    validation_context: null;
    [k: string]: unknown;
  }[];
  sms_marketing_phone: null | string;
  source: null | string;
  source_identifier: null | string;
  source_name: string;
  source_url: null | string;
  subtotal_price: string;
  tax_lines: {
    channel_liable: boolean;
    price: string;
    rate: number;
    title: string;
    [k: string]: unknown;
  }[];
  taxes_included: boolean;
  token: string;
  total_discounts: string;
  total_duties: number | string;
  total_line_items_price: string;
  total_price: string;
  total_tax: string;
  total_weight: number;
  updated_at: string;
  user_id: number | null;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "checkouts/create" topic
 */
export interface ShopifyCheckoutsCreateTrigger extends ShopifyWebhookActionTrigger {
  topic: "checkouts/create";
  payload: ShopifyCheckoutsCreatePayload;
}
/**
 * Shopify webhook payload for the "checkouts/delete" topic
 */

export interface ShopifyCheckoutsDeletePayload {
  buyer_accepts_sms_marketing: boolean;
  cart_token: null | string;
  id: number;
  presentment_currency: string;
  reservation_token: null | string;
  sms_marketing_phone: null | string;
  subtotal_price: string;
  total_discounts: string;
  total_duties: number | string;
  total_line_items_price: string;
  total_price: string;
  total_tax: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "checkouts/delete" topic
 */
export interface ShopifyCheckoutsDeleteTrigger extends ShopifyWebhookActionTrigger {
  topic: "checkouts/delete";
  payload: ShopifyCheckoutsDeletePayload;
}
/**
 * Shopify webhook payload for the "checkouts/update" topic
 */

export interface ShopifyCheckoutsUpdatePayload {
  abandoned_checkout_url: string;
  billing_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: null | string;
    province_code: null | string;
    zip: string;
    [k: string]: unknown;
  };
  buyer_accepts_marketing: boolean;
  buyer_accepts_sms_marketing: boolean;
  cart_token: null | string;
  closed_at: null | string;
  completed_at: null | string;
  created_at: string;
  currency: string;
  customer: {
    accepts_marketing?: boolean;
    accepts_marketing_updated_at?: null | string;
    admin_graphql_api_id: string;
    created_at: null | string;
    currency: string;
    default_address: {
      address1: string;
      address2: null | string;
      city: string;
      company: null | string;
      country: string;
      country_code: string;
      country_name: string;
      customer_id: number;
      default: boolean;
      first_name: null | string;
      id: number | null;
      last_name: null | string;
      name: string;
      phone: null | string;
      province: null | string;
      province_code: null | string;
      zip: string;
      [k: string]: unknown;
    };
    email: string;
    email_marketing_consent?: {
      consent_updated_at: string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    first_name: string;
    id: number;
    last_name: string;
    last_order_id?: number | null;
    last_order_name?: null | string;
    marketing_opt_in_level?: null | string;
    multipass_identifier: null | string;
    note: null | string;
    orders_count?: number;
    phone: null | string;
    sms_marketing_consent?: null | {
      consent_collected_from: string;
      consent_updated_at: string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    state: string;
    tags?: string;
    tax_exempt: boolean;
    tax_exemptions: never[];
    total_spent?: string;
    updated_at: null | string;
    verified_email: boolean;
    [k: string]: unknown;
  };
  customer_locale: null | string;
  device_id: null | string;
  discount_codes: {
    amount: string;
    code: string;
    type: string;
    [k: string]: unknown;
  }[];
  email: null | string;
  gateway: null | string;
  id: number;
  landing_site: null | string;
  line_items: {
    applied_discounts: never[];
    compare_at_price: null | string;
    destination_location_id: number | null;
    discount_allocations?: {
      amount: string;
      application_type: string;
      created_at: null;
      description: string;
      discount_class: string;
      id: null;
      [k: string]: unknown;
    }[];
    fulfillment_service: string;
    gift_card: boolean;
    grams: number;
    id?: string;
    key: string;
    line_price: string;
    origin_location_id: number | null;
    presentment_title: string;
    presentment_variant_title: string;
    price: string;
    product_id: number;
    properties:
      | {
          name: string;
          value: string;
          [k: string]: unknown;
        }[]
      | {
          [k: string]: unknown;
        };
    quantity: number;
    rank: number | null;
    requires_shipping: boolean;
    sku: string;
    tax_lines: {
      channel_liable: boolean;
      compare_at: null | number;
      identifier?: null;
      jurisdiction_id?: null | string;
      jurisdiction_source?: null | string;
      jurisdiction_type?: null | string;
      position: number;
      price: string;
      rate: number;
      reporting_exempt_amount?: null | string;
      reporting_jurisdiction_code?: null;
      reporting_jurisdiction_name?: null;
      reporting_jurisdiction_type?: null;
      reporting_non_taxable_amount?: null | string;
      reporting_taxable_amount?: null | string;
      source: string;
      tax_api_client_id?: number | null;
      tax_calculation_price?: string;
      tax_registration_id?: null;
      tax_type?: null;
      title: string;
      zone: null | string;
      [k: string]: unknown;
    }[];
    taxable: boolean;
    title: string;
    unit_price_measurement: {
      measured_type: null;
      quantity_unit: null;
      quantity_value: null;
      reference_unit: null;
      reference_value: null;
      [k: string]: unknown;
    };
    user_id: null;
    variant_id: number;
    variant_price: string;
    variant_title: string;
    vendor: string;
    [k: string]: unknown;
  }[];
  location_id: number | null;
  name: string;
  note: null | string;
  note_attributes: {
    name: string;
    value: string;
    [k: string]: unknown;
  }[];
  phone: null | string;
  presentment_currency: string;
  referring_site: null | string;
  reservation_token: null | string;
  shipping_address: {
    address1?: string;
    address2?: null | string;
    city?: string;
    company?: null | string;
    country?: string;
    country_code?: string;
    first_name?: string;
    last_name?: string;
    latitude?: null | number;
    longitude?: null | number;
    name?: string;
    phone?: string;
    province?: string;
    province_code?: string;
    zip?: string;
    [k: string]: unknown;
  };
  shipping_lines: {
    api_client_id: null | string;
    applied_discounts: never[];
    carrier_identifier: null | string;
    carrier_service_id: null | string;
    code: string;
    custom_tax_lines: null;
    delivery_category: null;
    delivery_expectation_range: number[] | null;
    delivery_expectation_type: null | string;
    delivery_option_group?: {
      token: string;
      type: string;
      [k: string]: unknown;
    };
    delivery_option_group_type?: null | string;
    estimated_delivery_time_range?: null;
    id: null | string;
    markup: string;
    original_rate_price?: null | string;
    original_shop_markup: null | string;
    original_shop_price: null | string;
    phone: null | string;
    presentment_title: null | string;
    price: string;
    requested_fulfillment_service_id: null;
    source: string;
    tax_lines: {
      channel_liable: boolean;
      compare_at: null | number;
      identifier: null;
      jurisdiction_id?: null;
      jurisdiction_source?: null;
      jurisdiction_type?: null;
      position: number;
      price: string;
      rate: number;
      reporting_exempt_amount?: null;
      reporting_jurisdiction_code?: null;
      reporting_jurisdiction_name?: null;
      reporting_jurisdiction_type?: null;
      reporting_non_taxable_amount?: null;
      reporting_taxable_amount?: null;
      source: string;
      tax_api_client_id?: number | null;
      tax_calculation_price?: string;
      tax_type?: null;
      title: string;
      zone: null | string;
      [k: string]: unknown;
    }[];
    title: string;
    validation_context: null;
    [k: string]: unknown;
  }[];
  sms_marketing_phone: null | string;
  source: null | string;
  source_identifier: null | string;
  source_name: string;
  source_url: null | string;
  subtotal_price: string;
  tax_lines: {
    channel_liable: boolean;
    price: string;
    rate: number;
    title: string;
    [k: string]: unknown;
  }[];
  taxes_included: boolean;
  token: string;
  total_discounts: string;
  total_duties: number | string;
  total_line_items_price: string;
  total_price: string;
  total_tax: string;
  total_weight: number;
  updated_at: string;
  user_id: number | null;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "checkouts/update" topic
 */
export interface ShopifyCheckoutsUpdateTrigger extends ShopifyWebhookActionTrigger {
  topic: "checkouts/update";
  payload: ShopifyCheckoutsUpdatePayload;
}
/**
 * Shopify webhook payload for the "customers/data_request" topic
 */

export interface ShopifyCustomersDataRequestPayload {
  customer: {
    email: string;
    id: number;
    phone: string;
    [k: string]: unknown;
  };
  data_request: {
    id: number;
    [k: string]: unknown;
  };
  orders_requested: number[];
  shop_domain: string;
  shop_id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "customers/data_request" topic
 */
export interface ShopifyCustomersDataRequestTrigger extends ShopifyWebhookActionTrigger {
  topic: "customers/data_request";
  payload: ShopifyCustomersDataRequestPayload;
}
/**
 * Shopify webhook payload for the "customers/redact" topic
 */

export interface ShopifyCustomersRedactPayload {
  customer: {
    email: string;
    id: number;
    phone: string;
    [k: string]: unknown;
  };
  orders_to_redact: number[];
  shop_domain: string;
  shop_id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "customers/redact" topic
 */
export interface ShopifyCustomersRedactTrigger extends ShopifyWebhookActionTrigger {
  topic: "customers/redact";
  payload: ShopifyCustomersRedactPayload;
}
/**
 * Shopify webhook payload for the "orders/create" topic
 */

export interface ShopifyOrdersCreatePayload {
  admin_graphql_api_id: string;
  app_id: number | null;
  billing_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  browser_ip: null | string;
  buyer_accepts_marketing: boolean;
  cancel_reason: null | string;
  cancelled_at: null | string;
  cart_token: null | string;
  checkout_id: number | null;
  checkout_token: null | string;
  client_details: null | {
    accept_language: null | string;
    browser_height: number | null;
    browser_ip?: string;
    browser_width?: number | null;
    session_hash?: null;
    user_agent?: string;
    [k: string]: unknown;
  };
  closed_at: null | string;
  confirmation_number: null | string;
  confirmed: boolean;
  contact_email: string;
  created_at: string;
  currency: string;
  current_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_subtotal_price: string;
  current_subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_discounts: string;
  current_total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_price: string;
  current_total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_tax: string;
  current_total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  customer: {
    accepts_marketing?: boolean;
    accepts_marketing_updated_at?: null | string;
    admin_graphql_api_id: string;
    created_at: null | string;
    currency: string;
    default_address: {
      address1: string;
      address2: null | string;
      city: string;
      company: null | string;
      country: string;
      country_code: string;
      country_name: string;
      customer_id: number;
      default: boolean;
      first_name: null | string;
      id: number;
      last_name: null | string;
      name: string;
      phone: string;
      province: string;
      province_code: string;
      zip: string;
      [k: string]: unknown;
    };
    email: string;
    email_marketing_consent?: {
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    first_name: string;
    id: number;
    last_name: string;
    marketing_opt_in_level?: string;
    multipass_identifier: null | string;
    note: null | string;
    phone: null | string;
    sms_marketing_consent?: null | {
      consent_collected_from: string;
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    state: string;
    tags?: string;
    tax_exempt: boolean;
    tax_exemptions: never[];
    updated_at: null | string;
    verified_email: boolean;
    [k: string]: unknown;
  };
  customer_locale: null | string;
  device_id: null | string;
  discount_applications: {
    allocation_method: string;
    code?: string;
    description?: string;
    target_selection: string;
    target_type: string;
    title?: string;
    type: string;
    value: string;
    value_type: string;
    [k: string]: unknown;
  }[];
  discount_codes: {
    amount: string;
    code: string;
    type: string;
    [k: string]: unknown;
  }[];
  duties_included: boolean;
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: null | string;
  fulfillments: {
    admin_graphql_api_id: string;
    created_at: string;
    id: number;
    line_items: {
      admin_graphql_api_id: string;
      current_quantity?: number;
      discount_allocations: {
        amount: string;
        amount_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        discount_application_index: number;
        [k: string]: unknown;
      }[];
      duties: never[];
      fulfillable_quantity: number;
      fulfillment_service: string;
      fulfillment_status: string;
      gift_card: boolean;
      grams: number;
      id: number;
      name: string;
      pre_tax_price?: string;
      pre_tax_price_set?: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      product_exists: boolean;
      product_id: number;
      properties: never[];
      quantity: number;
      requires_shipping: boolean;
      sku: string;
      tax_lines: {
        channel_liable: boolean;
        price: string;
        price_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        rate: number;
        title: string;
        [k: string]: unknown;
      }[];
      taxable: boolean;
      title: string;
      total_discount: string;
      total_discount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      variant_id: number;
      variant_inventory_management: null | string;
      variant_title: null | string;
      vendor: string;
      [k: string]: unknown;
    }[];
    location_id: number;
    name: string;
    order_id: number;
    origin_address: {
      [k: string]: unknown;
    };
    receipt: {
      [k: string]: unknown;
    };
    service: string;
    shipment_status: null | string;
    status: string;
    tracking_company: null | string;
    tracking_number: null | string;
    tracking_numbers: string[];
    tracking_url: null | string;
    tracking_urls: string[];
    updated_at: string;
    [k: string]: unknown;
  }[];
  id: number;
  landing_site: null | string;
  landing_site_ref: null | string;
  line_items: {
    admin_graphql_api_id: string;
    attributed_staffs: {
      id: string;
      quantity: number;
      [k: string]: unknown;
    }[];
    current_quantity: number;
    discount_allocations: {
      amount: string;
      amount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      discount_application_index: number;
      [k: string]: unknown;
    }[];
    duties: never[];
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: null | string;
    gift_card: boolean;
    grams: number;
    id: number;
    name: string;
    pre_tax_price?: string;
    pre_tax_price_set?: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    product_exists: boolean;
    product_id: number;
    properties: {
      name: string;
      value: string;
      [k: string]: unknown;
    }[];
    quantity: number;
    requires_shipping: boolean;
    sales_line_item_group_id?: number | null;
    sku: string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    variant_id: number | null;
    variant_inventory_management: null | string;
    variant_title: null | string;
    vendor: null | string;
    [k: string]: unknown;
  }[];
  location_id: number | null;
  merchant_business_entity_id: string;
  merchant_of_record_app_id: number | null;
  name: string;
  note: null | string;
  note_attributes: {
    name: string;
    value: string;
    [k: string]: unknown;
  }[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  original_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  payment_gateway_names: string[];
  payment_terms: null | string;
  phone: null | string;
  po_number: null | string;
  presentment_currency: string;
  processed_at: string;
  reference: null | string;
  referring_site: null | string;
  refunds: never[];
  returns: never[];
  shipping_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  shipping_lines: {
    carrier_identifier: null | string;
    code: null | string;
    current_discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    discount_allocations: never[];
    discounted_price: string;
    discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    id: number;
    is_removed: boolean;
    phone: null | string;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    requested_fulfillment_service_id: null;
    source: null | string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    title: string;
    [k: string]: unknown;
  }[];
  source_identifier: null | string;
  source_name: string;
  source_url: null | string;
  subtotal_price: string;
  subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  tags: string;
  tax_exempt: boolean;
  tax_lines: {
    channel_liable: boolean;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    rate: number;
    title: string;
    [k: string]: unknown;
  }[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_cash_rounding_payment_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_cash_rounding_refund_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_discounts: string;
  total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_line_items_price: string;
  total_line_items_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_outstanding: string;
  total_price: string;
  total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tax: string;
  total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tip_received: string;
  total_weight: number;
  updated_at: string;
  user_id: number | null;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "orders/create" topic
 */
export interface ShopifyOrdersCreateTrigger extends ShopifyWebhookActionTrigger {
  topic: "orders/create";
  payload: ShopifyOrdersCreatePayload;
}
/**
 * Shopify webhook payload for the "orders/delete" topic
 */

export interface ShopifyOrdersDeletePayload {
  id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "orders/delete" topic
 */
export interface ShopifyOrdersDeleteTrigger extends ShopifyWebhookActionTrigger {
  topic: "orders/delete";
  payload: ShopifyOrdersDeletePayload;
}
/**
 * Shopify webhook payload for the "orders/paid" topic
 */

export interface ShopifyOrdersPaidPayload {
  admin_graphql_api_id: string;
  app_id: number | null;
  billing_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  browser_ip: null | string;
  buyer_accepts_marketing: boolean;
  cancel_reason: null | string;
  cancelled_at: null | string;
  cart_token: null | string;
  checkout_id: number | null;
  checkout_token: null | string;
  client_details: null | {
    accept_language: null | string;
    browser_height: number | null;
    browser_ip?: string;
    browser_width?: number | null;
    session_hash?: null;
    user_agent?: string;
    [k: string]: unknown;
  };
  closed_at: null | string;
  confirmation_number: null | string;
  confirmed: boolean;
  contact_email: string;
  created_at: string;
  currency: string;
  current_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_subtotal_price: string;
  current_subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_discounts: string;
  current_total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_price: string;
  current_total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_tax: string;
  current_total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  customer: {
    accepts_marketing?: boolean;
    accepts_marketing_updated_at?: null | string;
    admin_graphql_api_id: string;
    created_at: null | string;
    currency: string;
    default_address: {
      address1: string;
      address2: null | string;
      city: string;
      company: null | string;
      country: string;
      country_code: string;
      country_name: string;
      customer_id: number;
      default: boolean;
      first_name: null | string;
      id: number;
      last_name: null | string;
      name: string;
      phone: string;
      province: string;
      province_code: string;
      zip: string;
      [k: string]: unknown;
    };
    email: string;
    email_marketing_consent?: {
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    first_name: string;
    id: number;
    last_name: string;
    marketing_opt_in_level?: string;
    multipass_identifier: null | string;
    note: null | string;
    phone: null | string;
    sms_marketing_consent?: null | {
      consent_collected_from: string;
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    state: string;
    tags?: string;
    tax_exempt: boolean;
    tax_exemptions: never[];
    updated_at: null | string;
    verified_email: boolean;
    [k: string]: unknown;
  };
  customer_locale: null | string;
  device_id: null | string;
  discount_applications: {
    allocation_method: string;
    code?: string;
    description?: string;
    target_selection: string;
    target_type: string;
    title?: string;
    type: string;
    value: string;
    value_type: string;
    [k: string]: unknown;
  }[];
  discount_codes: {
    amount: string;
    code: string;
    type: string;
    [k: string]: unknown;
  }[];
  duties_included: boolean;
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: null | string;
  fulfillments: {
    admin_graphql_api_id: string;
    created_at: string;
    id: number;
    line_items: {
      admin_graphql_api_id: string;
      current_quantity?: number;
      discount_allocations: {
        amount: string;
        amount_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        discount_application_index: number;
        [k: string]: unknown;
      }[];
      duties: never[];
      fulfillable_quantity: number;
      fulfillment_service: string;
      fulfillment_status: string;
      gift_card: boolean;
      grams: number;
      id: number;
      name: string;
      pre_tax_price?: string;
      pre_tax_price_set?: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      product_exists: boolean;
      product_id: number;
      properties: never[];
      quantity: number;
      requires_shipping: boolean;
      sku: string;
      tax_lines: {
        channel_liable: boolean;
        price: string;
        price_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        rate: number;
        title: string;
        [k: string]: unknown;
      }[];
      taxable: boolean;
      title: string;
      total_discount: string;
      total_discount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      variant_id: number;
      variant_inventory_management: null | string;
      variant_title: null | string;
      vendor: string;
      [k: string]: unknown;
    }[];
    location_id: number;
    name: string;
    order_id: number;
    origin_address: {
      [k: string]: unknown;
    };
    receipt: {
      [k: string]: unknown;
    };
    service: string;
    shipment_status: null | string;
    status: string;
    tracking_company: null | string;
    tracking_number: null | string;
    tracking_numbers: string[];
    tracking_url: null | string;
    tracking_urls: string[];
    updated_at: string;
    [k: string]: unknown;
  }[];
  id: number;
  landing_site: null | string;
  landing_site_ref: null | string;
  line_items: {
    admin_graphql_api_id: string;
    attributed_staffs: {
      id: string;
      quantity: number;
      [k: string]: unknown;
    }[];
    current_quantity: number;
    discount_allocations: {
      amount: string;
      amount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      discount_application_index: number;
      [k: string]: unknown;
    }[];
    duties: never[];
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: null | string;
    gift_card: boolean;
    grams: number;
    id: number;
    name: string;
    pre_tax_price?: string;
    pre_tax_price_set?: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    product_exists: boolean;
    product_id: number;
    properties: {
      name: string;
      value: string;
      [k: string]: unknown;
    }[];
    quantity: number;
    requires_shipping: boolean;
    sales_line_item_group_id?: number | null;
    sku: string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    variant_id: number | null;
    variant_inventory_management: null | string;
    variant_title: null | string;
    vendor: null | string;
    [k: string]: unknown;
  }[];
  location_id: number | null;
  merchant_business_entity_id: string;
  merchant_of_record_app_id: number | null;
  name: string;
  note: null | string;
  note_attributes: {
    name: string;
    value: string;
    [k: string]: unknown;
  }[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  original_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  payment_gateway_names: string[];
  payment_terms: null | string;
  phone: null | string;
  po_number: null | string;
  presentment_currency: string;
  processed_at: string;
  reference: null | string;
  referring_site: null | string;
  refunds: never[];
  returns: never[];
  shipping_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  shipping_lines: {
    carrier_identifier: null | string;
    code: null | string;
    current_discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    discount_allocations: never[];
    discounted_price: string;
    discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    id: number;
    is_removed: boolean;
    phone: null | string;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    requested_fulfillment_service_id: null;
    source: null | string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    title: string;
    [k: string]: unknown;
  }[];
  source_identifier: null | string;
  source_name: string;
  source_url: null | string;
  subtotal_price: string;
  subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  tags: string;
  tax_exempt: boolean;
  tax_lines: {
    channel_liable: boolean;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    rate: number;
    title: string;
    [k: string]: unknown;
  }[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_cash_rounding_payment_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_cash_rounding_refund_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_discounts: string;
  total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_line_items_price: string;
  total_line_items_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_outstanding: string;
  total_price: string;
  total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tax: string;
  total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tip_received: string;
  total_weight: number;
  updated_at: string;
  user_id: number | null;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "orders/paid" topic
 */
export interface ShopifyOrdersPaidTrigger extends ShopifyWebhookActionTrigger {
  topic: "orders/paid";
  payload: ShopifyOrdersPaidPayload;
}
/**
 * Shopify webhook payload for the "orders/risk_assessment_changed" topic
 */

export interface ShopifyOrdersRiskAssessmentChangedPayload {
  admin_graphql_api_order_id: null | string;
  created_at: null | string;
  order_id: null | string;
  provider_id: number | null;
  provider_title: null | string;
  risk_level: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "orders/risk_assessment_changed" topic
 */
export interface ShopifyOrdersRiskAssessmentChangedTrigger extends ShopifyWebhookActionTrigger {
  topic: "orders/risk_assessment_changed";
  payload: ShopifyOrdersRiskAssessmentChangedPayload;
}
/**
 * Shopify webhook payload for the "orders/updated" topic
 */

export interface ShopifyOrdersUpdatedPayload {
  admin_graphql_api_id: string;
  app_id: number | null;
  billing_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  browser_ip: null | string;
  buyer_accepts_marketing: boolean;
  cancel_reason: null | string;
  cancelled_at: null | string;
  cart_token: null | string;
  checkout_id: number | null;
  checkout_token: null | string;
  client_details: null | {
    accept_language: null | string;
    browser_height: number | null;
    browser_ip?: string;
    browser_width?: number | null;
    session_hash?: null;
    user_agent?: string;
    [k: string]: unknown;
  };
  closed_at: null | string;
  confirmation_number: null | string;
  confirmed: boolean;
  contact_email: string;
  created_at: string;
  currency: string;
  current_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_subtotal_price: string;
  current_subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_discounts: string;
  current_total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_price: string;
  current_total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  current_total_tax: string;
  current_total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  customer: {
    accepts_marketing?: boolean;
    accepts_marketing_updated_at?: null | string;
    admin_graphql_api_id: string;
    created_at: null | string;
    currency: string;
    default_address: {
      address1: string;
      address2: null | string;
      city: string;
      company: null | string;
      country: string;
      country_code: string;
      country_name: string;
      customer_id: number;
      default: boolean;
      first_name: null | string;
      id: number;
      last_name: null | string;
      name: string;
      phone: string;
      province: string;
      province_code: string;
      zip: string;
      [k: string]: unknown;
    };
    email: string;
    email_marketing_consent?: {
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    first_name: string;
    id: number;
    last_name: string;
    marketing_opt_in_level?: string;
    multipass_identifier: null | string;
    note: null | string;
    phone: null | string;
    sms_marketing_consent?: null | {
      consent_collected_from: string;
      consent_updated_at: null | string;
      opt_in_level: string;
      state: string;
      [k: string]: unknown;
    };
    state: string;
    tags?: string;
    tax_exempt: boolean;
    tax_exemptions: never[];
    updated_at: null | string;
    verified_email: boolean;
    [k: string]: unknown;
  };
  customer_locale: null | string;
  device_id: null | string;
  discount_applications: {
    allocation_method: string;
    code?: string;
    description?: string;
    target_selection: string;
    target_type: string;
    title?: string;
    type: string;
    value: string;
    value_type: string;
    [k: string]: unknown;
  }[];
  discount_codes: {
    amount: string;
    code: string;
    type: string;
    [k: string]: unknown;
  }[];
  duties_included: boolean;
  email: string;
  estimated_taxes: boolean;
  financial_status: string;
  fulfillment_status: null | string;
  fulfillments: {
    admin_graphql_api_id: string;
    created_at: string;
    id: number;
    line_items: {
      admin_graphql_api_id: string;
      current_quantity?: number;
      discount_allocations: {
        amount: string;
        amount_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        discount_application_index: number;
        [k: string]: unknown;
      }[];
      duties: never[];
      fulfillable_quantity: number;
      fulfillment_service: string;
      fulfillment_status: string;
      gift_card: boolean;
      grams: number;
      id: number;
      name: string;
      pre_tax_price?: string;
      pre_tax_price_set?: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      product_exists: boolean;
      product_id: number;
      properties: never[];
      quantity: number;
      requires_shipping: boolean;
      sku: string;
      tax_lines: {
        channel_liable: boolean;
        price: string;
        price_set: {
          presentment_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          shop_money: {
            amount: string;
            currency_code: string;
            [k: string]: unknown;
          };
          [k: string]: unknown;
        };
        rate: number;
        title: string;
        [k: string]: unknown;
      }[];
      taxable: boolean;
      title: string;
      total_discount: string;
      total_discount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      variant_id: number;
      variant_inventory_management: null | string;
      variant_title: null | string;
      vendor: string;
      [k: string]: unknown;
    }[];
    location_id: number;
    name: string;
    order_id: number;
    origin_address: {
      [k: string]: unknown;
    };
    receipt: {
      [k: string]: unknown;
    };
    service: string;
    shipment_status: null | string;
    status: string;
    tracking_company: null | string;
    tracking_number: null | string;
    tracking_numbers: string[];
    tracking_url: null | string;
    tracking_urls: string[];
    updated_at: string;
    [k: string]: unknown;
  }[];
  id: number;
  landing_site: null | string;
  landing_site_ref: null | string;
  line_items: {
    admin_graphql_api_id: string;
    attributed_staffs: {
      id: string;
      quantity: number;
      [k: string]: unknown;
    }[];
    current_quantity: number;
    discount_allocations: {
      amount: string;
      amount_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      discount_application_index: number;
      [k: string]: unknown;
    }[];
    duties: never[];
    fulfillable_quantity: number;
    fulfillment_service: string;
    fulfillment_status: null | string;
    gift_card: boolean;
    grams: number;
    id: number;
    name: string;
    pre_tax_price?: string;
    pre_tax_price_set?: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    product_exists: boolean;
    product_id: number;
    properties: {
      name: string;
      value: string;
      [k: string]: unknown;
    }[];
    quantity: number;
    requires_shipping: boolean;
    sales_line_item_group_id?: number | null;
    sku: string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    taxable: boolean;
    title: string;
    total_discount: string;
    total_discount_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    variant_id: number | null;
    variant_inventory_management: null | string;
    variant_title: null | string;
    vendor: null | string;
    [k: string]: unknown;
  }[];
  location_id: number | null;
  merchant_business_entity_id: string;
  merchant_of_record_app_id: number | null;
  name: string;
  note: null | string;
  note_attributes: {
    name: string;
    value: string;
    [k: string]: unknown;
  }[];
  number: number;
  order_number: number;
  order_status_url: string;
  original_total_additional_fees_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  original_total_duties_set: null | {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  payment_gateway_names: string[];
  payment_terms: null | string;
  phone: null | string;
  po_number: null | string;
  presentment_currency: string;
  processed_at: string;
  reference: null | string;
  referring_site: null | string;
  refunds: never[];
  returns: never[];
  shipping_address: {
    address1: string;
    address2: null | string;
    city: string;
    company: null | string;
    country: string;
    country_code: string;
    first_name: string;
    last_name: string;
    latitude: null | number;
    longitude: null | number;
    name: string;
    phone: string;
    province: string;
    province_code: string;
    zip: string;
    [k: string]: unknown;
  };
  shipping_lines: {
    carrier_identifier: null | string;
    code: null | string;
    current_discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    discount_allocations: never[];
    discounted_price: string;
    discounted_price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    id: number;
    is_removed: boolean;
    phone: null | string;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    requested_fulfillment_service_id: null;
    source: null | string;
    tax_lines: {
      channel_liable: boolean;
      price: string;
      price_set: {
        presentment_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        shop_money: {
          amount: string;
          currency_code: string;
          [k: string]: unknown;
        };
        [k: string]: unknown;
      };
      rate: number;
      title: string;
      [k: string]: unknown;
    }[];
    title: string;
    [k: string]: unknown;
  }[];
  source_identifier: null | string;
  source_name: string;
  source_url: null | string;
  subtotal_price: string;
  subtotal_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  tags: string;
  tax_exempt: boolean;
  tax_lines: {
    channel_liable: boolean;
    price: string;
    price_set: {
      presentment_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      shop_money: {
        amount: string;
        currency_code: string;
        [k: string]: unknown;
      };
      [k: string]: unknown;
    };
    rate: number;
    title: string;
    [k: string]: unknown;
  }[];
  taxes_included: boolean;
  test: boolean;
  token: string;
  total_cash_rounding_payment_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_cash_rounding_refund_adjustment_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_discounts: string;
  total_discounts_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_line_items_price: string;
  total_line_items_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_outstanding: string;
  total_price: string;
  total_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_shipping_price_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tax: string;
  total_tax_set: {
    presentment_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    shop_money: {
      amount: string;
      currency_code: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  total_tip_received: string;
  total_weight: number;
  updated_at: string;
  user_id: number | null;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "orders/updated" topic
 */
export interface ShopifyOrdersUpdatedTrigger extends ShopifyWebhookActionTrigger {
  topic: "orders/updated";
  payload: ShopifyOrdersUpdatedPayload;
}
/**
 * Shopify webhook payload for the "products/create" topic
 */

export interface ShopifyProductsCreatePayload {
  admin_graphql_api_id: string;
  body_html: string;
  category: null | {
    admin_graphql_api_id: string;
    full_name: string;
    name: string;
    [k: string]: unknown;
  };
  created_at: null | string;
  handle: string;
  has_variants_that_requires_components: boolean;
  id: number;
  image: {
    admin_graphql_api_id: string;
    alt: null | string;
    created_at: string;
    height: number;
    id: number;
    position: number;
    product_id: number;
    src: string;
    updated_at: string;
    variant_ids: number[];
    width: number;
    [k: string]: unknown;
  };
  images: {
    admin_graphql_api_id: string;
    alt: null | string;
    created_at: string;
    height: number;
    id: number;
    position: number;
    product_id: number;
    src: string;
    updated_at: string;
    variant_ids: number[];
    width: number;
    [k: string]: unknown;
  }[];
  media: {
    admin_graphql_api_id: string;
    alt: string;
    created_at: string;
    id: number;
    media_content_type: string;
    position: number;
    preview_image: {
      height: number;
      src: string;
      status: string;
      width: number;
      [k: string]: unknown;
    };
    product_id: number;
    status: string;
    updated_at: string;
    variant_ids: never[];
    [k: string]: unknown;
  }[];
  options: {
    id: number;
    name: string;
    position: number;
    product_id: number;
    values: string[];
    [k: string]: unknown;
  }[];
  product_type: string;
  published_at: null | string;
  published_scope: string;
  status: string;
  tags: string;
  template_suffix: null | string;
  title: string;
  updated_at: string;
  variant_gids: {
    admin_graphql_api_id: string;
    updated_at: string;
    [k: string]: unknown;
  }[];
  variants: {
    admin_graphql_api_id: string;
    barcode: null | string;
    compare_at_price: null | string;
    created_at: string;
    fulfillment_service?: string;
    grams?: number;
    id: number;
    image_id: number | null;
    inventory_item_id: number | null;
    inventory_management?: string;
    inventory_policy: string;
    inventory_quantity: number;
    old_inventory_quantity: number;
    option1: string;
    option2: null | string;
    option3: null | string;
    position: number;
    price: string;
    product_id: number;
    requires_shipping?: boolean;
    sku: null | string;
    taxable: boolean;
    title: string;
    updated_at: string;
    weight?: number;
    weight_unit?: string;
    [k: string]: unknown;
  }[];
  vendor: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "products/create" topic
 */
export interface ShopifyProductsCreateTrigger extends ShopifyWebhookActionTrigger {
  topic: "products/create";
  payload: ShopifyProductsCreatePayload;
}
/**
 * Shopify webhook payload for the "products/delete" topic
 */

export interface ShopifyProductsDeletePayload {
  id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "products/delete" topic
 */
export interface ShopifyProductsDeleteTrigger extends ShopifyWebhookActionTrigger {
  topic: "products/delete";
  payload: ShopifyProductsDeletePayload;
}
/**
 * Shopify webhook payload for the "products/update" topic
 */

export interface ShopifyProductsUpdatePayload {
  admin_graphql_api_id: string;
  body_html: string;
  category: null | {
    admin_graphql_api_id: string;
    full_name: string;
    name: string;
    [k: string]: unknown;
  };
  created_at: null | string;
  handle: string;
  has_variants_that_requires_components: boolean;
  id: number;
  image: {
    admin_graphql_api_id: string;
    alt: null | string;
    created_at: string;
    height: number;
    id: number;
    position: number;
    product_id: number;
    src: string;
    updated_at: string;
    variant_ids: number[];
    width: number;
    [k: string]: unknown;
  };
  images: {
    admin_graphql_api_id: string;
    alt: null | string;
    created_at: string;
    height: number;
    id: number;
    position: number;
    product_id: number;
    src: string;
    updated_at: string;
    variant_ids: number[];
    width: number;
    [k: string]: unknown;
  }[];
  media: {
    admin_graphql_api_id: string;
    alt: string;
    created_at: string;
    id: number;
    media_content_type: string;
    position: number;
    preview_image: {
      height: number;
      src: string;
      status: string;
      width: number;
      [k: string]: unknown;
    };
    product_id: number;
    status: string;
    updated_at: string;
    variant_ids: never[];
    [k: string]: unknown;
  }[];
  options: {
    id: number;
    name: string;
    position: number;
    product_id: number;
    values: string[];
    [k: string]: unknown;
  }[];
  product_type: string;
  published_at: null | string;
  published_scope: string;
  status: string;
  tags: string;
  template_suffix: null | string;
  title: string;
  updated_at: string;
  variant_gids: {
    admin_graphql_api_id: string;
    updated_at: string;
    [k: string]: unknown;
  }[];
  variants: {
    admin_graphql_api_id: string;
    barcode: null | string;
    compare_at_price: null | string;
    created_at: string;
    fulfillment_service?: string;
    grams?: number;
    id: number;
    image_id: number | null;
    inventory_item_id: number | null;
    inventory_management?: string;
    inventory_policy: string;
    inventory_quantity: number;
    old_inventory_quantity: number;
    option1: string;
    option2: null | string;
    option3: null | string;
    position: number;
    price: string;
    product_id: number;
    requires_shipping?: boolean;
    sku: null | string;
    taxable: boolean;
    title: string;
    updated_at: string;
    weight?: number;
    weight_unit?: string;
    [k: string]: unknown;
  }[];
  vendor: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "products/update" topic
 */
export interface ShopifyProductsUpdateTrigger extends ShopifyWebhookActionTrigger {
  topic: "products/update";
  payload: ShopifyProductsUpdatePayload;
}
/**
 * Shopify webhook payload for the "shop/redact" topic
 */

export interface ShopifyShopRedactPayload {
  shop_domain: string;
  shop_id: number;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "shop/redact" topic
 */
export interface ShopifyShopRedactTrigger extends ShopifyWebhookActionTrigger {
  topic: "shop/redact";
  payload: ShopifyShopRedactPayload;
}
/**
 * Shopify webhook payload for the "shop/update" topic
 */

export interface ShopifyShopUpdatePayload {
  address1: string;
  address2: null | string;
  auto_configure_tax_inclusivity: boolean | null;
  checkout_api_supported: boolean;
  city: string;
  country: string;
  country_code: string;
  country_name: string;
  county_taxes: boolean | null;
  created_at: null | string;
  currency: string;
  customer_email: string;
  domain: null | string;
  eligible_for_payments: boolean;
  email: string;
  enabled_presentment_currencies: string[];
  finances: boolean;
  google_apps_domain: null | string;
  google_apps_login_enabled: boolean | null;
  has_discounts: boolean;
  has_gift_cards: boolean;
  has_storefront: boolean;
  iana_timezone: null | string;
  id: number;
  latitude: null | number;
  longitude: null | number;
  marketing_sms_consent_enabled_at_checkout: boolean;
  money_format: string;
  money_in_emails_format: string;
  money_with_currency_format: string;
  money_with_currency_in_emails_format: string;
  multi_location_enabled: boolean;
  myshopify_domain: null | string;
  name: string;
  password_enabled: boolean | null;
  phone: string;
  plan_display_name: string;
  plan_name: string;
  pre_launch_enabled: boolean;
  primary_locale: string;
  primary_location_id: number;
  province: string;
  province_code: null | string;
  requires_extra_payments_agreement: boolean;
  setup_required: boolean;
  shop_owner: string;
  source: null | string;
  tax_shipping: boolean | null;
  taxes_included: boolean | null;
  timezone: string;
  transactional_sms_disabled: boolean;
  updated_at: null | string;
  weight_unit: string;
  zip: string;
  [k: string]: unknown;
}

/**
 * Shopify webhook payload for the "shop/update" topic
 */
export interface ShopifyShopUpdateTrigger extends ShopifyWebhookActionTrigger {
  topic: "shop/update";
  payload: ShopifyShopUpdatePayload;
}

/**
 * Union type of all Shopify webhook payloads
 */
export type ShopifyWebhookTrigger = ShopifyAppUninstalledTrigger | ShopifyCheckoutsCreateTrigger | ShopifyCheckoutsDeleteTrigger | ShopifyCheckoutsUpdateTrigger | ShopifyCustomersDataRequestTrigger | ShopifyCustomersRedactTrigger | ShopifyOrdersCreateTrigger | ShopifyOrdersDeleteTrigger | ShopifyOrdersPaidTrigger | ShopifyOrdersRiskAssessmentChangedTrigger | ShopifyOrdersUpdatedTrigger | ShopifyProductsCreateTrigger | ShopifyProductsDeleteTrigger | ShopifyProductsUpdateTrigger | ShopifyShopRedactTrigger | ShopifyShopUpdateTrigger;

/**
 * Shopify webhook payload for a specific topic
 */
export type ShopifyWebhookTriggerForTopic<T extends string> = Extract<ShopifyWebhookTrigger, { topic: T }>;
