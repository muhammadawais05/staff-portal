import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import { fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'

import DraftJobFormPreferredHours from './PreferredHoursFields'
import { DraftJobFragment } from '../../../DraftJobSection/data/draft-job-fragment'

jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  useGetAvailableTimeZones: jest.fn()
}))

const TIMEZONES = [
  { name: '(UTC-11:00) Pacific - Midway', value: 'Pacific/Midway' },
  { name: '(UTC-07:00) America - Creston', value: 'America/Creston' },
  { name: '(UTC-05:00) America - Bogota', value: 'America/Bogota' }
]

type PartialDraftJob = Pick<
  DraftJobFragment,
  | 'timeZoneName'
  | 'hasPreferredHours'
  | 'hoursOverlap'
  | 'workingTimeFrom'
  | 'workingTimeTo'
>

const mockReturnValues = () => {
  const mockUseGetAvailableTimeZones = useGetAvailableTimeZones as jest.Mock

  mockUseGetAvailableTimeZones.mockReturnValue({
    timezones: TIMEZONES,
    loading: false
  })
}

const arrangeTest = () => {
  mockReturnValues()

  const initialValues: PartialDraftJob = {
    hasPreferredHours: false,
    workingTimeFrom: null,
    workingTimeTo: null
  }

  render(
    <TestWrapper>
      <Form<PartialDraftJob> initialValues={initialValues} onSubmit={() => {}}>
        <DraftJobFormPreferredHours />
      </Form>
    </TestWrapper>
  )
}

describe('DraftJobFormPreferredHours', () => {
  it('does not render working hours related fields if hasPreferredHours is not set', () => {
    arrangeTest()

    // optional if hasPreferredHours is not set
    expect(screen.getByText(/Job Time Zone/)).toBeInTheDocument()
    expect(screen.getByText(/Time Zone Preference/)).toBeInTheDocument()

    expect(screen.queryByText('Client Working Hours')).not.toBeInTheDocument()
    expect(
      screen.queryByText('Desired Hours of Overlap?')
    ).not.toBeInTheDocument()
  })

  it('renders working hours related fields if hasPreferredHours is set', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Yes'))

    await (() => Promise.resolve())

    // not optional if hasPreferredHours is set
    expect(screen.getByText('Job Time Zone')).toBeInTheDocument()
    expect(screen.getByText('Time Zone Preference?')).toBeInTheDocument()
    expect(screen.getByText('Client Working Hours')).toBeInTheDocument()
    expect(screen.getByText('Desired Hours of Overlap?')).toBeInTheDocument()
  })
})
