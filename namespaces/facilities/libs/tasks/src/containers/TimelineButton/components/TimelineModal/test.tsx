import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TimelineModal from './TimelineModal'
import { useGetTimeline } from '../../data'
import { GET_TIMELINE_RESPONSE } from './mocks'
import useExpandTimelineRecords from '../../hooks/expand-timeline-records'

jest.mock('../../hooks/expand-timeline-records')
jest.mock('../../data')
jest.mock('@staff-portal/chronicles', () => ({
  ...jest.requireActual('@staff-portal/chronicles')
}))
jest.mock('../NoteRecord', () => ({
  __esModule: true,
  default: () => <div data-testid='note-record' />
}))
jest.mock('../HistoryActionRecord', () => ({
  __esModule: true,
  default: () => <div data-testid='history-action-record' />
}))
jest.mock('../CommunicationRecord', () => ({
  __esModule: true,
  default: () => <div data-testid='communication-record' />
}))

const mockUseGetTimeline = useGetTimeline as jest.Mock
const mockUseExpandTimelineRecords = useExpandTimelineRecords as jest.Mock

const arrangeTest = (nodeId: string) =>
  render(
    <TestWrapper>
      <TimelineModal nodeId={nodeId} hideModal={() => {}} />
    </TestWrapper>
  )

describe('TimelineModal', () => {
  const nodeTitle = 'Test Company'
  const nodeType = 'Company'

  it('renders timeline modal with no search result message if there are no timeline records', async () => {
    const nodeId = '2'

    mockUseGetTimeline.mockReturnValue({
      data: {
        timeline: { notes: [], actions: [], communications: [] },
        nodeTitle,
        nodeType
      },
      loading: false
    })
    mockUseExpandTimelineRecords.mockReturnValue({
      toggleExpandAll: () => {},
      handleExpandClick: () => {},
      hasExpandedItems: false,
      expandedById: {}
    })

    arrangeTest(nodeId)

    expect(useGetTimeline).toHaveBeenCalledWith(nodeId)
    expect(
      screen.getByText(`Timeline for ${nodeType}: ${nodeTitle}`)
    ).toBeInTheDocument()
    expect(
      screen.getByText('No timeline for these filters')
    ).toBeInTheDocument()
  })

  it('renders timeline modal with timeline records', async () => {
    const nodeId = '2'

    mockUseGetTimeline.mockReturnValue({
      data: { ...GET_TIMELINE_RESPONSE, nodeTitle, nodeType },
      loading: false
    })
    mockUseExpandTimelineRecords.mockReturnValue({
      toggleExpandAll: () => {},
      handleExpandClick: () => {},
      hasExpandedItems: false,
      expandedById: {}
    })

    arrangeTest(nodeId)

    expect(useGetTimeline).toHaveBeenCalledWith(nodeId)
    expect(
      screen.getByText(`Timeline for ${nodeType}: ${nodeTitle}`)
    ).toBeInTheDocument()
    expect(screen.getByTestId('note-record')).toBeInTheDocument()
    expect(screen.getByTestId('history-action-record')).toBeInTheDocument()
    expect(screen.getByTestId('communication-record')).toBeInTheDocument()

    const filterCheckboxActions = screen.getByLabelText('History (Actions)')

    fireEvent.click(filterCheckboxActions)

    expect(screen.queryByTestId('note-record')).not.toBeInTheDocument()
    expect(screen.queryByTestId('communication-record')).not.toBeInTheDocument()
  })
})
