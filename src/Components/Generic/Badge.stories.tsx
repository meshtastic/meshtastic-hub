import React from 'react';

import type { Meta, Story } from '@storybook/react';

import Badge, { BadgeProps } from './Badge';

export default {
  title: 'Meshtastic HUB/Generic/Badge',
  component: Badge,
} as Meta;

const Template: Story<BadgeProps> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: 'Success',
  variant: 'Success',
};
