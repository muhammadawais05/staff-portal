import React from 'react'
import { pick } from 'lodash-es'

import fixtures from '../../_fixtures'
import { useGetData } from '../../utils/graphql'
import OperationFetcherForActions from '.'
import renderComponent from '../../utils/tests'

jest.mock('../Actions')
jest.mock('./SkeletonActions', () =>
  jest.fn().mockImplementation(() => <div data-testid='SkeletonActions' />)
)

jest.mock('../../utils/graphql')
jest.mock('./data/getOperations.graphql.types')

const invoiceListItemActions = [
  'details',
  'downloadPdfUrl',
  'downloadHtmlUrl',
  'updateDispute',
  'disputeCommercialDocument',
  'disputeTalentPayments',
  'resolveDisputeOfCommercialDocument',
  'recordBadDebt',
  'writeOff',
  'addMemorandumToCommercialDocument',
  'applyUnallocatedMemorandumsToCommercialDocument',
  'applyPrepayments',
  'updateCommercialDocumentDueDate',
  'updateIssueDate'
]

const render = () =>
  renderComponent(
    <OperationFetcherForActions
      id={fixtures.MockInvoice.id}
      actionItems={invoiceListItemActions}
      handleOnClick={jest.fn()}
    />
  )

const mockGetData = useGetData as jest.Mock

describe('OperationFetcherForActions', () => {
  describe('when its loading', () => {
    it('render component', () => {
      mockGetData.mockReturnValue(() => ({
        data: undefined,
        error: undefined,
        loading: true
      }))

      const { getByTestId } = render()

      expect(getByTestId('SkeletonActions')).toBeInTheDocument()
    })
  })

  describe('when its loaded', () => {
    it('render component', () => {
      mockGetData.mockReturnValue(() => ({
        data: pick(fixtures.MockInvoice, [
          'id',
          'downloadHtmlUrl',
          'downloadPdfUrl',
          'documentNumber',
          'operations',
          'webResource'
        ]),
        error: undefined,
        loading: false
      }))

      const { getByTestId } = render()

      expect(getByTestId('Actions')).toBeInTheDocument()
      expect(getByTestId('Actions-operations')).toBeInTheDocument()
    })
  })
})
