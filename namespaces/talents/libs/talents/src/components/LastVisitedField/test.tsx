import React from 'react'
import { screen, render } from '@testing-library/react'
import { assertOnTooltip, TestWrapperWithMocks } from '@staff-portal/test-utils'

import LastVisitedField from './LastVisitedField'

jest.unmock('@staff-portal/current-user')

const anyDatePattern = '\\w{3} \\d{1,2}, \\d{4}'

const arrangeTest = (
  lastVisitedDate: string | null | undefined,
  currentSignInAt: string | null | undefined,
  currentSignInIp: string | null | undefined,
  ipLocation: {
    cityName?: string | null | undefined
    countryName?: string | null | undefined
  }
  // eslint-disable-next-line max-params
) =>
  render(
    <TestWrapperWithMocks>
      <LastVisitedField
        lastVisitedDate={lastVisitedDate}
        currentSignInAt={currentSignInAt}
        currentSignInIp={currentSignInIp}
        ipLocation={ipLocation}
      />
    </TestWrapperWithMocks>
  )

describe('LastVisitedField', () => {
  it('shows engagement rate', async () => {
    const lastVisitedDate = '1999-09-02T08:25:34.550Z'
    const currentSignInAt = '1998-09-02T08:25:34.550Z'
    const currentSignInIp = 'TEST_IP'
    const ipLocation = {
      cityName: 'TEST_CITY_NAME',
      countryName: 'TEST_COUNTRY_NAME'
    }

    arrangeTest(lastVisitedDate, currentSignInAt, currentSignInIp, ipLocation)

    const lastVisitedElement = screen.getByText(new RegExp(anyDatePattern))

    expect(lastVisitedElement).toBeInTheDocument()

    const infoIcon = screen.getByTestId('info-icon')

    assertOnTooltip(infoIcon, tooltip => {
      expect(tooltip).toHaveTextContent(
        new RegExp('Last login: ' + anyDatePattern)
      )

      expect(tooltip).toHaveTextContent(`Last login IP: ${currentSignInIp}`)
      expect(tooltip).toHaveTextContent(
        `Last login location: ${ipLocation.cityName}, ${ipLocation.countryName}`
      )
    })
  })
})
