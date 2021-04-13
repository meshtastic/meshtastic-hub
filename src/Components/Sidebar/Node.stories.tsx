import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { mockNodeData } from '../../../src/mockData';
import Node, { NodeProps } from './Node';

export default {
  title: 'Meshtastic HUB/Sidebar/Node',
  component: Node,
} as Meta;

const Template: Story<NodeProps> = (args) => <Node {...args} />;

export const Default = Template.bind({});
Default.args = {
  node: mockNodeData,
};
