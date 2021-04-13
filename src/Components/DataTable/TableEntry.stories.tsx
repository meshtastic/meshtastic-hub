import React from 'react';

import type { Meta, Story } from '@storybook/react';

import { mockNodeData } from '../../../src/mockData';
import TableEntry, { TableEntryProps } from './TableEntry';

export default {
  title: 'Meshtastic HUB/DataTable/TableEntry',
  component: TableEntry,
} as Meta;

const Template: Story<TableEntryProps> = (args) => <TableEntry {...args} />;

export const Default = Template.bind({});
Default.args = {
  node: mockNodeData,
};
