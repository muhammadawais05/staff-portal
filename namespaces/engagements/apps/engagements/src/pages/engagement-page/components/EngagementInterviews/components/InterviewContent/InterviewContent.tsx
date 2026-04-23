import { Container } from '@toptal/picasso'
import { toTitleCase } from '@toptal/picasso/utils'
import React from 'react'

import { EngagementInterviewFragment } from '../../data/get-engagement-interviews'
import InterviewContentItem from '../InterviewContentItem'
import InterviewNotes from '../InterviewNotes'
import EngagementInterviewWebConference from '../EngagementInterviewWebConference'

export interface Props {
  interview: EngagementInterviewFragment
}

const InterviewContent = ({ interview }: Props) => {
  const { interviewContacts, interviewType, webConferenceInfo } = interview

  const formattedInterviewContacts = interviewContacts.edges
    .map(item => item.node.fullName)
    .join(', ')

  return (
    <Container padded='small'>
      <InterviewContentItem
        label='Interview Contact:'
        value={formattedInterviewContacts}
      />

      <InterviewContentItem
        data-testid='EngagementInterview-interview-type'
        top='small'
        label='Interview Type:'
        value={toTitleCase(interviewType?.toLowerCase())}
      />

      <InterviewNotes interview={interview} />

      {webConferenceInfo?.url && (
        <EngagementInterviewWebConference interview={interview} />
      )}
    </Container>
  )
}

export default InterviewContent
