import React from 'react';
import { Story, Meta } from '@storybook/react';

import PdfUpload from '../components/PdfUpload';
import { PdfUploadProps } from '../components/PdfUpload';

export default {
  title: 'components/PdfUpload',
  component: PdfUpload,
} as Meta;

const Template: Story<PdfUploadProps> = (args) => <PdfUpload {...args} />;

export const Default = Template.bind({});
Default.args = {
  onCasesExtracted: () => {},
};
