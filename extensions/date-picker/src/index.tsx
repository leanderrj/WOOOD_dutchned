import React, { useState, useEffect, useMemo } from "react";
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
  useDeliveryGroups,
  ScrollView,
  DatePicker,
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
  const [selectedDate, setSelectedDate] = useState < string | undefined > ();
  const shippingAddress = useShippingAddress();
  const t = useTranslate();
  const deliveryGroups = useDeliveryGroups();

  const applyAttributeChange = useApplyAttributeChange();
  const [{ data: deliveryDatesData, fetching: loading, error: fetchError }, fetchDeliveryDates] = useGlobalAction(api.getDeliveryDates);

  // Show the date picker only for Netherlands
  const countryCode = shippingAddress?.countryCode;
  const showDatePicker = countryCode === 'NL';

  // Determine if shipping options have been loaded
  const shippingOptionsLoaded = deliveryGroups.length > 0 && deliveryGroups.some(group => group.deliveryOptions.length > 0);

  useEffect(() => {
    if (showDatePicker && shippingOptionsLoaded) {
      fetchDeliveryDates();
    } else {
      setAvailableDates([]);
      setSelectedDate(undefined);
      setErrorKey(null);
    }
  }, [showDatePicker, shippingOptionsLoaded, fetchDeliveryDates]);


  useEffect(() => {
    if (fetchError) {
      console.error('Error fetching delivery dates:', fetchError);
      setErrorKey('error_loading');
      setAvailableDates([]);
    } else if (deliveryDatesData) {
      // Gadget actions can return the result in a `result` property, or return the result directly.
      const dates = (deliveryDatesData as any).result || deliveryDatesData;

      if (Array.isArray(dates)) {
        setAvailableDates(dates);
        setErrorKey(null);
      } else {
        console.error('Expected an array of dates, but received:', dates);
        setErrorKey('error_unexpected_data');
        setAvailableDates([]);
      }
    }
  }, [deliveryDatesData, fetchError]);

  const disabledDates = useMemo(() => {
    if (availableDates.length === 0) {
      return true;
    }

    // It's safer to sort them client-side in case the API doesn't guarantee order.
    const sortedAvailable = [...availableDates].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    const availableDateSet = new Set(sortedAvailable.map(d => d.date));
    const firstAvailable = sortedAvailable[0].date;
    const lastAvailable = sortedAvailable[sortedAvailable.length - 1].date;

    const shiftDate = (dateStr: string, days: number) => {
      // Use Z to indicate UTC and avoid timezone pitfalls
      const date = new Date(`${dateStr}T00:00:00Z`);
      date.setUTCDate(date.getUTCDate() + days);
      return date.toISOString().split('T')[0];
    };

    const disabled: (string | {start?: string, end?: string})[] = [];

    // Disable all dates before the first available one.
    disabled.push({ end: shiftDate(firstAvailable, -1) });

    // Disable all dates after the last available one.
    disabled.push({ start: shiftDate(lastAvailable, 1) });

    // Find the gaps between the first and last available dates and disable them.
    let currentDate = new Date(`${firstAvailable}T00:00:00Z`);
    const lastDate = new Date(`${lastAvailable}T00:00:00Z`);

    while (currentDate <= lastDate) {
      const currentDateString = currentDate.toISOString().split('T')[0];
      if (!availableDateSet.has(currentDateString)) {
        disabled.push(currentDateString);
      }
      currentDate.setUTCDate(currentDate.getUTCDate() + 1);
    }

    return disabled;
  }, [availableDates]);

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

  if (!showDatePicker || !shippingOptionsLoaded) {
    return null;
  }

  return (
    <BlockStack inlineAlignment="center">
      <View border="base" cornerRadius="base" padding="base" maxInlineSize={320}>
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
            <DatePicker
              selected={selectedDate}
              onChange={(selection: string | { start: string; end: string; }) => {
                if (typeof selection === 'string') {
                  handleDateSelect(selection);
                }
              }}
              disabled={disabledDates}
            />
          )}

          {!loading && !errorKey && availableDates.length === 0 && (
            <Banner status="info">
              <Text>{t('no_dates_available')}</Text>
            </Banner>
          )}
        </BlockStack>
      </View>
    </BlockStack>
  );
}