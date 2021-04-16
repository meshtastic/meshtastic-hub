import React from 'react';

import type { Meta, Story } from '@storybook/react';

import DropdownOption, { DropdownOptionProps } from './DropdownOption';
import { MapStyles } from '../../MapStyle';

export default {
  title: 'Meshtastic HUB/Generic/DropdownOptions',
  component: DropdownOption,
} as Meta;

const Template: Story<DropdownOptionProps> = (args) => <DropdownOption {...args} />;

export const Default = Template.bind({});
Default.args = {
  mapStyle: MapStyles.Light,
};
