import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Amount } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import AnnualRevenueViewer from './AnnualRevenueViewer'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Amount: jest.fn()
}))

const AmountMock = Amount as unknown as jest.Mock

const renderComponent = (props: ComponentProps<typeof AnnualRevenueViewer>) =>
  render(
    <TestWrapper>
      <AnnualRevenueViewer {...props} />
    </TestWrapper>
  )

describe('AnnualRevenueViewer', () => {
  beforeEach(() => {
    AmountMock.mockReturnValue(null)
  })

  describe('when has data', () => {
    it.each(['1', '-1', '0'])('renders a formatted value for %p', value => {
      renderComponent({ value })

      expect(AmountMock).toHaveBeenCalledTimes(1)
      expect(AmountMock).toHaveBeenCalledWith(
        { amount: value, weight: 'semibold' },
        {}
      )
    })
  })

  describe('when has no data', () => {
    it.each(['', null, undefined])('renders dash for %p', value => {
      renderComponent({ value })

      expect(AmountMock).toHaveBeenCalledTimes(0)
      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })
})
