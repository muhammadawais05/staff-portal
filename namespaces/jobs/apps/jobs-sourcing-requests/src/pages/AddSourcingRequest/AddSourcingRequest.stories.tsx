import React from 'react'
import { Story, StoryShell } from '@staff-portal/story-shell'

import Component from './AddSourcingRequest'

export default {
  title: 'Jobs/Sourcing Requests/Pages',
  argTypes: {
    jobId: {
      control: { type: 'text' }
    }
  }
}

const Template: Story<{ jobId: string }> = ({ jobId }) => (
  <StoryShell render={Component} queryParams={{ job_id: jobId }} />
)

export const Add = Template.bind({})
Add.args = { jobId: '286428' }
