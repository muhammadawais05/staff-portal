import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form, useFormState } from '@toptal/picasso-forms'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import { DetailsStepPaymentsTalentFragment } from '../../../../data/get-details-step-data'
import { CandidateSendingDetailsStepAttributes } from '../../../../types'
import PaymentsRateTableRow from './PaymentsRateTableRow'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useFormState: jest.fn()
}))

jest.mock('../PaymentsRateTableHourlyTooltip', () => ({
  __esModule: true,
  default: () => <div data-testid='payments-rate-table-hourly-tooltip' />
}))

const useFormStateMock = useFormState as jest.Mock

type Props = ComponentProps<typeof PaymentsRateTableRow>

const renderComponent = ({
  values = {},
  props
}: Partial<{
  values: CandidateSendingDetailsStepAttributes
  props?: Props
}> = {}) => {
  useFormStateMock.mockImplementation(() => ({ values }))

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <table>
          <tbody>
            <PaymentsRateTableRow
              type={EngagementCommitmentEnum.HOURLY}
              discountMultiplier='0.97'
              talent={{} as DetailsStepPaymentsTalentFragment}
              {...props}
            />
          </tbody>
        </table>
      </Form>
    </TestWrapper>
  )
}

describe('PaymentsRateTableRow', () => {
  describe('when `type` does not equal `HOURLY`', () => {
    it('does not render tooltip', () => {
      renderComponent({
        props: { type: EngagementCommitmentEnum.FULL_TIME } as Props
      })

      expect(
        screen.queryByTestId('payments-rate-table-hourly-tooltip')
      ).not.toBeInTheDocument()
    })

    it('renders discount field', () => {
      renderComponent({
        props: { type: EngagementCommitmentEnum.FULL_TIME } as Props
      })

      expect(
        screen.getByTestId('payments-rate-table-row-discount-field')
      ).toBeInTheDocument()
    })
  })

  describe('when `type` equals `HOURLY`', () => {
    it('renders tooltip', () => {
      renderComponent({
        props: { type: EngagementCommitmentEnum.HOURLY } as Props
      })

      expect(
        screen.getByTestId('payments-rate-table-hourly-tooltip')
      ).toBeInTheDocument()
    })

    it('does not render discount field', () => {
      renderComponent({
        props: { type: EngagementCommitmentEnum.HOURLY } as Props
      })

      expect(
        screen.queryByTestId('payments-rate-table-row-discount-field')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `canBeDiscounted` is truthy', () => {
    it('renders discounted value', () => {
      renderComponent({
        props: {
          canBeDiscounted: true,
          type: EngagementCommitmentEnum.FULL_TIME
        } as Props,
        values: {
          companyFullTimeRate: '100.00',
          talentFullTimeRate: '80.00',
          fullTimeDiscount: '10'
        }
      })

      expect(
        screen.getByTestId('payments-rate-table-row-discounted-value')
      ).toHaveTextContent('$97.00')
    })
  })

  describe('when `canBeDiscounted` is falsy', () => {
    it('does not discounted value', () => {
      renderComponent({
        props: { canBeDiscounted: false } as Props
      })

      expect(
        screen.queryByTestId('payments-rate-table-row-discounted-value')
      ).not.toBeInTheDocument()
    })
  })
})
