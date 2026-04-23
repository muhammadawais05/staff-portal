/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useField } from '@toptal/picasso-forms'

import {
  LOCATION_COUNTRY_ID_FIELD,
  TIMEZONE_FIELD,
  LOCATION_CITY_NAME_FIELD,
  CITIZENSHIP_FIELD
} from './constants'
import TalentLocationFields from './TalentLocationFields'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    Select: ({ name }: any) => <input data-testid={`field-${name}`} />
  },
  useField: jest.fn(),
  useForm: () => ({ onchange: () => {} })
}))

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  CityField: () => <div data-testid='field-location[cityName]' />,
  useGetCountries: () => ({ countries: [] })
}))

jest.mock('@staff-portal/forms', () => ({
  FormTimeZoneSelect: () => <div data-testid='field-timeZoneName' />
}))

const mockUseField = useField as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <TalentLocationFields />
    </TestWrapper>
  )

describe('TalentLocationFields', () => {
  beforeEach(() => {
    mockUseField.mockReturnValue({
      input: { value: 'countryId' }
    })
  })

  it('renders fields', () => {
    arrangeTest()

    expect(
      screen.getByTestId(`field-${LOCATION_CITY_NAME_FIELD}`)
    ).toBeInTheDocument()

    expect(screen.getByTestId(`field-${TIMEZONE_FIELD}`)).toBeInTheDocument()

    expect(screen.getByTestId(`field-${CITIZENSHIP_FIELD}`)).toBeInTheDocument()

    expect(
      screen.getByTestId(`field-${LOCATION_COUNTRY_ID_FIELD}`)
    ).toBeInTheDocument()
  })
})
