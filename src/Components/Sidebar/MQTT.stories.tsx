import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { mockNodeData } from '../../../src/mockData';
import MQTT, { MQTTProps } from './MQTT';

export default {
  title: 'Meshtastic HUB/Sidebar/MQTT',
  component: MQTT,
} as Meta;

const Template: Story<MQTTProps> = (args) => <MQTT {...args} />;

export const Default = Template.bind({});
Default.args = {
  node: mockNodeData,
};
