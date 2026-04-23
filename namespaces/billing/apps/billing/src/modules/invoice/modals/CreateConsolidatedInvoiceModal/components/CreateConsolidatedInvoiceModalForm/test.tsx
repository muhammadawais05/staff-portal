import { Form } from '@toptal/picasso-forms'
import { times } from 'lodash-es'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CreateConsolidatedInvoiceModalForm, {
  buildNetTermsOptions
} from './CreateConsolidatedInvoiceModalForm'

jest.mock('../../../../components/InvoiceList')

const createInvoice = (id: number) => ({
  ...fixtures.MockInvoice,
  id: id.toString()
})
const invoices = times(2, createInvoice)

const render = (
  props: ComponentProps<typeof CreateConsolidatedInvoiceModalForm>
) =>
  renderComponent(
    <Form onSubmit={jest.fn()}>
      <CreateConsolidatedInvoiceModalForm
        invoices={invoices}
        availableBillingTerms={{
          availableNetTerms: [0, 10, 20],
          netTerms: 0
        }}
        {...props}
      />
    </Form>
  )

describe('CreateConsolidatedInvoiceModalForm', () => {
  it('default render', () => {
    const { getByTestId, queryByTestId, getByText } = render({})

    expect(getByTestId('modal-title')).toHaveTextContent(
      'Create consolidated invoice'
    )
    expect(
      getByTestId('CreateConsolidatedInvoiceModalForm-net-terms')
    ).toHaveTextContent('Billing Terms')
    expect(
      getByTestId('CreateConsolidatedInvoiceModalForm-notification')
    ).toHaveTextContent('Send Email Notification to Client')
    expect(getByTestId('ModalFooter')).toBeInTheDocument()
    expect(getByTestId('cancel')).toHaveTextContent('Close')
    expect(getByTestId('submit')).toHaveTextContent(
      'Create Consolidated Invoice'
    )
    expect(getByTestId('InvoiceList')).toBeInTheDocument()
    expect(getByTestId('InvoiceList-invoices')).toHaveTextContent('2')
    expect(getByTestId('InvoiceList-selectionEnabled')).toHaveTextContent(
      'true'
    )
    expect(
      queryByTestId('CreateConsolidatedInvoiceModalForm-pending-memo-warning')
    ).not.toBeInTheDocument()
    expect(getByText('Create consolidated invoice')).toBeInTheDocument()
    expect(
      queryByTestId('ClientMultiSelector-container')
    ).not.toBeInTheDocument()
  })

  it('shows the warning when there are invoices with a pending issue memo task and disables the submit button', () => {
    const pendingMemoTaskInvoice = {
      ...fixtures.MockInvoice,
      relatedTasks: {
        nodes: [
          {
            status: 'pending'
          }
        ]
      }
    }

    const { getByTestId, queryByTestId } = render({
      invoices: [pendingMemoTaskInvoice]
    })

    expect(
      getByTestId('CreateConsolidatedInvoiceModalForm-pending-memo-warning')
    ).toBeInTheDocument()
    expect(
      queryByTestId('CreateConsolidatedInvoiceModalForm-subtitle')
    ).not.toBeInTheDocument()
    expect(getByTestId('submit')).toBeDisabled()
  })
  describe('When modal includes clients', () => {
    it('renders the MultiClientSelector field', () => {
      const { queryByTestId } = render({
        clients: [
          {
            fullName: 'Some name',
            id: '1'
          }
        ]
      })

      expect(queryByTestId('ClientMultiSelector-container')).toBeInTheDocument()
    })
  })
})

describe('#buildNetTermsOptions', () => {
  it('returns the net terms for the dropdown', () => {
    const actual = buildNetTermsOptions([10, 15])
    const expected = [
      {
        value: 10,
        text: 'Net 10'
      },
      {
        value: 15,
        text: 'Net 15'
      }
    ]

    expect(actual).toEqual(expected)
  })

  it('will resolve `0 net value` to upon receipt case', () => {
    const actual = buildNetTermsOptions([0, 10, 15])
    const expected = [
      {
        value: 0,
        text: 'Upon receipt'
      },
      {
        value: 10,
        text: 'Net 10'
      },
      {
        value: 15,
        text: 'Net 15'
      }
    ]

    expect(actual).toEqual(expected)
  })
})
