import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModalContent from '.'
import adjustValues from './adjustValues'

jest.mock('@staff-portal/billing/src/components/AlertModal')
jest.mock('../InvoicePayModalForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('../../data', () => ({
  useCreateTransferInvoiceMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof InvoicePayModalContent>) =>
  renderComponent(<InvoicePayModalContent {...props} />)

describe('InvoicePayModalContent', () => {
  beforeEach(() => {
    MockDate.set('2020-01-01T12:00:00.000+00:00')
  })

  afterEach(() => MockDate.reset())

  describe('when invoice is not yet paid', () => {
    it('renders form', () => {
      const { container } = render({
        invoice: {
          ...fixtures.MockInvoice,
          status: DocumentStatus.PENDING_RECEIPT
        }
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when invoice is already paid', () => {
    it('display message that action is unavailable', () => {
      const { container } = render({
        invoice: {
          ...fixtures.MockInvoice,
          status: DocumentStatus.PAID
        }
      })

      expect(container).toMatchSnapshot()
    })
  })
})

const mockedPayModalFormValues = {
  amount: '1000.00',
  amountCompareKey: '',
  comment: 'test comment',
  discountedAmount: '800.00',
  invoiceId: 'testInvoiceId',
  paymentSource: 'ACH',
  unappliedCashEffectiveDate: '',
  unappliedCashIdFake: '123',
  undiscountedAmount: '1000.00'
}

describe('#adjustValues', () => {
  it('return adjusted payload', () => {
    expect(adjustValues(mockedPayModalFormValues, {})).toEqual({
      amount: '1000.00',
      comment: 'test comment',
      invoiceId: 'testInvoiceId',
      paymentSource: 'ACH'
    })
  })
})
