import React from 'react'
import {
  render,
  getByRole,
  screen,
  fireEvent
} from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'

import { BooleanAsString } from '../../types'
import BudgetDetails from './BudgetDetails'

type FormValues = {
  maximumTalentHourlyRate?: string
  noTalentHourlyRateLimit?: boolean
  canShareRate?: BooleanAsString
  canShareRateComment?: string
  canIncreaseRate?: BooleanAsString
  canIncreaseRateComment?: string
}

const arrangeTest = (formValues?: FormValues) =>
  render(
    <Form onSubmit={jest.fn()} initialValues={formValues}>
      <BudgetDetails />
    </Form>
  )

describe('BudgetDetails', () => {
  it('renders fields without initial values', () => {
    arrangeTest()

    expect(screen.getByText('Budget Details')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Maximum Talent Hourly Rate')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('No Rate Limit')).toBeInTheDocument()

    expect(screen.getByTestId('can-share-rate-radio-group')).toHaveTextContent(
      'Can this rate be shared with the talent?'
    )
    expect(
      screen.getByRole('textbox', { name: 'canShareRateComment' })
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('can-increase-rate-radio-group')
    ).toHaveTextContent('Can this rate be increased for the right talent?')
    expect(
      screen.getByRole('textbox', { name: 'canIncreaseRateComment' })
    ).toBeInTheDocument()
  })

  it('renders fields with initial values', () => {
    arrangeTest({
      maximumTalentHourlyRate: '40.5',
      noTalentHourlyRateLimit: false,
      canShareRate: BooleanAsString.FALSE,
      canShareRateComment: 'Do not share rate',
      canIncreaseRate: BooleanAsString.TRUE,
      canIncreaseRateComment: 'Can negotiate'
    })

    expect(screen.getByLabelText('Maximum Talent Hourly Rate')).toHaveValue(
      '40.5'
    )
    expect(screen.getByLabelText('No Rate Limit')).not.toBeChecked()

    const canShareRateGroup = screen.getByTestId('can-share-rate-radio-group')

    expect(getByRole(canShareRateGroup, 'radio', { name: 'No' })).toBeChecked()
    expect(
      screen.getByRole('textbox', { name: 'canShareRateComment' })
    ).toHaveValue('Do not share rate')

    const canIncreaseRateGroup = screen.getByTestId(
      'can-increase-rate-radio-group'
    )

    expect(
      getByRole(canIncreaseRateGroup, 'radio', { name: 'Yes' })
    ).toBeChecked()
    expect(
      screen.getByRole('textbox', { name: 'canIncreaseRateComment' })
    ).toHaveValue('Can negotiate')
  })

  it('disables maximumTalentHourlyRate field if noTalentHourlyRateLimit is true', () => {
    arrangeTest({
      maximumTalentHourlyRate: '40.5',
      noTalentHourlyRateLimit: true
    })

    // Use Regex to find the input because for some reason, the label has `(optional)` added in test.
    expect(screen.getByLabelText(/Maximum Talent Hourly Rate/)).toBeDisabled()
    expect(screen.getByLabelText('No Rate Limit')).toBeChecked()
  })

  it('disables maximumTalentHourlyRate field when noTalentHourlyRateLimit is checked', () => {
    arrangeTest({
      maximumTalentHourlyRate: '40.5',
      noTalentHourlyRateLimit: false
    })

    expect(screen.getByLabelText('Maximum Talent Hourly Rate')).toHaveValue(
      '40.5'
    )
    expect(
      screen.getByLabelText('Maximum Talent Hourly Rate')
    ).not.toBeDisabled()
    expect(screen.getByLabelText('No Rate Limit')).not.toBeChecked()

    fireEvent.click(screen.getByLabelText('No Rate Limit'))

    // Use Regex to find the input because for some reason, the label has `(optional)` added in test.
    expect(screen.getByLabelText(/Maximum Talent Hourly Rate/)).toBeDisabled()
    expect(screen.getByLabelText('No Rate Limit')).toBeChecked()
  })
})
