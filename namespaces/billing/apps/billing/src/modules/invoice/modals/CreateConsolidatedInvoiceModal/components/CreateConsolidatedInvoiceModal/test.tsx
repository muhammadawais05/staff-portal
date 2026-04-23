import React, { ComponentProps } from 'react'
import i18n from '@staff-portal/billing/src/utils/i18n'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CreateConsolidatedInvoiceModal from '.'
import validator from './validator'
import adjustValues from './adjustValues'

jest.mock('../CreateConsolidatedInvoiceModalForm')
jest.mock(
  '../../../../components/InvoiceList/data/getInvoicesToConsolidate.graphql.types',
  () => ({
    useGetInvoicesToConsolidateQuery: jest.fn().mockReturnValue({
      error: null,
      loading: false,
      data: { invoices: { groups: [] } }
    })
  })
)

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: () => [jest.fn()],
  useMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof CreateConsolidatedInvoiceModal>) =>
  renderComponent(<CreateConsolidatedInvoiceModal {...props} />)

describe('CreateConsolidatedInvoiceModal', () => {
  it('default render', () => {
    const { getByTestId } = render({
      options: {
        data: {
          filter: {
            badges: {
              clientIds: ['1234']
            }
          }
        }
      }
    })

    expect(
      getByTestId('CreateConsolidatedInvoiceModalForm')
    ).toBeInTheDocument()
  })
})

describe('#adjustValues', () => {
  it('will parse netTerms to number', () => {
    const invoiceIds = ['1', '2']
    const actual = adjustValues({
      isEverythingSelected: true,
      invoiceIds,
      netTerms: '10'
    })
    const expected = { invoiceIds, netTerms: 10 }

    expect(actual).toEqual(expected)
  })
})

describe('#validator', () => {
  it('will approve form values when more than 2 invoice ids are present', () => {
    const invoiceIds = ['1', '2']
    const actual = validator({ invoiceIds })

    expect(actual).toEqual({})
  })

  it('will return error when less than 2 invoice ids are checked', () => {
    const invoiceIds = ['1']
    const actual = validator({ invoiceIds })
    const expected = {
      'FINAL_FORM/form-error': i18n.t(
        'invoiceList:modals.createConsolidatedInvoice.error.invoices'
      )
    }

    expect(actual).toEqual(expected)
  })
})
