import { render, screen } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import WorkSchedule from './WorkSchedule'
import { getLazyWeeklyHoursHook } from './data'

jest.mock('@staff-portal/data-layer-service')
jest.mock('./data', () => ({
  getLazyWeeklyHoursHook: jest.fn()
}))
const mockUseMutation = useMutation as jest.Mock
const mockUseGetLazyWeeklyHours = getLazyWeeklyHoursHook as jest.Mock

type Props = ComponentProps<typeof WorkSchedule>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <WorkSchedule {...props} />
    </TestWrapper>
  )

describe('WorkSchedule', () => {
  it('renders default', () => {
    const WEEKLY_HOURS = 22

    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          updateEngagementWeeklyHours: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])

    mockUseGetLazyWeeklyHours.mockReturnValue({
      loading: false,
      data: '22'
    })

    arrangeTest({
      engagementId: '1234',
      weeklyHours: WEEKLY_HOURS
    })

    expect(
      screen.getByText(`${WEEKLY_HOURS} hours per week`)
    ).toBeInTheDocument()
  })

  it('renders singular hour', () => {
    const WEEKLY_HOURS = 1

    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          updateEngagementWeeklyHours: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])

    mockUseGetLazyWeeklyHours.mockReturnValue({
      loading: false,
      data: '1'
    })

    arrangeTest({
      engagementId: '4321',
      weeklyHours: WEEKLY_HOURS
    })

    expect(
      screen.getByText(`${WEEKLY_HOURS} hour per week`)
    ).toBeInTheDocument()
  })
})
