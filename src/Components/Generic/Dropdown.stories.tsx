import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { MapStyles } from '../Generic/Dropdown';
import Dropdown, { DropdownProps } from './Dropdown';

export default {
  title: 'Meshtastic HUB/Generic/Dropdown',
  component: Dropdown,
} as Meta;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  mapStyle: MapStyles.Light,
};
