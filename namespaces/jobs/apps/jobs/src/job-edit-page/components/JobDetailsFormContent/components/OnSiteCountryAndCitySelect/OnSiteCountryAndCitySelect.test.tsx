/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useField } from '@toptal/picasso-forms'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { JobWorkType } from '@staff-portal/graphql/staff'

import { LOCATION_COUNTRY_ID_FIELD } from '../../../../config'
import OnSiteCountryAndCitySelect from './OnSiteCountryAndCitySelect'

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
  CityField: () => <div>CityField</div>,
  useGetCountries: () => ({ countries: [] })
}))

const mockUseField = useField as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <OnSiteCountryAndCitySelect />
    </TestWrapper>
  )

describe('OnSiteCountryAndCitySelect', () => {
  beforeEach(() => {
    mockUseField.mockReturnValue({
      input: { value: JobWorkType.ONSITE }
    })
  })

  it('renders the field', () => {
    arrangeTest()

    expect(
      screen.getByTestId(`field-${LOCATION_COUNTRY_ID_FIELD}`)
    ).toBeInTheDocument()
  })

  describe('when the workType is not ONSITE or MIXED', () => {
    it('hides the field', () => {
      mockUseField.mockReturnValue({
        input: { value: JobWorkType.REMOTE }
      })

      arrangeTest()

      expect(
        screen.queryByTestId(`field-${LOCATION_COUNTRY_ID_FIELD}`)
      ).not.toBeInTheDocument()
    })
  })
})
