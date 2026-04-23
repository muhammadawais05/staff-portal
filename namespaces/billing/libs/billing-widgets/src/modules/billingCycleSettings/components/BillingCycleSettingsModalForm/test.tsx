import { FinalForm } from '@toptal/picasso-forms'
import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingCycleSettingsModalForm from '.'
import isBillingCycleTooLong from './isBillingCycleTooLong'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (props, billCycle = 'BI_WEEKLY') =>
  renderComponent(
    <FinalForm
      initialValues={{
        billCycle,
        billDay: 'SUNDAY',
        engagementId: 'abc'
      }}
      onSubmit={jest.fn()}
      render={formProps => (
        <BillingCycleSettingsModalForm formProps={formProps} {...props} />
      )}
    />
  )

describe('BillingCycleSettingsModalForm', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })

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
      const { container } = render({
        autoConsolidationEnabled: true
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when `semiMonthlyPaymentTalentAgreement` defined', () => {
    it('default render', () => {
      const { container } = render({
        semiMonthlyPaymentTalentAgreement: true
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when `netTerms` defined', () => {
    it('default render', () => {
      const { container } = render({ netTerms: 20 })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when `currentCycleStartDate` defined', () => {
    it('default render', () => {
      const { container } = render({
        currentCycleStartDate: '2015-05-05'
      })

      expect(container).toMatchSnapshot()
    })
  })
})

describe('#isBillingCycleTooLong', () => {
  describe('when `cycleEndDate` is missing', () => {
    it('return false', () => {
      expect(isBillingCycleTooLong('2015-05-05')).toBe(false)
    })
  })

  describe('when `cycleEndDate` has value', () => {
    describe('when the end date is less than 14 days', () => {
      it('return false', () => {
        expect(isBillingCycleTooLong('2015-05-05', '2015-05-18')).toBe(false)
      })
    })

    describe('when the end date is equal to 14 days', () => {
      it('return true', () => {
        expect(isBillingCycleTooLong('2015-05-05', '2015-05-19')).toBe(true)
      })
    })

    describe('when the end date is more than 14 days', () => {
      it('return true', () => {
        expect(isBillingCycleTooLong('2015-05-05', '2015-05-20')).toBe(true)
      })
    })
  })
})
