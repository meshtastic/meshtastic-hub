import React from 'react';

import type { Meta, Story } from '@storybook/react';

import DarkmodeToggle, { DarkmodeToggleProps } from './DarkmodeToggle';

export default {
  title: 'Meshtastic HUB/Generic/DarkmodeToggle',
  component: DarkmodeToggle,
} as Meta;

const Template: Story<DarkmodeToggleProps> = (args) => (
  <DarkmodeToggle {...args} />
);

export const Default = Template.bind({});
Default.args = {};
