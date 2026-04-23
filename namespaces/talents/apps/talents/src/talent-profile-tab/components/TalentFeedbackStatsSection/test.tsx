import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentFeedbackStatsSection from './'
import {
  createTalentFeedbackStatsMock,
  defaultFeedbackStatsEntries
} from './data/get-talent-feedback-stats/mocks'

jest.mock('./components/TalentFeedbackStatsEntry', () => {
  return {
    __esModule: true,
    default: () => <div data-testid='feedback-stats-entry' />
  }
})

const arrangeTest = (talentId: string, mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentFeedbackStatsSection talentId={talentId} />
    </TestWrapperWithMocks>
  )

describe('TalentFeedbackStatsSection', () => {
  it('shows with correct number of entries', async () => {
    const talentId = 'VjEtVGFsZW50LTEyNDM4Ng'
    const feedbackStatsEntries = defaultFeedbackStatsEntries

    arrangeTest(talentId, [
      createTalentFeedbackStatsMock(talentId, feedbackStatsEntries)
    ])

    expect(await screen.findByText('Feedback Stats')).toBeInTheDocument()
    expect(screen.getAllByTestId('feedback-stats-entry')).toHaveLength(
      feedbackStatsEntries.length
    )
  })

  it('hides if there are no entries', async () => {
    const talentId = 'VjEtVGFsZW50LTEyNDM4Ng'

    arrangeTest(talentId, [createTalentFeedbackStatsMock(talentId, [])])

    await waitForElementToBeRemoved(() => screen.getByLabelText('Loading...'))

    expect(screen.queryByText('Feedback Stats')).not.toBeInTheDocument()
  })
})
