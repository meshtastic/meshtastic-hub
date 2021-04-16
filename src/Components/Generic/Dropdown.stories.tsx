import React from 'react';

import type { Meta, Story } from '@storybook/react';

import Dropdown, { DropdownProps } from './Dropdown';
import { MapStyles } from '../../MapStyle';

export default {
  title: 'Meshtastic HUB/Generic/Dropdown',
  component: Dropdown,
} as Meta;

const Template: Story<DropdownProps> = (args) => <Dropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  mapStyle: MapStyles.Light
};
