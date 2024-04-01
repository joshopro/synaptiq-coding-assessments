import { ReactNode, useEffect, useRef, useState } from "react";
import {
  AppProvider,
  BlockStack,
  Box,
  Card,
  DatePicker,
  Icon,
  Popover,
  TextField,
} from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { CalendarIcon } from "@shopify/polaris-icons";

type monthYearType = {
  month: number;
  year: number;
};

interface PickerProps {
  handleInputValueChange?: () => void;
  onDateChange: (date: Date) => void;
  date?: string | Date;
  onMonthChange?: ({ month, year }: monthYearType) => void;
}

export const SingleDatePicker = ({
  handleInputValueChange,
  onDateChange,
  date,
  onMonthChange,
}: PickerProps) => {
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    date ? new Date(date) : new Date()
  );
  const [{ month, year }, setDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });
  const formattedValue = selectedDate.toISOString().slice(0, 10);
  const datePickerRef = useRef(null);

  function handleOnClose() {
    setVisible(false);
  }
  function handleMonthChange(month: number, year: number) {
    setDate({ month, year });
    if (onMonthChange) {
      onMonthChange({ month, year });
    }
  }
  function handleDateSelection({ end: newSelectedDate }: { end: Date }) {
    setSelectedDate(newSelectedDate);
    onDateChange(newSelectedDate);
    setVisible(false);
  }
  useEffect(() => {
    if (selectedDate) {
      setDate({
        month: selectedDate.getMonth(),
        year: selectedDate.getFullYear(),
      });
    }
  }, [selectedDate]);
  return (
    <AppProvider
      i18n={{
        Polaris: {
          ResourceList: {
            sortingLabel: "Sort by",
            defaultItemSingular: "item",
            defaultItemPlural: "items",
            showing: "Showing {itemsCount} {resource}",
            Item: {
              viewItem: "View details for {itemName}",
            },
          },
          Common: {
            checkbox: "checkbox",
          },
        },
      }}
    >
      <BlockStack inlineAlign="center" gap="400">
        <Box minWidth="276px" padding={{ xs: "200" }}>
          <Popover
            active={visible}
            autofocusTarget="none"
            preferredAlignment="left"
            fullWidth
            preferInputActivator={false}
            preferredPosition="below"
            preventCloseOnChildOverlayClick
            onClose={handleOnClose}
            activator={
              <TextField
                role="combobox"
                label={"Start date"}
                prefix={<Icon source={CalendarIcon} />}
                value={formattedValue}
                onFocus={() => setVisible(true)}
                onChange={handleInputValueChange}
                autoComplete="off"
              />
            }
          >
            <Card ref={datePickerRef}>
              <DatePicker
                month={month}
                year={year}
                selected={selectedDate}
                onMonthChange={handleMonthChange}
                onChange={handleDateSelection}
              />
            </Card>
          </Popover>
        </Box>
      </BlockStack>
    </AppProvider>
  );
};
