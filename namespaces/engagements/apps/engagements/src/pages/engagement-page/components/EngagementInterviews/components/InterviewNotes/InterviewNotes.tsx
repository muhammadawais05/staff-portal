import React from 'react'

import { EngagementInterviewFragment } from '../../data/get-engagement-interviews'
import InterviewContentItem from '../InterviewContentItem'
import { getInitiatorComment } from './utils'

export type Props = {
  interview: EngagementInterviewFragment
}

const InterviewNotes = ({ interview }: Props) => {
  const { statusComment, webConferenceInfo } = interview

  const interviewNotes: string[] = [statusComment]

  if (!webConferenceInfo?.url) {
    const initiatorComment = getInitiatorComment(interview)

    if (initiatorComment) {
      interviewNotes.push(initiatorComment)
    }
  }

  return (
    <InterviewContentItem
      top='small'
      label='Interview Notes:'
      value={interviewNotes.join('\n')}
    />
  )
}

export default InterviewNotes
