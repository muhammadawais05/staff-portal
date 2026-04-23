import React, { ComponentProps } from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import fixtures from '../../../../_fixtures'
import ActionsList from '.'
import renderComponent from '../../../../utils/tests'
import { TranslationCode } from './ActionsList'

const render = (props: ComponentProps<typeof ActionsList>) =>
  renderComponent(<ActionsList {...props} />)

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

const mockedInvoiceData = {
  actionItems: invoiceListItemActions,
  documentNumber: fixtures.MockInvoice.documentNumber,
  downloadHtmlUrl: fixtures.MockInvoice.downloadHtmlUrl,
  downloadPdfUrl: fixtures.MockInvoice.downloadPdfUrl,
  handleOnClick: jest.fn(),
  translationCode: 'invoice' as TranslationCode,
  operations: fixtures.MockInvoice.operations,
  webResource: fixtures.MockInvoice.webResource
}

const memorandumActions = [
  'downloadHtmlUrl',
  'downloadPdfUrl',
  'revertInvoicePrepayments',
  'revertCommercialDocumentMemorandum'
]

const mockedMemorandumData = {
  actionItems: memorandumActions,
  documentNumber: fixtures.MockMemorandum.number,
  downloadHtmlUrl: fixtures.MockMemorandum.downloadHtmlUrl,
  downloadPdfUrl: fixtures.MockMemorandum.downloadPdfUrl,
  handleOnClick: jest.fn(),
  translationCode: 'memorandum' as TranslationCode,
  operations: fixtures.MockMemorandum.operations
}

const paymentDetailsActions = [
  'downloadPdfUrl',
  'downloadHtmlUrl',
  'disputeCommercialDocument',
  'resolveDisputeOfCommercialDocument',
  'cancelPayment',
  'addMemorandumToCommercialDocument',
  'applyUnallocatedMemorandumsToCommercialDocument',
  'convertPaymentIntoCreditMemorandum',
  'addDocumentNote',
  'editDocumentNote',
  'updateCommercialDocumentDueDate'
]

const mockedPaymentData = {
  actionItems: paymentDetailsActions,
  documentNumber: fixtures.MockPayment.documentNumber,
  downloadHtmlUrl: fixtures.MockPayment.downloadHtmlUrl,
  downloadPdfUrl: fixtures.MockPayment.downloadPdfUrl,
  handleOnClick: jest.fn(),
  translationCode: 'payment' as TranslationCode,
  operations: fixtures.MockPayment.operations,
  webResource: fixtures.MockPayment.webResource
}

const paymentGroupListItemActions = ['details', 'cancelPaymentGroup']

const mockedPaymentGroupData = {
  actionItems: paymentGroupListItemActions,
  handleOnClick: jest.fn(),
  translationCode: 'paymentGroup' as TranslationCode,
  operations:
    fixtures.MockPaymentGroupList.paymentGroupsNullable.nodes[0].operations
}

jest.mock('../ActionsItem')

describe('ActionList', () => {
  describe('when `Invoice List` items provided', () => {
    it('renders Enabled/Disabled options', () => {
      const { getByTestId, getAllByTestId } = render(mockedInvoiceData)

      expect(getByTestId('ActionsList')).toBeInTheDocument()
      expect(getAllByTestId('ActionsItem')).toHaveLength(12)
      expect(getByTestId('downloadPdfUrl-label')).toContainHTML('PDF')
      expect(getByTestId('downloadHtmlUrl-label')).toContainHTML('HTML')
      expect(getByTestId('updateDispute-label')).toContainHTML('Update dispute')
      expect(getByTestId('disputeCommercialDocument-label')).toContainHTML(
        'Dispute'
      )
      expect(getByTestId('disputeTalentPayments-label')).toContainHTML(
        'Dispute talent payments'
      )
      expect(
        getByTestId('resolveDisputeOfCommercialDocument-label')
      ).toContainHTML('Resolve dispute')
      expect(getByTestId('writeOff-label')).toContainHTML('Write off')
      expect(
        getByTestId('addMemorandumToCommercialDocument-label')
      ).toContainHTML('Add Memorandum')
      expect(getByTestId('applyPrepayments-label')).toContainHTML(
        'Apply Prepayment'
      )
      expect(
        getByTestId('updateCommercialDocumentDueDate-label')
      ).toContainHTML('Update Due Date')
      expect(
        getByTestId('resolveDisputeOfCommercialDocument-label')
      ).toContainHTML('Resolve dispute')
      expect(getByTestId('updateIssueDate-label')).toContainHTML(
        'Update Issue Date'
      )
    })

    it('does not render Hidden options', () => {
      const { queryByTestId } = render(mockedInvoiceData)

      expect(queryByTestId('editDocumentNote-label')).toBeNull()
      expect(queryByTestId('applyPromotions-label')).toBeNull()
      expect(
        queryByTestId('applyUnallocatedMemorandumsToCommercialDocument-label')
      ).toBeNull()
      expect(queryByTestId('collectBadDebtInvoice-label')).toBeNull()
      expect(queryByTestId('recordBadDebt-label')).toBeNull()
    })
  })

  describe('when `Memorandum List` items provided', () => {
    it('renders Enabled/Disabled options', () => {
      const { getByTestId, getAllByTestId } = render(mockedMemorandumData)

      expect(getByTestId('ActionsList')).toBeInTheDocument()
      expect(getAllByTestId('ActionsItem')).toHaveLength(4)
      expect(getByTestId('downloadPdfUrl-label')).toContainHTML('PDF')
      expect(getByTestId('downloadHtmlUrl-label')).toContainHTML('HTML')
      expect(getByTestId('revertInvoicePrepayments-label')).toContainHTML(
        'Revert Prepayment'
      )
      expect(
        getByTestId('revertCommercialDocumentMemorandum-label')
      ).toContainHTML('Revert Memorandum')
    })

    it('does not render Hidden options', () => {
      const { getByTestId, queryByTestId, getAllByTestId } = render({
        ...mockedMemorandumData,
        operations: {
          ...fixtures.MockMemorandum.operations,
          revertCommercialDocumentMemorandum: {
            __typename: 'Operation',
            callable: OperationCallableTypes.HIDDEN,
            messages: []
          }
        }
      })

      expect(getByTestId('ActionsList')).toBeInTheDocument()
      expect(getAllByTestId('ActionsItem')).toHaveLength(3)

      expect(queryByTestId('revertRoleMemorandum-label')).toBeNull()
    })
  })

  describe('when `Payment List` items provided', () => {
    it('renders Enabled/Disabled options', () => {
      const { getByTestId, getAllByTestId } = render(mockedPaymentData)

      expect(getByTestId('ActionsList')).toBeInTheDocument()
      expect(getAllByTestId('ActionsItem')).toHaveLength(5)
      expect(getByTestId('downloadPdfUrl-label')).toContainHTML('PDF')
      expect(getByTestId('downloadHtmlUrl-label')).toContainHTML('HTML')
      expect(
        getByTestId('addMemorandumToCommercialDocument-label')
      ).toContainHTML('Add Memorandum')

      expect(getByTestId('editDocumentNote-label')).toContainHTML('Update Note')
    })

    it('does not render Hidden options', () => {
      const { getByTestId, queryByTestId, getAllByTestId } = render({
        ...mockedPaymentData,
        operations: {
          ...fixtures.MockPayment.operations,
          addMemorandumToCommercialDocument: {
            callable: OperationCallableTypes.HIDDEN,
            messages: []
          }
        }
      })

      expect(getByTestId('ActionsList')).toBeInTheDocument()
      expect(getAllByTestId('ActionsItem')).toHaveLength(4)

      expect(
        queryByTestId('addMemorandumToCommercialDocument-label')
      ).toBeNull()
    })
  })

  describe('when `Payment groups List` items provided', () => {
    it('renders Enabled/Disabled options', () => {
      const { queryByTestId, getByTestId, getAllByTestId } = render(
        mockedPaymentGroupData
      )

      expect(getByTestId('ActionsList')).toBeInTheDocument()
      expect(getAllByTestId('ActionsItem')).toHaveLength(2)
      expect(queryByTestId('downloadPdfUrl-label')).toBeNull()
      expect(queryByTestId('downloadHtmlUrl-label')).toBeNull()
      expect(getByTestId('cancelPaymentGroup-label')).toContainHTML(
        'Cancel Payment'
      )

      expect(getByTestId('details-label')).toContainHTML('Details')
    })

    it('does not render Hidden options', () => {
      const { getByTestId, queryByTestId, getAllByTestId } = render({
        ...mockedPaymentData,
        operations: {
          ...fixtures.MockPaymentGroupList.paymentGroupsNullable.nodes[0]
            .operations,
          cancelPaymentGroup: {
            callable: OperationCallableTypes.HIDDEN,
            messages: []
          }
        }
      })

      expect(getByTestId('ActionsList')).toBeInTheDocument()
      expect(getAllByTestId('ActionsItem')).toHaveLength(11)

      expect(queryByTestId('cancelPaymentGroup-label')).toBeNull()
    })
  })
})
