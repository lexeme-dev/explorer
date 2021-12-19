import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SelectedCaseList from '../components/SelectedCaseList';

import Opinion from '../interfaces/Opinion';
import * as OpinionDisplayStories from './OpinionDisplay.stories';

export default {
  title: 'Search/SelectedCaseList',
  component: SelectedCaseList,
} as ComponentMeta<typeof SelectedCaseList>;

const Template: ComponentStory<typeof SelectedCaseList> = (args) => <SelectedCaseList {...args} />;

export const Default = Template.bind({});
Default.args = {
  selectedCases: [
    OpinionDisplayStories.Default.args.opinion,
    OpinionDisplayStories.Default.args.opinion,
  ],
  onCaseRemoved: action('onCaseRemoved'),
};
