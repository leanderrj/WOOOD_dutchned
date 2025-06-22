import React, { useState, useEffect } from "react";
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
} from "@shopify/ui-extensions-react/checkout";
import { Provider, useGlobalAction } from "@gadgetinc/react";
import { api } from "../../../web/api";

export default reactExtension(
  "purchase.checkout.shipping-option-list.render-after",
  () => (
    <Provider api={api}>
      <DeliveryDatePicker />
    </Provider>
  )
);

interface DateItem {
  date: string;
  displayName: string;
}

function DeliveryDatePicker() {
  const [errorKey, setErrorKey] = useState < string | null > (null);
  const [availableDates, setAvailableDates] = useState < DateItem[] > ([]);
  const [selectedDate, setSelectedDate] = useState < string | null > (null);
  const shippingAddress = useShippingAddress();
  const t = useTranslate();

  const applyAttributeChange = useApplyAttributeChange();
  const [{ data: deliveryDatesData, fetching: loading, error: fetchError }, fetchDeliveryDates] = useGlobalAction(api.getDeliveryDates);

  // Show the date picker only for Netherlands
  const countryCode = shippingAddress?.countryCode;
  const showDatePicker = countryCode === 'NL';

  useEffect(() => {
    if (showDatePicker) {
      fetchDeliveryDates();
    } else {
      setAvailableDates([]);
      setSelectedDate(null);
      setErrorKey(null);
    }
  }, [showDatePicker, fetchDeliveryDates]);


  useEffect(() => {
    if (fetchError) {
      console.error('Error fetching delivery dates:', fetchError);
      setErrorKey('error_loading');
      setAvailableDates([]);
    } else if (deliveryDatesData) {
      // Gadget actions can return the result in a `result` property, or return the result directly.
      const dates = (deliveryDatesData as any).result || deliveryDatesData;

      if (Array.isArray(dates)) {
        setAvailableDates(dates.slice(0, 8));
        setErrorKey(null);
      } else {
        console.error('Expected an array of dates, but received:', dates);
        setErrorKey('error_unexpected_data');
        setAvailableDates([]);
      }
    }
  }, [deliveryDatesData, fetchError]);


  const handleDateSelect = async (dateString: string) => {
    setSelectedDate(dateString);

    try {
      const result = await applyAttributeChange({
        type: 'updateAttribute',
        key: 'deliveryDate',
        value: dateString,
      });

      if (result.type === 'error') {
        throw new Error('Failed to save attribute');
      }
    } catch (err) {
      console.error('Error saving delivery date:', err);
      setErrorKey('error_saving');
    }
  };

  if (!showDatePicker) {
    return null;
  }

  return (
    <View border="base" cornerRadius="base" padding="base">
      <BlockStack spacing="base">
        <Heading level={2}>{t('title')}</Heading>


        {loading && (
          <BlockStack spacing="tight">
            <Text appearance="subdued">{t('loading')}</Text>
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
            <Text appearance="subdued">{t('available_dates')}</Text>

            <BlockStack spacing="tight">
              {availableDates.map((dateItem) => {
                const isSelected = selectedDate === dateItem.date;

                return (
                  <Button
                    key={dateItem.date}
                    kind={isSelected ? 'primary' : 'secondary'}
                    onPress={() => handleDateSelect(dateItem.date)}
                  >
                    <Text emphasis={isSelected ? "strong" : "base"}>
                      {dateItem.displayName}
                    </Text>
                  </Button>
                );
              })}
            </BlockStack>

            {selectedDate && (
              <Banner status="success">
                <Text>
                  Bezorgdatum geselecteerd: {availableDates.find(d => d.date === selectedDate)?.displayName}
                </Text>
              </Banner>
            )}
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