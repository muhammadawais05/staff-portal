import { Form } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingCycleSettingsForm from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (
  props: ComponentProps<typeof BillingCycleSettingsForm>,
  billCycle = 'BI_WEEKLY'
) =>
  renderComponent(
    <Form
      initialValues={{
        billCycle,
        billDay: 'SUNDAY',
        engagementId: 'abc'
      }}
      onSubmit={jest.fn()}
    >
      <BillingCycleSettingsForm {...props} />
    </Form>
  )

describe('BillingCycleSettingsForm', () => {
  describe('when `billCycle` is `SemiMonthly` defined', () => {
    it('default render', () => {
      const { queryByTestId } = render({}, 'SEMI_MONTHLY')

      expect(queryByTestId('billDay')).toBeNull()
    })
  })

  describe('when `billCycle` is `Monthly` defined', () => {
    it('default render', () => {
      const { queryByTestId } = render({}, 'MONTHLY')

      expect(queryByTestId('billDay')).toBeNull()
    })
  })

  describe('when `autoConsolidationEnabled` defined', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        autoConsolidationEnabled: true
      })

      expect(
        queryByTestId('BillingCyclesSettingsForm-auto-consolidation')
      ).toBeInTheDocument()
    })
  })

  describe('when `semiMonthlyPaymentTalentAgreement` defined', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        semiMonthlyPaymentTalentAgreement: true
      })

      expect(
        queryByTestId('BillingCyclesSettingsForm-semi-monthly')
      ).not.toBeInTheDocument()
    })
  })

  describe('when `netTerms` defined', () => {
    it('default render', () => {
      const { queryByTestId } = render({ netTerms: 20 })

      expect(queryByTestId('BillingCyclesSettingsForm-net')).toBeInTheDocument()
    })
  })

  describe('when `currentCycleStartDate` defined', () => {
    it('default render', () => {
      const { queryByTestId } = render({
        currentCycleStartDate: '2015-05-05'
      })

      expect(queryByTestId('currentCycleEndDate')).toBeInTheDocument()
    })
  })
})
