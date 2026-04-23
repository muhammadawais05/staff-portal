import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  CommitmentRateAvailability,
  BillingMethodName
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import CompanyRateField, {
  Props as CompanyRateFieldProps
} from './CompanyRateField'
import { getTooltipData } from './utils'
import GenericRateField from '../GenericRateField'

jest.mock('./utils', () => ({
  getTooltipData: jest.fn()
}))

jest.mock('../GenericRateField', () => jest.fn())

const GenericRateFieldMock = GenericRateField as unknown as jest.Mock

const defaultProps: CompanyRateFieldProps = {
  rate: {
    value: '10.00',
    availability: CommitmentRateAvailability.WEEK
  },
  discountMultiplier: '0.95',
  canBeDiscounted: false,
  client: undefined
}

const arrangeTest = (props?: Partial<CompanyRateFieldProps>) => {
  return render(
    <TestWrapper>
      <CompanyRateField {...defaultProps} {...props} />
    </TestWrapper>
  )
}

describe('CompanyRateField', () => {
  beforeEach(() => {
    GenericRateFieldMock.mockImplementation(() => null)
  })

  it('renders correctly', () => {
    arrangeTest()

    expect(screen.getByTestId('CompanyRateField')).toBeInTheDocument()
    expect(getTooltipData).toHaveBeenCalledWith(
      expect.objectContaining({
        ...defaultProps
      })
    )
    expect(GenericRateFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        rate: defaultProps.rate,
        color: undefined,
        withHourlyRate: false
      }),
      {}
    )
  })

  it('renders discountable in red color', () => {
    const props = {
      ...defaultProps,
      client: {
        preferredBillingOption: {
          billingMethod: BillingMethodName.ACH,
          discountable: false
        }
      },
      canBeDiscounted: true
    }

    arrangeTest(props)

    expect(screen.getByTestId('CompanyRateField')).toBeInTheDocument()
    expect(getTooltipData).toHaveBeenCalledWith(
      expect.objectContaining({
        ...props
      })
    )
    expect(GenericRateFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        rate: props.rate,
        color: 'red',
        withHourlyRate: false
      }),
      {}
    )
  })

  describe('when `rate` prop is `undefined`', () => {
    it('does not render component', () => {
      arrangeTest({ rate: undefined })

      expect(screen.queryByTestId('CompanyRateField')).not.toBeInTheDocument()
    })
  })
})
