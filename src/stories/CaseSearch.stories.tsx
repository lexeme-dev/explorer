import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { courtIdToName } from '../interfaces/Opinion';

import CaseSearch from '../components/CaseSearch';

export default {
    title: 'Search/CaseSearch',
    component: CaseSearch,
} as ComponentMeta<typeof CaseSearch>;

const Template: ComponentStory<typeof CaseSearch> = (args) => <CaseSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
    selectedCases: [],
    onCaseSelected: action('caseSelected'),
    selectedCourts: new Set(Object.keys(courtIdToName)),
    onCourtSelectionChange: action('courtSelected')
};
