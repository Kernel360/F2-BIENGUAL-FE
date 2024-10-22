import Input from './Input';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default', 'small', 'large'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'default',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input...',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input...',
    size: 'large',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input...',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: 'Input with error...',
    error: true,
    errorMessage: 'This field is required.',
  },
};
