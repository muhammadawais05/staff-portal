import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import userEvent from '@testing-library/user-event'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import CompanyRateField from './CompanyRateField'
import { ApproveCommitmentChangeRequestFormValues } from '../ApproveCommitmentChangeRequestForm/types'

const arrangeTest = ({
  commitment,
  initialValues
}: Partial<
  ComponentProps<typeof CompanyRateField> & {
    initialValues: Partial<ApproveCommitmentChangeRequestFormValues>
  }
> = {}) =>
  render(
    <TestWrapper>
      <Form initialValues={initialValues} onSubmit={() => {}}>
        <CompanyRateField commitment={commitment} />
      </Form>
    </TestWrapper>
  )

describe('CompanyRateField', () => {
  describe('when there is no commitment', () => {
    it('renders nothing', async () => {
      arrangeTest()

      expect(
        screen.queryByTestId('CompanyRateField-rate')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is FULL_TIME commitment', () => {
    it('renders proper company label and rates', async () => {
      arrangeTest({
        commitment: EngagementCommitmentEnum.FULL_TIME,
        initialValues: { companyRate: '1000' }
      })

      expect(screen.getByTestId('CompanyRateField-rate')).toBeInTheDocument()
      expect(
        screen.getByText('How Much Will You Be Charging the Company Per Week?')
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'Companies that pay with ACH or Wire will receive a 3% discount and pay $970.00. Companies that pay via Credit Card or PayPal will pay the full amount of $1000.00.'
        )
      ).toBeInTheDocument()
    })
  })

  describe('when we change input intial value', () => {
    it('updates discounted text', async () => {
      arrangeTest({
        commitment: EngagementCommitmentEnum.PART_TIME,
        initialValues: { companyRate: '1000' }
      })

      expect(screen.getByTestId('CompanyRateField-rate')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Companies that pay with ACH or Wire will receive a 3% discount and pay $970.00. Companies that pay via Credit Card or PayPal will pay the full amount of $1000.00.'
        )
      ).toBeInTheDocument()

      const labelText =
        /How Much Will You Be Charging the Company Part-Time Per Week?/

      userEvent.clear(screen.getByLabelText(labelText))
      userEvent.type(screen.getByLabelText(labelText), '500')

      expect(
        screen.getByText(
          'Companies that pay with ACH or Wire will receive a 3% discount and pay $485.00. Companies that pay via Credit Card or PayPal will pay the full amount of $500.00.'
        )
      ).toBeInTheDocument()
    })
  })
})
