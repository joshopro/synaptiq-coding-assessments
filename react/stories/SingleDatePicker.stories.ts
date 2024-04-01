import type { Meta, StoryObj } from '@storybook/react';
import { SingleDatePicker } from './SingleDatePicker';

const meta = {
  title: 'Example/DatePicker',
  component: SingleDatePicker,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SingleDatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Picker: Story = {
  args: {
    onDateChange: (date: Date) => {},
    date: '12/2/2024',
  },
};
