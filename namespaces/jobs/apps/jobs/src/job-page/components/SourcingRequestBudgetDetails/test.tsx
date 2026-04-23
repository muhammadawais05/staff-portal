import React from 'react'
import { screen, render, within } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetNode } from '@staff-portal/data-layer-service'

import SourcingRequestBudgetDetails from './SourcingRequestBudgetDetails'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/facilities', () => ({
  __esModule: true,
  HourlyRateField: (props: { hourlyRate: number | null }) => {
    return (
      <span data-testid='sourcing-request-hourly-rate'>{props.hourlyRate}</span>
    )
  }
}))

const useGetNodeMock = useGetNode as jest.Mock

const jobMock = {
  id: 'job-id'
}

const arrangeTest = (props: {}) => {
  useGetNodeMock.mockReturnValue(() => {
    return {
      data: {
        ...jobMock,
        ...props
      }
    }
  })

  return render(
    <TestWrapper>
      <SourcingRequestBudgetDetails jobId={jobMock.id} />
    </TestWrapper>
  )
}

describe('SourcingRequestBudgetDetails', () => {
  it('renders hourly rate', () => {
    arrangeTest({
      sourcingRequest: {
        maximumTalentHourlyRate: 400,
        noTalentHourlyRateLimit: false
      }
    })

    expect(
      screen.getByTestId('sourcing-request-hourly-rate')
    ).toHaveTextContent('400')
  })

  it('does not render hourly rate', () => {
    arrangeTest({
      sourcingRequest: {
        maximumTalentHourlyRate: null,
        noTalentHourlyRateLimit: true
      }
    })

    expect(
      screen.getByTestId('sourcing-request-hourly-rate')
    ).toHaveTextContent('')
  })

  describe('can share field', () => {
    it('can share enabled', () => {
      arrangeTest({
        sourcingRequest: {
          canShareRate: true,
          canShareRateComment: 'can share comment'
        }
      })

      const shareNode = screen.getByTestId('sourcing-request-can-share')

      expect(within(shareNode).getByText('Yes')).toBeInTheDocument()
      expect(
        within(shareNode).getByText(/can share comment/)
      ).toBeInTheDocument()
    })

    it('can share disabled', () => {
      arrangeTest({
        sourcingRequest: {
          canShareRate: false
        }
      })

      const shareNode = screen.getByTestId('sourcing-request-can-share')

      expect(within(shareNode).getByText('No')).toBeInTheDocument()
    })
  })

  describe('can increase rate field', () => {
    it('can incrase enabled', () => {
      arrangeTest({
        sourcingRequest: {
          canIncreaseRate: true,
          canIncreaseRateComment: 'can increase comment'
        }
      })

      const shareNode = screen.getByTestId('sourcing-request-can-increase')

      expect(within(shareNode).getByText('Yes')).toBeInTheDocument()
      expect(
        within(shareNode).getByText(/can increase comment/)
      ).toBeInTheDocument()
    })

    it('can increase disabled', () => {
      arrangeTest({
        sourcingRequest: {
          canIncreaseRate: false
        }
      })

      const shareNode = screen.getByTestId('sourcing-request-can-increase')

      expect(within(shareNode).getByText('No')).toBeInTheDocument()
    })
  })
})
