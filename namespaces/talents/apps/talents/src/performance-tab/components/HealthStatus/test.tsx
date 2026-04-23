import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import {
  OperationCallableTypes,
  TalentHealthStatusValue
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { useGetTalentHealthStatusWithHistory } from '../../data'
import HealthStatus from '../HealthStatus'

const mockUseGetTalentHealthStatusWithHistory =
  useGetTalentHealthStatusWithHistory as jest.Mock

jest.mock('@staff-portal/facilities/src/hooks/use-encoded-id')
jest.mock('../../data')

const arrangeTest = (mocks: MockedResponse[] = []) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <HealthStatus talentId='test-talent' />
    </TestWrapperWithMocks>
  )

describe('HealthStatus', () => {
  describe('when data is loading', () => {
    it('renders title and loader', () => {
      mockUseGetTalentHealthStatusWithHistory.mockReturnValue({
        networkLoading: true
      })

      arrangeTest()
      expect(screen.queryByText('History & Health Status')).toBeInTheDocument()
      expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Change' })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Show History' })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Hide History' })
      ).not.toBeInTheDocument()
    })
  })

  describe('when data has been loaded', () => {
    it('renders the health status and history', () => {
      mockUseGetTalentHealthStatusWithHistory.mockReturnValue({
        loading: false,
        data: {
          id: 'talent-id',
          currentHealthStatus: {
            healthStatus: TalentHealthStatusValue.WATCH_LIST
          },
          healthStatusHistory: {
            nodes: [
              {
                comment: 'Reason',
                createdAt: '2021-03-21T12:00:00+03:00',
                healthStatus: TalentHealthStatusValue.WATCH_LIST,
                performer: null
              }
            ],
            totalCount: 1
          },
          operations: {
            setHealthStatusTalent: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        }
      })

      arrangeTest()
      expect(screen.queryByText('History & Health Status')).toBeInTheDocument()
      expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
      expect(
        within(screen.getByTestId('HealthStatusContent')).queryByRole(
          'button',
          { name: 'Change' }
        )
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Show History' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Hide History' })
      ).not.toBeInTheDocument()
      expect(screen.queryByText('Watch List')).toBeInTheDocument()
      expect(
        screen.queryByTestId('HealthStatusHistory')
      ).not.toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: 'Show History' }))
      expect(screen.queryByTestId('HealthStatusHistory')).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Show History' })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Hide History' })
      ).toBeInTheDocument()
    })
  })
})
