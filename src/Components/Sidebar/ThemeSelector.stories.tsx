import React from 'react';

import type { Meta, Story } from '@storybook/react';

import ThemeSelector, { ThemeSelectorProps } from './ThemeSelector';

export default {
  title: 'Meshtastic HUB/Sidebar/ThemeSelector',
  component: ThemeSelector,
} as Meta;

const Template: Story<ThemeSelectorProps> = (args) => (
  <ThemeSelector {...args} />
);

export const Default = Template.bind({});
Default.args = {};
