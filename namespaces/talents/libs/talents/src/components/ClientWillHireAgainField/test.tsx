import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import { ClientWillHireAgainFragment } from '../../data/client-will-hire-again-fragment'
import ClientWillHireAgainField from './ClientWillHireAgainField'
import { createClientWillHireAgainFragmentMock } from '../../data/client-will-hire-again-fragment/mocks'

const arrangeTest = (data: ClientWillHireAgainFragment['feedbackStatistics']) =>
  render(
    <TestWrapper>
      <ClientWillHireAgainField data={data} />
    </TestWrapper>
  )

describe('ClientWillHireAgain', () => {
  it('shows feedback stats', async () => {
    const answers = [
      { label: 'Hire again', score: 100 },
      { label: 'Timeline adherence', score: 100 },
      { label: 'Communication', score: 100 },
      { label: 'Quality of work', score: 100 }
    ]
    const totalCount = 2
    const data = createClientWillHireAgainFragmentMock({ answers, totalCount })

    arrangeTest(data)

    expect(
      await screen.findByTestId('client-will-hire-again-field')
    ).toBeInTheDocument()

    expect(
      screen.getByText(`${answers[0].score}% (${totalCount})`)
    ).toBeInTheDocument()

    assertOnTooltipText(
      screen.getByTestId('client-feedback-stats-tooltip-icon'),
      `Clients who rated: ${totalCount}${answers
        .map(answer => `${answer.label}: ${answer.score}%`)
        .join('')}`
    )
  })

  describe('when there is no feedback stats', () => {
    it('shows never rated before message', async () => {
      const answers: { label: string; score: number }[] = []
      const totalCount = 0
      const data = createClientWillHireAgainFragmentMock({
        answers,
        totalCount
      })

      arrangeTest(data)

      expect(
        await screen.findByTestId('client-will-hire-again-field')
      ).toBeInTheDocument()

      expect(screen.getByText('Never rated before')).toBeInTheDocument()
    })
  })
})
