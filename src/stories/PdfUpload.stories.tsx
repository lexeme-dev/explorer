import React from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import PdfUpload from '../components/PdfUpload';

export default {
  title: 'Example/PdfUpload',
  component: PdfUpload,
} as ComponentMeta<typeof PdfUpload>;

const Template: ComponentStory<typeof PdfUpload> = (args) => <PdfUpload {...args} />;

export const Default = Template.bind({});
Default.args = {
  onCasesExtracted: action('casesExtracted'),
};
