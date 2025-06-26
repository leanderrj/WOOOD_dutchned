import React, { useState, useEffect, useCallback } from "react";
import {
  reactExtension,
  useApplyAttributeChange,
  Banner,
  Button,
  Heading,
  Text,
  View,
  SkeletonText,
  BlockStack,
  useShippingAddress,
  useTranslate,
  ScrollView,
  useDeliveryGroups,
  useSettings,
} from "@shopify/ui-extensions-react/checkout";
import { fetchDeliveryDates, saveOrderMetafields, DeliveryDate } from "./services/apiClient";
import { ErrorBoundary, useErrorHandler } from "./components/ErrorBoundary";

export default reactExtension(
  "purchase.checkout.shipping-option-list.render-after",
  () => (
    <ErrorBoundary>
      <DeliveryDatePicker />
    </ErrorBoundary>
  )
);

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(fetchFn: () => Promise<T>, deps: any[] = []): [UseFetchState<T>, () => void] {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const result = await fetchFn();
      setState({ data: result, loading: false, error: null });
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message || 'An error occurred' });
    }
  }, deps);

  return [state, execute];
}

function DeliveryDatePicker() {
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [availableDates, setAvailableDates] = useState<DeliveryDate[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<string | null>(null);
  
  const shippingAddress = useShippingAddress();
  const deliveryGroups = useDeliveryGroups();
  const settings = useSettings();
  const t = useTranslate();

  // Get configuration from extension settings
  const apiBaseUrl = typeof settings.api_base_url === 'string' ? settings.api_base_url : 'https://woood-dutchned.vercel.app';
  const enableMockMode = typeof settings.enable_mock_mode === 'boolean' ? settings.enable_mock_mode : false;

  const applyAttributeChange = useApplyAttributeChange();
  const [{ data: deliveryDatesData, loading, error: fetchError }, fetchDeliveryDatesAction] = useFetch(
    () => fetchDeliveryDates({ 
      apiBaseUrl, 
      enableMockMode,
      timeout: 15000,
      retries: 2
    })
  );

  // Show the date picker only for Netherlands
  const countryCode = shippingAddress?.countryCode;
  const showDatePicker = countryCode === 'NL';

  // Detect selected shipping method from delivery groups
  useEffect(() => {
    if (deliveryGroups && deliveryGroups.length > 0) {
      for (const group of deliveryGroups) {
        // Get the selected delivery option handle
        const selectedOption = group.selectedDeliveryOption;
        if (selectedOption) {
          const shippingMethodName = selectedOption.handle || 'Unknown';
          setSelectedShippingMethod(shippingMethodName);
          
          // Save shipping method as attribute
          handleShippingMethodSave(shippingMethodName);
          break;
        }
      }
    }
  }, [deliveryGroups]);

  useEffect(() => {
    if (showDatePicker) {
      fetchDeliveryDatesAction();
    } else {
      setAvailableDates([]);
      setSelectedDate(null);
      setErrorKey(null);
    }
  }, [showDatePicker, fetchDeliveryDatesAction, apiBaseUrl, enableMockMode]);

  useEffect(() => {
    if (fetchError) {
      console.error('Error fetching delivery dates:', fetchError);
      setErrorKey('error_loading');
      setAvailableDates([]);
    } else if (deliveryDatesData) {
      if (Array.isArray(deliveryDatesData)) {
        setAvailableDates(deliveryDatesData.slice(0, 20));
        setErrorKey(null);
      } else {
        console.error('Expected an array of dates, but received:', deliveryDatesData);
        setErrorKey('error_unexpected_data');
        setAvailableDates([]);
      }
    }
  }, [deliveryDatesData, fetchError]);

  const handleDateSelect = async (dateString: string) => {
    setSelectedDate(dateString);

    try {
      // Save to cart attributes
      const result = await applyAttributeChange({
        type: 'updateAttribute',
        key: 'custom.dutchned_delivery_date',
        value: dateString,
      });

      if (result.type === 'error') {
        throw new Error('Failed to save delivery date attribute');
      }

      // Also save to backend for order metafield processing
      const backendSuccess = await saveOrderMetafields(
        dateString, 
        selectedShippingMethod,
        { apiBaseUrl, enableMockMode }
      );
      
      if (!backendSuccess) {
        console.warn('Backend save failed, but cart attributes were saved successfully');
      }
      
    } catch (err) {
      console.error('Error saving delivery date:', err);
      setErrorKey('error_saving');
    }
  };

  const handleShippingMethodSave = async (shippingMethod: string) => {
    try {
      const result = await applyAttributeChange({
        type: 'updateAttribute',
        key: 'custom.selected_shipping_method',
        value: shippingMethod,
      });

      if (result.type === 'error') {
        throw new Error('Failed to save shipping method attribute');
      }
      
      // Also save to backend if delivery date is already selected
      if (selectedDate) {
        await saveOrderMetafields(
          selectedDate, 
          shippingMethod,
          { apiBaseUrl, enableMockMode }
        );
      }
    } catch (err) {
      console.error('Error saving shipping method:', err);
      setErrorKey('error_saving_shipping');
    }
  };

  if (!showDatePicker) {
    return null;
  }

  return (
    <View border="base" cornerRadius="base" padding="base">
      <BlockStack spacing="base">
        <Heading level={2}>{t('title')}</Heading>

        {/* Show API configuration info in development/testing */}
        {enableMockMode && (
          <Banner status="info">
            <Text size="small">Mock mode enabled - using test data</Text>
          </Banner>
        )}

        {selectedShippingMethod && (
          <View>
            <Text size="small" appearance="subdued">
              {t('selected_shipping_method', { method: selectedShippingMethod })}
            </Text>
          </View>
        )}

        {loading && (
          <BlockStack spacing="tight">
            <SkeletonText />
            <SkeletonText />
            <SkeletonText />
          </BlockStack>
        )}

        {errorKey && (
          <Banner status="critical">
            <Text>{t(errorKey)}</Text>
          </Banner>
        )}

        {!loading && !errorKey && availableDates.length > 0 && (
          <BlockStack spacing="base">
            <View>
              <ScrollView maxBlockSize={300}>
                <BlockStack spacing="tight">
                  {availableDates.map((dateItem) => {
                    const isSelected = selectedDate === dateItem.date;
                    return (
                      <Button
                        key={dateItem.date}
                        kind={isSelected ? 'primary' : 'secondary'}
                        onPress={() => handleDateSelect(dateItem.date)}
                      >
                        <Text emphasis={isSelected ? "bold" : undefined}>
                          {dateItem.displayName}
                        </Text>
                      </Button>
                    );
                  })}
                </BlockStack>
              </ScrollView>
            </View>
          </BlockStack>
        )}

        {!loading && !errorKey && availableDates.length === 0 && (
          <Banner status="info">
            <Text>{t('no_dates_available')}</Text>
          </Banner>
        )}
      </BlockStack>
    </View>
  );
}