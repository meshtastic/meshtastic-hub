import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { mockNodesData, mockSidebarData } from '../../../src/mockData';
import { MapStyles } from './MapStyleSelector';
import Sidebar, { SidebarProps } from './Sidebar';

export default {
  title: 'Meshtastic HUB/Sidebar',
  component: Sidebar,
} as Meta;

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...mockSidebarData,
  nodes: mockNodesData,
  mapStyle: MapStyles.Light,
  position: {
    lat: 0,
    lng: 0,
  },
};
