import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button';

// todo @godhyzzang
// 1. 추후에 @/components/ui/button이 아닌 components/Button/Button로 변경해야함

const meta: Meta<typeof Button> = {
  title: 'Component/shdcnui/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      description: 'Button variants',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      description: 'Button sizes',
      options: ['default', 'sm', 'lg', 'icon'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    onClick: action('default click'),
    children: 'Default button',
    className: 'shadow-lg',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    size: 'default',
    disabled: false,
    onClick: action('destructive click'),
    children: 'Destructive button',
    className: 'shadow-lg',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'default',
    disabled: false,
    onClick: action('outline click'),
    children: 'Outline button',
    className: 'shadow-lg',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'default',
    disabled: false,
    onClick: action('secondary click'),
    children: 'Secondary button',
    className: 'shadow-lg',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'default',
    disabled: false,
    onClick: action('ghost click'),
    children: 'Ghost button',
    className: 'shadow-lg',
  },
};

export const Link: Story = {
  args: {
    variant: 'link',
    size: 'default',
    disabled: false,
    onClick: action('link click'),
    children: 'Link button',
    className: 'shadow-lg',
  },
};
