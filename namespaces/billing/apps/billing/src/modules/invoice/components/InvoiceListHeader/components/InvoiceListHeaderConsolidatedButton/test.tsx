import React from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useInvoiceListContext } from '../../../../contexts/invoiceListContext'
import InvoiceListHeaderConsolidatedButton from './InvoiceListHeaderConsolidatedButton'

jest.mock('@staff-portal/billing/src/utils/graphql')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('../../../../contexts/invoiceListContext')

const render = () => renderComponent(<InvoiceListHeaderConsolidatedButton />)

const returnData = {
  data: {
    operations: {
      __typename: 'InvoicesConnectionOperations',
      consolidateInvoices: {
        __typename: 'Operation',
        callable: 'ENABLED',
        messages: []
      }
    }
  },
  loading: false,
  initialLoading: true
}

describe('InvoiceListHeaderConsolidatedButton', () => {
  const mockedGetData = useGetData as jest.Mock
  const mockedQuery = jest.fn()

  beforeEach(() => {
    mockedGetData.mockImplementation(() => (vars: unknown) => {
      mockedQuery(vars)

      return returnData
    })
  })

  describe.each([
    DocumentStatus.OUTSTANDING,
    DocumentStatus.PENDING_RECEIPT,
    DocumentStatus.OVERDUE,
    DocumentStatus.DRAFT
  ])('when %s status is present in the filter', status => {
    beforeEach(() => {
      ;(useInvoiceListContext as jest.Mock).mockReturnValue({
        filter: {
          statuses: [status]
        }
      })
    })
    it('passes for_consolidation to the query', () => {
      render()

      expect(mockedQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          filter: {
            forConsolidation: true,
            statuses: [status]
          }
        })
      )
      mockedQuery.mockReset()
    })
  })

  describe('when statuses are not present in the filter', () => {
    it('does not pass for_consolidation to the query', () => {
      ;(useInvoiceListContext as jest.Mock).mockReturnValue({
        filter: {}
      })
      render()

      expect(mockedQuery).toHaveBeenCalledWith(
        expect.objectContaining({
          filter: {
            forConsolidation: undefined
          }
        })
      )
    })
  })
})
