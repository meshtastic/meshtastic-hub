import React from 'react';

import type { Meta, Story } from '@storybook/react';

import MapStyleSelect, {
  MapStyles,
  MapStyleSelectProps,
} from './MapStyleSelect';

export default {
  title: 'Meshtastic HUB/Sidebar/MapStyleSelect',
  component: MapStyleSelect,
} as Meta;

const Template: Story<MapStyleSelectProps> = (args) => (
  <MapStyleSelect {...args} />
);

export const Default = Template.bind({});
Default.args = {
  mapStyle: MapStyles.Light,
};
