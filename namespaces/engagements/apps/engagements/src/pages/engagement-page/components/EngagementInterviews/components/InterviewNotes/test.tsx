import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  InterviewCommunicationType,
  InterviewCumulativeStatus,
  InterviewInitiator,
  InterviewKind
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import InterviewNotes, { Props } from './InterviewNotes'
import { EngagementInterviewFragment } from '../../data/get-engagement-interviews'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <InterviewNotes {...props} />
    </TestWrapper>
  )

describe('InterviewNotes', () => {
  const statusComment = 'Interview time is set and confirmed by Top Scheduler.'
  const initiatorComment = 'The candidate will initiate the interview by phone.'

  describe('when `webConferenceInfo` url is missing', () => {
    it('renders interview notes correctly', () => {
      arrangeTest({
        interview: {
          statusComment,
          communication: InterviewCommunicationType.PHONE,
          cumulativeStatus: InterviewCumulativeStatus.SCHEDULED,
          initiator: InterviewInitiator.CANDIDATE,
          kind: InterviewKind.EXTERNAL
        } as EngagementInterviewFragment
      })

      expect(
        screen.getByTestId('InterviewContentItem-value')
      ).toHaveTextContent(`${statusComment} ${initiatorComment}`)
    })
  })

  describe('when `webConferenceInfo` url is set', () => {
    it('renders interview notes correctly', () => {
      arrangeTest({
        interview: {
          statusComment,
          communication: InterviewCommunicationType.PHONE,
          initiator: InterviewInitiator.CANDIDATE,
          kind: InterviewKind.EXTERNAL,
          webConferenceInfo: {
            url: 'www.zoom.com'
          }
        } as EngagementInterviewFragment
      })

      expect(
        screen.getByTestId('InterviewContentItem-value')
      ).toHaveTextContent(statusComment)
      expect(
        screen.getByTestId('InterviewContentItem-value')
      ).not.toHaveTextContent(initiatorComment)
    })
  })
})
