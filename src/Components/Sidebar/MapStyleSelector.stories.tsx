import React from 'react';

import type { Meta, Story } from '@storybook/react';

import MapStyleSelector, {
  MapStyles,
  MapStyleSelectorProps,
} from './MapStyleSelector';

export default {
  title: 'Meshtastic HUB/Sidebar/MapStyleSelect',
  component: MapStyleSelector,
} as Meta;

const Template: Story<MapStyleSelectorProps> = (args) => (
  <MapStyleSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {
  mapStyle: MapStyles.Light,
};
