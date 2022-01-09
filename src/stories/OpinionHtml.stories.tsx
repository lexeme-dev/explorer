import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Opinion, { fullCaseName } from '../interfaces/Opinion';
import OpinionHtml from '../components/OpinionHtml';

export default {
  title: 'Opinions/OpinionHtml',
  component: OpinionHtml,
} as ComponentMeta<typeof OpinionHtml>;

const Template: ComponentStory<typeof OpinionHtml> = (args) => <OpinionHtml {...args} />;

export const Default = Template.bind({});
Default.args = {
  opinion: {
    cluster: {
      case_name: "United States v. Testan",
      citation_count: 1634,
      cluster_uri: "https://www.courtlistener.com/api/rest/v3/clusters/109386/",
      court: "scotus",
      docket_uri: "https://www.courtlistener.com/api/rest/v3/dockets/71730/",
      id: 39919,
      reporter: "424 U.S. 392",
      resource_id: 109386,
      time: 199929600,
      year: 1976,
    },
    id: 39936,
    opinion_uri: "https://www.courtlistener.com/api/rest/v3/opinions/109386/",
    resource_id: 109386,
  },
  onCaseDisplayed: action("onCaseDisplayed"),
  onCaseBookmarked: action("onCaseBookmarked"),
};
