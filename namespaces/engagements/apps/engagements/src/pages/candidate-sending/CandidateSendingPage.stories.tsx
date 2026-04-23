import { Story, StoryShell } from '@staff-portal/story-shell'
import React from 'react'

import Component from './CandidateSendingPage'

export default {
  title: 'Engagements/Engagements/Pages/Candidate Sending',
  argTypes: {
    id: {
      control: { type: 'text' }
    },
    jobId: {
      control: { type: 'text' }
    },
    talentId: {
      control: { type: 'text' }
    },
    hasPendingAssignment: {
      control: { type: 'boolean' }
    }
  }
}

interface Props {
  id: string
  jobId: string
  talentId: string
  hasPendingAssignment: boolean
}

const Template: Story<Props> = ({
  id,
  jobId,
  talentId,
  hasPendingAssignment
}) => (
  <StoryShell
    render={Component}
    queryParams={{
      job_id: jobId,
      id,
      talent_id: talentId,
      has_pending_assignment: hasPendingAssignment
    }}
  />
)

export const CandidateSending = Template.bind({})
CandidateSending.args = {
  id: '',
  jobId: '257961',
  talentId: '129330',
  hasPendingAssignment: false
}
