import React from 'react'
import { useField } from '@toptal/picasso-forms'
import { render, screen } from '@testing-library/react'
import { Option } from '@toptal/picasso/Select'

import { createCountryFragment } from '../../data/country-fragment/mocks'
import CountryCityFields from './CountryCityFields'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Select: (props: Record<string, unknown>) => (
      <div data-testid={props['data-testid'] || 'Select'}>
        {JSON.stringify(props)}
      </div>
    )
  },
  useField: jest.fn()
}))
jest.mock('../CityField', () => (props: Record<string, unknown>) => (
  <div data-testid={props['data-testid'] || 'CityField'}>
    {JSON.stringify(props)}
  </div>
))

const mockUseField = useField as jest.Mock

const COUNTRY_ID = 'country-id-1'
const COUNTRIES = [
  createCountryFragment({
    code: 'GL',
    id: COUNTRY_ID,
    name: 'Greenland'
  }),
  createCountryFragment({
    code: 'PL',
    id: 'country-id-2',
    name: 'Poland'
  })
]
const COUNTRY_OPTIONS: Option<string>[] = [
  {
    value: COUNTRY_ID,
    text: 'Greenland'
  },
  {
    value: 'country-id-2',
    text: 'Poland'
  }
]

describe('CountryCityFields', () => {
  beforeEach(() => {
    mockUseField.mockReturnValue({
      input: { value: COUNTRY_ID }
    })
  })

  describe('render', () => {
    it('renders form country city field', () => {
      render(<CountryCityFields countries={COUNTRIES} />)

      const select = screen.getByTestId('CountryCityFields-input-country')
      const cityField = screen.getByTestId('CountryCityFields-input-city')

      expect(select).toBeInTheDocument()
      expect(select).toHaveTextContent('"enableReset":true')
      expect(select).toHaveTextContent('"name":"location.countryId')
      expect(select).toHaveTextContent('"label":"Country"')
      expect(select).toHaveTextContent('"width":"full"')
      expect(select).toHaveTextContent(
        `"options":${JSON.stringify(COUNTRY_OPTIONS)}`
      )

      expect(cityField).toBeInTheDocument()
      expect(cityField).toHaveTextContent('"label":"City"')
      expect(cityField).toHaveTextContent('"countryCode":"GL"')
    })
  })
})
