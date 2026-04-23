import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { CommitmentRateAvailability } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import GenericRateField, {
  Props as GenericRateFieldProps
} from './GenericRateField'

const arrangeTest = (props: GenericRateFieldProps) =>
  render(
    <TestWrapper>
      <GenericRateField {...props} />
    </TestWrapper>
  )

describe('GenericRateField', () => {
  it('shows only rate with hour suffix', () => {
    arrangeTest({
      rate: { availability: CommitmentRateAvailability.HOUR, value: '12.45' }
    })

    expect(screen.getByText('$12.45/hour')).toBeInTheDocument()
  })

  it('shows rate & hourlyRate', () => {
    arrangeTest({
      rate: {
        availability: CommitmentRateAvailability.WEEK,
        value: '11.00',
        hourlyHint: {
          value: '2.50'
        }
      },
      withHourlyRate: true
    })

    expect(screen.getByText('$11.00/week')).toBeInTheDocument()
    expect(screen.getByText('($2.50/hour)')).toBeInTheDocument()
  })

  describe('when `rate` prop is `undefined`', () => {
    it('does not render component', () => {
      arrangeTest({ rate: undefined })

      expect(screen.queryByTestId('generic-rate-field')).not.toBeInTheDocument()
    })
  })
})
