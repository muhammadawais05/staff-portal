import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentInterviewFeedbackContent from './TalentInterviewFeedbackContent'

const arrangeTest = (url?: string, comment?: string, rating?: number) =>
  render(
    <TestWrapper>
      <TalentInterviewFeedbackContent
        labelColumnWidth={8}
        surveyAnswer={{
          rating,
          comment,
          answeredAt: '2021-06-25'
        }}
        talent={{
          id: '22',
          resumeUrl: 'http://toptal.com/resume/22',
          webResource: {
            text: 'Full Name',
            url
          }
        }}
      />
    </TestWrapper>
  )

describe('TalentInterviewFeedbackContent', () => {
  describe('when the comment and rating are undefined', () => {
    it('does not render anything', () => {
      arrangeTest(undefined, undefined, undefined)

      expect(
        screen.queryByTestId('TalentInterviewFeedbackContent')
      ).not.toBeInTheDocument()
    })
  })

  describe('when webResource url is missing', () => {
    it('using the resume url', () => {
      arrangeTest(undefined, 'comment', 2)

      expect(
        screen.getByTestId('TalentInterviewFeedbackItems-submitter')
      ).toHaveAttribute('href', 'http://toptal.com/resume/22')
      expect(
        screen.getByTestId('TalentInterviewFeedbackItems-submitter')
      ).toHaveAttribute('target', '_blank')
    })
  })

  describe('when webResource url is provided', () => {
    it('using the resource url', () => {
      arrangeTest('http://toptal.com/staff/22', 'comment', 2)

      expect(
        screen.getByTestId('TalentInterviewFeedbackItems-submitter')
      ).toHaveAttribute('href', 'http://toptal.com/staff/22')
      expect(
        screen.getByTestId('TalentInterviewFeedbackItems-submitter')
      ).not.toHaveAttribute('target')
    })
  })
})
