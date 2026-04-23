import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TimeZone from '.'

jest.mock('@staff-portal/data-layer-service')
jest.mock('../../utils/get-client-time-zone-hook', () => ({
  getClientTimeZoneHook: () => () => {}
}))

jest.mock('@staff-portal/date-time-utils', () => ({
  getTimeZoneFullText: () => 'formatted time zone',
  useGetAvailableTimeZones: () => ({ timezones: [] })
}))

const arrangeTest = (props: Partial<ComponentProps<typeof TimeZone>>) =>
  render(
    <TestWrapper>
      <TimeZone
        clientId='123'
        timeZone={{
          name: '(UTC+03:00) Asia - Qatar',
          value: 'Asia/Qatar'
        }}
        handleChange={() => {}}
        editingDisabled={false}
        {...props}
      />
    </TestWrapper>
  )

describe('TimeZone', () => {
  it('renders viewer value', () => {
    arrangeTest({})

    expect(
      screen.getByTestId('EditableField-timeZoneName-viewer')
    ).toHaveTextContent('formatted time zone')
  })
})
