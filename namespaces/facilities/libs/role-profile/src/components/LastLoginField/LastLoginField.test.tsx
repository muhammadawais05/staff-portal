import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { joinTruthy } from '@staff-portal/utils'

import LastLoginField, { Props } from './LastLoginField'

jest.mock('@staff-portal/utils', () => ({
  joinTruthy: jest.fn(() => null)
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <LastLoginField {...props} />
    </TestWrapper>
  )

describe('LastLoginField', () => {
  it('returns null when there is no date', () => {
    arrangeTest({ dateTime: '', ipLocation: {} })

    expect(screen.queryByTestId('last-login-field')).not.toBeInTheDocument()
  })

  it('displays the date', () => {
    arrangeTest({
      dateTime: 'abc',
      ipLocation: { cityName: 'city', countryName: 'country' }
    })

    expect(screen.getByTestId('last-login-field')).toHaveTextContent('abc')
    expect(joinTruthy).toHaveBeenCalledWith(['city', 'country'])
  })
})
