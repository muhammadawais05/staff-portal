import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'

import NoteFormTimeZone from './NoteFormTimeZone'

jest.mock('@staff-portal/date-time-utils', () => ({
  useGetAvailableTimeZones: jest.fn()
}))

const TIMEZONES = [
  { name: '(UTC-11:00) Pacific - Midway', value: 'Pacific/Midway' },
  { name: '(UTC-07:00) America - Creston', value: 'America/Creston' },
  { name: '(UTC-05:00) America - Bogota', value: 'America/Bogota' }
]

const mockReturnValues = () => {
  const mockUseGetAvailableTimeZones = useGetAvailableTimeZones as jest.Mock

  mockUseGetAvailableTimeZones.mockReturnValue({
    timezones: TIMEZONES,
    loading: false
  })
}

const arrangeTest = (defaultTimeZone?: string) => {
  mockReturnValues()

  return render(
    <TestWrapper>
      <Form
        initialValues={{ answers: [{ value: defaultTimeZone }] }}
        onSubmit={() => {}}
      >
        <NoteFormTimeZone index={0} placeholder='Select timezone' />
      </Form>
    </TestWrapper>
  )
}

describe('NoteFormTimeZone', () => {
  it('shows the timezone select', () => {
    arrangeTest()

    fireEvent.click(screen.getByPlaceholderText('Select timezone'))

    TIMEZONES.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('shows default timezone', () => {
    arrangeTest('America/Bogota')

    expect(screen.getByPlaceholderText('Select timezone')).toHaveValue(
      '(UTC-05:00) America - Bogota'
    )
  })
})
