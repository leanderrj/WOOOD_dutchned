/**
 * Internal variable to indicate the framework version this package is built with.
 * @internal
 */ export const frameworkVersion = "^1.4.0";
/**
 * Internal variable to store model blobs with GraphQL typename as the key, and use them in the action code functions.
 * @internal
 */ export const modelsMap = {
    "Session": {
        "key": "pbs4uc7F3krp",
        "name": "session",
        "apiIdentifier": "session",
        "namespace": [],
        "fields": {
            "pbs4uc7F3krp-system-id": {
                "fieldType": "ID",
                "key": "pbs4uc7F3krp-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "r_BPkhBQJR-j",
                    "createdDate": "2025-06-21T23:44:03.333Z"
                },
                "internalWritable": true
            },
            "pbs4uc7F3krp-system-createdAt": {
                "fieldType": "DateTime",
                "key": "pbs4uc7F3krp-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "3ybOjTd75oBP",
                    "createdDate": "2025-06-21T23:44:03.334Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "pbs4uc7F3krp-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "pbs4uc7F3krp-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "khmbaUu9GQ1C",
                    "createdDate": "2025-06-21T23:44:03.334Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "vUiUakp_Yd6N": {
                "fieldType": "RoleAssignments",
                "key": "vUiUakp_Yd6N",
                "name": "roles",
                "apiIdentifier": "roles",
                "configuration": {
                    "type": "RoleAssignmentsConfig",
                    "key": "SnqxB5U250su",
                    "createdDate": "2025-06-21T23:44:03.345Z",
                    "default": [
                        "unauthenticated"
                    ]
                },
                "internalWritable": true
            },
            "Model-Field-Belongs-To-Shop": {
                "fieldType": "BelongsTo",
                "key": "Model-Field-Belongs-To-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "Fh9ko29VKdwD",
                    "createdDate": "2025-06-21T23:45:29.239Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "Model-Field-Shopify-SID": {
                "fieldType": "String",
                "key": "Model-Field-Shopify-SID",
                "name": "Shopify SID",
                "apiIdentifier": "shopifySID",
                "configuration": {
                    "type": "StringConfig",
                    "key": "LfR6B5bMzf_Q",
                    "createdDate": "2025-06-21T23:45:29.239Z",
                    "default": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "Session",
        "stateChart": {
            "type": "StateChart",
            "key": "la2k6dG-yWqZ",
            "createdDate": 1750549443335,
            "actions": {},
            "transitions": {},
            "stateInActionCode": false,
            "childStates": []
        }
    },
    "ShopifyGdprRequest": {
        "key": "DataModel-Shopify-GdprRequest",
        "name": "shopifyGdprRequest",
        "apiIdentifier": "shopifyGdprRequest",
        "namespace": [],
        "fields": {
            "DataModel-Shopify-GdprRequest-system-id": {
                "fieldType": "ID",
                "key": "DataModel-Shopify-GdprRequest-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "DU6QCql-vZ6_",
                    "createdDate": "2025-06-21T23:45:29.058Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-GdprRequest-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-GdprRequest-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "aGoicDVBePgc",
                    "createdDate": "2025-06-21T23:45:29.059Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-GdprRequest-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-GdprRequest-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "mUxs24gGnH2x",
                    "createdDate": "2025-06-21T23:45:29.059Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-GdprRequest-Payload": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-GdprRequest-Payload",
                "name": "Payload",
                "apiIdentifier": "payload",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "FL_mBjAi2hGf",
                    "createdDate": "2025-06-21T23:45:29.059Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-GdprRequest-Topic": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-GdprRequest-Topic",
                "name": "Topic",
                "apiIdentifier": "topic",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "CXk7nfAsflmu",
                    "createdDate": "2025-06-21T23:45:29.059Z",
                    "allowMultiple": false,
                    "allowOther": false,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "6zHOw5LHYu0T",
                            "createdDate": 1750549529059,
                            "name": "customers/data_request",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Nc_3j0kQIhBz",
                            "createdDate": 1750549529059,
                            "name": "customers/redact",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "woN0PDwi_gho",
                            "createdDate": 1750549529059,
                            "name": "shop/redact",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-GdprRequest-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-GdprRequest-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "R7DBBQDh3eeY",
                    "createdDate": "2025-06-21T23:45:29.059Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyGdprRequest",
        "stateChart": {
            "type": "StateChart",
            "key": "tRVWMaE0yzwl",
            "createdDate": 1750549529055,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-GdprRequest-Start",
                    "createdDate": 1750549529055,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-GdprRequest-Created",
                    "createdDate": 1750549529055,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-GdprRequest-Deleted",
                    "createdDate": 1750549529055,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-GdprRequest-Start"
        }
    },
    "ShopifyProduct": {
        "key": "DataModel-Shopify-Product",
        "name": "shopifyProduct",
        "apiIdentifier": "shopifyProduct",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-Product-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-Product-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "ILQwyNo2iU2O",
                    "createdDate": "2025-06-21T23:45:29.167Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Product-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Product-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "_mJ4o2zsMKNB",
                    "createdDate": "2025-06-21T23:45:29.167Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Product-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Product-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "zHStT9uQ1vNh",
                    "createdDate": "2025-06-21T23:45:29.167Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-__gadget_graphql_category": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Product-__gadget_graphql_category",
                "name": "Category",
                "apiIdentifier": "category",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "IrkBRSVSpQjX",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-__gadget_graphql_compare_at_price_range": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Product-__gadget_graphql_compare_at_price_range",
                "name": "Compare At Price Range",
                "apiIdentifier": "compareAtPriceRange",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "X6Do7N5qyXhy",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-__gadget_graphql_has_variants_that_requires_components": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Product-__gadget_graphql_has_variants_that_requires_components",
                "name": "Has Variants That Requires Components",
                "apiIdentifier": "hasVariantsThatRequiresComponents",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "QKAv4bsyEN1E",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-__gadget_graphql_product_category": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Product-__gadget_graphql_product_category",
                "name": "Product Category",
                "apiIdentifier": "productCategory",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "7ZOazKfbk3Oz",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-body_html": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-body_html",
                "name": "Body",
                "apiIdentifier": "body",
                "configuration": {
                    "type": "StringConfig",
                    "key": "dSb9Z1-IgkVj",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-created_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Product-created_at",
                "name": "Shopify Created At",
                "apiIdentifier": "shopifyCreatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "mOk0JWUHG5dZ",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-handle": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-handle",
                "name": "Handle",
                "apiIdentifier": "handle",
                "configuration": {
                    "type": "StringConfig",
                    "key": "6mStaqCdBaHE",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-product_type": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-product_type",
                "name": "Product Type",
                "apiIdentifier": "productType",
                "configuration": {
                    "type": "StringConfig",
                    "key": "0xzwIs-LIWwB",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-published_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Product-published_at",
                "name": "Published At",
                "apiIdentifier": "publishedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "DD1sJpBjRQwO",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-status": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Product-status",
                "name": "Status",
                "apiIdentifier": "status",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "6UxWgTXa5jBK",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "8s_z_t7H42hB",
                            "createdDate": 1750549529169,
                            "name": "ACTIVE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2GCRol_-DdZv",
                            "createdDate": 1750549529169,
                            "name": "ARCHIVED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ApfsSFfonSsG",
                            "createdDate": 1750549529169,
                            "name": "DRAFT",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-tags": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Product-tags",
                "name": "Tags",
                "apiIdentifier": "tags",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "NUJocmcUJ8TT",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-template_suffix": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-template_suffix",
                "name": "Template Suffix",
                "apiIdentifier": "templateSuffix",
                "configuration": {
                    "type": "StringConfig",
                    "key": "_FP5h2ViZ5pR",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-title": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-title",
                "name": "Title",
                "apiIdentifier": "title",
                "configuration": {
                    "type": "StringConfig",
                    "key": "iGDJSSqlIFkk",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Product-updated_at",
                "name": "Shopify Updated At",
                "apiIdentifier": "shopifyUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "XcSa4SuzujHv",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-vendor": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-vendor",
                "name": "Vendor",
                "apiIdentifier": "vendor",
                "configuration": {
                    "type": "StringConfig",
                    "key": "nMA9KUfCycD-",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Product-CheckoutLineItems": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Product-CheckoutLineItems",
                "name": "Checkout Line Items",
                "apiIdentifier": "checkoutLineItems",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "YjiBNg-lCShJ",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "relatedModelKey": "DataModel-Shopify-CheckoutLineItem",
                    "inverseFieldKey": "ModelField-Shopify-CheckoutLineItem-Product",
                    "relatedModelApiIdentifier": "shopifyCheckoutLineItem",
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Product-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Product-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "BxdTFkFPvJfL",
                    "createdDate": "2025-06-21T23:45:29.169Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": "shopifyShop"
                },
                "internalWritable": true
            },
            "Qi9KlM6EmrO9": {
                "fieldType": "String",
                "key": "Qi9KlM6EmrO9",
                "name": "shippingMethod2",
                "apiIdentifier": "shippingMethod2",
                "configuration": {
                    "type": "StringConfig",
                    "key": "NTS4jkM1QXHw",
                    "createdDate": "2025-06-24T17:07:49.289Z",
                    "default": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyProduct",
        "stateChart": {
            "type": "StateChart",
            "key": "DIcBiPT4Idkl",
            "createdDate": 1750549529166,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Product-Start",
                    "createdDate": 1750549529166,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Product-Created",
                    "createdDate": 1750549529166,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Product-Deleted",
                    "createdDate": 1750549529166,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Product-Start"
        }
    },
    "ShopifyShop": {
        "key": "DataModel-Shopify-Shop",
        "name": "shopifyShop",
        "apiIdentifier": "shopifyShop",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-Shop-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-Shop-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "ksciOBfaXyMs",
                    "createdDate": "2025-06-21T23:45:28.950Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Shop-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Shop-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "LADrf8ug7tsF",
                    "createdDate": "2025-06-21T23:45:28.950Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Shop-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Shop-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "bPqOAsxWgGsg",
                    "createdDate": "2025-06-21T23:45:28.950Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Shop-system-state": {
                "fieldType": "RecordState",
                "key": "DataModel-Shopify-Shop-system-state",
                "name": "State",
                "apiIdentifier": "state",
                "configuration": {
                    "type": "RecordStateConfig",
                    "key": "aSexHm_CFZUu",
                    "createdDate": "2025-06-21T23:45:28.950Z"
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_alerts": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_alerts",
                "name": "Alerts",
                "apiIdentifier": "alerts",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "Z8ZVExZw_iRh",
                    "createdDate": "2025-06-21T23:45:28.969Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_billing_address": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_billing_address",
                "name": "Billing Address",
                "apiIdentifier": "billingAddress",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "Cz2d6bB3Aek_",
                    "createdDate": "2025-06-21T23:45:28.969Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_checkout_api_supported": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_checkout_api_supported",
                "name": "Checkout API Supported",
                "apiIdentifier": "checkoutApiSupported",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "BxVYfkUesAoD",
                    "createdDate": "2025-06-21T23:45:28.951Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_countries_in_shipping_zones": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_countries_in_shipping_zones",
                "name": "Countries In Shipping Zones",
                "apiIdentifier": "countriesInShippingZones",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "ob1n5K3QhNb1",
                    "createdDate": "2025-06-21T23:45:28.970Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_currency_formats": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_currency_formats",
                "name": "Currency Formats",
                "apiIdentifier": "currencyFormats",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "SU6OOG2O7YKa",
                    "createdDate": "2025-06-21T23:45:28.970Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_customer_accounts": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_customer_accounts",
                "name": "Customer Accounts",
                "apiIdentifier": "customerAccounts",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "9WP6mRFnUdkB",
                    "createdDate": "2025-06-21T23:45:28.970Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "Us8b_AK_PVmm",
                            "createdDate": 1750549528970,
                            "name": "DISABLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "EG6Hoa6lTVTA",
                            "createdDate": 1750549528970,
                            "name": "OPTIONAL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DQMJ0NYrzHnv",
                            "createdDate": 1750549528970,
                            "name": "REQUIRED",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_description": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_description",
                "name": "Description",
                "apiIdentifier": "description",
                "configuration": {
                    "type": "StringConfig",
                    "key": "RPgRamAM0oku",
                    "createdDate": "2025-06-21T23:45:28.970Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_order_number_format_prefix": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_order_number_format_prefix",
                "name": "Order Number Format Prefix",
                "apiIdentifier": "orderNumberFormatPrefix",
                "configuration": {
                    "type": "StringConfig",
                    "key": "7DTL4yvXOsBf",
                    "createdDate": "2025-06-21T23:45:28.970Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_order_number_format_suffix": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_order_number_format_suffix",
                "name": "Order Number Format Suffix",
                "apiIdentifier": "orderNumberFormatSuffix",
                "configuration": {
                    "type": "StringConfig",
                    "key": "mnlB37GWhUh2",
                    "createdDate": "2025-06-21T23:45:28.970Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_resource_limits": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_resource_limits",
                "name": "Resource Limits",
                "apiIdentifier": "resourceLimits",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "iphKcG71G_AU",
                    "createdDate": "2025-06-21T23:45:28.970Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_rich_text_editor_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_rich_text_editor_url",
                "name": "Rich Text Edior Url",
                "apiIdentifier": "richTextEdiorUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "9bubNkugzVOB",
                    "createdDate": "2025-06-21T23:45:28.971Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_ships_to_countries": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_ships_to_countries",
                "name": "Ships To Countries",
                "apiIdentifier": "shipsToCountries",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "8VH-As1866vC",
                    "createdDate": "2025-06-21T23:45:28.971Z",
                    "allowMultiple": true,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "SliyMKs1Xef9",
                            "createdDate": 1750549528971,
                            "name": "AC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Q8P6ZF1QW3q5",
                            "createdDate": 1750549528971,
                            "name": "AD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6lSdBdNvBQ0s",
                            "createdDate": 1750549528971,
                            "name": "AE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0ZqvekDgY1h9",
                            "createdDate": 1750549528971,
                            "name": "AF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ui0Qn38Xdi7A",
                            "createdDate": 1750549528971,
                            "name": "AG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rx7kYq7HrdOS",
                            "createdDate": 1750549528971,
                            "name": "AI",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bkMNPdsp1C9x",
                            "createdDate": 1750549528971,
                            "name": "AL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kzIi5FTxKwd6",
                            "createdDate": 1750549528971,
                            "name": "AM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YnBTsVec2lYU",
                            "createdDate": 1750549528971,
                            "name": "AN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2u5pQWQAfeNO",
                            "createdDate": 1750549528971,
                            "name": "AO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cWOpbnnidx6k",
                            "createdDate": 1750549528971,
                            "name": "AR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3pUyDjcbf6gx",
                            "createdDate": 1750549528971,
                            "name": "AT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "24_2Vwxn4sAM",
                            "createdDate": 1750549528971,
                            "name": "AU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "M3aZqNPuYxS2",
                            "createdDate": 1750549528971,
                            "name": "AW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "EB7RzG8nzosA",
                            "createdDate": 1750549528971,
                            "name": "AX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ieNVUSluL2qq",
                            "createdDate": 1750549528971,
                            "name": "AZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hbhUg5rmk1M0",
                            "createdDate": 1750549528971,
                            "name": "BA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eFxtFqytin7Q",
                            "createdDate": 1750549528971,
                            "name": "BB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "A07KUwFKo3SS",
                            "createdDate": 1750549528971,
                            "name": "BD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LL6A4QDKOFqH",
                            "createdDate": 1750549528971,
                            "name": "BE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bMK-E9IphCf0",
                            "createdDate": 1750549528971,
                            "name": "BF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_waF9PvAA-4H",
                            "createdDate": 1750549528971,
                            "name": "BG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jk-fQsmvHyJO",
                            "createdDate": 1750549528971,
                            "name": "BH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7y7FshjXZq2Z",
                            "createdDate": 1750549528971,
                            "name": "BI",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1PnIesCstn2l",
                            "createdDate": 1750549528971,
                            "name": "BJ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kTAznuB3TC1a",
                            "createdDate": 1750549528971,
                            "name": "BL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DpgC4R7Dds72",
                            "createdDate": 1750549528971,
                            "name": "BM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "59EfqBBnM_Ed",
                            "createdDate": 1750549528971,
                            "name": "BN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZDW062nTV1Jg",
                            "createdDate": 1750549528971,
                            "name": "BO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sO6sKrlnZMyl",
                            "createdDate": 1750549528971,
                            "name": "BQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tUug7LgtD0BU",
                            "createdDate": 1750549528971,
                            "name": "BR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "r4xKTHw7AT4c",
                            "createdDate": 1750549528971,
                            "name": "BS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KG37FXmPsrrh",
                            "createdDate": 1750549528971,
                            "name": "BT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "I48Z_vNLv1GK",
                            "createdDate": 1750549528971,
                            "name": "BV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cX4Sh8eUi9Rp",
                            "createdDate": 1750549528971,
                            "name": "BW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UZUKgKWyG5EZ",
                            "createdDate": 1750549528971,
                            "name": "BY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fQFmSj_BnfS1",
                            "createdDate": 1750549528971,
                            "name": "BZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vaBiI5WwBadr",
                            "createdDate": 1750549528971,
                            "name": "CA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LoSFD0kkeZ0E",
                            "createdDate": 1750549528971,
                            "name": "CC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-W9GHj6Vh1B7",
                            "createdDate": 1750549528972,
                            "name": "CD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "c-LImCy_lM1x",
                            "createdDate": 1750549528972,
                            "name": "CF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tWpOz7ahSer1",
                            "createdDate": 1750549528972,
                            "name": "CG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IzsUi27foZ1U",
                            "createdDate": 1750549528972,
                            "name": "CH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZU6Lj4QFVvpl",
                            "createdDate": 1750549528972,
                            "name": "CI",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YrWHyVFisa00",
                            "createdDate": 1750549528972,
                            "name": "CK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lKvlOZ2xrOwx",
                            "createdDate": 1750549528972,
                            "name": "CL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sIVj5uvcrBaY",
                            "createdDate": 1750549528972,
                            "name": "CM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FRWzUelnxEtd",
                            "createdDate": 1750549528972,
                            "name": "CN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "g9Ua7cDUl4-7",
                            "createdDate": 1750549528972,
                            "name": "CO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "t_L1QN-QPt-9",
                            "createdDate": 1750549528972,
                            "name": "CR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3_4dU1u25-oH",
                            "createdDate": 1750549528972,
                            "name": "CU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "oP8eYq5VB7fm",
                            "createdDate": 1750549528972,
                            "name": "CV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9zz81ChEY5Br",
                            "createdDate": 1750549528972,
                            "name": "CW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "v7KGKWhI99cL",
                            "createdDate": 1750549528972,
                            "name": "CX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AEe6KbD2HvjK",
                            "createdDate": 1750549528972,
                            "name": "CY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TU-ffPOh-bZn",
                            "createdDate": 1750549528972,
                            "name": "CZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1HFSPWISoKBO",
                            "createdDate": 1750549528972,
                            "name": "DE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bqMcT6UNDug8",
                            "createdDate": 1750549528972,
                            "name": "DJ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "O_ey19XAbO22",
                            "createdDate": 1750549528972,
                            "name": "DK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u4lVAd4pbawg",
                            "createdDate": 1750549528972,
                            "name": "DM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BFBKoBwydJPv",
                            "createdDate": 1750549528972,
                            "name": "DO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eU9hUGm8B3az",
                            "createdDate": 1750549528972,
                            "name": "DZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "J8j1bflkXTnZ",
                            "createdDate": 1750549528972,
                            "name": "EC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lNahCTHtgGw-",
                            "createdDate": 1750549528972,
                            "name": "EE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1FnZIonaZFv2",
                            "createdDate": 1750549528972,
                            "name": "EG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Cex5-97Gvxxn",
                            "createdDate": 1750549528972,
                            "name": "EH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2NN_ayeFCIPy",
                            "createdDate": 1750549528972,
                            "name": "ER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fxOagd2EbPSy",
                            "createdDate": 1750549528972,
                            "name": "ES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wOiUGsqpE516",
                            "createdDate": 1750549528972,
                            "name": "ET",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hg1_FFoq631c",
                            "createdDate": 1750549528972,
                            "name": "FI",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "g8mZ_S6v49ST",
                            "createdDate": 1750549528972,
                            "name": "FJ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9ytOujM4wrlc",
                            "createdDate": 1750549528972,
                            "name": "FK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "55-nkBq7cwfz",
                            "createdDate": 1750549528972,
                            "name": "FO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sbTzAbcizCy8",
                            "createdDate": 1750549528972,
                            "name": "FR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9Ma7TIDTCmhx",
                            "createdDate": 1750549528972,
                            "name": "GA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "or6ihaEKk87g",
                            "createdDate": 1750549528972,
                            "name": "GB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Z8CJF8M0z7J_",
                            "createdDate": 1750549528972,
                            "name": "GD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YE1FhYZ6m0nD",
                            "createdDate": 1750549528972,
                            "name": "GE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9MkUZE-ZQhAv",
                            "createdDate": 1750549528972,
                            "name": "GF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "k0jV3OstU7UL",
                            "createdDate": 1750549528972,
                            "name": "GG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KSn7svn5H5mh",
                            "createdDate": 1750549528972,
                            "name": "GH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SwNbgTITwJO4",
                            "createdDate": 1750549528972,
                            "name": "GI",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NL30RkwauP1V",
                            "createdDate": 1750549528972,
                            "name": "GL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SZv01P8H96gU",
                            "createdDate": 1750549528972,
                            "name": "GM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UfDLFETRC6NP",
                            "createdDate": 1750549528972,
                            "name": "GN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "A36TsiC_i-GH",
                            "createdDate": 1750549528972,
                            "name": "GP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Cz-UsCZDqTo_",
                            "createdDate": 1750549528972,
                            "name": "GQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GFyNHZyUYkuD",
                            "createdDate": 1750549528972,
                            "name": "GR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "q8kSVUZazVj8",
                            "createdDate": 1750549528972,
                            "name": "GS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KaEnuyGPINkm",
                            "createdDate": 1750549528972,
                            "name": "GT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "boGRV3B-H3qv",
                            "createdDate": 1750549528972,
                            "name": "GW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "EE8HoCz5yE0H",
                            "createdDate": 1750549528972,
                            "name": "GY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "34c1yOZP0__p",
                            "createdDate": 1750549528973,
                            "name": "HK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3AhBndfr27wr",
                            "createdDate": 1750549528973,
                            "name": "HM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JfbAAjoRgtcb",
                            "createdDate": 1750549528973,
                            "name": "HN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0r9Ft1CBqkVu",
                            "createdDate": 1750549528973,
                            "name": "HR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ceds9EW7dvsr",
                            "createdDate": 1750549528973,
                            "name": "HT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LPTYG38-5FtQ",
                            "createdDate": 1750549528973,
                            "name": "HU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ioAOtbX2PC6Q",
                            "createdDate": 1750549528973,
                            "name": "ID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kx0US45BFWu0",
                            "createdDate": 1750549528973,
                            "name": "IE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "S7jq-pFFSTgm",
                            "createdDate": 1750549528973,
                            "name": "IL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0_CCOwPYTojX",
                            "createdDate": 1750549528973,
                            "name": "IM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xKjoqQGIT1tA",
                            "createdDate": 1750549528973,
                            "name": "IN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MHEdY1W5EkQV",
                            "createdDate": 1750549528973,
                            "name": "IO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eRCTSvApWK7j",
                            "createdDate": 1750549528973,
                            "name": "IQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TLCkapWlwuQW",
                            "createdDate": 1750549528973,
                            "name": "IR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pkBjy-fdIHLr",
                            "createdDate": 1750549528973,
                            "name": "IS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6w9y1NSWcEhT",
                            "createdDate": 1750549528973,
                            "name": "IT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3Ull7lV1ElTO",
                            "createdDate": 1750549528973,
                            "name": "JE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JHqgpu3o0Wq1",
                            "createdDate": 1750549528973,
                            "name": "JM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OPzkmdjt9zmB",
                            "createdDate": 1750549528973,
                            "name": "JO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SjQoqbqIrb3z",
                            "createdDate": 1750549528973,
                            "name": "JP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "14hd2NDO8Lc7",
                            "createdDate": 1750549528973,
                            "name": "KE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "X2peoOwcA5zv",
                            "createdDate": 1750549528973,
                            "name": "KG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CE-CTLymrIgk",
                            "createdDate": 1750549528973,
                            "name": "KH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "koc9OMGDTxxO",
                            "createdDate": 1750549528973,
                            "name": "KI",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Hzn_zl9YXcU2",
                            "createdDate": 1750549528973,
                            "name": "KM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wxjZGO3BpKi_",
                            "createdDate": 1750549528973,
                            "name": "KN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gq3EdHNRO2sG",
                            "createdDate": 1750549528973,
                            "name": "KP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mAdTOv812Oeg",
                            "createdDate": 1750549528973,
                            "name": "KR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jKX5LvWjlW11",
                            "createdDate": 1750549528973,
                            "name": "KW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HNfkAPOiJuLn",
                            "createdDate": 1750549528973,
                            "name": "KY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OW4L7Xb6XSnF",
                            "createdDate": 1750549528973,
                            "name": "KZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KBLOH56Q4Yho",
                            "createdDate": 1750549528973,
                            "name": "LA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OYZtJRdrTuwD",
                            "createdDate": 1750549528973,
                            "name": "LB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kVy6QNLJetiY",
                            "createdDate": 1750549528973,
                            "name": "LC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YNf4Gljd8xA6",
                            "createdDate": 1750549528973,
                            "name": "LI",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bcYoId9LS5Xs",
                            "createdDate": 1750549528973,
                            "name": "LK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZoVIsoGfcY-W",
                            "createdDate": 1750549528973,
                            "name": "LR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MwXgK177EB7-",
                            "createdDate": 1750549528973,
                            "name": "LS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "w99zXSBXt0Ra",
                            "createdDate": 1750549528973,
                            "name": "LT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-74BH_sFg6JM",
                            "createdDate": 1750549528973,
                            "name": "LU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Xi-Dix_Kfcil",
                            "createdDate": 1750549528973,
                            "name": "LV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QKh-NI1LEQju",
                            "createdDate": 1750549528973,
                            "name": "LY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VzYlFaFS4vDY",
                            "createdDate": 1750549528973,
                            "name": "MA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rOMSgBLXVbpR",
                            "createdDate": 1750549528973,
                            "name": "MC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gI-TTokbNEq8",
                            "createdDate": 1750549528973,
                            "name": "MD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "f86v84GpIc40",
                            "createdDate": 1750549528973,
                            "name": "ME",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HUqGC_YOFHdO",
                            "createdDate": 1750549528973,
                            "name": "MF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qzqbu6mV0aY7",
                            "createdDate": 1750549528973,
                            "name": "MG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "G12Od4_RKutN",
                            "createdDate": 1750549528974,
                            "name": "MK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TobQSC242JhF",
                            "createdDate": 1750549528974,
                            "name": "ML",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_xhiTbCmN1bY",
                            "createdDate": 1750549528974,
                            "name": "MM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gNP7bkNAawLs",
                            "createdDate": 1750549528974,
                            "name": "MN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NygQmmwnyeag",
                            "createdDate": 1750549528974,
                            "name": "MO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1sJjQXAIBe-c",
                            "createdDate": 1750549528974,
                            "name": "MQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JDMIDp6RM1BX",
                            "createdDate": 1750549528974,
                            "name": "MR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "v7myV9NkJNaV",
                            "createdDate": 1750549528974,
                            "name": "MS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SHk46uztrzq-",
                            "createdDate": 1750549528974,
                            "name": "MT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cRIKlRxDQ2I7",
                            "createdDate": 1750549528974,
                            "name": "MU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bKDwNgVMDtfs",
                            "createdDate": 1750549528974,
                            "name": "MV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Uts7fpSQ8k49",
                            "createdDate": 1750549528974,
                            "name": "MW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Dk66EEfWTjnx",
                            "createdDate": 1750549528974,
                            "name": "MX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CSkr3V_qSzsH",
                            "createdDate": 1750549528974,
                            "name": "MY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "r1ajmUrGJZPn",
                            "createdDate": 1750549528974,
                            "name": "MZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HT9e-FS9DKk9",
                            "createdDate": 1750549528974,
                            "name": "NA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "icE8c3_G1gTF",
                            "createdDate": 1750549528974,
                            "name": "NC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tej3otnuYSuc",
                            "createdDate": 1750549528974,
                            "name": "NE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BG3hXz98w4Fc",
                            "createdDate": 1750549528974,
                            "name": "NF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cMRQmIVxBJG1",
                            "createdDate": 1750549528974,
                            "name": "NG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m_vrhjcJ4r_p",
                            "createdDate": 1750549528974,
                            "name": "NI",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "d50su2bKywO2",
                            "createdDate": 1750549528974,
                            "name": "NL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2JhA88tqsyfu",
                            "createdDate": 1750549528974,
                            "name": "NO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vflxP3OV6Z-k",
                            "createdDate": 1750549528974,
                            "name": "NP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-ztl6fF9w4hG",
                            "createdDate": 1750549528974,
                            "name": "NR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ASquftVgaY-b",
                            "createdDate": 1750549528974,
                            "name": "NU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YnPYB6L_a4RX",
                            "createdDate": 1750549528974,
                            "name": "NZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UAPuOU5gzBJA",
                            "createdDate": 1750549528974,
                            "name": "OM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jeYWV4EQV2Vp",
                            "createdDate": 1750549528974,
                            "name": "PA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ppUZf9N2l1oD",
                            "createdDate": 1750549528974,
                            "name": "PE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NVzeEkJxARKW",
                            "createdDate": 1750549528974,
                            "name": "PF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WHfwRCNuqVpn",
                            "createdDate": 1750549528974,
                            "name": "PG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "L9tQEnkq3dt4",
                            "createdDate": 1750549528974,
                            "name": "PH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8IV3mBpo23nP",
                            "createdDate": 1750549528974,
                            "name": "PK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "F6qo8Gwy7fBV",
                            "createdDate": 1750549528974,
                            "name": "PL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ndsXLLLYhjdk",
                            "createdDate": 1750549528974,
                            "name": "PM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nQh2vTIqS6aR",
                            "createdDate": 1750549528974,
                            "name": "PN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NHXmXF13Locl",
                            "createdDate": 1750549528974,
                            "name": "PS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KWNmpJOt6vQX",
                            "createdDate": 1750549528974,
                            "name": "PT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NV809Sbt0M61",
                            "createdDate": 1750549528974,
                            "name": "PY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eLxbxPBTQK2w",
                            "createdDate": 1750549528974,
                            "name": "QA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jL-lJatHARL7",
                            "createdDate": 1750549528974,
                            "name": "RE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4EBBHIXqtvLE",
                            "createdDate": 1750549528974,
                            "name": "RO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-Vw2oq5fnJPp",
                            "createdDate": 1750549528974,
                            "name": "RS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rMPJkpjfpg_O",
                            "createdDate": 1750549528974,
                            "name": "RU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wyIKoCXYtDu-",
                            "createdDate": 1750549528974,
                            "name": "RW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7P-wP3SFQ-kF",
                            "createdDate": 1750549528974,
                            "name": "SA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qqmvujrNcWnH",
                            "createdDate": 1750549528974,
                            "name": "SB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nR0g7tKrzDJ5",
                            "createdDate": 1750549528974,
                            "name": "SC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "URenJMf3V7Oc",
                            "createdDate": 1750549528974,
                            "name": "SD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3YSR5AqnYLZ0",
                            "createdDate": 1750549528974,
                            "name": "SE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Hbjj1uV3vWLM",
                            "createdDate": 1750549528974,
                            "name": "SG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cTW3OYCIDDKy",
                            "createdDate": 1750549528974,
                            "name": "SH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tR8A_lTXqpPY",
                            "createdDate": 1750549528974,
                            "name": "SI",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mwd-fIispjCE",
                            "createdDate": 1750549528974,
                            "name": "SJ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PcSyt3VjUj1_",
                            "createdDate": 1750549528974,
                            "name": "SK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CQRHSndgsZzy",
                            "createdDate": 1750549528975,
                            "name": "SL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jkaBWZ3r5jjW",
                            "createdDate": 1750549528975,
                            "name": "SM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ewCk6DJvZLlf",
                            "createdDate": 1750549528975,
                            "name": "SN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Vko3PZAe4By2",
                            "createdDate": 1750549528975,
                            "name": "SO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_4xBQO0raU9Z",
                            "createdDate": 1750549528975,
                            "name": "SR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "I-IL4Ks5Joo4",
                            "createdDate": 1750549528975,
                            "name": "SS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "27Xd9TkupzWC",
                            "createdDate": 1750549528975,
                            "name": "ST",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dDWXdMZTEH07",
                            "createdDate": 1750549528975,
                            "name": "SV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Yb6ZUpOsUSv2",
                            "createdDate": 1750549528975,
                            "name": "SX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rHnAzenxEG1w",
                            "createdDate": 1750549528975,
                            "name": "SY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HNG0LUSV77-r",
                            "createdDate": 1750549528975,
                            "name": "SZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "L76DBe8cPUio",
                            "createdDate": 1750549528975,
                            "name": "TA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4KlTZ8f3BvZw",
                            "createdDate": 1750549528975,
                            "name": "TC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CfBznvgmNPkg",
                            "createdDate": 1750549528975,
                            "name": "TD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KuZxvWtZXXK_",
                            "createdDate": 1750549528975,
                            "name": "TF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xEu_EJKv_V8-",
                            "createdDate": 1750549528975,
                            "name": "TG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YKlGn39QtbUR",
                            "createdDate": 1750549528975,
                            "name": "TH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LwUleVJuTKPd",
                            "createdDate": 1750549528975,
                            "name": "TJ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DHjAroaJRAYP",
                            "createdDate": 1750549528975,
                            "name": "TK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hhFZ-vkOXxae",
                            "createdDate": 1750549528975,
                            "name": "TL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7hxJXdOPKWkP",
                            "createdDate": 1750549528975,
                            "name": "TM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ueps4zuKiJgP",
                            "createdDate": 1750549528975,
                            "name": "TN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dhl78XbeCQoM",
                            "createdDate": 1750549528975,
                            "name": "TO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vjGXZLyPbmTq",
                            "createdDate": 1750549528975,
                            "name": "TR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7IjM0DMR1pQU",
                            "createdDate": 1750549528975,
                            "name": "TT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NHVNPfWmQLdu",
                            "createdDate": 1750549528975,
                            "name": "TV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ibxOSNuGlGh_",
                            "createdDate": 1750549528975,
                            "name": "TW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vK_Kn50Jpwvf",
                            "createdDate": 1750549528975,
                            "name": "TZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cIfKkoqhRUAl",
                            "createdDate": 1750549528975,
                            "name": "UA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sxCV4-CZ0917",
                            "createdDate": 1750549528975,
                            "name": "UG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8aqCftQwNwQc",
                            "createdDate": 1750549528975,
                            "name": "UM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4tGnrJT2s85O",
                            "createdDate": 1750549528975,
                            "name": "US",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6m89WEssVO8Z",
                            "createdDate": 1750549528975,
                            "name": "UY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xDb5Mi5DAejM",
                            "createdDate": 1750549528975,
                            "name": "UZ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hynvsPjy8pM9",
                            "createdDate": 1750549528975,
                            "name": "VA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OHzxKnNj3xgy",
                            "createdDate": 1750549528975,
                            "name": "VC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GmzKjQyJgrEa",
                            "createdDate": 1750549528975,
                            "name": "VE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "D68C7hKePiEh",
                            "createdDate": 1750549528975,
                            "name": "VG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ejbTYyZD_L87",
                            "createdDate": 1750549528975,
                            "name": "VN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FP_EMlGheFJZ",
                            "createdDate": 1750549528975,
                            "name": "VU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vT0H_2CgCWT_",
                            "createdDate": 1750549528975,
                            "name": "WF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mx93qjGjH_kj",
                            "createdDate": 1750549528975,
                            "name": "WS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6eSR7IoSdzQF",
                            "createdDate": 1750549528975,
                            "name": "XK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_uvaPGqndrad",
                            "createdDate": 1750549528975,
                            "name": "YE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XjkcedKOAqWU",
                            "createdDate": 1750549528975,
                            "name": "YT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Pgd_-_RQ31em",
                            "createdDate": 1750549528975,
                            "name": "ZA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jEG92N4rt-nx",
                            "createdDate": 1750549528975,
                            "name": "ZM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LqYZUXX3A4Xv",
                            "createdDate": 1750549528975,
                            "name": "ZW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zQAl2K6aosUm",
                            "createdDate": 1750549528975,
                            "name": "ZZ",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_shop_customer_accounts_v2": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_shop_customer_accounts_v2",
                "name": "Customer Accounts V2",
                "apiIdentifier": "customerAccountsV2",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "ejbz843R6gxt",
                    "createdDate": "2025-06-21T23:45:28.976Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_shop_plan": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_shop_plan",
                "name": "Plan",
                "apiIdentifier": "plan",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "kp5uNjyaOEJK",
                    "createdDate": "2025-06-21T23:45:28.976Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_timezone_abbreviation": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_timezone_abbreviation",
                "name": "Timezone Abbreviation",
                "apiIdentifier": "timezoneAbbreviation",
                "configuration": {
                    "type": "StringConfig",
                    "key": "6fllyhYHcURb",
                    "createdDate": "2025-06-21T23:45:28.976Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_timezone_offset": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_timezone_offset",
                "name": "Taxes Offset",
                "apiIdentifier": "taxesOffset",
                "configuration": {
                    "type": "StringConfig",
                    "key": "WWAqBfRxyKkN",
                    "createdDate": "2025-06-21T23:45:28.976Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_timezone_offset_minutes": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_timezone_offset_minutes",
                "name": "Timezone Offset Minutes",
                "apiIdentifier": "timezoneOffsetMinutes",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "JpLUkdFWrE5_",
                    "createdDate": "2025-06-21T23:45:28.976Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_unit_system": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_unit_system",
                "name": "Unit System",
                "apiIdentifier": "unitSystem",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "CvQfOl8u_CAY",
                    "createdDate": "2025-06-21T23:45:28.976Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "IbnmA6T2uiF3",
                            "createdDate": 1750549528976,
                            "name": "IMPERIAL_SYSTEM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yz-2HYInUpbn",
                            "createdDate": 1750549528976,
                            "name": "METRIC_SYSTEM",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_url",
                "name": "Url",
                "apiIdentifier": "url",
                "configuration": {
                    "type": "URLConfig",
                    "key": "Snz6RPGYcgiV",
                    "createdDate": "2025-06-21T23:45:28.976Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-access_token": {
                "fieldType": "EncryptedString",
                "key": "ModelField-DataModel-Shopify-Shop-access_token",
                "name": "Access Token",
                "apiIdentifier": "accessToken",
                "configuration": {
                    "type": "EncryptedStringConfig",
                    "key": "oJscbA_JquVl",
                    "createdDate": "2025-06-21T23:45:28.977Z"
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-address1": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-address1",
                "name": "Address 1",
                "apiIdentifier": "address1",
                "configuration": {
                    "type": "StringConfig",
                    "key": "xQ5sJGQzu22U",
                    "createdDate": "2025-06-21T23:45:28.951Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-address2": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-address2",
                "name": "Address 2",
                "apiIdentifier": "address2",
                "configuration": {
                    "type": "StringConfig",
                    "key": "8VllFo7C4Rc9",
                    "createdDate": "2025-06-21T23:45:28.951Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-city": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-city",
                "name": "City",
                "apiIdentifier": "city",
                "configuration": {
                    "type": "StringConfig",
                    "key": "7ynxouA0Fabb",
                    "createdDate": "2025-06-21T23:45:28.952Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-country": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-country",
                "name": "Country",
                "apiIdentifier": "country",
                "configuration": {
                    "type": "StringConfig",
                    "key": "GjlRR38biT8S",
                    "createdDate": "2025-06-21T23:45:28.952Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-country_code": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-country_code",
                "name": "Country Code",
                "apiIdentifier": "countryCode",
                "configuration": {
                    "type": "StringConfig",
                    "key": "T1jMnMpI95W4",
                    "createdDate": "2025-06-21T23:45:28.952Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-country_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-country_name",
                "name": "Country Name",
                "apiIdentifier": "countryName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "u1Chxl9yTd-V",
                    "createdDate": "2025-06-21T23:45:28.952Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-county_taxes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-county_taxes",
                "name": "County Taxes",
                "apiIdentifier": "countyTaxes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "5HR2GbF3foxB",
                    "createdDate": "2025-06-21T23:45:28.952Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-created_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Shop-created_at",
                "name": "Shopify Created At",
                "apiIdentifier": "shopifyCreatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "qBgxM2VxcFap",
                    "createdDate": "2025-06-21T23:45:28.968Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-currency-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Shop-currency-Enum",
                "name": "Currency",
                "apiIdentifier": "currency",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "sh2Pujz-qc3F",
                    "createdDate": "2025-06-21T23:45:28.952Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "qPryoMcatpVd",
                            "createdDate": 1750549528952,
                            "name": "AED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-dEex-LjEp_t",
                            "createdDate": 1750549528952,
                            "name": "AFN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "B3qK_7iOGy3r",
                            "createdDate": 1750549528952,
                            "name": "ALL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GJWOGdkD1jbN",
                            "createdDate": 1750549528952,
                            "name": "AMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fHSqn8AaxxLL",
                            "createdDate": 1750549528952,
                            "name": "ANG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XjlhEuZo-Z7M",
                            "createdDate": 1750549528952,
                            "name": "AOA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qfvaHIaNfwFD",
                            "createdDate": 1750549528952,
                            "name": "ARS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GdnFSDjIV5Oj",
                            "createdDate": 1750549528952,
                            "name": "AUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_vJ-AEOXKxVb",
                            "createdDate": 1750549528952,
                            "name": "AWG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JewgMK_ZJmhN",
                            "createdDate": 1750549528952,
                            "name": "AZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hlqKCBB6-OZj",
                            "createdDate": 1750549528953,
                            "name": "BAM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "COrbpEK6ncDY",
                            "createdDate": 1750549528953,
                            "name": "BBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LoHtWt5UanPh",
                            "createdDate": 1750549528953,
                            "name": "BDT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GdqKKxBuqM9c",
                            "createdDate": 1750549528953,
                            "name": "BGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-BvYSERiadWL",
                            "createdDate": 1750549528953,
                            "name": "BHD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Kivh5id5tNrb",
                            "createdDate": 1750549528953,
                            "name": "BIF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "r20alcqoRBNS",
                            "createdDate": 1750549528953,
                            "name": "BMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vGzftFj2IFDn",
                            "createdDate": 1750549528953,
                            "name": "BND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DhyzGSqWwZci",
                            "createdDate": 1750549528953,
                            "name": "BOB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ccfOiHTbOZJe",
                            "createdDate": 1750549528953,
                            "name": "BRL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BmSsMEHKLFf8",
                            "createdDate": 1750549528953,
                            "name": "BSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mSTbcp7pK4pq",
                            "createdDate": 1750549528953,
                            "name": "BTN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9Vz3l_cELcH6",
                            "createdDate": 1750549528953,
                            "name": "BWP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Wi06eBq4G0ng",
                            "createdDate": 1750549528953,
                            "name": "BYN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-pX5pG33bV47",
                            "createdDate": 1750549528953,
                            "name": "BYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FRZrjClfIb2f",
                            "createdDate": 1750549528953,
                            "name": "BZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tvbsqsW08Was",
                            "createdDate": 1750549528953,
                            "name": "CAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Wz0h6e7g7yu1",
                            "createdDate": 1750549528953,
                            "name": "CDF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Uuk8w6Ydr3zK",
                            "createdDate": 1750549528953,
                            "name": "CHF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "q8u6pnDSrF9Y",
                            "createdDate": 1750549528953,
                            "name": "CLP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QkjZfbQduDj_",
                            "createdDate": 1750549528953,
                            "name": "CNY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "x5cCxHyUhRLK",
                            "createdDate": 1750549528953,
                            "name": "COP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xmKFHf9mUnTm",
                            "createdDate": 1750549528953,
                            "name": "CRC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vtGsKKw9UR5V",
                            "createdDate": 1750549528953,
                            "name": "CVE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kVDWIsMN-Huz",
                            "createdDate": 1750549528953,
                            "name": "CZK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ICd-aCd6qf1K",
                            "createdDate": 1750549528953,
                            "name": "DJF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DShPhvzHB4yV",
                            "createdDate": 1750549528953,
                            "name": "DKK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fNu-LswJITD6",
                            "createdDate": 1750549528953,
                            "name": "DOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aUiJhl_zoV-j",
                            "createdDate": 1750549528953,
                            "name": "DZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2Yg9tFi0_DZr",
                            "createdDate": 1750549528953,
                            "name": "EGP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7GLHRLDgIV6a",
                            "createdDate": 1750549528953,
                            "name": "ERN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "o0jpUQIZMTBR",
                            "createdDate": 1750549528953,
                            "name": "ETB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VfT-PXfar165",
                            "createdDate": 1750549528953,
                            "name": "EUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fMi19hmXAUXd",
                            "createdDate": 1750549528953,
                            "name": "FJD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "b70sn-7P1Nnl",
                            "createdDate": 1750549528953,
                            "name": "FKP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4HaiBluVG7h3",
                            "createdDate": 1750549528953,
                            "name": "GBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qdj75qj_zDzh",
                            "createdDate": 1750549528953,
                            "name": "GEL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "H6ZW8nWZk0zX",
                            "createdDate": 1750549528953,
                            "name": "GHS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pnhsdMBxDSv6",
                            "createdDate": 1750549528953,
                            "name": "GIP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "B-pml-HHs8XX",
                            "createdDate": 1750549528953,
                            "name": "GMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4Z7W4V4HpBvH",
                            "createdDate": 1750549528953,
                            "name": "GNF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Mbe7SCl08Rnp",
                            "createdDate": 1750549528953,
                            "name": "GTQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jtoHUge0vMBP",
                            "createdDate": 1750549528953,
                            "name": "GYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7Vya6FZBJfY2",
                            "createdDate": 1750549528953,
                            "name": "HKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lQVleVmwYKh1",
                            "createdDate": 1750549528953,
                            "name": "HNL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "amQhXOI7USQD",
                            "createdDate": 1750549528953,
                            "name": "HRK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PDAbqPIpN41j",
                            "createdDate": 1750549528953,
                            "name": "HTG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MP7vOsxiL4lZ",
                            "createdDate": 1750549528953,
                            "name": "HUF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KZrVJaLKUjZZ",
                            "createdDate": 1750549528953,
                            "name": "IDR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "n_N-p6rC76Ft",
                            "createdDate": 1750549528953,
                            "name": "ILS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6ASaDPFNT8xU",
                            "createdDate": 1750549528953,
                            "name": "INR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NAWs1z3vLZhj",
                            "createdDate": 1750549528953,
                            "name": "IQD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ad54RUZtmY-H",
                            "createdDate": 1750549528953,
                            "name": "IRR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "b_7yjf4gFz6v",
                            "createdDate": 1750549528953,
                            "name": "ISK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jr4NMFbQO-qA",
                            "createdDate": 1750549528953,
                            "name": "JEP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QWKrGPpsy2js",
                            "createdDate": 1750549528953,
                            "name": "JMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PzkKsnVm_XL7",
                            "createdDate": 1750549528953,
                            "name": "JOD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YwGmEx3jvkCG",
                            "createdDate": 1750549528953,
                            "name": "JPY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cKtKM9wjN13N",
                            "createdDate": 1750549528953,
                            "name": "KES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_oNDvKpo3ugq",
                            "createdDate": 1750549528953,
                            "name": "KGS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "a4oSidhlFEIH",
                            "createdDate": 1750549528953,
                            "name": "KHR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zxSGBWXZZsFA",
                            "createdDate": 1750549528953,
                            "name": "KID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5ZeIMdH3ySXq",
                            "createdDate": 1750549528953,
                            "name": "KMF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HqZOCxUXPJoU",
                            "createdDate": 1750549528953,
                            "name": "KRW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SihJjReD0hgc",
                            "createdDate": 1750549528953,
                            "name": "KWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bZ3Kjj8ZWuVy",
                            "createdDate": 1750549528953,
                            "name": "KYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DDSYuWeLwPH-",
                            "createdDate": 1750549528954,
                            "name": "KZT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ri-zSEZbWwHO",
                            "createdDate": 1750549528954,
                            "name": "LAK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3YOJduvlOono",
                            "createdDate": 1750549528954,
                            "name": "LBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "M_-28Su5cIqE",
                            "createdDate": 1750549528954,
                            "name": "LKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "S_Dudv1mjMCp",
                            "createdDate": 1750549528954,
                            "name": "LRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FE0hYRhjPbTz",
                            "createdDate": 1750549528954,
                            "name": "LSL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "edJcIFpGQLku",
                            "createdDate": 1750549528954,
                            "name": "LTL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "maYcePADuxOl",
                            "createdDate": 1750549528954,
                            "name": "LVL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GUCOGyoPQPuV",
                            "createdDate": 1750549528954,
                            "name": "LYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7OFJ1MyII6_8",
                            "createdDate": 1750549528954,
                            "name": "MAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8kleFViQniz9",
                            "createdDate": 1750549528954,
                            "name": "MDL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nhQmPuKzgg1x",
                            "createdDate": 1750549528954,
                            "name": "MGA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Qt9ir1104IWW",
                            "createdDate": 1750549528954,
                            "name": "MKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jaAFB38kZlHh",
                            "createdDate": 1750549528954,
                            "name": "MMK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-7hpFzBiAEyy",
                            "createdDate": 1750549528954,
                            "name": "MNT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BSRYpNk6J2ra",
                            "createdDate": 1750549528954,
                            "name": "MOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_I1q5-mvxMQd",
                            "createdDate": 1750549528954,
                            "name": "MRU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sh0M62pnYjDJ",
                            "createdDate": 1750549528954,
                            "name": "MUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-C0_nbSpO87j",
                            "createdDate": 1750549528954,
                            "name": "MVR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2X6RaVN1SaNT",
                            "createdDate": 1750549528954,
                            "name": "MWK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "iu4o8O7oalJ1",
                            "createdDate": 1750549528954,
                            "name": "MXN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "npL18XQNlTeG",
                            "createdDate": 1750549528954,
                            "name": "MYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "t4pzMhcikq4t",
                            "createdDate": 1750549528954,
                            "name": "MZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0uugArc9eocL",
                            "createdDate": 1750549528954,
                            "name": "NAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PqOlEAheK9v8",
                            "createdDate": 1750549528954,
                            "name": "NGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7AVq3WwkK5uS",
                            "createdDate": 1750549528954,
                            "name": "NIO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HIvpHCIZYXIS",
                            "createdDate": 1750549528954,
                            "name": "NOK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tGr9zkbM9bOR",
                            "createdDate": 1750549528954,
                            "name": "NPR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "iWxjvl4g63wv",
                            "createdDate": 1750549528954,
                            "name": "NZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zXcVDDoRlcbG",
                            "createdDate": 1750549528954,
                            "name": "OMR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WKocPtPe8YuV",
                            "createdDate": 1750549528954,
                            "name": "PAB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DKnXfkF5nBpP",
                            "createdDate": 1750549528954,
                            "name": "PEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ssXuq62-FXSw",
                            "createdDate": 1750549528954,
                            "name": "PGK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dt55EKg_IeUT",
                            "createdDate": 1750549528954,
                            "name": "PHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "stLDN7HfuCOH",
                            "createdDate": 1750549528954,
                            "name": "PKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MIu6IWJSXFz9",
                            "createdDate": 1750549528954,
                            "name": "PLN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IP0APLMlhSiv",
                            "createdDate": 1750549528954,
                            "name": "PYG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Nb2ucF2E9Tvw",
                            "createdDate": 1750549528954,
                            "name": "QAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vTeu5icRhvJ4",
                            "createdDate": 1750549528954,
                            "name": "RON",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IKL71czS2uB4",
                            "createdDate": 1750549528954,
                            "name": "RSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uzxdQKqRRo_2",
                            "createdDate": 1750549528954,
                            "name": "RUB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HKwACbJ9D7qo",
                            "createdDate": 1750549528954,
                            "name": "RWF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PW-gP9ES2IZR",
                            "createdDate": 1750549528955,
                            "name": "SAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bLLiNDMcSWfZ",
                            "createdDate": 1750549528955,
                            "name": "SBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FHvWS3sc6ia0",
                            "createdDate": 1750549528955,
                            "name": "SCR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Nh6hlQu5rnOS",
                            "createdDate": 1750549528955,
                            "name": "SDG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "s06IUqukD83E",
                            "createdDate": 1750549528955,
                            "name": "SEK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gcmAFR6KhhuI",
                            "createdDate": 1750549528955,
                            "name": "SGD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m6GIuBhdUNPi",
                            "createdDate": 1750549528955,
                            "name": "SHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PKxDHn2DPFTH",
                            "createdDate": 1750549528955,
                            "name": "SLL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fQGPDmRxG5o9",
                            "createdDate": 1750549528955,
                            "name": "SOS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Q64Ab_m0XtjD",
                            "createdDate": 1750549528955,
                            "name": "SRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3J32aFY5xCBt",
                            "createdDate": 1750549528955,
                            "name": "SSP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "P6lHalk7lej8",
                            "createdDate": 1750549528955,
                            "name": "STD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "B0BkGM9YZGBq",
                            "createdDate": 1750549528955,
                            "name": "STN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fh8gAlo2l45z",
                            "createdDate": 1750549528955,
                            "name": "SYP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6TrgUzvmYEF2",
                            "createdDate": 1750549528955,
                            "name": "SZL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-znl1XQu1RlA",
                            "createdDate": 1750549528955,
                            "name": "THB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9iGVEs2Eg5Nq",
                            "createdDate": 1750549528955,
                            "name": "TJS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LJVzOCg1ZXay",
                            "createdDate": 1750549528955,
                            "name": "TMT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "f-AU019PDwFp",
                            "createdDate": 1750549528955,
                            "name": "TND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-JDWF7RjqX1C",
                            "createdDate": 1750549528955,
                            "name": "TOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fAS_CQYas3Cd",
                            "createdDate": 1750549528955,
                            "name": "TRY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "a4Vd2hvQ1SJy",
                            "createdDate": 1750549528955,
                            "name": "TTD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VxPsj3Pj_dKt",
                            "createdDate": 1750549528955,
                            "name": "TWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5E5DNkITYAva",
                            "createdDate": 1750549528955,
                            "name": "TZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VfjRUj7SKzk7",
                            "createdDate": 1750549528955,
                            "name": "UAH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9hTcQsYF4Pqq",
                            "createdDate": 1750549528955,
                            "name": "UGX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UaWJZB55hTrj",
                            "createdDate": 1750549528955,
                            "name": "USD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wFlCrbaD0_ip",
                            "createdDate": 1750549528955,
                            "name": "USDC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ELqo3vk8Z4O9",
                            "createdDate": 1750549528955,
                            "name": "UYU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xNBAYDbGOsyI",
                            "createdDate": 1750549528955,
                            "name": "UZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aZeBONoThaAs",
                            "createdDate": 1750549528955,
                            "name": "VED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8XuQuS7udw6X",
                            "createdDate": 1750549528955,
                            "name": "VEF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eZgjCO64k0pR",
                            "createdDate": 1750549528955,
                            "name": "VES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KHGZZomQUBKj",
                            "createdDate": 1750549528955,
                            "name": "VND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UvWhoxCgig4v",
                            "createdDate": 1750549528955,
                            "name": "VUV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9dxXIex1IFSB",
                            "createdDate": 1750549528955,
                            "name": "WST",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Wuji0JCYXmXS",
                            "createdDate": 1750549528955,
                            "name": "XAF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uCzIWlwnHH3D",
                            "createdDate": 1750549528955,
                            "name": "XCD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "J0ivolSZ1Xl3",
                            "createdDate": 1750549528955,
                            "name": "XOF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NjkLVgP8w6j5",
                            "createdDate": 1750549528955,
                            "name": "XPF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "D_tUHJeN2gL3",
                            "createdDate": 1750549528955,
                            "name": "XXX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IwdSqwBJotuQ",
                            "createdDate": 1750549528955,
                            "name": "YER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UfEvmBeEhB9q",
                            "createdDate": 1750549528955,
                            "name": "ZAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VivDM0xasI0A",
                            "createdDate": 1750549528955,
                            "name": "ZMW",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-customer_email": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-customer_email",
                "name": "Customer Email",
                "apiIdentifier": "customerEmail",
                "configuration": {
                    "type": "StringConfig",
                    "key": "fyQitPSa8X-9",
                    "createdDate": "2025-06-21T23:45:28.956Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-disabled_webhooks": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-disabled_webhooks",
                "name": "Disabled Webhooks",
                "apiIdentifier": "disabledWebhooks",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "8eA_Kj7IM5nq",
                    "createdDate": "2025-06-21T23:45:28.977Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-domain": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-domain",
                "name": "Domain",
                "apiIdentifier": "domain",
                "configuration": {
                    "type": "StringConfig",
                    "key": "StO8pJaopZ-6",
                    "createdDate": "2025-06-21T23:45:28.956Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-eligible_for_payments": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-eligible_for_payments",
                "name": "Eligible For Payments",
                "apiIdentifier": "eligibleForPayments",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "rUzK6ukvHKJr",
                    "createdDate": "2025-06-21T23:45:28.956Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-email": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-email",
                "name": "Email",
                "apiIdentifier": "email",
                "configuration": {
                    "type": "StringConfig",
                    "key": "D9wjkrPAMehK",
                    "createdDate": "2025-06-21T23:45:28.956Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-enabled_presentment_currencies-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Shop-enabled_presentment_currencies-Enum",
                "name": "Enabled Presentment Currencies",
                "apiIdentifier": "enabledPresentmentCurrencies",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "joANL8OL49sn",
                    "createdDate": "2025-06-21T23:45:28.956Z",
                    "allowMultiple": true,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "KPlkq_p-Ua__",
                            "createdDate": 1750549528956,
                            "name": "AED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dcCjzj9qKxEv",
                            "createdDate": 1750549528956,
                            "name": "AFN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VzRWAw9fcNK4",
                            "createdDate": 1750549528956,
                            "name": "ALL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VP6rfYLxpvBf",
                            "createdDate": 1750549528956,
                            "name": "AMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KzX9hKaQxA4J",
                            "createdDate": 1750549528956,
                            "name": "ANG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AopwQtINcHkP",
                            "createdDate": 1750549528956,
                            "name": "AOA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2V8Oy-Fl9ONz",
                            "createdDate": 1750549528956,
                            "name": "ARS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RMxXtl_yOjwU",
                            "createdDate": 1750549528956,
                            "name": "AUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3LlFYtsu2FU8",
                            "createdDate": 1750549528956,
                            "name": "AWG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "urizHWl0kLsc",
                            "createdDate": 1750549528956,
                            "name": "AZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6bGk0eVvKvf3",
                            "createdDate": 1750549528956,
                            "name": "BAM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mEJ-JJVLA7cf",
                            "createdDate": 1750549528956,
                            "name": "BBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tCAXwK1l3Lbk",
                            "createdDate": 1750549528957,
                            "name": "BDT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OQm6mz8GaLKe",
                            "createdDate": 1750549528957,
                            "name": "BGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5o9ZD6lk3oA7",
                            "createdDate": 1750549528957,
                            "name": "BHD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pLJrjY8JKW0a",
                            "createdDate": 1750549528957,
                            "name": "BIF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bcWuytuWK3ML",
                            "createdDate": 1750549528957,
                            "name": "BMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mU99s-2Rwyfd",
                            "createdDate": 1750549528957,
                            "name": "BND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ih3Xsw7vneRM",
                            "createdDate": 1750549528957,
                            "name": "BOB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bi5KGw6MzmuK",
                            "createdDate": 1750549528957,
                            "name": "BRL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6Gd7hma4MbO9",
                            "createdDate": 1750549528957,
                            "name": "BSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lgxcW_7WHXw4",
                            "createdDate": 1750549528957,
                            "name": "BTN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DI6TBAhvmMQO",
                            "createdDate": 1750549528957,
                            "name": "BWP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u4tLZaiy5pD1",
                            "createdDate": 1750549528957,
                            "name": "BYN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gSUR9W6xMbbf",
                            "createdDate": 1750549528957,
                            "name": "BYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Yw_YScUjXPR1",
                            "createdDate": 1750549528957,
                            "name": "BZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8BHA68BCEVYi",
                            "createdDate": 1750549528957,
                            "name": "CAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PPzXXv5nQ-fz",
                            "createdDate": 1750549528957,
                            "name": "CDF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sqcSsSnQaiQO",
                            "createdDate": 1750549528957,
                            "name": "CHF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BK3PsQT2zh4N",
                            "createdDate": 1750549528957,
                            "name": "CLP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sBzzrNbHXNnC",
                            "createdDate": 1750549528957,
                            "name": "CNY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "d3dBxZhlaNgK",
                            "createdDate": 1750549528957,
                            "name": "COP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2ua2sVcRPAWx",
                            "createdDate": 1750549528957,
                            "name": "CRC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RDQHtlDfpqF2",
                            "createdDate": 1750549528957,
                            "name": "CVE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xvj4S60xjnaH",
                            "createdDate": 1750549528957,
                            "name": "CZK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DOPZKr5XilAJ",
                            "createdDate": 1750549528957,
                            "name": "DJF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SxU0cgingVtB",
                            "createdDate": 1750549528957,
                            "name": "DKK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bKdpqG2i4vsD",
                            "createdDate": 1750549528957,
                            "name": "DOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "b8E2rQfoj3YD",
                            "createdDate": 1750549528957,
                            "name": "DZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zE9RBawvbLNh",
                            "createdDate": 1750549528957,
                            "name": "EGP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TykLcCwgjA5b",
                            "createdDate": 1750549528957,
                            "name": "ERN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jYl24W8Z3jrl",
                            "createdDate": 1750549528957,
                            "name": "ETB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rFzmN2WmsI8n",
                            "createdDate": 1750549528957,
                            "name": "EUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RaFJiutj2eTm",
                            "createdDate": 1750549528957,
                            "name": "FJD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WehmH_brYX4K",
                            "createdDate": 1750549528957,
                            "name": "FKP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ggi32dLd1x95",
                            "createdDate": 1750549528957,
                            "name": "GBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "p9Vr2gwnuyOJ",
                            "createdDate": 1750549528957,
                            "name": "GEL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zKSDdRx8i-Dp",
                            "createdDate": 1750549528957,
                            "name": "GHS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZPDOe3aY8vL0",
                            "createdDate": 1750549528957,
                            "name": "GIP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7M_LuVr7V6wl",
                            "createdDate": 1750549528957,
                            "name": "GMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "X785Rg2x8AO1",
                            "createdDate": 1750549528957,
                            "name": "GNF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AxRf8iq0CtFA",
                            "createdDate": 1750549528957,
                            "name": "GTQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qezaVBIlXljo",
                            "createdDate": 1750549528957,
                            "name": "GYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FDVeATclC-QQ",
                            "createdDate": 1750549528957,
                            "name": "HKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GhawXCLJufCt",
                            "createdDate": 1750549528957,
                            "name": "HNL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4GZ-wA8CFPhZ",
                            "createdDate": 1750549528957,
                            "name": "HRK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8jMagvGUb2R1",
                            "createdDate": 1750549528957,
                            "name": "HTG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wP6MnnpdM_9J",
                            "createdDate": 1750549528957,
                            "name": "HUF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QeW5MOZL0h9K",
                            "createdDate": 1750549528958,
                            "name": "IDR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uHOFvbwQ_toV",
                            "createdDate": 1750549528958,
                            "name": "ILS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sc3GCSFcSva3",
                            "createdDate": 1750549528958,
                            "name": "INR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "P-Ho4DEPYdjz",
                            "createdDate": 1750549528958,
                            "name": "IQD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5F-D1quPwFLd",
                            "createdDate": 1750549528958,
                            "name": "IRR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jXpFeQGGG6Ou",
                            "createdDate": 1750549528958,
                            "name": "ISK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZbHnM_8bAQbk",
                            "createdDate": 1750549528958,
                            "name": "JEP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UO-IAreLmAm9",
                            "createdDate": 1750549528958,
                            "name": "JMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "k01UdpQYcdPk",
                            "createdDate": 1750549528958,
                            "name": "JOD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YWX0YHNPmJYz",
                            "createdDate": 1750549528958,
                            "name": "JPY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WLFUNCJ8Ei8L",
                            "createdDate": 1750549528958,
                            "name": "KES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4AM33PEhkBuJ",
                            "createdDate": 1750549528958,
                            "name": "KGS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gLhkhgIVv1re",
                            "createdDate": 1750549528958,
                            "name": "KHR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qojBYCG1UTai",
                            "createdDate": 1750549528958,
                            "name": "KID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "o7q8NjG6cAwA",
                            "createdDate": 1750549528958,
                            "name": "KMF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3inaVGf6Jhrp",
                            "createdDate": 1750549528958,
                            "name": "KRW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZCMCvhBMAdqU",
                            "createdDate": 1750549528958,
                            "name": "KWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "EM2Q5Oww1VLZ",
                            "createdDate": 1750549528958,
                            "name": "KYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GBFlKryU96v6",
                            "createdDate": 1750549528958,
                            "name": "KZT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "l0uPh36dbjxh",
                            "createdDate": 1750549528958,
                            "name": "LAK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PiZWUi9gav2x",
                            "createdDate": 1750549528958,
                            "name": "LBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ePq6NFzEXTTW",
                            "createdDate": 1750549528958,
                            "name": "LKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "29yWjz-z3o0W",
                            "createdDate": 1750549528958,
                            "name": "LRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "b9b5bQK0xEGf",
                            "createdDate": 1750549528958,
                            "name": "LSL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JXl4BlxJoFyT",
                            "createdDate": 1750549528958,
                            "name": "LTL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vRFEudaa1KfP",
                            "createdDate": 1750549528958,
                            "name": "LVL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "riJj9UYWk8mL",
                            "createdDate": 1750549528958,
                            "name": "LYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hc5mwK-bJ54x",
                            "createdDate": 1750549528958,
                            "name": "MAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dwqkkhCdq9Zg",
                            "createdDate": 1750549528958,
                            "name": "MDL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jt7Ef5dsITri",
                            "createdDate": 1750549528958,
                            "name": "MGA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1OMABLLzFG_J",
                            "createdDate": 1750549528958,
                            "name": "MKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-aMchPt7U8ft",
                            "createdDate": 1750549528958,
                            "name": "MMK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UEfDCKyaMuLc",
                            "createdDate": 1750549528958,
                            "name": "MNT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fnzMK0uiHypj",
                            "createdDate": 1750549528958,
                            "name": "MOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "K_LHhoX4SNAz",
                            "createdDate": 1750549528958,
                            "name": "MRU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fmzuQ-bjJDJ8",
                            "createdDate": 1750549528958,
                            "name": "MUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UWWxYnRzpEDs",
                            "createdDate": 1750549528958,
                            "name": "MVR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TFopt0kxgU3q",
                            "createdDate": 1750549528958,
                            "name": "MWK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u8ccn9GnffCq",
                            "createdDate": 1750549528958,
                            "name": "MXN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vLI0F_qpr8j-",
                            "createdDate": 1750549528958,
                            "name": "MYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zucUmAtXfFFQ",
                            "createdDate": 1750549528958,
                            "name": "MZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eKhkaiNZYplo",
                            "createdDate": 1750549528958,
                            "name": "NAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DbJpa3Sc9ban",
                            "createdDate": 1750549528958,
                            "name": "NGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MspJEXq38355",
                            "createdDate": 1750549528959,
                            "name": "NIO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sIAZujxwtzD9",
                            "createdDate": 1750549528959,
                            "name": "NOK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "egyAkSXnlIju",
                            "createdDate": 1750549528959,
                            "name": "NPR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BDxE1K6BmqYc",
                            "createdDate": 1750549528959,
                            "name": "NZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZYZM83rYgZbg",
                            "createdDate": 1750549528959,
                            "name": "OMR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XGGLkdJ6_uDF",
                            "createdDate": 1750549528959,
                            "name": "PAB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "c0WW0eSP6Ed9",
                            "createdDate": 1750549528959,
                            "name": "PEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cl18ZKtn3LSt",
                            "createdDate": 1750549528959,
                            "name": "PGK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OVgrZzohf6Fa",
                            "createdDate": 1750549528959,
                            "name": "PHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "S0q8OrmxzXVr",
                            "createdDate": 1750549528959,
                            "name": "PKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "998B0wBKTEXY",
                            "createdDate": 1750549528959,
                            "name": "PLN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jLNnKGJODXkO",
                            "createdDate": 1750549528959,
                            "name": "PYG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ckAHbJlCI_0Y",
                            "createdDate": 1750549528959,
                            "name": "QAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7XTBXm3KndJj",
                            "createdDate": 1750549528959,
                            "name": "RON",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VZ3ijanWogiy",
                            "createdDate": 1750549528959,
                            "name": "RSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ihMqNyIk9nW-",
                            "createdDate": 1750549528959,
                            "name": "RUB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bTrTFJUqk-ld",
                            "createdDate": 1750549528959,
                            "name": "RWF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "d33R4lKVOKwa",
                            "createdDate": 1750549528959,
                            "name": "SAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2vtDhtWCUe5U",
                            "createdDate": 1750549528959,
                            "name": "SBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fsz1xRJ0f7dl",
                            "createdDate": 1750549528959,
                            "name": "SCR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Kf7xvuIi9Zdf",
                            "createdDate": 1750549528959,
                            "name": "SDG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SnhfuN7omMQw",
                            "createdDate": 1750549528959,
                            "name": "SEK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "S_YxUfmpw22F",
                            "createdDate": 1750549528959,
                            "name": "SGD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "B8DaIGsO2kXL",
                            "createdDate": 1750549528959,
                            "name": "SHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OPd2kv7-Vpkk",
                            "createdDate": 1750549528959,
                            "name": "SLL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "42suVbbbJzQ7",
                            "createdDate": 1750549528959,
                            "name": "SOS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eckI2W_jdukh",
                            "createdDate": 1750549528959,
                            "name": "SRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CAvhqovSyb4C",
                            "createdDate": 1750549528959,
                            "name": "SSP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dYAkK8WpdlsP",
                            "createdDate": 1750549528959,
                            "name": "STD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "e14IhiWVfoSL",
                            "createdDate": 1750549528959,
                            "name": "STN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yfQTvcwpXndI",
                            "createdDate": 1750549528959,
                            "name": "SYP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rdunYUPk56hd",
                            "createdDate": 1750549528959,
                            "name": "SZL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "neuRBY7hJs6r",
                            "createdDate": 1750549528959,
                            "name": "THB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kQ7sqJKaenWF",
                            "createdDate": 1750549528959,
                            "name": "TJS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Q3PdHV4enHBg",
                            "createdDate": 1750549528959,
                            "name": "TMT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qesVU5qIXuiM",
                            "createdDate": 1750549528959,
                            "name": "TND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "x19y8MBoYWM-",
                            "createdDate": 1750549528959,
                            "name": "TOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9ajUvh1gdL_n",
                            "createdDate": 1750549528959,
                            "name": "TRY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jgwy2kYqwuHm",
                            "createdDate": 1750549528959,
                            "name": "TTD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4PqwPs9_vFVg",
                            "createdDate": 1750549528959,
                            "name": "TWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gRB9FcNHjVP1",
                            "createdDate": 1750549528959,
                            "name": "TZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yZ6o1OUqn99f",
                            "createdDate": 1750549528959,
                            "name": "UAH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pVDOrDalwgWp",
                            "createdDate": 1750549528959,
                            "name": "UGX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XibiWP2U6v1x",
                            "createdDate": 1750549528959,
                            "name": "USD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qe7MQHvM2dZ1",
                            "createdDate": 1750549528959,
                            "name": "USDC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bvfqmvz8StKm",
                            "createdDate": 1750549528960,
                            "name": "UYU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Wuz9tQXU1J5J",
                            "createdDate": 1750549528960,
                            "name": "UZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0Fj4KftFJZ5R",
                            "createdDate": 1750549528960,
                            "name": "VED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TGuuK7HquSuk",
                            "createdDate": 1750549528960,
                            "name": "VEF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "El_NexHePsLR",
                            "createdDate": 1750549528960,
                            "name": "VES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4Gj-6W27Z_Gq",
                            "createdDate": 1750549528960,
                            "name": "VND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cvSp2D35-eIz",
                            "createdDate": 1750549528960,
                            "name": "VUV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tq3nsu4EefH9",
                            "createdDate": 1750549528960,
                            "name": "WST",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0sX_j5CeMvNP",
                            "createdDate": 1750549528960,
                            "name": "XAF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Qfbg3T3uEY1s",
                            "createdDate": 1750549528960,
                            "name": "XCD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "014gsjEoHwhX",
                            "createdDate": 1750549528960,
                            "name": "XOF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "D35lL8KweOfJ",
                            "createdDate": 1750549528960,
                            "name": "XPF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1r5pWX5TFTBv",
                            "createdDate": 1750549528960,
                            "name": "XXX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OGFmwGORU6C4",
                            "createdDate": 1750549528960,
                            "name": "YER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8iI0-ZuyKss5",
                            "createdDate": 1750549528960,
                            "name": "ZAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KW2b2gTn0t_Y",
                            "createdDate": 1750549528960,
                            "name": "ZMW",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-finances": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-finances",
                "name": "Finances",
                "apiIdentifier": "finances",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "-M0GBzdUFB9T",
                    "createdDate": "2025-06-21T23:45:28.960Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-google_apps_domain": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-google_apps_domain",
                "name": "Google Apps Domain",
                "apiIdentifier": "googleAppsDomain",
                "configuration": {
                    "type": "StringConfig",
                    "key": "C20VTcmN5OoX",
                    "createdDate": "2025-06-21T23:45:28.960Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-google_apps_login_enabled": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-google_apps_login_enabled",
                "name": "Google Apps Login Enabled",
                "apiIdentifier": "googleAppsLoginEnabled",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "uheo7TBVhuN6",
                    "createdDate": "2025-06-21T23:45:28.960Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-granted_scopes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-granted_scopes",
                "name": "Granted Scopes",
                "apiIdentifier": "grantedScopes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "xp3L2HwWvdzJ",
                    "createdDate": "2025-06-21T23:45:28.977Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-has_discounts": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-has_discounts",
                "name": "Has Discounts",
                "apiIdentifier": "hasDiscounts",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "89pNPL7V47y6",
                    "createdDate": "2025-06-21T23:45:28.961Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-has_gift_cards": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-has_gift_cards",
                "name": "Has Gift Cards",
                "apiIdentifier": "hasGiftCards",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "qys3_E0_mOqL",
                    "createdDate": "2025-06-21T23:45:28.961Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-has_storefront": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-has_storefront",
                "name": "Has Storefront",
                "apiIdentifier": "hasStorefront",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "6JzNU9LdGxqw",
                    "createdDate": "2025-06-21T23:45:28.961Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-iana_timezone": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-iana_timezone",
                "name": "Iana Timezone",
                "apiIdentifier": "ianaTimezone",
                "configuration": {
                    "type": "StringConfig",
                    "key": "_qFZzA5Y6o4h",
                    "createdDate": "2025-06-21T23:45:28.961Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-installed_via_api_key": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-installed_via_api_key",
                "name": "Installed Via API Key",
                "apiIdentifier": "installedViaApiKey",
                "configuration": {
                    "type": "StringConfig",
                    "key": "u8_62J4JR3fR",
                    "createdDate": "2025-06-21T23:45:28.977Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-latitude": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Shop-latitude",
                "name": "Latitude",
                "apiIdentifier": "latitude",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "_gwNNeZaYQq-",
                    "createdDate": "2025-06-21T23:45:28.961Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-longitude": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Shop-longitude",
                "name": "Longitude",
                "apiIdentifier": "longitude",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "fqPABTyg-fft",
                    "createdDate": "2025-06-21T23:45:28.961Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-marketing_sms_consent_enabled_at_checkout": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-marketing_sms_consent_enabled_at_checkout",
                "name": "Marketing SMS Content Enabled at Checkout",
                "apiIdentifier": "marketingSmsContentEnabledAtCheckout",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "SvKKJx6bhxVZ",
                    "createdDate": "2025-06-21T23:45:28.951Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-money_format": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-money_format",
                "name": "Money Format",
                "apiIdentifier": "moneyFormat",
                "configuration": {
                    "type": "StringConfig",
                    "key": "YB6_EDy6djTj",
                    "createdDate": "2025-06-21T23:45:28.961Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-money_in_emails_format": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-money_in_emails_format",
                "name": "Money In Emails Format",
                "apiIdentifier": "moneyInEmailsFormat",
                "configuration": {
                    "type": "StringConfig",
                    "key": "bxAsBg-kThq-",
                    "createdDate": "2025-06-21T23:45:28.962Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-money_with_currency_format": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-money_with_currency_format",
                "name": "Money With Currency Format",
                "apiIdentifier": "moneyWithCurrencyFormat",
                "configuration": {
                    "type": "StringConfig",
                    "key": "lkDNWrIJmqNd",
                    "createdDate": "2025-06-21T23:45:28.962Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-money_with_currency_in_emails_format": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-money_with_currency_in_emails_format",
                "name": "Money With Currency In Emails Format",
                "apiIdentifier": "moneyWithCurrencyInEmailsFormat",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Qo6_NWtQmibM",
                    "createdDate": "2025-06-21T23:45:28.962Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-multi_location_enabled": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-multi_location_enabled",
                "name": "Multi Location Enabled",
                "apiIdentifier": "multiLocationEnabled",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "i6NBgPAFoMLj",
                    "createdDate": "2025-06-21T23:45:28.962Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-myshopify_domain": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-myshopify_domain",
                "name": "myshopify Domain",
                "apiIdentifier": "myshopifyDomain",
                "configuration": {
                    "type": "StringConfig",
                    "key": "3LRDOBk4t7PV",
                    "createdDate": "2025-06-21T23:45:28.962Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-name",
                "name": "Name",
                "apiIdentifier": "name",
                "configuration": {
                    "type": "StringConfig",
                    "key": "QsCLO3Qft3V4",
                    "createdDate": "2025-06-21T23:45:28.962Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-password_enabled": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-password_enabled",
                "name": "Password Enabled",
                "apiIdentifier": "passwordEnabled",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "l0LID_hEWcn5",
                    "createdDate": "2025-06-21T23:45:28.962Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-phone": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-phone",
                "name": "Phone",
                "apiIdentifier": "phone",
                "configuration": {
                    "type": "StringConfig",
                    "key": "wzdbw26aqjVz",
                    "createdDate": "2025-06-21T23:45:28.962Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-plan_display_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-plan_display_name",
                "name": "Plan Display Name",
                "apiIdentifier": "planDisplayName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "mhsxICSFnfns",
                    "createdDate": "2025-06-21T23:45:28.967Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-plan_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-plan_name",
                "name": "Plan Name",
                "apiIdentifier": "planName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Q0ztYNHJiM73",
                    "createdDate": "2025-06-21T23:45:28.967Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-pre_launch_enabled": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-pre_launch_enabled",
                "name": "Pre Launch Enabled",
                "apiIdentifier": "preLaunchEnabled",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "0PqPDuaYaV3n",
                    "createdDate": "2025-06-21T23:45:28.967Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-primary_locale": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-primary_locale",
                "name": "Primary Locale",
                "apiIdentifier": "primaryLocale",
                "configuration": {
                    "type": "StringConfig",
                    "key": "blSUoV4T3nv7",
                    "createdDate": "2025-06-21T23:45:28.968Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-province": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-province",
                "name": "Province",
                "apiIdentifier": "province",
                "configuration": {
                    "type": "StringConfig",
                    "key": "x7x9x0nv7T8K",
                    "createdDate": "2025-06-21T23:45:28.968Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-province_code": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-province_code",
                "name": "Province Code",
                "apiIdentifier": "provinceCode",
                "configuration": {
                    "type": "StringConfig",
                    "key": "xTqxUtG6FL0M",
                    "createdDate": "2025-06-21T23:45:28.968Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-registered_webhooks": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-registered_webhooks",
                "name": "Registered Webhooks",
                "apiIdentifier": "registeredWebhooks",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "qW39Thk_R0lT",
                    "createdDate": "2025-06-21T23:45:28.977Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-requires_extra_payments_agreement": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-requires_extra_payments_agreement",
                "name": "Requires Extra Payments Agreement",
                "apiIdentifier": "requiresExtraPaymentsAgreement",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "xhhn2y5tsGOL",
                    "createdDate": "2025-06-21T23:45:28.968Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-setup_required": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-setup_required",
                "name": "Setup Required",
                "apiIdentifier": "setupRequired",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "uhvbLwbmgFra",
                    "createdDate": "2025-06-21T23:45:28.968Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-shop_owner": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-shop_owner",
                "name": "Shop Owner",
                "apiIdentifier": "shopOwner",
                "configuration": {
                    "type": "StringConfig",
                    "key": "ZxL6TaDuKpuk",
                    "createdDate": "2025-06-21T23:45:28.968Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-source": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-source",
                "name": "Source",
                "apiIdentifier": "source",
                "configuration": {
                    "type": "StringConfig",
                    "key": "QBTcAkPmlORp",
                    "createdDate": "2025-06-21T23:45:28.969Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-tax_shipping": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-tax_shipping",
                "name": "Tax Shipping",
                "apiIdentifier": "taxShipping",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "WqnbFDnat9nL",
                    "createdDate": "2025-06-21T23:45:28.969Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-taxes_included": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-taxes_included",
                "name": "Taxes Included",
                "apiIdentifier": "taxesIncluded",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "yoTvFdIIbpls",
                    "createdDate": "2025-06-21T23:45:28.969Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-timezone": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-timezone",
                "name": "Timezone",
                "apiIdentifier": "timezone",
                "configuration": {
                    "type": "StringConfig",
                    "key": "mid2w3yLZFrf",
                    "createdDate": "2025-06-21T23:45:28.969Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-transactional_sms_disabled": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-transactional_sms_disabled",
                "name": "Transactional SMS Disabled",
                "apiIdentifier": "transactionalSmsDisabled",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "-8xEYMeKmtJe",
                    "createdDate": "2025-06-21T23:45:28.951Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Shop-updated_at",
                "name": "Shopify Updated At",
                "apiIdentifier": "shopifyUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "EyfWz1gMQ8NK",
                    "createdDate": "2025-06-21T23:45:28.968Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-weight_unit-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Shop-weight_unit-Enum",
                "name": "Weight Unit",
                "apiIdentifier": "weightUnit",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "yROSipMG8hnn",
                    "createdDate": "2025-06-21T23:45:28.969Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "XUQd-wBpDgdx",
                            "createdDate": 1750549528969,
                            "name": "GRAMS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xe7z1G5ipKmE",
                            "createdDate": 1750549528969,
                            "name": "KILOGRAMS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RJaKxLR9azCy",
                            "createdDate": 1750549528969,
                            "name": "OUNCES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "H-Z9I4Hkb9NR",
                            "createdDate": 1750549528969,
                            "name": "POUNDS",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-zip": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-zip",
                "name": "ZIP Code",
                "apiIdentifier": "zipCode",
                "configuration": {
                    "type": "StringConfig",
                    "key": "iMhs3vrIoKxL",
                    "createdDate": "2025-06-21T23:45:28.969Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-GDPRRequests": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-GDPRRequests",
                "name": "GDPR Requests",
                "apiIdentifier": "gdprRequests",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "j9Ll9Wuya5Rn",
                    "createdDate": "2025-06-21T23:45:28.977Z",
                    "relatedModelKey": "DataModel-Shopify-GdprRequest",
                    "inverseFieldKey": "ModelField-Shopify-GdprRequest-Shop",
                    "relatedModelApiIdentifier": "shopifyGdprRequest",
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-Products": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-Products",
                "name": "Products",
                "apiIdentifier": "products",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "ibPnhKRtq2e5",
                    "createdDate": "2025-06-21T23:45:28.976Z",
                    "relatedModelKey": "DataModel-Shopify-Product",
                    "inverseFieldKey": "ModelField-Shopify-Product-Shop",
                    "relatedModelApiIdentifier": "shopifyProduct",
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-Syncs": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-Syncs",
                "name": "Syncs",
                "apiIdentifier": "syncs",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "rJU82Zx_KzBH",
                    "createdDate": "2025-06-21T23:45:28.977Z",
                    "relatedModelKey": "DataModel-Shopify-Sync",
                    "inverseFieldKey": "ModelField-Shopify-Sync-Shop",
                    "relatedModelApiIdentifier": "shopifySync",
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-Orders": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-Orders",
                "name": "Orders",
                "apiIdentifier": "orders",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "Q6TNms8oIGAV",
                    "createdDate": "2025-06-24T15:57:16.376Z",
                    "relatedModelKey": "DataModel-Shopify-Order",
                    "inverseFieldKey": "ModelField-Shopify-Order-Shop",
                    "relatedModelApiIdentifier": "shopifyOrder",
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-CheckoutLineItems": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-CheckoutLineItems",
                "name": "Checkout Line Items",
                "apiIdentifier": "checkoutLineItems",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "o-9gifkgGAC8",
                    "createdDate": "2025-06-24T17:51:06.696Z",
                    "relatedModelKey": "DataModel-Shopify-CheckoutLineItem",
                    "inverseFieldKey": "ModelField-Shopify-CheckoutLineItem-Shop",
                    "relatedModelApiIdentifier": "shopifyCheckoutLineItem",
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-Checkouts": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-Checkouts",
                "name": "Checkouts",
                "apiIdentifier": "checkouts",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "nA1Ee7ckJWkT",
                    "createdDate": "2025-06-24T20:16:17.708Z",
                    "relatedModelKey": "DataModel-Shopify-Checkout",
                    "inverseFieldKey": "ModelField-Shopify-Checkout-Shop",
                    "relatedModelApiIdentifier": "shopifyCheckout",
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyShop",
        "stateChart": {
            "type": "StateChart",
            "key": "RSzUXncy8V6w",
            "createdDate": 1750549528935,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Shop-Start",
                    "createdDate": 1750549528937,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Shop-Created",
                    "createdDate": 1750549528937,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [
                        {
                            "type": "State",
                            "key": "State-Shopify-Shop-Installed",
                            "createdDate": 1750549528943,
                            "name": "Installed",
                            "isRecordBirthPlace": false,
                            "isUndeleteableSystemState": false,
                            "restoreHistory": true,
                            "childStates": [],
                            "customApiIdentifier": null
                        },
                        {
                            "type": "State",
                            "key": "State-Shopify-Shop-Uninstalled",
                            "createdDate": 1750549528944,
                            "name": "Uninstalled",
                            "isRecordBirthPlace": false,
                            "isUndeleteableSystemState": false,
                            "restoreHistory": true,
                            "childStates": [],
                            "customApiIdentifier": null
                        }
                    ],
                    "initialChildState": "State-Shopify-Shop-Installed",
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Shop-Deleted",
                    "createdDate": 1750549528937,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Shop-Start"
        }
    },
    "ShopifySync": {
        "key": "DataModel-Shopify-Sync",
        "name": "shopifySync",
        "apiIdentifier": "shopifySync",
        "namespace": [],
        "fields": {
            "DataModel-Shopify-Sync-system-id": {
                "fieldType": "ID",
                "key": "DataModel-Shopify-Sync-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "CE-vNjQW2Wxm",
                    "createdDate": "2025-06-21T23:45:29.202Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Sync-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Sync-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "aq-VXfD5yweU",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Sync-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Sync-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "UNUsYaIcjtNF",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Sync-system-state": {
                "fieldType": "RecordState",
                "key": "DataModel-Shopify-Sync-system-state",
                "name": "State",
                "apiIdentifier": "state",
                "configuration": {
                    "type": "RecordStateConfig",
                    "key": "x7HTXLL7-h2z",
                    "createdDate": "2025-06-21T23:45:29.202Z"
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Sync-syncSince": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Sync-syncSince",
                "name": "Sync Since",
                "apiIdentifier": "syncSince",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "dYCQUleNA9CM",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-Domain": {
                "fieldType": "String",
                "key": "ModelField-Shopify-Sync-Domain",
                "name": "Domain",
                "apiIdentifier": "domain",
                "configuration": {
                    "type": "StringConfig",
                    "key": "RWPCC3iI4yil",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-ErrorDetails": {
                "fieldType": "String",
                "key": "ModelField-Shopify-Sync-ErrorDetails",
                "name": "Error Details",
                "apiIdentifier": "errorDetails",
                "configuration": {
                    "type": "StringConfig",
                    "key": "YNVsLyvVwjrC",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-ErrorMessage": {
                "fieldType": "String",
                "key": "ModelField-Shopify-Sync-ErrorMessage",
                "name": "Error Message",
                "apiIdentifier": "errorMessage",
                "configuration": {
                    "type": "StringConfig",
                    "key": "G5VE7_Hesp_l",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-Force": {
                "fieldType": "Boolean",
                "key": "ModelField-Shopify-Sync-Force",
                "name": "Force",
                "apiIdentifier": "force",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "Ecjqur9U483G",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "default": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-Models": {
                "fieldType": "JSON",
                "key": "ModelField-Shopify-Sync-Models",
                "name": "Models",
                "apiIdentifier": "models",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "4o3IFvDHukO1",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Sync-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "kZp1FT7qZkCU",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-SinceBy": {
                "fieldType": "Enum",
                "key": "ModelField-Shopify-Sync-SinceBy",
                "name": "Sync Since By",
                "apiIdentifier": "syncSinceBy",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "YzG7uSqEaWIy",
                    "createdDate": "2025-06-21T23:45:29.202Z",
                    "allowMultiple": false,
                    "allowOther": false,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "ER0Syecpzk7K",
                            "createdDate": 1750549529202,
                            "name": "updated_at",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OLyfAe3rZgQ4",
                            "createdDate": 1750549529202,
                            "name": "created_at",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifySync",
        "stateChart": {
            "type": "StateChart",
            "key": "SNXLunX7uQza",
            "createdDate": 1750549529197,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Sync-Start",
                    "createdDate": 1750549529197,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Sync-Running",
                    "createdDate": 1750549529197,
                    "name": "Running",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Sync-Completed",
                    "createdDate": 1750549529197,
                    "name": "Completed",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Sync-Errored",
                    "createdDate": 1750549529197,
                    "name": "Errored",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Sync-Start"
        }
    },
    "ShopifyOrder": {
        "key": "DataModel-Shopify-Order",
        "name": "shopifyOrder",
        "apiIdentifier": "shopifyOrder",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-Order-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-Order-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "OM8dug_uLh2d",
                    "createdDate": "2025-06-24T15:57:16.518Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Order-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Order-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "Z_U6bKQB7MMr",
                    "createdDate": "2025-06-24T15:57:16.519Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Order-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Order-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "7i7kxx3WByaJ",
                    "createdDate": "2025-06-24T15:57:16.519Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-__gadget_graphql_additional_fees": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-__gadget_graphql_additional_fees",
                "name": "Additional Fees",
                "apiIdentifier": "additionalFees",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "7Yt6HVs2IQfQ",
                    "createdDate": "2025-06-24T15:57:16.537Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-__gadget_graphql_fulfillments_count": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-__gadget_graphql_fulfillments_count",
                "name": "Fulfillments Count",
                "apiIdentifier": "fulfillmentsCount",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "w_j-HXuMlvYj",
                    "createdDate": "2025-06-24T15:57:16.538Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-__gadget_graphql_order_cancellation": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-__gadget_graphql_order_cancellation",
                "name": "Cancellation",
                "apiIdentifier": "cancellation",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "4NkKG3ZXWfBT",
                    "createdDate": "2025-06-24T15:57:16.538Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-__gadget_graphql_order_risk": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-__gadget_graphql_order_risk",
                "name": "Risk",
                "apiIdentifier": "risk",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "nWnTHTfFYAg1",
                    "createdDate": "2025-06-24T15:57:16.538Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-__gadget_graphql_order_shopify_protect": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-__gadget_graphql_order_shopify_protect",
                "name": "Shopify Protect",
                "apiIdentifier": "shopifyProtect",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "2JVxRH7qllBm",
                    "createdDate": "2025-06-24T15:57:16.538Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-__gadget_graphql_total_cash_rounding_adjustment": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-__gadget_graphql_total_cash_rounding_adjustment",
                "name": "Total Cash Rounding Adjustment",
                "apiIdentifier": "totalCashRoundingAdjustment",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "HEyTj-6IZlTH",
                    "createdDate": "2025-06-24T15:57:16.538Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-__gadget_graphql_transactions_count": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-__gadget_graphql_transactions_count",
                "name": "Transactions Count",
                "apiIdentifier": "transactionsCount",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "csumJohp1yxk",
                    "createdDate": "2025-06-24T15:57:16.538Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-alerts": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-alerts",
                "name": "Alerts",
                "apiIdentifier": "alerts",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "9NL4MwbZ0BvU",
                    "createdDate": "2025-06-24T15:57:16.538Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-billingAddressMatchesShippingAddress": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-billingAddressMatchesShippingAddress",
                "name": "Billing Status Matches Shipping Address",
                "apiIdentifier": "billingStatusMatchesShippingAddress",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "ghxxYjzJD-qo",
                    "createdDate": "2025-06-24T15:57:16.538Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-billing_address": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-billing_address",
                "name": "Billing Address",
                "apiIdentifier": "billingAddress",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "vCydnzlJWaAy",
                    "createdDate": "2025-06-24T15:57:16.519Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-browser_ip": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-browser_ip",
                "name": "Browser IP",
                "apiIdentifier": "browserIp",
                "configuration": {
                    "type": "StringConfig",
                    "key": "txfLhyGDE84B",
                    "createdDate": "2025-06-24T15:57:16.519Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-buyer_accepts_marketing": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-buyer_accepts_marketing",
                "name": "Buyer Accepts Marketing",
                "apiIdentifier": "buyerAcceptsMarketing",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "1KQ5wtS4xPH1",
                    "createdDate": "2025-06-24T15:57:16.519Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-canMarkAsPaid": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-canMarkAsPaid",
                "name": "Can Mark As Paid",
                "apiIdentifier": "canMarkAsPaid",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "3757VkikR8n0",
                    "createdDate": "2025-06-24T15:57:16.539Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-canNotifyCustomer": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-canNotifyCustomer",
                "name": "Can Notify Customer",
                "apiIdentifier": "canNotifyCustomer",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "WbeaBw1zg-B5",
                    "createdDate": "2025-06-24T15:57:16.539Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-cancel_reason-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-cancel_reason-Enum",
                "name": "Cancel Reason",
                "apiIdentifier": "cancelReason",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "Qg5s26IOKfUf",
                    "createdDate": "2025-06-24T15:57:16.519Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "zZnSfxrjoziT",
                            "createdDate": 1750780636519,
                            "name": "CUSTOMER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "EjAeWzfjQwji",
                            "createdDate": 1750780636520,
                            "name": "DECLINED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FsgGGX-fSRuX",
                            "createdDate": 1750780636520,
                            "name": "FRAUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YiKmJ5OQVZYp",
                            "createdDate": 1750780636520,
                            "name": "INVENTORY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "j1FT5MTwUNef",
                            "createdDate": 1750780636520,
                            "name": "OTHER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zexA4fFtulUJ",
                            "createdDate": 1750780636520,
                            "name": "STAFF",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-cancelled_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Order-cancelled_at",
                "name": "Cancelled At",
                "apiIdentifier": "cancelledAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "KmP1GydPSARy",
                    "createdDate": "2025-06-24T15:57:16.520Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-capturable": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-capturable",
                "name": "Capturable",
                "apiIdentifier": "capturable",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "4nc3ERqKWV-O",
                    "createdDate": "2025-06-24T15:57:16.539Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-cartDiscountAmountSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-cartDiscountAmountSet",
                "name": "Cart Discount Amount Set",
                "apiIdentifier": "cartDiscountAmountSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "h3XbUf-7h3Dv",
                    "createdDate": "2025-06-24T15:57:16.539Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-cart_token": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-cart_token",
                "name": "Cart Token",
                "apiIdentifier": "cartToken",
                "configuration": {
                    "type": "StringConfig",
                    "key": "_uTxPk2sKFm7",
                    "createdDate": "2025-06-24T15:57:16.520Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-checkout_token": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-checkout_token",
                "name": "Checkout Token",
                "apiIdentifier": "checkoutToken",
                "configuration": {
                    "type": "StringConfig",
                    "key": "cZpgQ22jxpMP",
                    "createdDate": "2025-06-24T15:57:16.520Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-client_details": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-client_details",
                "name": "Client Details",
                "apiIdentifier": "clientDetails",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "f3P00vbe9cAs",
                    "createdDate": "2025-06-24T15:57:16.520Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-closed": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-closed",
                "name": "Closed",
                "apiIdentifier": "closed",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "Cf-gyNLV3UWi",
                    "createdDate": "2025-06-24T15:57:16.539Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-closed_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Order-closed_at",
                "name": "Closed At",
                "apiIdentifier": "closedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "mGSM0qezPR2G",
                    "createdDate": "2025-06-24T15:57:16.520Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-confirmation_number": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-confirmation_number",
                "name": "Confirmation Number",
                "apiIdentifier": "confirmationNumber",
                "configuration": {
                    "type": "StringConfig",
                    "key": "goiKiI9fYm_V",
                    "createdDate": "2025-06-24T15:57:16.539Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-confirmed": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-confirmed",
                "name": "Confirmed",
                "apiIdentifier": "confirmed",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "hZRCsVnq59lz",
                    "createdDate": "2025-06-24T15:57:16.539Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-created_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Order-created_at",
                "name": "Shopify Created At",
                "apiIdentifier": "shopifyCreatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "ZwIYEvQEQBss",
                    "createdDate": "2025-06-24T15:57:16.534Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-currency-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-currency-Enum",
                "name": "Currency",
                "apiIdentifier": "currency",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "xsnBwUKGuYcP",
                    "createdDate": "2025-06-24T15:57:16.521Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "zO8WfSkevg-r",
                            "createdDate": 1750780636521,
                            "name": "AED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "D0mC6CenRkEW",
                            "createdDate": 1750780636521,
                            "name": "AFN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "V2TXP6rUubbe",
                            "createdDate": 1750780636521,
                            "name": "ALL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3385tWBWJdw2",
                            "createdDate": 1750780636521,
                            "name": "AMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mUQxV62sYbml",
                            "createdDate": 1750780636521,
                            "name": "ANG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6EL-4Vs9F_7N",
                            "createdDate": 1750780636521,
                            "name": "AOA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0Mukt88HexVW",
                            "createdDate": 1750780636521,
                            "name": "ARS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xN5Hgk23cnXA",
                            "createdDate": 1750780636521,
                            "name": "AUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LJMmiYIbEIQr",
                            "createdDate": 1750780636521,
                            "name": "AWG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XejZ-_Bugf62",
                            "createdDate": 1750780636521,
                            "name": "AZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Y4KauvqEIOZc",
                            "createdDate": 1750780636521,
                            "name": "BAM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "g4dDdFS6qzra",
                            "createdDate": 1750780636521,
                            "name": "BBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Q09nC0PH_QBp",
                            "createdDate": 1750780636521,
                            "name": "BDT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Gtb1xjvDKEAv",
                            "createdDate": 1750780636521,
                            "name": "BGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DQFKW3C0iDnL",
                            "createdDate": 1750780636521,
                            "name": "BHD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AvjQi9GH7hcU",
                            "createdDate": 1750780636521,
                            "name": "BIF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qyfKSMNf-xBB",
                            "createdDate": 1750780636521,
                            "name": "BMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "D1pf9Pz0xTJ8",
                            "createdDate": 1750780636521,
                            "name": "BND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gR4VuwGQkpPp",
                            "createdDate": 1750780636521,
                            "name": "BOB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2Gyk5pMHTtb4",
                            "createdDate": 1750780636521,
                            "name": "BRL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AY0oXaN9MzGz",
                            "createdDate": 1750780636521,
                            "name": "BSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GNy1Fg2v1E02",
                            "createdDate": 1750780636521,
                            "name": "BTN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fhzXiNnKRNvH",
                            "createdDate": 1750780636521,
                            "name": "BWP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8DdIAEwKpQC7",
                            "createdDate": 1750780636521,
                            "name": "BYN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "F3LlOKy_NSrs",
                            "createdDate": 1750780636521,
                            "name": "BYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1nkndLfniWeW",
                            "createdDate": 1750780636521,
                            "name": "BZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zc8obKezva9Q",
                            "createdDate": 1750780636521,
                            "name": "CAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "P2VQ-RLgyJZX",
                            "createdDate": 1750780636521,
                            "name": "CDF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0xAGd-gA_d5P",
                            "createdDate": 1750780636521,
                            "name": "CHF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8SLPi2AiOn1v",
                            "createdDate": 1750780636521,
                            "name": "CLP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LAURMKbqp0q_",
                            "createdDate": 1750780636521,
                            "name": "CNY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-ZECiFeocA_F",
                            "createdDate": 1750780636521,
                            "name": "COP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5EirzVZdVUGN",
                            "createdDate": 1750780636521,
                            "name": "CRC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m-RqY3_QhPpD",
                            "createdDate": 1750780636521,
                            "name": "CVE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IavkAFlP3S5z",
                            "createdDate": 1750780636521,
                            "name": "CZK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Xf4PIIMt9AZB",
                            "createdDate": 1750780636521,
                            "name": "DJF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NXt9YcaxS-1q",
                            "createdDate": 1750780636521,
                            "name": "DKK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wkd5d9TqyPvn",
                            "createdDate": 1750780636521,
                            "name": "DOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CgPXibTH1IBM",
                            "createdDate": 1750780636521,
                            "name": "DZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gjn48T238Srx",
                            "createdDate": 1750780636521,
                            "name": "EGP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0Q-tR9IzxlC4",
                            "createdDate": 1750780636521,
                            "name": "ERN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BNFIqu3MW-_n",
                            "createdDate": 1750780636521,
                            "name": "ETB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "d8efH58Za7-C",
                            "createdDate": 1750780636521,
                            "name": "EUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ojYolKxlj82p",
                            "createdDate": 1750780636521,
                            "name": "FJD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "q6iFJLtWziFQ",
                            "createdDate": 1750780636521,
                            "name": "FKP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DveGpsL1QOdm",
                            "createdDate": 1750780636521,
                            "name": "GBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kYrbgAzKkwFm",
                            "createdDate": 1750780636521,
                            "name": "GEL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nCiepBRlbwCM",
                            "createdDate": 1750780636521,
                            "name": "GHS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "F3dGh_BP0coE",
                            "createdDate": 1750780636521,
                            "name": "GIP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ECABMgIYBR2H",
                            "createdDate": 1750780636521,
                            "name": "GMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NbBMwA_Fx1ri",
                            "createdDate": 1750780636521,
                            "name": "GNF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rCh9Ny7jsSw4",
                            "createdDate": 1750780636521,
                            "name": "GTQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YiNGEk_XpgIp",
                            "createdDate": 1750780636521,
                            "name": "GYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Q0-GyUKobGO1",
                            "createdDate": 1750780636521,
                            "name": "HKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mPab8N-T2B-B",
                            "createdDate": 1750780636521,
                            "name": "HNL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3blgvwtTtnpD",
                            "createdDate": 1750780636522,
                            "name": "HRK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-DI7yTvno9E8",
                            "createdDate": 1750780636522,
                            "name": "HTG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-H6ceX2m-ZmF",
                            "createdDate": 1750780636522,
                            "name": "HUF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yCyst-ZzBL-x",
                            "createdDate": 1750780636522,
                            "name": "IDR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PFmhWhPBmNEO",
                            "createdDate": 1750780636522,
                            "name": "ILS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6RA0jRTsjwGx",
                            "createdDate": 1750780636522,
                            "name": "INR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lRzA6kh6jbwa",
                            "createdDate": 1750780636522,
                            "name": "IQD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6RzjRifZ-9W3",
                            "createdDate": 1750780636522,
                            "name": "IRR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "oauyX3pwK8m-",
                            "createdDate": 1750780636522,
                            "name": "ISK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fIct1iBeEIEo",
                            "createdDate": 1750780636522,
                            "name": "JEP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YCc8H_hq1mIN",
                            "createdDate": 1750780636522,
                            "name": "JMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lvUwdcoN9mCN",
                            "createdDate": 1750780636522,
                            "name": "JOD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4Y7iTcuErAz0",
                            "createdDate": 1750780636522,
                            "name": "JPY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sYd3cAMPaM8d",
                            "createdDate": 1750780636522,
                            "name": "KES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HM_WIhVaGBsw",
                            "createdDate": 1750780636522,
                            "name": "KGS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sGNuqGNjcM0T",
                            "createdDate": 1750780636522,
                            "name": "KHR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AhgURPXEqa2Z",
                            "createdDate": 1750780636522,
                            "name": "KID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "t2ilVDtqgRzt",
                            "createdDate": 1750780636522,
                            "name": "KMF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Y9A5bwCuuwoy",
                            "createdDate": 1750780636522,
                            "name": "KRW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZnI1p-5m7c0S",
                            "createdDate": 1750780636522,
                            "name": "KWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bUkKxYKLBIle",
                            "createdDate": 1750780636522,
                            "name": "KYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GYtZZsC2BKKQ",
                            "createdDate": 1750780636522,
                            "name": "KZT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4jzFT55jNtS7",
                            "createdDate": 1750780636522,
                            "name": "LAK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QyWSLkpYOmL5",
                            "createdDate": 1750780636522,
                            "name": "LBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZSFK0IEsp8pf",
                            "createdDate": 1750780636522,
                            "name": "LKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zSHHgIWoqMGy",
                            "createdDate": 1750780636522,
                            "name": "LRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nemqHZgM2P6s",
                            "createdDate": 1750780636522,
                            "name": "LSL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mXHBajYmA2kl",
                            "createdDate": 1750780636522,
                            "name": "LTL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "C5pkuhFd8Qeb",
                            "createdDate": 1750780636522,
                            "name": "LVL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "g7vQ0uKqy26T",
                            "createdDate": 1750780636522,
                            "name": "LYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yZKsRrfALXv3",
                            "createdDate": 1750780636525,
                            "name": "MAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "l2edUsBNgV-u",
                            "createdDate": 1750780636526,
                            "name": "MDL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gAQvXOyEBsGq",
                            "createdDate": 1750780636526,
                            "name": "MGA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MakPVVD5YuhN",
                            "createdDate": 1750780636526,
                            "name": "MKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tRgEWn72uLkS",
                            "createdDate": 1750780636526,
                            "name": "MMK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rQi-RV9KMTMz",
                            "createdDate": 1750780636526,
                            "name": "MNT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GB0EScJWs_YD",
                            "createdDate": 1750780636526,
                            "name": "MOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xxAE1i25FY93",
                            "createdDate": 1750780636526,
                            "name": "MRU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "A2zI7ek_0yR9",
                            "createdDate": 1750780636526,
                            "name": "MUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DEJ21NRLTM86",
                            "createdDate": 1750780636526,
                            "name": "MVR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-gRnztsn10pi",
                            "createdDate": 1750780636526,
                            "name": "MWK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZlbQFAoGTgSD",
                            "createdDate": 1750780636526,
                            "name": "MXN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ptJpcJnpPHJk",
                            "createdDate": 1750780636526,
                            "name": "MYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u1u4z4iitATM",
                            "createdDate": 1750780636526,
                            "name": "MZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aYTf3yv51QMO",
                            "createdDate": 1750780636526,
                            "name": "NAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WEamDE9Vz5SQ",
                            "createdDate": 1750780636526,
                            "name": "NGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Tzl5DwcH2S4z",
                            "createdDate": 1750780636526,
                            "name": "NIO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dLTh6Q7WbQEk",
                            "createdDate": 1750780636526,
                            "name": "NOK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pWqeyoPuni9Q",
                            "createdDate": 1750780636526,
                            "name": "NPR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MzLrlpFQlrJb",
                            "createdDate": 1750780636526,
                            "name": "NZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IPJMoaEMOUTV",
                            "createdDate": 1750780636526,
                            "name": "OMR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rVg16MtBfQKQ",
                            "createdDate": 1750780636526,
                            "name": "PAB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YecWO135JFTw",
                            "createdDate": 1750780636526,
                            "name": "PEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ofje5OcCITLv",
                            "createdDate": 1750780636526,
                            "name": "PGK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SxelWkD3WzkA",
                            "createdDate": 1750780636526,
                            "name": "PHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tbD7H79TEVtt",
                            "createdDate": 1750780636526,
                            "name": "PKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7CKWP1i4cqT5",
                            "createdDate": 1750780636526,
                            "name": "PLN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Epxp2Sw-z-UP",
                            "createdDate": 1750780636526,
                            "name": "PYG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wFi-u2ZrarZE",
                            "createdDate": 1750780636526,
                            "name": "QAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "V-Rh9i5J89pm",
                            "createdDate": 1750780636526,
                            "name": "RON",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0wlMYBzfzVe6",
                            "createdDate": 1750780636526,
                            "name": "RSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Fz9_fYtHs17t",
                            "createdDate": 1750780636526,
                            "name": "RUB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rfKMTK43QRVJ",
                            "createdDate": 1750780636526,
                            "name": "RWF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8jXu2eS7uuIR",
                            "createdDate": 1750780636526,
                            "name": "SAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eP4woFsQztPc",
                            "createdDate": 1750780636526,
                            "name": "SBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "47WRF17iayDi",
                            "createdDate": 1750780636526,
                            "name": "SCR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OfFU-93cO7EQ",
                            "createdDate": 1750780636526,
                            "name": "SDG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hO7Fkj8fkbKd",
                            "createdDate": 1750780636526,
                            "name": "SEK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dE-hTs8YivYU",
                            "createdDate": 1750780636526,
                            "name": "SGD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3s1HqcwAbA5D",
                            "createdDate": 1750780636526,
                            "name": "SHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7DCg68MXIyTp",
                            "createdDate": 1750780636526,
                            "name": "SLL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3oWXO9u-3w8J",
                            "createdDate": 1750780636526,
                            "name": "SOS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "w4U6fZjO5GtS",
                            "createdDate": 1750780636526,
                            "name": "SRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "iCv6zOKj084v",
                            "createdDate": 1750780636526,
                            "name": "SSP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bOrNa3b1NylZ",
                            "createdDate": 1750780636526,
                            "name": "STD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pYdyp5apFY6R",
                            "createdDate": 1750780636526,
                            "name": "STN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hdo6zi-jHeZ4",
                            "createdDate": 1750780636526,
                            "name": "SYP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rOvRqGHJJVgt",
                            "createdDate": 1750780636526,
                            "name": "SZL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9gT15jOwAbrp",
                            "createdDate": 1750780636526,
                            "name": "THB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sUxWBm4c4Els",
                            "createdDate": 1750780636526,
                            "name": "TJS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "n9gIq-gqeB0u",
                            "createdDate": 1750780636526,
                            "name": "TMT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "to8g533rF4qd",
                            "createdDate": 1750780636526,
                            "name": "TND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aCLEH2vVjdl6",
                            "createdDate": 1750780636526,
                            "name": "TOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6NGSUqmMtwXQ",
                            "createdDate": 1750780636526,
                            "name": "TRY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "n2sKheGBG9dX",
                            "createdDate": 1750780636527,
                            "name": "TTD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yfYRbpm0VL-t",
                            "createdDate": 1750780636527,
                            "name": "TWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Jj_ji2mHsJi2",
                            "createdDate": 1750780636527,
                            "name": "TZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aFsUq5VtXJWL",
                            "createdDate": 1750780636527,
                            "name": "UAH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bAzKi__CuzJp",
                            "createdDate": 1750780636527,
                            "name": "UGX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ORbF38UOlp7F",
                            "createdDate": 1750780636527,
                            "name": "USD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NpbYdlr0S6nR",
                            "createdDate": 1750780636527,
                            "name": "USDC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Rsj_P4S7Ky-k",
                            "createdDate": 1750780636527,
                            "name": "UYU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PO4EI_Lc_-kT",
                            "createdDate": 1750780636527,
                            "name": "UZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7aVWzQye4dI7",
                            "createdDate": 1750780636527,
                            "name": "VED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zCPEyUMky1GT",
                            "createdDate": 1750780636527,
                            "name": "VEF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HgkbUd37seS7",
                            "createdDate": 1750780636527,
                            "name": "VES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PSkHi_GvIF50",
                            "createdDate": 1750780636527,
                            "name": "VND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yjlMHEZqGg9a",
                            "createdDate": 1750780636527,
                            "name": "VUV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IbOjVTrOAlR_",
                            "createdDate": 1750780636527,
                            "name": "WST",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "EH1bOwWZ9rB0",
                            "createdDate": 1750780636527,
                            "name": "XAF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "So1hK79IG6zL",
                            "createdDate": 1750780636527,
                            "name": "XCD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eFvCjlrBKnz1",
                            "createdDate": 1750780636527,
                            "name": "XOF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MbKUgq0erK-O",
                            "createdDate": 1750780636527,
                            "name": "XPF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "s7pdvftFkCin",
                            "createdDate": 1750780636527,
                            "name": "XXX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kybg4ZLW2EP_",
                            "createdDate": 1750780636527,
                            "name": "YER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "e2PGvHmziLd_",
                            "createdDate": 1750780636527,
                            "name": "ZAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TwUVQFmuVSRT",
                            "createdDate": 1750780636527,
                            "name": "ZMW",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-currentCartDiscountAmountSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-currentCartDiscountAmountSet",
                "name": "Current Cart Discount Amount Set",
                "apiIdentifier": "currentCartDiscountAmountSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "DoUrFe5UcVRC",
                    "createdDate": "2025-06-24T15:57:16.539Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-currentSubtotalLineItemsQuantity": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Order-currentSubtotalLineItemsQuantity",
                "name": "Current Subtotal Line Items Quantity",
                "apiIdentifier": "currentSubtotalLineItemsQuantity",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "gnoPeBuW6vKs",
                    "createdDate": "2025-06-24T15:57:16.540Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-currentTotalWeight": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-currentTotalWeight",
                "name": "Current Total Weight",
                "apiIdentifier": "currentTotalWeight",
                "configuration": {
                    "type": "StringConfig",
                    "key": "gNubwu73E0Xg",
                    "createdDate": "2025-06-24T15:57:16.540Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_shipping_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-current_shipping_price_set",
                "name": "Current Shipping Price Set",
                "apiIdentifier": "currentShippingPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "bT4AvfaKL5J8",
                    "createdDate": "2025-06-24T15:57:16.539Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_subtotal_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-current_subtotal_price",
                "name": "Current Subtotal Price",
                "apiIdentifier": "currentSubtotalPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "HfphVCQuv1d-",
                    "createdDate": "2025-06-24T15:57:16.527Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_subtotal_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-current_subtotal_price_set",
                "name": "Current Subtotal Price Set",
                "apiIdentifier": "currentSubtotalPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "1Yr6VG3LZ0eT",
                    "createdDate": "2025-06-24T15:57:16.527Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_total_additional_fees_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-current_total_additional_fees_set",
                "name": "Current Total Additional Fees Set",
                "apiIdentifier": "currentTotalAdditionalFeesSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "zh5EJQM7BPrN",
                    "createdDate": "2025-06-24T15:57:16.537Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_total_discounts": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-current_total_discounts",
                "name": "Current Total Discounts",
                "apiIdentifier": "currentTotalDiscounts",
                "configuration": {
                    "type": "StringConfig",
                    "key": "9fJ2vDhbe-CN",
                    "createdDate": "2025-06-24T15:57:16.527Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_total_discounts_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-current_total_discounts_set",
                "name": "Current Total Discounts Set",
                "apiIdentifier": "currentTotalDiscountsSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "jLAiqmZEnR8S",
                    "createdDate": "2025-06-24T15:57:16.527Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_total_duties_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-current_total_duties_set",
                "name": "Current Total Duties Set",
                "apiIdentifier": "currentTotalDutiesSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "IKh93l5XbgG1",
                    "createdDate": "2025-06-24T15:57:16.528Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_total_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-current_total_price",
                "name": "Current Total Price",
                "apiIdentifier": "currentTotalPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Rg5c6KL4Zojg",
                    "createdDate": "2025-06-24T15:57:16.528Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_total_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-current_total_price_set",
                "name": "Current Total Price Set",
                "apiIdentifier": "currentTotalPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "Xa1onXVlp8ui",
                    "createdDate": "2025-06-24T15:57:16.528Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_total_tax": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-current_total_tax",
                "name": "Current Total Tax",
                "apiIdentifier": "currentTotalTax",
                "configuration": {
                    "type": "StringConfig",
                    "key": "8mDgxKlK3rTI",
                    "createdDate": "2025-06-24T15:57:16.528Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-current_total_tax_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-current_total_tax_set",
                "name": "Current Total Tax Set",
                "apiIdentifier": "currentTotalTaxSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "M0puWR1x-QtG",
                    "createdDate": "2025-06-24T15:57:16.528Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-customer_locale": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-customer_locale",
                "name": "Customer Locale",
                "apiIdentifier": "customerLocale",
                "configuration": {
                    "type": "StringConfig",
                    "key": "DIb-a_6YGDzY",
                    "createdDate": "2025-06-24T15:57:16.528Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-discount_applications": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-discount_applications",
                "name": "Discount Applications",
                "apiIdentifier": "discountApplications",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "rAzoH-6pHDzc",
                    "createdDate": "2025-06-24T15:57:16.528Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-discount_codes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-discount_codes",
                "name": "Discount Codes",
                "apiIdentifier": "discountCodes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "t2tnGJMixmHV",
                    "createdDate": "2025-06-24T15:57:16.528Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-duties_included": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-duties_included",
                "name": "Duties Included",
                "apiIdentifier": "dutiesIncluded",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "z-aQFFiAQIDY",
                    "createdDate": "2025-06-24T15:57:16.540Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-edited": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-edited",
                "name": "Edited",
                "apiIdentifier": "edited",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "z4JnYzuvjBk4",
                    "createdDate": "2025-06-24T15:57:16.540Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-email": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-email",
                "name": "Email",
                "apiIdentifier": "email",
                "configuration": {
                    "type": "StringConfig",
                    "key": "z_SHe6jL7w6U",
                    "createdDate": "2025-06-24T15:57:16.528Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-estimated_taxes": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-estimated_taxes",
                "name": "Estimated Taxes",
                "apiIdentifier": "estimatedTaxes",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "TbWGU-CQvLwv",
                    "createdDate": "2025-06-24T15:57:16.529Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-financial_status-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-financial_status-Enum",
                "name": "Financial Status",
                "apiIdentifier": "financialStatus",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "75KLsUJFMRgi",
                    "createdDate": "2025-06-24T15:57:16.529Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "F7ztxhWvrwAA",
                            "createdDate": 1750780636529,
                            "name": "AUTHORIZED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VVZvuTfZB4vD",
                            "createdDate": 1750780636529,
                            "name": "EXPIRED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9j5DwYAbcQTz",
                            "createdDate": 1750780636529,
                            "name": "PAID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FewkuQP4k0Uw",
                            "createdDate": 1750780636529,
                            "name": "PARTIALLY_PAID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "L4cZ6TeAgP5L",
                            "createdDate": 1750780636529,
                            "name": "PARTIALLY_REFUNDED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0AH3tdUW2uef",
                            "createdDate": 1750780636529,
                            "name": "PENDING",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Nprlb5IVTML_",
                            "createdDate": 1750780636529,
                            "name": "REFUNDED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "q4swyxiRzwWD",
                            "createdDate": 1750780636529,
                            "name": "VOIDED",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-fulfillable": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-fulfillable",
                "name": "Fulfillable",
                "apiIdentifier": "fulfillable",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "dvhAnR99Otrx",
                    "createdDate": "2025-06-24T15:57:16.540Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-fulfillment_status-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-fulfillment_status-Enum",
                "name": "Fulfillment Status",
                "apiIdentifier": "fulfillmentStatus",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "cKycQW8loaQY",
                    "createdDate": "2025-06-24T15:57:16.529Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "ngiIPek6g89i",
                            "createdDate": 1750780636529,
                            "name": "FULFILLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pTXHjbC1atew",
                            "createdDate": 1750780636529,
                            "name": "IN_PROGRESS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9Xop0XXYhrd2",
                            "createdDate": 1750780636529,
                            "name": "ON_HOLD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-MPaaX3hu-PD",
                            "createdDate": 1750780636529,
                            "name": "OPEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "C6ut3i6_rYnO",
                            "createdDate": 1750780636529,
                            "name": "PARTIALLY_FULFILLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kQ9jVT3-gal_",
                            "createdDate": 1750780636529,
                            "name": "PENDING_FULFILLMENT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0fA1NUERHSLw",
                            "createdDate": 1750780636529,
                            "name": "REQUEST_DECLINED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "V9exgzSIMGii",
                            "createdDate": 1750780636529,
                            "name": "RESTOCKED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TngH5FTfEUAJ",
                            "createdDate": 1750780636529,
                            "name": "SCHEDULED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ra1g74hY-Qug",
                            "createdDate": 1750780636529,
                            "name": "UNFULFILLED",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-fullyPaid": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-fullyPaid",
                "name": "Fully Paid",
                "apiIdentifier": "fullyPaid",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "BHvpAHZDQtCm",
                    "createdDate": "2025-06-24T15:57:16.540Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-hasTimelineComment": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-hasTimelineComment",
                "name": "Has Timeline Comment",
                "apiIdentifier": "hasTimelineComment",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "KbjERfKkvesn",
                    "createdDate": "2025-06-24T15:57:16.540Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-landing_site": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Order-landing_site",
                "name": "Landing Site",
                "apiIdentifier": "landingSite",
                "configuration": {
                    "type": "URLConfig",
                    "key": "oPdX3K5b_riC",
                    "createdDate": "2025-06-24T15:57:16.529Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-legacyResourceId": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-legacyResourceId",
                "name": "Legacy Resource Id",
                "apiIdentifier": "legacyResourceId",
                "configuration": {
                    "type": "StringConfig",
                    "key": "xf7KwcFamx4S",
                    "createdDate": "2025-06-24T15:57:16.540Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-merchantEditable": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-merchantEditable",
                "name": "Merchant Editable",
                "apiIdentifier": "merchantEditable",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "XTTQCfJFjbfP",
                    "createdDate": "2025-06-24T15:57:16.540Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-merchantEditableErrors": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-merchantEditableErrors",
                "name": "Merchant Editable Errors",
                "apiIdentifier": "merchantEditableErrors",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "-hSs_xvH3q6B",
                    "createdDate": "2025-06-24T15:57:16.541Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-merchant_of_record_app_id": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Order-merchant_of_record_app_id",
                "name": "Merchant of Record App Id",
                "apiIdentifier": "merchantOfRecordAppId",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "FM0GI1Mg6mx_",
                    "createdDate": "2025-06-24T15:57:16.537Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-name",
                "name": "Name",
                "apiIdentifier": "name",
                "configuration": {
                    "type": "StringConfig",
                    "key": "JeRDi9Mgqhvf",
                    "createdDate": "2025-06-24T15:57:16.530Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-netPaymentSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-netPaymentSet",
                "name": "Net Payment Set",
                "apiIdentifier": "netPaymentSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "cI8xlPlYrSHm",
                    "createdDate": "2025-06-24T15:57:16.541Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-note": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-note",
                "name": "Note",
                "apiIdentifier": "note",
                "configuration": {
                    "type": "StringConfig",
                    "key": "QTQCh6rI6IZE",
                    "createdDate": "2025-06-24T15:57:16.530Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-note_attributes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-note_attributes",
                "name": "Note Attributes",
                "apiIdentifier": "noteAttributes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "J-Xd-Noc9yYx",
                    "createdDate": "2025-06-24T15:57:16.530Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-order_status_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Order-order_status_url",
                "name": "Order Status URL",
                "apiIdentifier": "orderStatusUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "JNeOGA4Yp9Bg",
                    "createdDate": "2025-06-24T15:57:16.530Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-originalTotalPriceSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-originalTotalPriceSet",
                "name": "Original Total Price Set",
                "apiIdentifier": "originalTotalPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "Ljw0vI8PlxoG",
                    "createdDate": "2025-06-24T15:57:16.541Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-original_total_additional_fees_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-original_total_additional_fees_set",
                "name": "Original Total Additional Fees Set",
                "apiIdentifier": "originalTotalAdditionalFeesSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "wKtHthwsLEsj",
                    "createdDate": "2025-06-24T15:57:16.537Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-original_total_duties_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-original_total_duties_set",
                "name": "Original Total Duties Set",
                "apiIdentifier": "originalTotalDutiesSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "jdQjz0BPez0C",
                    "createdDate": "2025-06-24T15:57:16.530Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-payment_gateway_names": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-payment_gateway_names",
                "name": "Payment Gateway Names",
                "apiIdentifier": "paymentGatewayNames",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "g5RXfH_IuBEz",
                    "createdDate": "2025-06-24T15:57:16.530Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-phone": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-phone",
                "name": "Phone",
                "apiIdentifier": "phone",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Z929Ag_7LWYi",
                    "createdDate": "2025-06-24T15:57:16.530Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-po_number": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-po_number",
                "name": "PO Number",
                "apiIdentifier": "poNumber",
                "configuration": {
                    "type": "StringConfig",
                    "key": "gu-11JhxOAvU",
                    "createdDate": "2025-06-24T15:57:16.537Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-presentment_currency-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-presentment_currency-Enum",
                "name": "Presentment Currency",
                "apiIdentifier": "presentmentCurrency",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "vzVsCdFUQWRk",
                    "createdDate": "2025-06-24T15:57:16.530Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "5nQ2LLMnHTgZ",
                            "createdDate": 1750780636530,
                            "name": "AED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "adviDK9w3rZw",
                            "createdDate": 1750780636530,
                            "name": "AFN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6xeDqVoCcOWe",
                            "createdDate": 1750780636530,
                            "name": "ALL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mNksb2jw1hkf",
                            "createdDate": 1750780636530,
                            "name": "AMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8QGgJyy48vfd",
                            "createdDate": 1750780636530,
                            "name": "ANG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2pI9jE8ajjKw",
                            "createdDate": 1750780636530,
                            "name": "AOA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UnAPBCC29fCT",
                            "createdDate": 1750780636530,
                            "name": "ARS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-XiSKWYTd28k",
                            "createdDate": 1750780636531,
                            "name": "AUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rAsFJXPyONfW",
                            "createdDate": 1750780636531,
                            "name": "AWG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m_w_Ht6Y2d_X",
                            "createdDate": 1750780636531,
                            "name": "AZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_RWKVc9liIbT",
                            "createdDate": 1750780636531,
                            "name": "BAM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "il9cTAitaxOe",
                            "createdDate": 1750780636531,
                            "name": "BBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nwesmIfuiBDH",
                            "createdDate": 1750780636531,
                            "name": "BDT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_mJVS0AHOK07",
                            "createdDate": 1750780636531,
                            "name": "BGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4Q-L6gejV1ZC",
                            "createdDate": 1750780636531,
                            "name": "BHD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kYjHZIxMpOkJ",
                            "createdDate": 1750780636531,
                            "name": "BIF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-0miRXSU892Z",
                            "createdDate": 1750780636531,
                            "name": "BMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IVCrpeZ-X7mo",
                            "createdDate": 1750780636531,
                            "name": "BND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JAdgQZ0h27gl",
                            "createdDate": 1750780636531,
                            "name": "BOB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uM7GagnRZs8b",
                            "createdDate": 1750780636531,
                            "name": "BRL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NIxDr2KdNk-K",
                            "createdDate": 1750780636531,
                            "name": "BSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "poJvtCO4YHpS",
                            "createdDate": 1750780636531,
                            "name": "BTN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OVRkpu7dz2fe",
                            "createdDate": 1750780636531,
                            "name": "BWP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1Rb1gKcU2cwY",
                            "createdDate": 1750780636531,
                            "name": "BYN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_iisao6G3g_q",
                            "createdDate": 1750780636531,
                            "name": "BYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PxMP9rwwbKnm",
                            "createdDate": 1750780636531,
                            "name": "BZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GIfXCZBFNEji",
                            "createdDate": 1750780636531,
                            "name": "CAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "S8SqqM4cmD3v",
                            "createdDate": 1750780636531,
                            "name": "CDF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Vx7GOsVne5zo",
                            "createdDate": 1750780636531,
                            "name": "CHF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UnmZQhQX8h17",
                            "createdDate": 1750780636531,
                            "name": "CLP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MFP_rZDuuccb",
                            "createdDate": 1750780636531,
                            "name": "CNY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3qUlIOSEoY-V",
                            "createdDate": 1750780636531,
                            "name": "COP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "iTy-7Z3eHZr4",
                            "createdDate": 1750780636531,
                            "name": "CRC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "i8wtbzQbes-W",
                            "createdDate": 1750780636531,
                            "name": "CVE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LwLpnB2ngnN9",
                            "createdDate": 1750780636531,
                            "name": "CZK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "M7S1r-1hedg1",
                            "createdDate": 1750780636531,
                            "name": "DJF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1AmD1cRB77iF",
                            "createdDate": 1750780636531,
                            "name": "DKK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "K3A5-aYGl1nS",
                            "createdDate": 1750780636531,
                            "name": "DOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sD4VktSQ6oVb",
                            "createdDate": 1750780636531,
                            "name": "DZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KD8yAnFZIrGZ",
                            "createdDate": 1750780636531,
                            "name": "EGP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Pis4zWsT3Q7s",
                            "createdDate": 1750780636531,
                            "name": "ERN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-FWlQtJ_zoyt",
                            "createdDate": 1750780636531,
                            "name": "ETB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-rSFLIOv-tH2",
                            "createdDate": 1750780636531,
                            "name": "EUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zC1cDTpS6BgJ",
                            "createdDate": 1750780636531,
                            "name": "FJD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ze5kx-_ut8Ue",
                            "createdDate": 1750780636531,
                            "name": "FKP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rdgNV0rlcKaf",
                            "createdDate": 1750780636531,
                            "name": "GBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "v8yVs04gB7E6",
                            "createdDate": 1750780636531,
                            "name": "GEL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "g9Nz1h1FM1IQ",
                            "createdDate": 1750780636531,
                            "name": "GHS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "spQLUrN_8krC",
                            "createdDate": 1750780636531,
                            "name": "GIP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Db827gUS8yuG",
                            "createdDate": 1750780636531,
                            "name": "GMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QxouX42RtVx3",
                            "createdDate": 1750780636531,
                            "name": "GNF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "asWwdVtJEFL4",
                            "createdDate": 1750780636531,
                            "name": "GTQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3kbRrMRK2IhY",
                            "createdDate": 1750780636531,
                            "name": "GYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RynR9l0Op3Cv",
                            "createdDate": 1750780636531,
                            "name": "HKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VAkvZNFFRca3",
                            "createdDate": 1750780636531,
                            "name": "HNL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u27u9BWWTChH",
                            "createdDate": 1750780636531,
                            "name": "HRK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "P3c29yzZR9M5",
                            "createdDate": 1750780636531,
                            "name": "HTG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nWXj00XM-mlb",
                            "createdDate": 1750780636531,
                            "name": "HUF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Dx7Jgjbln7cH",
                            "createdDate": 1750780636531,
                            "name": "IDR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tNEfk76l16we",
                            "createdDate": 1750780636531,
                            "name": "ILS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eqNt29sH6la8",
                            "createdDate": 1750780636531,
                            "name": "INR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bJ6aBfda_anw",
                            "createdDate": 1750780636531,
                            "name": "IQD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "H3mcdnVv3I9J",
                            "createdDate": 1750780636532,
                            "name": "IRR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fUaG_71YxguC",
                            "createdDate": 1750780636532,
                            "name": "ISK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uX0HXrs2iOeB",
                            "createdDate": 1750780636532,
                            "name": "JEP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wM5NHEpSnqce",
                            "createdDate": 1750780636532,
                            "name": "JMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LaZwv-Pfc1mA",
                            "createdDate": 1750780636532,
                            "name": "JOD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KK-DyJTONgZr",
                            "createdDate": 1750780636532,
                            "name": "JPY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rF2SfNpasfNZ",
                            "createdDate": 1750780636532,
                            "name": "KES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hYaLUIrb8RqY",
                            "createdDate": 1750780636532,
                            "name": "KGS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yMTuDa7abCYL",
                            "createdDate": 1750780636532,
                            "name": "KHR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kftgmqGmCvs4",
                            "createdDate": 1750780636532,
                            "name": "KID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8IWqVR50-m-s",
                            "createdDate": 1750780636532,
                            "name": "KMF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "znjX3IJyDjiW",
                            "createdDate": 1750780636532,
                            "name": "KRW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BlWH5K_TciTm",
                            "createdDate": 1750780636532,
                            "name": "KWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vO_IY6fXRLzY",
                            "createdDate": 1750780636532,
                            "name": "KYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lZeo4b0hssdf",
                            "createdDate": 1750780636532,
                            "name": "KZT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nxDkgL9d3B1h",
                            "createdDate": 1750780636532,
                            "name": "LAK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9dB2zRUbnYUp",
                            "createdDate": 1750780636532,
                            "name": "LBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "W_L3RnHfYQ9e",
                            "createdDate": 1750780636532,
                            "name": "LKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_1e7GalKYPUN",
                            "createdDate": 1750780636532,
                            "name": "LRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9SueKvc5lL6B",
                            "createdDate": 1750780636532,
                            "name": "LSL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nhcRPV1h_gyF",
                            "createdDate": 1750780636532,
                            "name": "LTL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ih-bfmqd9fFc",
                            "createdDate": 1750780636532,
                            "name": "LVL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0J5zilgB196o",
                            "createdDate": 1750780636532,
                            "name": "LYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Fs5h0mNRjh_K",
                            "createdDate": 1750780636532,
                            "name": "MAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NNUelR6yZPoJ",
                            "createdDate": 1750780636532,
                            "name": "MDL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NjDlxnar3bPn",
                            "createdDate": 1750780636532,
                            "name": "MGA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SIjH77XkrLf8",
                            "createdDate": 1750780636532,
                            "name": "MKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_Gsa1vNykJQc",
                            "createdDate": 1750780636532,
                            "name": "MMK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rSIbTQ_dyuIF",
                            "createdDate": 1750780636532,
                            "name": "MNT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GxRf5VFVBpjk",
                            "createdDate": 1750780636532,
                            "name": "MOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gFu1uRr3nJGL",
                            "createdDate": 1750780636532,
                            "name": "MRU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5r3BkNIPtOao",
                            "createdDate": 1750780636532,
                            "name": "MUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Zyt-ReoAcAcB",
                            "createdDate": 1750780636532,
                            "name": "MVR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lQE-iFpg30pU",
                            "createdDate": 1750780636532,
                            "name": "MWK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wHwD2mTCkclp",
                            "createdDate": 1750780636532,
                            "name": "MXN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UjBL6UvD5v--",
                            "createdDate": 1750780636532,
                            "name": "MYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bnqZ4X6mu9FK",
                            "createdDate": 1750780636532,
                            "name": "MZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "t4ILErtfTpsy",
                            "createdDate": 1750780636532,
                            "name": "NAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QtItmhYM4mjK",
                            "createdDate": 1750780636532,
                            "name": "NGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "y5DYnNdtmJtL",
                            "createdDate": 1750780636532,
                            "name": "NIO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7dpbTRvaYvRT",
                            "createdDate": 1750780636532,
                            "name": "NOK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "W1TAORMnU1CZ",
                            "createdDate": 1750780636532,
                            "name": "NPR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1r7CrrI7xBOx",
                            "createdDate": 1750780636532,
                            "name": "NZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1RfIwMdtyuM9",
                            "createdDate": 1750780636532,
                            "name": "OMR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2h-86Y2Eh5Zg",
                            "createdDate": 1750780636532,
                            "name": "PAB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3aTzDf_img0l",
                            "createdDate": 1750780636532,
                            "name": "PEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XasmtzADf4EC",
                            "createdDate": 1750780636532,
                            "name": "PGK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xV3-rH41Y0bj",
                            "createdDate": 1750780636532,
                            "name": "PHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xSR0BlDXLBxl",
                            "createdDate": 1750780636532,
                            "name": "PKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rfx0HwEU91jb",
                            "createdDate": 1750780636532,
                            "name": "PLN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0mJT8XW0Ojd5",
                            "createdDate": 1750780636532,
                            "name": "PYG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "oFS6eRvGkA1j",
                            "createdDate": 1750780636532,
                            "name": "QAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9339eYKaOMEE",
                            "createdDate": 1750780636532,
                            "name": "RON",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8I1pYYAJRYyo",
                            "createdDate": 1750780636532,
                            "name": "RSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0TH3miThDEq7",
                            "createdDate": 1750780636532,
                            "name": "RUB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NJbyos4yIZt3",
                            "createdDate": 1750780636532,
                            "name": "RWF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tQk1xOAzAijJ",
                            "createdDate": 1750780636533,
                            "name": "SAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Vn4lIFP_24Yx",
                            "createdDate": 1750780636533,
                            "name": "SBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "88zZbTzBsC7Z",
                            "createdDate": 1750780636533,
                            "name": "SCR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Y-336-lrfh4_",
                            "createdDate": 1750780636533,
                            "name": "SDG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gm1BWOJtkDuh",
                            "createdDate": 1750780636533,
                            "name": "SEK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KJhww6N_xboL",
                            "createdDate": 1750780636533,
                            "name": "SGD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OOjvtotP_4FT",
                            "createdDate": 1750780636533,
                            "name": "SHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0gvEUH8X_Ezr",
                            "createdDate": 1750780636533,
                            "name": "SLL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CnG7QsTIma7t",
                            "createdDate": 1750780636533,
                            "name": "SOS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dHDNXDi_x7zR",
                            "createdDate": 1750780636533,
                            "name": "SRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DjdnhMNQGxsM",
                            "createdDate": 1750780636533,
                            "name": "SSP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ACWbCCTJZ0iY",
                            "createdDate": 1750780636533,
                            "name": "STD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DxpdO9haRFLv",
                            "createdDate": 1750780636533,
                            "name": "STN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Tj-ASdNlnbTM",
                            "createdDate": 1750780636533,
                            "name": "SYP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SGmqxDMvT2Ur",
                            "createdDate": 1750780636533,
                            "name": "SZL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-Hoikfxx1aku",
                            "createdDate": 1750780636533,
                            "name": "THB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TDPvItqIudhc",
                            "createdDate": 1750780636533,
                            "name": "TJS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vW99E7UhB2O5",
                            "createdDate": 1750780636533,
                            "name": "TMT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "79kerK8sbbr-",
                            "createdDate": 1750780636533,
                            "name": "TND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "O-IDFcPqXkWB",
                            "createdDate": 1750780636533,
                            "name": "TOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Pe4FdRKePQEZ",
                            "createdDate": 1750780636533,
                            "name": "TRY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ctobdnWsyEzy",
                            "createdDate": 1750780636533,
                            "name": "TTD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2GKD7Bg74fJU",
                            "createdDate": 1750780636533,
                            "name": "TWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CKMc2691Ykfn",
                            "createdDate": 1750780636533,
                            "name": "TZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "REyWy8CyhhQA",
                            "createdDate": 1750780636533,
                            "name": "UAH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OV4WgdGuRQ7X",
                            "createdDate": 1750780636533,
                            "name": "UGX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "oAMKeAmTHsGS",
                            "createdDate": 1750780636533,
                            "name": "USD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Dq8ovz3-JjqH",
                            "createdDate": 1750780636533,
                            "name": "USDC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9d8USxDIxhcq",
                            "createdDate": 1750780636533,
                            "name": "UYU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NEOfoxivKmdw",
                            "createdDate": 1750780636533,
                            "name": "UZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "F1gi4FwgQ-DQ",
                            "createdDate": 1750780636533,
                            "name": "VED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vU3EN2McNSsz",
                            "createdDate": 1750780636533,
                            "name": "VEF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cTpS06-YMhYd",
                            "createdDate": 1750780636533,
                            "name": "VES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NsXb0uuqS5tD",
                            "createdDate": 1750780636533,
                            "name": "VND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "iMvb5Fvnx4k1",
                            "createdDate": 1750780636533,
                            "name": "VUV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gpJIbjP7ZGf5",
                            "createdDate": 1750780636533,
                            "name": "WST",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lwm8B2eP1XH7",
                            "createdDate": 1750780636533,
                            "name": "XAF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ko5zBtdnxqMD",
                            "createdDate": 1750780636533,
                            "name": "XCD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mN_9wGhvMvHa",
                            "createdDate": 1750780636533,
                            "name": "XOF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bOgGtD1X1oAD",
                            "createdDate": 1750780636533,
                            "name": "XPF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "B2G0T61kwNy4",
                            "createdDate": 1750780636533,
                            "name": "XXX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PCeC121RxuZo",
                            "createdDate": 1750780636533,
                            "name": "YER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VHssIqgpvD1E",
                            "createdDate": 1750780636533,
                            "name": "ZAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3A5ZxGiOaGWW",
                            "createdDate": 1750780636533,
                            "name": "ZMW",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-processed_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Order-processed_at",
                "name": "Processed At",
                "apiIdentifier": "processedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "ZaHxnAY3QqWH",
                    "createdDate": "2025-06-24T15:57:16.533Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-processing_method": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-processing_method",
                "name": "Processing Method",
                "apiIdentifier": "processingMethod",
                "configuration": {
                    "type": "StringConfig",
                    "key": "8hu52SBtiRkJ",
                    "createdDate": "2025-06-24T15:57:16.534Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-referring_site": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Order-referring_site",
                "name": "Referring Site",
                "apiIdentifier": "referringSite",
                "configuration": {
                    "type": "URLConfig",
                    "key": "uQkzuFCc7gRh",
                    "createdDate": "2025-06-24T15:57:16.534Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-refundDiscrepancySet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-refundDiscrepancySet",
                "name": "Refund Discrepency Set",
                "apiIdentifier": "refundDiscrepencySet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "aql4IOzDmmhB",
                    "createdDate": "2025-06-24T15:57:16.541Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-refundable": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-refundable",
                "name": "Refundable",
                "apiIdentifier": "refundable",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "h64Wr0ZwTJ5b",
                    "createdDate": "2025-06-24T15:57:16.541Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-requiresShipping": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-requiresShipping",
                "name": "Requires Shipping",
                "apiIdentifier": "requiresShipping",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "MBNzRvIf5cf7",
                    "createdDate": "2025-06-24T15:57:16.541Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-restockable": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-restockable",
                "name": "Restockable",
                "apiIdentifier": "restockable",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "XSo-SZHt_WSZ",
                    "createdDate": "2025-06-24T15:57:16.541Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-returnStatus": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-returnStatus",
                "name": "Return Status",
                "apiIdentifier": "returnStatus",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "amFvPON0hxKF",
                    "createdDate": "2025-06-24T15:57:16.541Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "6HleQfWzZnG5",
                            "createdDate": 1750780636541,
                            "name": "INSPECTION_COMPLETE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wxxxxP8bmeDZ",
                            "createdDate": 1750780636541,
                            "name": "IN_PROGRESS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "n975ejO5rOaF",
                            "createdDate": 1750780636541,
                            "name": "NO_RETURN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3ZP1C1FV5AwM",
                            "createdDate": 1750780636541,
                            "name": "RETURNED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jv2ZOmxor7kx",
                            "createdDate": 1750780636541,
                            "name": "RETURN_FAILED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4XXZOSnCieVB",
                            "createdDate": 1750780636541,
                            "name": "RETURN_REQUESTED",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-shipping_address": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-shipping_address",
                "name": "Shipping Address",
                "apiIdentifier": "shippingAddress",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "0i0d3dOcFjRu",
                    "createdDate": "2025-06-24T15:57:16.534Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-source_identifier": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-source_identifier",
                "name": "Source Identifier",
                "apiIdentifier": "sourceIdentifier",
                "configuration": {
                    "type": "StringConfig",
                    "key": "h21QisjLvY7P",
                    "createdDate": "2025-06-24T15:57:16.537Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-source_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-source_name",
                "name": "Source Name",
                "apiIdentifier": "sourceName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "WZVOygw4yD_6",
                    "createdDate": "2025-06-24T15:57:16.534Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-source_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Order-source_url",
                "name": "Source URL",
                "apiIdentifier": "sourceUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "bd_MOIq1DdU-",
                    "createdDate": "2025-06-24T15:57:16.537Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-subtotal_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-subtotal_price",
                "name": "Subtotal Price",
                "apiIdentifier": "subtotalPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Pve5l90TkCRf",
                    "createdDate": "2025-06-24T15:57:16.534Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-subtotal_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-subtotal_price_set",
                "name": "Subtotal Price Set",
                "apiIdentifier": "subtotalPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "LEp1OU7bQKQr",
                    "createdDate": "2025-06-24T15:57:16.534Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-tags": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-tags",
                "name": "Tags",
                "apiIdentifier": "tags",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "hwVaMwuU8BJJ",
                    "createdDate": "2025-06-24T15:57:16.534Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-tax_exempt": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-tax_exempt",
                "name": "Tax Exempt",
                "apiIdentifier": "taxExempt",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "KK9Iz1I4OUYi",
                    "createdDate": "2025-06-24T15:57:16.537Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-tax_lines": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-tax_lines",
                "name": "Tax Lines",
                "apiIdentifier": "taxLines",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "DQSiI5tADI0e",
                    "createdDate": "2025-06-24T15:57:16.535Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-taxes_included": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-taxes_included",
                "name": "Taxes Included",
                "apiIdentifier": "taxesIncluded",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "foczu1UD1B0b",
                    "createdDate": "2025-06-24T15:57:16.535Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-test": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-test",
                "name": "Test",
                "apiIdentifier": "test",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "WkIJNwl2eK-0",
                    "createdDate": "2025-06-24T15:57:16.535Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-token": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-token",
                "name": "Token",
                "apiIdentifier": "token",
                "configuration": {
                    "type": "StringConfig",
                    "key": "xGeB3CHM7EeQ",
                    "createdDate": "2025-06-24T15:57:16.535Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-totalCapturableSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-totalCapturableSet",
                "name": "Total Capturable Set",
                "apiIdentifier": "totalCapturableSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "q7MHPqcUVyDJ",
                    "createdDate": "2025-06-24T15:57:16.542Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-totalOutstandingSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-totalOutstandingSet",
                "name": "Total Outstanding Set",
                "apiIdentifier": "totalOutstandingSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "22EC4_f6V-5I",
                    "createdDate": "2025-06-24T15:57:16.542Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-totalReceivedSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-totalReceivedSet",
                "name": "Total Received Set",
                "apiIdentifier": "totalReceivedSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "IXe0bKVdDa7m",
                    "createdDate": "2025-06-24T15:57:16.542Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-totalRefundedSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-totalRefundedSet",
                "name": "Total Refunded Set",
                "apiIdentifier": "totalRefundedSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "THXecMpJPujg",
                    "createdDate": "2025-06-24T15:57:16.542Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-totalRefundedShippingSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-totalRefundedShippingSet",
                "name": "Total Refunded Shipping Set",
                "apiIdentifier": "totalRefundedShippingSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "At-BmmZY-qD8",
                    "createdDate": "2025-06-24T15:57:16.542Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-totalTipReceivedSet": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-totalTipReceivedSet",
                "name": "Total Tip Received Set",
                "apiIdentifier": "totalTipReceivedSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "q8Qj99Gmbusc",
                    "createdDate": "2025-06-24T15:57:16.542Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_discounts": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_discounts",
                "name": "Total Discounts",
                "apiIdentifier": "totalDiscounts",
                "configuration": {
                    "type": "StringConfig",
                    "key": "z7wdkf6RDHrF",
                    "createdDate": "2025-06-24T15:57:16.535Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_discounts_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-total_discounts_set",
                "name": "Total Discounts Set",
                "apiIdentifier": "totalDiscountsSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "BABln9AQT9xi",
                    "createdDate": "2025-06-24T15:57:16.535Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_line_items_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_line_items_price",
                "name": "Total Line Items Price",
                "apiIdentifier": "totalLineItemsPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "-PgJgy1Ehyl7",
                    "createdDate": "2025-06-24T15:57:16.535Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_line_items_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-total_line_items_price_set",
                "name": "Total Line Items Price Set",
                "apiIdentifier": "totalLineItemsPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "a4q1SZ87ucBb",
                    "createdDate": "2025-06-24T15:57:16.535Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_outstanding": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_outstanding",
                "name": "Total Outstanding",
                "apiIdentifier": "totalOutstanding",
                "configuration": {
                    "type": "StringConfig",
                    "key": "yB1CWfb4C4-O",
                    "createdDate": "2025-06-24T15:57:16.536Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_price",
                "name": "Total Price",
                "apiIdentifier": "totalPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Gnx0Mpib8Ic8",
                    "createdDate": "2025-06-24T15:57:16.536Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-total_price_set",
                "name": "Total Price Set",
                "apiIdentifier": "totalPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "KP32SfuWGrFs",
                    "createdDate": "2025-06-24T15:57:16.536Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_shipping_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-total_shipping_price_set",
                "name": "Total Shipping Price Set",
                "apiIdentifier": "totalShippingPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "vt0VuK12QVoT",
                    "createdDate": "2025-06-24T15:57:16.536Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_tax": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_tax",
                "name": "Total Tax",
                "apiIdentifier": "totalTax",
                "configuration": {
                    "type": "StringConfig",
                    "key": "VrAadKvtQx_4",
                    "createdDate": "2025-06-24T15:57:16.536Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_tax_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-total_tax_set",
                "name": "Total Tax Set",
                "apiIdentifier": "totalTaxSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "fhEENRapocx3",
                    "createdDate": "2025-06-24T15:57:16.536Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_tip_received": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_tip_received",
                "name": "Total Tip Received",
                "apiIdentifier": "totalTipReceived",
                "configuration": {
                    "type": "StringConfig",
                    "key": "1EX2WFpvTrgZ",
                    "createdDate": "2025-06-24T15:57:16.536Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_weight": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Order-total_weight",
                "name": "Total Weight",
                "apiIdentifier": "totalWeight",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "TVljIPiOVULw",
                    "createdDate": "2025-06-24T15:57:16.536Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-unpaid": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-unpaid",
                "name": "Unpaid",
                "apiIdentifier": "unpaid",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "Hn-5yuTwV0En",
                    "createdDate": "2025-06-24T15:57:16.542Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Order-updated_at",
                "name": "Shopify Updated At",
                "apiIdentifier": "shopifyUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "Bkl03JWFaRJL",
                    "createdDate": "2025-06-24T15:57:16.534Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Order-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Order-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "89bWZ7I4rpVt",
                    "createdDate": "2025-06-24T15:57:16.542Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": "shopifyShop"
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Order-CheckoutOrders": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Order-CheckoutOrders",
                "name": "Checkouts",
                "apiIdentifier": "checkouts",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "M05au-bdX-Kw",
                    "createdDate": "2025-06-24T20:16:17.600Z",
                    "relatedModelKey": "DataModel-Shopify-Checkout",
                    "inverseFieldKey": "ModelField-Shopify-CheckoutOrder-Order",
                    "relatedModelApiIdentifier": "shopifyCheckout",
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyOrder",
        "stateChart": {
            "type": "StateChart",
            "key": "Bc6yYfX0bcKy",
            "createdDate": 1750780636441,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Order-Start",
                    "createdDate": 1750780636442,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Order-Created",
                    "createdDate": 1750780636442,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Order-Deleted",
                    "createdDate": 1750780636442,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Order-Start"
        }
    },
    "ShopifyCheckoutLineItem": {
        "key": "DataModel-Shopify-CheckoutLineItem",
        "name": "shopifyCheckoutLineItem",
        "apiIdentifier": "shopifyCheckoutLineItem",
        "namespace": [],
        "fields": {
            "DataModel-Shopify-CheckoutLineItem-system-id": {
                "fieldType": "ID",
                "key": "DataModel-Shopify-CheckoutLineItem-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "-a6jy5UBn-PJ",
                    "createdDate": "2025-06-24T17:51:06.881Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-CheckoutLineItem-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-CheckoutLineItem-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "qd-M9YiaNl_0",
                    "createdDate": "2025-06-24T17:51:06.881Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-CheckoutLineItem-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-CheckoutLineItem-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "Sqra2sfI8XmR",
                    "createdDate": "2025-06-24T17:51:06.881Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-applied_discounts": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-applied_discounts",
                "name": "Applied Discounts",
                "apiIdentifier": "appliedDiscounts",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "DFZbTTlz2gSn",
                    "createdDate": "2025-06-24T17:51:06.882Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-compare_at_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-compare_at_price",
                "name": "Compare At Price",
                "apiIdentifier": "compareAtPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "mTneetO9URNx",
                    "createdDate": "2025-06-24T17:51:06.882Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-discount_allocations": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-discount_allocations",
                "name": "Discount Allocations",
                "apiIdentifier": "discountAllocations",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "LR9nn4-KxyEO",
                    "createdDate": "2025-06-24T17:51:06.882Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-fulfillment_service": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-fulfillment_service",
                "name": "Fulfillment Service",
                "apiIdentifier": "fulfillmentService",
                "configuration": {
                    "type": "StringConfig",
                    "key": "kqKxqFkXZhlg",
                    "createdDate": "2025-06-24T17:51:06.882Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-grams": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-grams",
                "name": "Grams",
                "apiIdentifier": "grams",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "hKA7OLUpaDnA",
                    "createdDate": "2025-06-24T17:51:06.882Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-key": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-key",
                "name": "Key",
                "apiIdentifier": "key",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Nv9eyj0yaYwI",
                    "createdDate": "2025-06-24T17:51:06.882Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-line_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-line_price",
                "name": "Line Price",
                "apiIdentifier": "linePrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "F3ZzKb918vmt",
                    "createdDate": "2025-06-24T17:51:06.882Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-price",
                "name": "Price",
                "apiIdentifier": "price",
                "configuration": {
                    "type": "StringConfig",
                    "key": "MmotJa13wpw6",
                    "createdDate": "2025-06-24T17:51:06.883Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-quantity": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-quantity",
                "name": "Quantity",
                "apiIdentifier": "quantity",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "iYqlXib2VxZA",
                    "createdDate": "2025-06-24T17:51:06.883Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-requires_shipping": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-requires_shipping",
                "name": "Requires Shipping",
                "apiIdentifier": "requiresShipping",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "dJQZYX5wa-X_",
                    "createdDate": "2025-06-24T17:51:06.883Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-sku": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-sku",
                "name": "SKU",
                "apiIdentifier": "sku",
                "configuration": {
                    "type": "StringConfig",
                    "key": "b13W0z6SppUL",
                    "createdDate": "2025-06-24T17:51:06.883Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-taxable": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-taxable",
                "name": "Taxable",
                "apiIdentifier": "taxable",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "OxS7Dc70uZ1L",
                    "createdDate": "2025-06-24T17:51:06.883Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-title": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-title",
                "name": "Title",
                "apiIdentifier": "title",
                "configuration": {
                    "type": "StringConfig",
                    "key": "V792K96xZiTs",
                    "createdDate": "2025-06-24T17:51:06.883Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-variant_title": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-variant_title",
                "name": "Variant Title",
                "apiIdentifier": "variantTitle",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Td5l-GtHPu0F",
                    "createdDate": "2025-06-24T17:51:06.883Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-CheckoutLineItem-vendor": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-CheckoutLineItem-vendor",
                "name": "Vendor",
                "apiIdentifier": "vendor",
                "configuration": {
                    "type": "StringConfig",
                    "key": "7TiQLLPCpIm-",
                    "createdDate": "2025-06-24T17:51:06.883Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-CheckoutLineItem-Checkout": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-CheckoutLineItem-Checkout",
                "name": "Checkout",
                "apiIdentifier": "checkout",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "85H2-NpmZlWN",
                    "createdDate": "2025-06-24T17:51:06.884Z",
                    "relatedModelKey": "DataModel-Shopify-Checkout",
                    "relatedModelApiIdentifier": "shopifyCheckout"
                },
                "internalWritable": true
            },
            "ModelField-Shopify-CheckoutLineItem-Product": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-CheckoutLineItem-Product",
                "name": "Product",
                "apiIdentifier": "product",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "vt2Kd1BBaYp4",
                    "createdDate": "2025-06-24T17:51:06.883Z",
                    "relatedModelKey": "DataModel-Shopify-Product",
                    "relatedModelApiIdentifier": "shopifyProduct"
                },
                "internalWritable": true
            },
            "ModelField-Shopify-CheckoutLineItem-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-CheckoutLineItem-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "fPumuzu16kj2",
                    "createdDate": "2025-06-24T17:51:06.884Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": "shopifyShop"
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyCheckoutLineItem",
        "stateChart": {
            "type": "StateChart",
            "key": "Q2HfLiRPIbli",
            "createdDate": 1750787466819,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-CheckoutLineItem-Start",
                    "createdDate": 1750787466820,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-CheckoutLineItem-Created",
                    "createdDate": 1750787466820,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-CheckoutLineItem-Deleted",
                    "createdDate": 1750787466820,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-CheckoutLineItem-Start"
        }
    },
    "ShopifyCheckout": {
        "key": "DataModel-Shopify-Checkout",
        "name": "shopifyCheckout",
        "apiIdentifier": "shopifyCheckout",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-Checkout-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-Checkout-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "CLf4ds6FSGbr",
                    "createdDate": "2025-06-24T20:16:17.830Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Checkout-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Checkout-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "JaF8K5QQTWXP",
                    "createdDate": "2025-06-24T20:16:17.830Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Checkout-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Checkout-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "P3CPDhRAD63X",
                    "createdDate": "2025-06-24T20:16:17.830Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-abandoned_checkout_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-abandoned_checkout_url",
                "name": "Abandoned Checkout URL",
                "apiIdentifier": "abandonedCheckoutUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "dQE_FXLmuohk",
                    "createdDate": "2025-06-24T20:16:17.834Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-applied_discount": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Checkout-applied_discount",
                "name": "Applied Discount",
                "apiIdentifier": "appliedDiscount",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "bbWjsxpysLSz",
                    "createdDate": "2025-06-24T20:16:17.834Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-buyer_accepts_marketing": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Checkout-buyer_accepts_marketing",
                "name": "Buyer Accepts Marketing",
                "apiIdentifier": "buyerAcceptsMarketing",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "5vgvJCDOWuzr",
                    "createdDate": "2025-06-24T20:16:17.834Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-completed_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Checkout-completed_at",
                "name": "Completed At",
                "apiIdentifier": "completedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "RBribX_jSyJ9",
                    "createdDate": "2025-06-24T20:16:17.834Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-created_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Checkout-created_at",
                "name": "Shopify Created At",
                "apiIdentifier": "shopifyCreatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "H-fgMZgJdP2d",
                    "createdDate": "2025-06-24T20:16:17.831Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-credit_card": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-credit_card",
                "name": "Credit Card",
                "apiIdentifier": "creditCard",
                "configuration": {
                    "type": "StringConfig",
                    "key": "UkcHJUq9T-B0",
                    "createdDate": "2025-06-24T20:16:17.834Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-currency": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-currency",
                "name": "Currency",
                "apiIdentifier": "currency",
                "configuration": {
                    "type": "StringConfig",
                    "key": "g5omqqcq-awb",
                    "createdDate": "2025-06-24T20:16:17.833Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-customer_locale": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-customer_locale",
                "name": "Customer Locale",
                "apiIdentifier": "customerLocale",
                "configuration": {
                    "type": "StringConfig",
                    "key": "FO7lYSIPZ2du",
                    "createdDate": "2025-06-24T20:16:17.833Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-device_id": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Checkout-device_id",
                "name": "Device",
                "apiIdentifier": "device",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "7pjt1yBDm2Ef",
                    "createdDate": "2025-06-24T20:16:17.831Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-discount_code": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-discount_code",
                "name": "Discount Code",
                "apiIdentifier": "discountCode",
                "configuration": {
                    "type": "StringConfig",
                    "key": "tKHDiQrOeUr2",
                    "createdDate": "2025-06-24T20:16:17.834Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-discount_codes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Checkout-discount_codes",
                "name": "Discount Codes",
                "apiIdentifier": "discountCodes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "0KdXF7QuVdgE",
                    "createdDate": "2025-06-24T20:16:17.831Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-email": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-email",
                "name": "Email",
                "apiIdentifier": "email",
                "configuration": {
                    "type": "StringConfig",
                    "key": "nBdLcF5oErdq",
                    "createdDate": "2025-06-24T20:16:17.830Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-legal_notice_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-legal_notice_url",
                "name": "Legal Notice URL",
                "apiIdentifier": "legalNoticeUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "ooFo_743cKtK",
                    "createdDate": "2025-06-24T20:16:17.834Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-line_items": {
                "fieldType": "HasMany",
                "key": "ModelField-DataModel-Shopify-Checkout-line_items",
                "name": "Line Items",
                "apiIdentifier": "lineItems",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "L23utl8J-KE-",
                    "createdDate": "2025-06-24T20:16:17.833Z",
                    "relatedModelKey": "DataModel-Shopify-CheckoutLineItem",
                    "inverseFieldKey": "ModelField-Shopify-CheckoutLineItem-Checkout",
                    "relatedModelApiIdentifier": "shopifyCheckoutLineItem",
                    "inverseFieldApiIdentifier": null,
                    "dependent": "delete",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-name",
                "name": "Name",
                "apiIdentifier": "name",
                "configuration": {
                    "type": "StringConfig",
                    "key": "V7wsonsEm8cT",
                    "createdDate": "2025-06-24T20:16:17.832Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-note": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-note",
                "name": "Note",
                "apiIdentifier": "note",
                "configuration": {
                    "type": "StringConfig",
                    "key": "1zuo-VhMQzcu",
                    "createdDate": "2025-06-24T20:16:17.833Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-note_attributes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Checkout-note_attributes",
                "name": "Note Attributes",
                "apiIdentifier": "noteAttributes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "-vSqGEgoWoUK",
                    "createdDate": "2025-06-24T20:16:17.833Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-order_status_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-order_status_url",
                "name": "Order Status URL",
                "apiIdentifier": "orderStatusUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "iNa0C4jtzXz-",
                    "createdDate": "2025-06-24T20:16:17.835Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-payment_due": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-payment_due",
                "name": "Payment Due",
                "apiIdentifier": "paymentDue",
                "configuration": {
                    "type": "StringConfig",
                    "key": "VLBG8XhTU2Hp",
                    "createdDate": "2025-06-24T20:16:17.835Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-payment_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-payment_url",
                "name": "Payment URL",
                "apiIdentifier": "paymentUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "UGeunu-Q-8zb",
                    "createdDate": "2025-06-24T20:16:17.835Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-payments": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Checkout-payments",
                "name": "Payments",
                "apiIdentifier": "payments",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "mQTCkRoFIwAt",
                    "createdDate": "2025-06-24T20:16:17.835Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-phone": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-phone",
                "name": "Phone",
                "apiIdentifier": "phone",
                "configuration": {
                    "type": "StringConfig",
                    "key": "WhFcg1j3J1YD",
                    "createdDate": "2025-06-24T20:16:17.833Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-presentment_currency": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-presentment_currency",
                "name": "Presentment Currency",
                "apiIdentifier": "presentmentCurrency",
                "configuration": {
                    "type": "StringConfig",
                    "key": "sCnYlIEvSXPX",
                    "createdDate": "2025-06-24T20:16:17.833Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-privacy_policy_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-privacy_policy_url",
                "name": "Privacy Policy URL",
                "apiIdentifier": "privacyPolicyUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "0dHtz1Cd0Fij",
                    "createdDate": "2025-06-24T20:16:17.835Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-refund_policy_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-refund_policy_url",
                "name": "Refund Policy URL",
                "apiIdentifier": "refundPolicyUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "0R3aOG94Yxcb",
                    "createdDate": "2025-06-24T20:16:17.835Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-requires_shipping": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Checkout-requires_shipping",
                "name": "Requires Shipping",
                "apiIdentifier": "requiresShipping",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "bOSHR25T1bAk",
                    "createdDate": "2025-06-24T20:16:17.835Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-reservation_time": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Checkout-reservation_time",
                "name": "Reservation Time",
                "apiIdentifier": "reservationTime",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "xnU9pqRfboFn",
                    "createdDate": "2025-06-24T20:16:17.836Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-reservation_time_left": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Checkout-reservation_time_left",
                "name": "Reservation Time Left",
                "apiIdentifier": "reservationTimeLeft",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "qQ6-VuqgLpKL",
                    "createdDate": "2025-06-24T20:16:17.836Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-shipping_line": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Checkout-shipping_line",
                "name": "Shipping Line",
                "apiIdentifier": "shippingLine",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "Pf-oTKStO0DQ",
                    "createdDate": "2025-06-24T20:16:17.836Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-shipping_policy_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-shipping_policy_url",
                "name": "Shipping Policy URL",
                "apiIdentifier": "shippingPolicyUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "9yR0m5L-kvkZ",
                    "createdDate": "2025-06-24T20:16:17.836Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-shopify_payments_account_id": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-shopify_payments_account_id",
                "name": "Shopify Payments Account ID",
                "apiIdentifier": "shopifyPaymentsAccountId",
                "configuration": {
                    "type": "StringConfig",
                    "key": "phUmg8uaSoj8",
                    "createdDate": "2025-06-24T20:16:17.839Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-source_identifier": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-source_identifier",
                "name": "Source Identifier",
                "apiIdentifier": "sourceIdentifier",
                "configuration": {
                    "type": "StringConfig",
                    "key": "RIDsYxBZcQjl",
                    "createdDate": "2025-06-24T20:16:17.831Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-source_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-source_name",
                "name": "Source Name",
                "apiIdentifier": "sourceName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "ljEjeQXmRTgi",
                    "createdDate": "2025-06-24T20:16:17.831Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-source_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-source_url",
                "name": "Source URL",
                "apiIdentifier": "sourceUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "ThqEK7T_KuXD",
                    "createdDate": "2025-06-24T20:16:17.831Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-subscription_policy_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-subscription_policy_url",
                "name": "Subscription Policy URL",
                "apiIdentifier": "subscriptionPolicyUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "kxCIu-rK_bOf",
                    "createdDate": "2025-06-24T20:16:17.839Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-subtotal_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-subtotal_price",
                "name": "Subtotal Price",
                "apiIdentifier": "subtotalPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "rZy95mzvBuqK",
                    "createdDate": "2025-06-24T20:16:17.831Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-tax_exempt": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Checkout-tax_exempt",
                "name": "Tax Exempt",
                "apiIdentifier": "taxExempt",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "pT19-1eVcSAZ",
                    "createdDate": "2025-06-24T20:16:17.839Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-tax_lines": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Checkout-tax_lines",
                "name": "Tax Lines",
                "apiIdentifier": "taxLines",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "IM-lZvOr3v3K",
                    "createdDate": "2025-06-24T20:16:17.832Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-tax_manipulations": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Checkout-tax_manipulations",
                "name": "Tax Manipulations",
                "apiIdentifier": "taxManipulations",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "pcapfyAA8KdT",
                    "createdDate": "2025-06-24T20:16:17.839Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-taxes_included": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Checkout-taxes_included",
                "name": "Taxes Included",
                "apiIdentifier": "taxesIncluded",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "gjEMRz8r2nax",
                    "createdDate": "2025-06-24T20:16:17.832Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-terms_of_sale_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-terms_of_sale_url",
                "name": "Terms Of Sale URL",
                "apiIdentifier": "termsOfSaleUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "wkB8TkYK6BXD",
                    "createdDate": "2025-06-24T20:16:17.840Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-terms_of_service_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-terms_of_service_url",
                "name": "Terms Of Service URL",
                "apiIdentifier": "termsOfServiceUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "Uj04935coUu9",
                    "createdDate": "2025-06-24T20:16:17.840Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-token": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-token",
                "name": "Token",
                "apiIdentifier": "token",
                "configuration": {
                    "type": "StringConfig",
                    "key": "MBITHv2pYhiR",
                    "createdDate": "2025-06-24T20:16:17.832Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-total_line_items_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-total_line_items_price",
                "name": "Total Line Items Price",
                "apiIdentifier": "totalLineItemsPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Fizc011B9dvW",
                    "createdDate": "2025-06-24T20:16:17.832Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-total_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-total_price",
                "name": "Total Price",
                "apiIdentifier": "totalPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Ir2tHXXa-z2T",
                    "createdDate": "2025-06-24T20:16:17.832Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-total_tax": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-total_tax",
                "name": "Total Tax",
                "apiIdentifier": "totalTax",
                "configuration": {
                    "type": "StringConfig",
                    "key": "6q1yQsZLNqij",
                    "createdDate": "2025-06-24T20:16:17.832Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-total_tip_received": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-total_tip_received",
                "name": "Total Tip Received",
                "apiIdentifier": "totalTipReceived",
                "configuration": {
                    "type": "StringConfig",
                    "key": "mmzOBKEzUfsh",
                    "createdDate": "2025-06-24T20:16:17.840Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Checkout-updated_at",
                "name": "Shopify Updated At",
                "apiIdentifier": "shopifyUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "nr4wCcj_3QSx",
                    "createdDate": "2025-06-24T20:16:17.831Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-user_id": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Checkout-user_id",
                "name": "User ID",
                "apiIdentifier": "userId",
                "configuration": {
                    "type": "StringConfig",
                    "key": "0zIy2HvL-v2h",
                    "createdDate": "2025-06-24T20:16:17.832Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Checkout-web_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Checkout-web_url",
                "name": "Web URL",
                "apiIdentifier": "webUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "BjfeOMswKz9r",
                    "createdDate": "2025-06-24T20:16:17.840Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Checkout-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Checkout-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "78naJhxN4BbL",
                    "createdDate": "2025-06-24T20:16:17.840Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": "shopifyShop"
                },
                "internalWritable": true
            },
            "ModelField-Shopify-CheckoutOrder-Order": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-CheckoutOrder-Order",
                "name": "Order",
                "apiIdentifier": "order",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "GDEIb9HDsEuy",
                    "createdDate": "2025-06-24T20:16:17.835Z",
                    "relatedModelKey": "DataModel-Shopify-Order",
                    "relatedModelApiIdentifier": "shopifyOrder"
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyCheckout",
        "stateChart": {
            "type": "StateChart",
            "key": "rpVgiyi6dXhD",
            "createdDate": 1750796177734,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Checkout-Start",
                    "createdDate": 1750796177735,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Checkout-Created",
                    "createdDate": 1750796177735,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Checkout-Deleted",
                    "createdDate": 1750796177735,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Checkout-Start"
        }
    }
};
/**
 * Internal variable to map model apiIdentifier to GraphQL typename in modelsMap.
 * @internal
 */ export const modelListIndex = {
    "api:session": "Session",
    "api:shopifyGdprRequest": "ShopifyGdprRequest",
    "api:shopifyProduct": "ShopifyProduct",
    "api:shopifyShop": "ShopifyShop",
    "api:shopifySync": "ShopifySync",
    "api:shopifyOrder": "ShopifyOrder",
    "api:shopifyCheckoutLineItem": "ShopifyCheckoutLineItem",
    "api:shopifyCheckout": "ShopifyCheckout"
};
