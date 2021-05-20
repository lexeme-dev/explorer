import React from 'react';
import { Story, Meta } from '@storybook/react';

import Header from '../components/Header';
import { HeaderProps } from '../components/Header';

export default {
  title: 'components/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
};
