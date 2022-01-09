import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PrimaryCaseList from '../components/PrimaryCaseList';

import * as OpinionDisplayStories from './OpinionDisplay.stories';

export default {
    title: 'Search/PrimaryCaseList',
    component: PrimaryCaseList,
} as ComponentMeta<typeof PrimaryCaseList>;

const Template: ComponentStory<typeof PrimaryCaseList> = (args) => <PrimaryCaseList {...args} />;

export const Default = Template.bind({});
Default.args = {
    recommendedCases: [
        OpinionDisplayStories.Default.args?.opinion!,
        OpinionDisplayStories.Default.args?.opinion!,
    ],
    onCaseBookmarked: action('onCaseBookmarked'),
};
