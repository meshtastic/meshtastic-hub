import React from 'react';

import type { Meta, Story } from '@storybook/react';

import Coordinates, { CoordinatesProps } from './Coordinates';

export default {
  title: 'Meshtastic HUB/Sidebar/Coordinates',
  component: Coordinates,
} as Meta;

const Template: Story<CoordinatesProps> = (args) => <Coordinates {...args} />;

export const Default = Template.bind({});
Default.args = {
  position: {
    lat: 0,
    lng: 0,
  },
};
