import { FORM_ERROR } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import i18n from '@staff-portal/billing/src/utils/i18n'

import InvoiceApplyPrepaymentsModal from '.'
import validator from './validator'
import { useGetInvoiceForPrepaymentQuery } from './data/getInvoiceForPrepayment.graphql.types'

jest.mock('./components/ApplyPrepaymentsModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const MockUseGetInvoiceForPrepaymentQuery =
  useGetInvoiceForPrepaymentQuery as jest.Mock

jest.mock('./data/getInvoiceForPrepayment.graphql.types', () => ({
  useGetInvoiceForPrepaymentQuery: jest.fn()
}))

jest.mock('./data/setApplyPrepaymentsInvoice.graphql.types', () => {
  return {
    ...jest.requireActual('./data/setApplyPrepaymentsInvoice.graphql.types'),
    useSetApplyPrepaymentsMutation: jest.fn(() => [
      'useSetApplyPrepaymentsMutation'
    ])
  }
})

const render = (props: ComponentProps<typeof InvoiceApplyPrepaymentsModal>) =>
  renderComponent(<InvoiceApplyPrepaymentsModal {...props} />)

describe('InvoiceApplyPrepaymentsModal', () => {
  it('default render', () => {
    MockUseGetInvoiceForPrepaymentQuery.mockReturnValue({
      error: null,
      loading: false,
      data: {
        node: {
          ...fixtures.MockInvoice,
          status: 'OVERDUE',
          subjectObject: {
            ...fixtures.MockClient,
            availablePrepaymentBalance: '1500.00'
          }
        }
      }
    })

    const { getByTestId } = render({
      options: { nodeId: fixtures.MockInvoice.id }
    })

    expect(getByTestId('InvoiceApplyPrepaymentsModalForm')).toContainHTML(
      '"documentNumber":377249'
    )
  })

  it('insufficient prepayment balance renders an alert modal', () => {
    MockUseGetInvoiceForPrepaymentQuery.mockReturnValue({
      error: null,
      loading: false,
      data: {
        node: {
          ...fixtures.MockInvoice,
          subjectObject: {
            ...fixtures.MockClient,
            availablePrepaymentBalance: '0.0'
          }
        }
      }
    })

    const { getByTestId } = render({
      options: { nodeId: fixtures.MockInvoice.id }
    })

    expect(getByTestId('AlertModal-text')).toContainHTML(
      'The user has no prepayments available.'
    )
  })
})

describe('#validator', () => {
  describe('when amount entered is zero or less', () => {
    it('return proper `FormError`', () => {
      const availablePrepaymentBalance = '1500.00'
      const zero = '0.00'
      const minusOne = '-1.00'
      const errorResult = {
        [FORM_ERROR]: i18n.t('common:validation.positive')
      }

      expect(validator(availablePrepaymentBalance)({ amount: zero })).toEqual(
        errorResult
      )

      expect(
        validator(availablePrepaymentBalance)({ amount: minusOne })
      ).toEqual(errorResult)
    })
  })

  describe('when amount entered is more than availablePrepaymentBalance', () => {
    it('renders decorated amount in the error', () => {
      const availablePrepaymentBalance = '1500.00'
      const amount = '1600.00'

      expect(validator(availablePrepaymentBalance)({ amount })).toEqual({
        'FINAL_FORM/form-error': 'The value cannot be greater than $1,500.00'
      })
    })
  })

  describe('when amount entered is in valid range', () => {
    it('return and empty object', () => {
      const availablePrepaymentBalance = '1500.00'
      const amount = '1400.00'

      expect(validator(availablePrepaymentBalance)({ amount })).toEqual({})
    })
  })
})
