import React, { ComponentProps, ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import HistoryEntryTimelineRow from '../HistoryEntryTimelineRow'
import Timeline from '../Timeline'
import ExpandableContent from '../ExpandableContent'

jest.mock('../ExpandableContent', () => ({
  __esModule: true,
  default: jest.fn()
}))
const ExpandableContentMock = ExpandableContent as unknown as jest.Mock

const renderComponent = (
  props?: Partial<ComponentProps<typeof HistoryEntryTimelineRow>>
) =>
  render(
    <TestWrapper>
      <Timeline>
        <HistoryEntryTimelineRow
          id='123'
          content={['Text content of the entry']}
          comment='Entry comment'
          dateFormatted='Jul 29, 2019 at 9:31 AM'
          hasConnector={false}
          {...props}
        />
      </Timeline>
    </TestWrapper>
  )

describe('HistoryEntryTimelineRow', () => {
  beforeEach(() => {
    ExpandableContentMock.mockImplementation(
      ({ children }: { children: ReactNode }) => (
        <div data-testid='expandable-content'>{children}</div>
      )
    )
  })

  describe('when `isExpandable` equals `false`', () => {
    it('renders only content', () => {
      renderComponent({ isExpandable: false })

      expect(screen.getByText('Text content of the entry')).toBeInTheDocument()

      expect(ExpandableContentMock).not.toHaveBeenCalledWith()
    })
  })

  describe('when `isExpandable` equals `true`', () => {
    it('renders expandable component with proper props', () => {
      renderComponent({ expanded: false, isExpandable: true })

      expect(screen.getByText('Text content of the entry')).toBeInTheDocument()

      expect(ExpandableContentMock).toHaveBeenCalledWith(
        expect.objectContaining({
          children: expect.arrayContaining(['Text content of the entry']),
          comment: 'Entry comment',
          expanded: false
        }),
        {}
      )
    })
  })
})
