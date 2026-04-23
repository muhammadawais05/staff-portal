import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { Literal, resolveToJSX } from '../../../template-compiler'
import { usePerformedActionsQuery } from '../../data'
import RecentActivities from './RecentActivities'

jest.mock('../../data', () => ({
  __esModule: true,
  usePerformedActionsQuery: jest.fn()
}))

jest.mock('../../../template-compiler', () => ({
  __esModule: true,
  resolveToJSX: jest.fn()
}))

describe('RecentActivities', () => {
  it('shows error message', () => {
    const usePerformedActionsQueryMocked = usePerformedActionsQuery as jest.Mock

    usePerformedActionsQueryMocked.mockReturnValue({ error: new Error() })

    render(
      <TestWrapper>
        <RecentActivities feeds={[[]]} fullHistoryUrl='' />
      </TestWrapper>
    )

    expect(
      screen.getByText(
        'Recent activity is temporarily unable to load. Please try again later.'
      )
    ).toBeInTheDocument()
  })

  it('shows empty message', () => {
    const usePerformedActionsQueryMocked = usePerformedActionsQuery as jest.Mock

    usePerformedActionsQueryMocked.mockReturnValue({ data: [] })

    render(
      <TestWrapper>
        <RecentActivities feeds={[[]]} fullHistoryUrl='' />
      </TestWrapper>
    )

    expect(screen.getByText('No recent activity')).toBeInTheDocument()
  })

  it('renders items with comment and show full history', () => {
    const usePerformedActionsQueryMocked = usePerformedActionsQuery as jest.Mock
    const LITERALS = [] as Literal[]

    usePerformedActionsQueryMocked.mockReturnValue({
      data: [
        {
          literals: LITERALS,
          performedAction: {
            id: 'abc123',
            occurredAt: '2020-12-23T01:22:17+03:00',
            comment: 'test'
          }
        }
      ],
      hasMore: true
    })

    render(
      <TestWrapper>
        <RecentActivities feeds={[[]]} fullHistoryUrl='' />
      </TestWrapper>
    )

    expect(resolveToJSX).toHaveBeenCalledWith(LITERALS)
    expect(screen.getByText('View Comment')).toBeInTheDocument()
    expect(screen.getByText('Show Full History')).toBeInTheDocument()
  })

  it('renders items with hidden view comment link', () => {
    const usePerformedActionsQueryMocked = usePerformedActionsQuery as jest.Mock
    const LITERALS = [] as Literal[]

    usePerformedActionsQueryMocked.mockReturnValue({
      data: [
        {
          literals: LITERALS,
          performedAction: {
            id: 'abc123',
            occurredAt: '2020-12-23T01:22:17+03:00',
            comment: 'test'
          }
        }
      ],
      hasMore: true
    })

    render(
      <TestWrapper>
        <RecentActivities
          feeds={[[]]}
          fullHistoryUrl=''
          showLinkToCommentDetails={false}
        />
      </TestWrapper>
    )

    expect(resolveToJSX).toHaveBeenCalledWith(LITERALS)
    expect(screen.queryByText('View Comment')).not.toBeInTheDocument()
    expect(screen.getByText('Show Full History')).toBeInTheDocument()
  })

  it('renders items with NO comment OR show full history', () => {
    const usePerformedActionsQueryMocked = usePerformedActionsQuery as jest.Mock
    const LITERALS = [] as Literal[]

    usePerformedActionsQueryMocked.mockReturnValue({
      data: [
        {
          literals: LITERALS,
          performedAction: {
            id: 'abc123',
            occurredAt: '2020-12-23T01:22:17+03:00',
            comment: null
          }
        }
      ],
      hasMore: false
    })

    render(
      <TestWrapper>
        <RecentActivities feeds={[[]]} fullHistoryUrl='' />
      </TestWrapper>
    )

    expect(resolveToJSX).toHaveBeenCalledWith(LITERALS)
    expect(screen.queryByText('View Comment')).not.toBeInTheDocument()
    expect(screen.queryByText('Show Full History')).not.toBeInTheDocument()
  })
})
