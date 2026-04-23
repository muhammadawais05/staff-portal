import React from 'react'
import { render } from '@testing-library/react'
import { Timeline } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import HistoryEntryRow, { Props } from './HistoryEntryRow'
import HistoryEntryTableRow from '../HistoryEntryTableRow'
import HistoryEntryTimelineRow from '../HistoryEntryTimelineRow'

jest.mock('../HistoryEntryTableRow', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../HistoryEntryTimelineRow', () => ({
  __esModule: true,
  default: jest.fn()
}))

const HistoryEntryTableRowMock = HistoryEntryTableRow as unknown as jest.Mock
const HistoryEntryTimelineRowMock =
  HistoryEntryTimelineRow as unknown as jest.Mock

const renderComponent = (props: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <Timeline>
        <HistoryEntryRow
          id='123'
          icon={<span data-testid='entry-icon' />}
          date='2019-07-29T09:31:41+03:00'
          content={['Text content of the entry']}
          comment='Entry comment'
          expanded
          hasConnector
          {...props}
        />
      </Timeline>
    </TestWrapper>
  )

describe('HistoryEntryRow', () => {
  beforeEach(() => {
    HistoryEntryTableRowMock.mockImplementation(() => (
      <div data-testid='history-entry-table-row' />
    ))
    HistoryEntryTimelineRowMock.mockImplementation(() => (
      <div data-testid='history-entry-timeline-row' />
    ))
  })

  describe('when `variant` equals `table`', () => {
    it('renders `table` component', () => {
      renderComponent({ variant: 'table' })

      expect(HistoryEntryTableRowMock).toHaveBeenCalledWith(
        expect.objectContaining({
          comment: 'Entry comment',
          content: expect.arrayContaining(['Text content of the entry']),
          dateFormatted: 'Jul 29, 2019 at 9:31 AM',
          expanded: true,
          isExpandable: true,
          onClick: expect.any(Function)
        }),
        {}
      )

      expect(HistoryEntryTimelineRowMock).not.toHaveBeenCalledWith()
    })
  })

  describe('when `variant` equals `timeline`', () => {
    it('renders `timeline` component', () => {
      renderComponent()

      expect(HistoryEntryTimelineRowMock).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '123',
          comment: 'Entry comment',
          content: expect.arrayContaining(['Text content of the entry']),
          dateFormatted: 'Jul 29, 2019 at 9:31 AM',
          expanded: true,
          hasConnector: true,
          isExpandable: true,
          onExpandClick: expect.any(Function)
        }),
        {}
      )

      expect(HistoryEntryTableRowMock).not.toHaveBeenCalledWith()
    })
  })
})
