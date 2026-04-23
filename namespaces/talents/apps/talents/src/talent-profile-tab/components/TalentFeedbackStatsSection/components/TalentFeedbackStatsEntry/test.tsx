import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import TalentFeedbackStatsEntry from './TalentFeedbackStatsEntry'
import { FeedbackStatsEntryFragment } from '../../data/get-talent-feedback-stats'
import { defaultFeedbackStatsEntries } from '../../data/get-talent-feedback-stats/mocks'

const DEFAULT_ENTRY = defaultFeedbackStatsEntries[0]
const DEFAULT_ANSWER = DEFAULT_ENTRY.answers.nodes[0]

const arrangeTest = (entry?: FeedbackStatsEntryFragment) =>
  render(
    <TestWrapper>
      <TalentFeedbackStatsEntry entry={{ ...DEFAULT_ENTRY, ...entry }} />
    </TestWrapper>
  )

describe('TalentFeedbackStatsEntry', () => {
  it('show the role title with total count', () => {
    arrangeTest()

    expect(
      screen.getByText(
        `${DEFAULT_ENTRY.roleTitle} (out of ${DEFAULT_ENTRY.answers.totalCount})`
      )
    ).toBeInTheDocument()
  })

  it('shows the correct number of answers', () => {
    arrangeTest()
    expect(screen.getAllByTestId('item-field-label')).toHaveLength(
      DEFAULT_ENTRY.answers.nodes.length
    )
  })

  it('shows the answer label with tooltip', () => {
    arrangeTest()
    assertOnTooltipText(
      screen.getByText(DEFAULT_ANSWER.label),
      DEFAULT_ANSWER.tooltip
    )
  })

  it('shows the answer score in percentage', () => {
    arrangeTest()
    expect(screen.getByText(`${DEFAULT_ANSWER.score}%`)).toBeInTheDocument()
  })
})
