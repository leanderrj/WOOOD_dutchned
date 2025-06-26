export const run: ActionRun = async ({ params, logger, api, connections }) => {
  // Validate shopId parameter
  if (!params.shopId) {
    logger.error("shopId parameter is required");
    return {
      success: false,
      error: "shopId parameter is required",
      functions: [],
      totalFunctions: 0,
      activeFunctions: 0
    };
  }

  try {
    // Get the shopify client for the specific shop
    const shopifyClient = await connections.shopify.forShopId(params.shopId);

    // Get functions query
    const functionsQuery = `
      query {
        shopifyFunctions(first: 50) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `;

    // Get delivery customizations query
    const deliveryCustomizationsQuery = `
      query {
        deliveryCustomizations(first: 50) {
          edges {
            node {
              id
              enabled
            }
          }
        }
      }
    `;

    // Make the API calls using the shopify client
    const [functionsResponse, customizationsResponse] = await Promise.all([
      shopifyClient.graphql(functionsQuery),
      shopifyClient.graphql(deliveryCustomizationsQuery)
    ]);

    // Extract data
    const functions = functionsResponse.data?.shopifyFunctions?.edges?.map(edge => edge.node) || [];
    const customizations = customizationsResponse.data?.deliveryCustomizations?.edges?.map(edge => edge.node) || [];

    // Create a map of function ID to customization status
    const customizationMap = new Map();
    customizations.forEach(customization => {
      customizationMap.set(customization.functionId, {
        enabled: customization.enabled,
        customizationId: customization.id,
        title: customization.title,
        createdAt: customization.createdAt,
        updatedAt: customization.updatedAt
      });
    });

    // Combine functions with their activation status
    const functionsWithStatus = functions.map(func => ({
      id: func.id,
      handle: func.handle,
      title: func.title,
      description: func.description,
      apiType: func.apiType,
      apiVersion: func.apiVersion,
      createdAt: func.createdAt,
      updatedAt: func.updatedAt,
      isActive: customizationMap.has(func.id) && customizationMap.get(func.id).enabled,
      customization: customizationMap.get(func.id) || null
    }));

    logger.info(`Retrieved ${functions.length} functions and ${customizations.length} customizations for shop ${params.shopId}`);

    return {
      success: true,
      functions: functionsWithStatus,
      totalFunctions: functions.length,
      activeFunctions: functionsWithStatus.filter(f => f.isActive).length
    };

  } catch (error) {
    logger.error({ error, shopId: params.shopId }, "Failed to fetch Shopify Functions");

    return {
      success: false,
      error: error.message || "Failed to fetch Shopify Functions",
      functions: [],
      totalFunctions: 0,
      activeFunctions: 0
    };
  }
};

export const params = {
  shopId: { type: "string" }
};
