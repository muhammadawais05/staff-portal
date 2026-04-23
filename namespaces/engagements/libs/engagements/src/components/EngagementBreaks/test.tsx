import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { GetEngagementBreaksQuery } from './data/get-engagement-breaks'
import { useGetEngagementBreaks } from './data'
import { isSectionHidden } from './utils'
import EngagementBreaks from './EngagementBreaks'
import { createEngagementBreakMock } from './mocks'

jest.mock('./data')
jest.mock('./utils', () => ({
  __esModule: true,
  isSectionHidden: jest.fn()
}))
jest.mock('./components/ScheduleBreakButton', () => ({
  __esModule: true,
  default: () => <div data-testid='schedule-break-button' />
}))

jest.mock('./components/EngagementBreaksSkeletonLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='skeleton-loader' />
}))

jest.mock('./components/BreakRowContent', () => ({
  __esModule: true,
  default: () => <td data-testid='break-row-content' />
}))

describe('EngagementBreaks', () => {
  it('renders the skeleton loader', () => {
    mockReturnValues({ loading: true })
    arrangeTest()

    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
  })

  describe('when `engagementBreaks` are `null`', () => {
    it('renders nothing', () => {
      mockReturnValues({
        loading: false,
        data: {
          id: ENGAGEMENT_ID,
          engagementBreaks: null,
          operations: {
            scheduleEngagementBreak: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        }
      })
      mockUtilsValues(true)
      arrangeTest()
      expect(
        screen.queryByTestId('engagement-breaks-section')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementBreaks-empty-state')
      ).not.toBeInTheDocument()
    })
  })

  describe('when engagement status is forbidden', () => {
    it('renders nothing', () => {
      mockReturnValues({ loading: false, data: undefined })
      mockUtilsValues(true)
      arrangeTest()
      expect(
        screen.queryByTestId('engagement-breaks-section')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementBreaks-empty-state')
      ).not.toBeInTheDocument()
    })
  })

  describe('renders empty message', () => {
    it('if there are no engagement breaks', () => {
      mockReturnValues({
        loading: false,
        data: {
          id: ENGAGEMENT_ID,
          engagementBreaks: {
            nodes: []
          },
          operations: {
            scheduleEngagementBreak: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        }
      })
      mockUtilsValues(false)
      arrangeTest()
      expect(
        screen.queryByTestId('engagement-breaks-section')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('EngagementBreaks-empty-state')
      ).toBeInTheDocument()
    })
  })

  it('renders engagement breaks data', () => {
    mockReturnValues({
      loading: false,
      data: {
        id: ENGAGEMENT_ID,
        engagementBreaks: {
          nodes: [
            createEngagementBreakMock({ id: '1' }),
            createEngagementBreakMock({ id: '2' }),
            createEngagementBreakMock({ id: '3' })
          ]
        },
        operations: {
          scheduleEngagementBreak: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        }
      }
    })
    mockUtilsValues(false)
    arrangeTest()
    expect(
      screen.queryByTestId('engagement-breaks-section')
    ).toBeInTheDocument()
    expect(screen.getAllByTestId('break-row-content')).toHaveLength(3)
  })
})

const mockReturnValues = ({
  loading = false,
  data
}: Partial<{
  loading?: boolean
  data?: GetEngagementBreaksQuery['node']
}> = {}) => {
  const mockUseGetEngagementBreaks = useGetEngagementBreaks as jest.Mock

  mockUseGetEngagementBreaks.mockReturnValue({
    loading,
    data
  })
}

const mockUtilsValues = (isHidden: boolean) => {
  const mockIsSectionHidden = isSectionHidden as jest.Mock

  mockIsSectionHidden.mockReturnValue(isHidden)
}

const ENGAGEMENT_ID = '1'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EngagementBreaks engagementId={ENGAGEMENT_ID} />
    </TestWrapper>
  )
