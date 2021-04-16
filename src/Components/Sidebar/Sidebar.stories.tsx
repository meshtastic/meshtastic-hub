import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { mockNodesData, mockSidebarData } from '../../../src/mockData';
import Sidebar, { SidebarProps } from './Sidebar';
import { MapStyles } from '../../MapStyle'

export default {
  title: 'Meshtastic HUB/Sidebar',
  component: Sidebar,
} as Meta;

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

export const Default = Template.bind({});
Default.args = {
  ...mockSidebarData,
  nodes: mockNodesData,
  selectedMapStyle: MapStyles.Light,
};
