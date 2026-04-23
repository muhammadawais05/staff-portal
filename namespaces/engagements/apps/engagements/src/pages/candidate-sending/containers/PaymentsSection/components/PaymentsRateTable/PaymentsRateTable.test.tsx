import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form, useForm, useFormState } from '@toptal/picasso-forms'
import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'

import { DetailsStepPaymentsTalentFragment } from '../../../../data/get-details-step-data'
import PaymentsRateTable from './PaymentsRateTable'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: jest.fn(),
  useFormState: jest.fn()
}))

const useFormStateMock = useFormState as jest.Mock
const useFormMock = useForm as jest.Mock

type Props = ComponentProps<typeof PaymentsRateTable>

const defaultValues = {
  rateMethod: EngagementRateMethodEnum.DEFAULT,
  partTimeDiscount: '10.00',
  fullTimeDiscount: '10.00',
  markup: '25'
}

const renderComponent = ({
  values = {},
  props
}: Partial<{
  values: { rateMethod?: EngagementRateMethodEnum | null }
  props?: Props
}> = {}) => {
  useFormMock.mockImplementation(() => ({ change: () => {} }))
  useFormStateMock.mockImplementation(() => ({
    values: {
      ...defaultValues,
      ...values
    }
  }))

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <PaymentsRateTable
          discountMultiplier='0.97'
          talent={{} as DetailsStepPaymentsTalentFragment}
          {...props}
        />
      </Form>
    </TestWrapper>
  )
}

describe('PaymentsRateTable', () => {
  describe('when `canBeDiscounted` is truthy', () => {
    it('renders proper header', () => {
      renderComponent({
        props: { canBeDiscounted: true } as Props
      })

      expect(
        screen.getByText('Company (Credit Card / Paypal)')
      ).toBeInTheDocument()
    })

    it('renders additonal column', () => {
      renderComponent({
        props: { canBeDiscounted: true, discountMultiplier: '0.95' } as Props
      })

      expect(
        screen.getByText('Company (5% off for ACH/Wire)')
      ).toBeInTheDocument()
    })
  })

  describe('when `canBeDiscounted` is falsy', () => {
    it('renders proper header', () => {
      renderComponent({
        props: { canBeDiscounted: false } as Props
      })

      expect(screen.getByText('Company')).toBeInTheDocument()
    })

    it('does not render additional column', () => {
      renderComponent({
        props: { canBeDiscounted: false, discountMultiplier: '0.95' } as Props
      })

      expect(
        screen.queryByText('Company (5% off for ACH/Wire)')
      ).not.toBeInTheDocument()
    })
  })
})
