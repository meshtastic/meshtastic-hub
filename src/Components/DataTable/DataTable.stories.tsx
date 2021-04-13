import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { mockNodesData } from '../../../src/mockData';
import DataTable, { DataTableProps } from './DataTable';

export default {
  title: 'Meshtastic HUB/DataTable',
  component: DataTable,
} as Meta;

const Template: Story<DataTableProps> = (args) => <DataTable {...args} />;

export const Default = Template.bind({});
Default.args = {
  nodes: mockNodesData,
  loading: false,
};
