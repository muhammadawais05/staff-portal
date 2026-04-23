import React from 'react'
import { render, screen } from '@testing-library/react'
import { TalentPreviousInterviewsResult } from '@staff-portal/graphql/staff'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'

import InterviewedBeforeField, {
  INTERVIEW_RESULTS_CONTENT,
  Props
} from './InterviewedBeforeField'

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: () => jest.fn(() => '20 Nov 2021')
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <InterviewedBeforeField {...props} />
    </TestWrapper>
  )

describe('InterviewedBeforeField', () => {
  it('renders best match rate with tooltip', () => {
    const previousInterviewsResult = TalentPreviousInterviewsResult.WAS_HIRED
    const clientName = 'Effertz LLC'

    arrangeTest({
      previousInterviewsResult,
      clientName
    })

    expect(
      screen.getByText(
        INTERVIEW_RESULTS_CONTENT[previousInterviewsResult].content
      )
    ).toBeInTheDocument()

    const icon = screen.getByTestId('best-match-tooltip')

    assertOnTooltip(icon, tooltip => {
      expect(tooltip).toHaveTextContent(
        INTERVIEW_RESULTS_CONTENT[previousInterviewsResult].tooltip(clientName)
      )
    })
  })

  it('renders appropriate message when no best match score provided', () => {
    const previousInterviewsResult =
      TalentPreviousInterviewsResult.FAILED_INTERVIEW
    const clientName = 'Dibbert Group'

    arrangeTest({
      previousInterviewsResult,
      clientName
    })

    expect(
      screen.getByText(
        INTERVIEW_RESULTS_CONTENT[previousInterviewsResult].content
      )
    ).toBeInTheDocument()

    const icon = screen.getByTestId('best-match-tooltip')

    assertOnTooltip(icon, tooltip => {
      expect(tooltip).toHaveTextContent(
        INTERVIEW_RESULTS_CONTENT[previousInterviewsResult].tooltip(clientName)
      )
    })
  })
})
