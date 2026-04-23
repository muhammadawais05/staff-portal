import React, { ComponentProps } from 'react'
import { InvoiceKind } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import i18n from '@staff-portal/billing/src/utils/i18n'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AllocatedDocumentLinks from '.'

const defaultProps = { memorandums: fixtures.MockMemorandum }

const render = (props: ComponentProps<typeof AllocatedDocumentLinks>) =>
  renderComponent(<AllocatedDocumentLinks {...defaultProps} {...props} />)

describe('AllocatedDocumentLinks', () => {
  describe('when memorandum is not allocated', () => {
    it('renders only a "long dash" character', () => {
      const { container } = render({
        memorandum: {
          ...fixtures.MockMemorandum,
          document: undefined
        }
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when memorandum is allocated to current invoice', () => {
    it('renders link to current invoice with "current" annotation', () => {
      const { queryByText } = render({
        memorandum: {
          ...fixtures.MockMemorandum,
          document: fixtures.MockInvoice
        },
        commercialDocumentId: fixtures.MockInvoice.id
      })

      expect(
        queryByText(i18n.t('memorandum:associated.table.row.current'))
      ).toBeInTheDocument()
    })
  })

  describe('when memorandum is allocated to another invoice only', () => {
    it('renders link to invoice without "current" annotation', () => {
      const { container } = render({
        memorandum: {
          ...fixtures.MockMemorandum,
          document: {
            ...fixtures.MockMemorandum.document,
            id: 'some-other-invoice'
          }
        }
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when memorandum is allocated to multiple invoices', () => {
    it('renders list of links to all invoices', () => {
      const { container } = render({
        memorandum: {
          ...fixtures.MockMemorandum,
          portions: [
            {
              __typename: 'Memorandum',
              document: {
                __typename: 'Invoice',
                documentNumber: 377249,
                id: 'VjEtSW52b2ljZS0zNzcyNDk',
                invoiceKind: 'COMPANY_BILL',
                webResource: {
                  __typename: 'Link',
                  text: 'Invoice #377249',
                  url: 'http://localhost:3000/platform/staff/invoices/377249'
                }
              },
              id: 'VjEtTWVtb3JhbmR1bS0xMTI1NDg',
              number: 112548,
              operations: {
                __typename: 'MemorandumOperations',
                revertInvoicePrepayments: {
                  __typename: 'Operation',
                  callable: 'HIDDEN',
                  messages: []
                },
                revertCommercialDocumentMemorandum: {
                  __typename: 'Operation',
                  callable: 'ENABLED',
                  messages: []
                }
              }
            },
            {
              __typename: 'Memorandum',
              document: {
                __typename: 'Invoice',
                documentNumber: 315924,
                id: 'VjEtSW52b2ljZS0zMTU5MjQ',
                invoiceKind: 'COMPANY_BILL',
                webResource: {
                  __typename: 'Link',
                  text: 'Invoice #315924',
                  url: 'http://localhost:3000/platform/staff/invoices/315924'
                }
              },
              id: 'VjEtTWVtb3JhbmR1bS0xMTMyMjI',
              number: 113222,
              operations: {
                __typename: 'MemorandumOperations',
                revertInvoicePrepayments: {
                  __typename: 'Operation',
                  callable: 'HIDDEN',
                  messages: []
                },
                revertCommercialDocumentMemorandum: {
                  __typename: 'Operation',
                  callable: 'ENABLED',
                  messages: []
                }
              }
            }
          ]
        }
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when memorandum is allocated to a consolidated invoice', () => {
    it('renders link to invoice with "consolidated" annotation', () => {
      const { queryByText } = render({
        memorandum: {
          ...fixtures.MockMemorandum,
          document: {
            ...fixtures.MockMemorandum.document,
            invoiceKind: InvoiceKind.CONSOLIDATED
          }
        }
      })

      expect(
        queryByText(i18n.t('memorandum:associated.table.row.consolidated'))
      ).toBeInTheDocument()
    })
  })
})
