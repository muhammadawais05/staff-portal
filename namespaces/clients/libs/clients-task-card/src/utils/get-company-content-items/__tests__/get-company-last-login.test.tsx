import { render } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { Maybe, Scalars } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { getCompanyLastLogin } from '../get-company-last-login'
import { ClientLastLoginFragment } from '../../../data/client-last-login-fragment'

type CompanyRepresentativesType = {
  id: string
  fullName: string
  currentSignInAt: Maybe<Scalars['Time']>
  currentSignInIp: Maybe<string>
  ipLocation: { cityName: Maybe<string>; countryName: Maybe<string> }
  webResource: { url: string; text: string }
}

const SIGN_IN_AT = '2020-04-16T00:00:00+00:00'
const SIGN_IN_AT_FORMATTED = 'Apr 16, 2020 at 3:00 AM'
const IP = '127.0.0.1'
const CITY = 'city name'
const COUNTRY = 'country name'
const TIME_ZONE = 'Europe/Moscow'

const getCompanyRepresentatives = (
  representatives?: Partial<CompanyRepresentativesType>[]
): ClientLastLoginFragment['representatives'] =>
  representatives
    ? {
        nodes: representatives.map(representative => ({
          id: '',
          fullName: '',
          webResource: { text: '', url: '' },
          currentSignInAt: null,
          currentSignInIp: null,
          ipLocation: { cityName: null, countryName: null },
          ...representative
        }))
      }
    : { nodes: [] }

const arrangeTest = (tooltip: ReactNode) => {
  return {
    renderResult: render(<TestWrapper>{tooltip}</TestWrapper>)
  }
}

describe('get company last login', () => {
  it('should handle empty list', () => {
    const result = getCompanyLastLogin(
      {
        nodes: []
      },
      TIME_ZONE
    )

    expect(result).toBeUndefined()
  })

  it('should handle missing sign', () => {
    const representatives = getCompanyRepresentatives([
      {
        currentSignInAt: null,
        currentSignInIp: IP,
        ipLocation: { cityName: CITY, countryName: COUNTRY }
      }
    ])
    const result = getCompanyLastLogin(representatives, TIME_ZONE)

    expect(result).toBeUndefined()
  })

  it('should return only text value', () => {
    const representatives = getCompanyRepresentatives([
      {
        currentSignInAt: SIGN_IN_AT,
        currentSignInIp: null,
        ipLocation: { cityName: null, countryName: null }
      }
    ])
    const result = getCompanyLastLogin(representatives, TIME_ZONE)

    expect(result).toBeTruthy()
    expect(result?.value).toBe(SIGN_IN_AT_FORMATTED)
    expect(result?.tooltip).toBeNull()
  })

  it('should return text value and tooltip', async () => {
    const representatives = getCompanyRepresentatives([
      {
        currentSignInAt: SIGN_IN_AT,
        currentSignInIp: IP,
        ipLocation: { cityName: CITY, countryName: COUNTRY }
      }
    ])
    const result = getCompanyLastLogin(representatives, TIME_ZONE)

    expect(result).toBeTruthy()
    expect(result?.value).toBe(SIGN_IN_AT_FORMATTED)
    expect(result?.tooltip).not.toBeNull()

    if (result?.tooltip) {
      const {
        renderResult: { findByText, getByText }
      } = arrangeTest(result.tooltip)

      // eslint-disable-next-line jest/no-conditional-expect
      expect(await findByText(`${CITY}, ${COUNTRY}`)).toBeInTheDocument()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(getByText(IP)).toBeInTheDocument()
    }
  })

  it('should return value with tooltip, missing IP', async () => {
    const representatives = getCompanyRepresentatives([
      {
        currentSignInAt: SIGN_IN_AT,
        currentSignInIp: null,
        ipLocation: { cityName: CITY, countryName: COUNTRY }
      }
    ])
    const result = getCompanyLastLogin(representatives, TIME_ZONE)

    expect(result).toBeTruthy()
    expect(result?.value).toBe(SIGN_IN_AT_FORMATTED)
    expect(result?.tooltip).not.toBeNull()

    if (result?.tooltip) {
      const {
        renderResult: { findByText, queryByText }
      } = arrangeTest(result.tooltip)

      // eslint-disable-next-line jest/no-conditional-expect
      expect(await findByText(`${CITY}, ${COUNTRY}`)).toBeInTheDocument()

      // eslint-disable-next-line jest/no-conditional-expect
      expect(queryByText('IP')).not.toBeInTheDocument()
    }
  })

  it('should return value with tooltip, missing city', async () => {
    const representatives = getCompanyRepresentatives([
      {
        currentSignInAt: SIGN_IN_AT,
        currentSignInIp: IP,
        ipLocation: { cityName: null, countryName: COUNTRY }
      }
    ])
    const result = getCompanyLastLogin(representatives, TIME_ZONE)

    expect(result).toBeTruthy()
    expect(result?.value).toBe(SIGN_IN_AT_FORMATTED)
    expect(result?.tooltip).not.toBeNull()

    if (result?.tooltip) {
      const {
        renderResult: { findByText, getByText, queryByText }
      } = arrangeTest(result.tooltip)

      // eslint-disable-next-line jest/no-conditional-expect
      expect(await findByText(COUNTRY)).toBeInTheDocument()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(getByText(IP)).toBeInTheDocument()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(queryByText(CITY)).not.toBeInTheDocument()
    }
  })

  it('should return value with tooltip, missing country', async () => {
    const representatives = getCompanyRepresentatives([
      {
        currentSignInAt: SIGN_IN_AT,
        currentSignInIp: IP,
        ipLocation: { cityName: CITY, countryName: null }
      }
    ])
    const result = getCompanyLastLogin(representatives, TIME_ZONE)

    expect(result).toBeTruthy()
    expect(result?.value).toBe(SIGN_IN_AT_FORMATTED)
    expect(result?.tooltip).not.toBeNull()

    if (result?.tooltip) {
      const {
        renderResult: { findByText, getByText, queryByText }
      } = arrangeTest(result.tooltip)

      // eslint-disable-next-line jest/no-conditional-expect
      expect(await findByText(CITY)).toBeInTheDocument()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(getByText(IP)).toBeInTheDocument()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(queryByText(COUNTRY)).not.toBeInTheDocument()
    }
  })

  it('should return value with tooltip, missing city and country', async () => {
    const representatives = getCompanyRepresentatives([
      {
        currentSignInAt: SIGN_IN_AT,
        currentSignInIp: IP,
        ipLocation: { cityName: CITY, countryName: COUNTRY }
      }
    ])
    const result = getCompanyLastLogin(representatives, TIME_ZONE)

    expect(result).toBeTruthy()
    expect(result?.value).toBe(SIGN_IN_AT_FORMATTED)
    expect(result?.tooltip).not.toBeNull()

    if (result?.tooltip) {
      const {
        renderResult: { findByText, queryByText }
      } = arrangeTest(result.tooltip)

      // eslint-disable-next-line jest/no-conditional-expect
      expect(await findByText(IP)).toBeInTheDocument()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(queryByText('Location')).not.toBeInTheDocument()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(queryByText(CITY)).not.toBeInTheDocument()
      // eslint-disable-next-line jest/no-conditional-expect
      expect(queryByText(COUNTRY)).not.toBeInTheDocument()
    }
  })
})
