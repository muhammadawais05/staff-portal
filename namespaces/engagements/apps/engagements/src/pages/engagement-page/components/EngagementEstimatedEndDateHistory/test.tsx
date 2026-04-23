import { render } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { HistoryWidget } from '@staff-portal/chronicles'

import EngagementEstimatedEndDateHistory from './EngagementEstimatedEndDateHistory'

jest.mock('@staff-portal/chronicles', () => ({
  HistoryWidget: jest.fn()
}))

const HistoryWidgetMock = HistoryWidget as unknown as jest.Mock

const arrangeTest = () => {
  HistoryWidgetMock.mockImplementation(() => <div />)

  render(
    <TestWrapper>
      <EngagementEstimatedEndDateHistory
        engagementId='VjEtRW5nYWdlbWVudC0yNjI0MjU'
        pollInterval={10000}
      />
    </TestWrapper>
  )
}

describe('EngagementEstimatedEndDateHistory', () => {
  it('renders `HistoryWidget`', () => {
    arrangeTest()

    expect(HistoryWidgetMock).toHaveBeenCalledWith(
      expect.objectContaining({
        feeds: [['gid://platform/Engagement/262425']],
        actions: ['proposed']
      }),
      {}
    )
  })
})
