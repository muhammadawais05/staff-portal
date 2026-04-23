import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceDetailsPageHeader from '.'
import { useGetInvoiceDetailsHeader } from '../../data'
import DetailsHeader from '../../../../../commercialDocument/components/DetailsHeader'

jest.mock('@staff-portal/billing/src/components/InlineActionsSkeleton')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/components/Actions')
jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnOpenModalWithUrlSearch: jest.fn()
  })
}))
jest.mock('../../../../utils/useActionsInvoice', () => ({
  useActionsInvoice: () => ({
    handleOnApplyPromotions: jest.fn()
  })
}))
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('../../../../../commercialDocument/components/DetailsHeader')

const render = () =>
  renderComponent(
    <InvoiceDetailsPageHeader invoiceId={fixtures.MockInvoice.id} />
  )

const mockGetInvoiceDetailsHeader = useGetInvoiceDetailsHeader as jest.Mock
const DetailsHeaderMock = DetailsHeader as jest.Mock

describe('InvoiceDetailsPageHeader', () => {
  describe('when `loading` is `false`', () => {
    beforeEach(() => {
      mockGetInvoiceDetailsHeader.mockReturnValue({
        data: fixtures.MockInvoice,
        loading: false
      })
    })

    it('default render', () => {
      const { getByTestId } = render()

      expect(getByTestId('add-payment')).toHaveTextContent('Add Payment')
      expect(getByTestId('Tooltip-content')).toHaveTextContent(
        'You cannot add payment to the original invoice (pay consolidated invoice instead).'
      )
      expect(getByTestId('Actions-operations')).toHaveTextContent(
        'You cannot download an original invoice'
      )

      expect(getByTestId('DetailsHeader-isDisabled')).toContainHTML('false')
      expect(DetailsHeaderMock).toHaveBeenCalledWith(
        expect.objectContaining({ renderRecentActivityButton: true }),
        {}
      )
      expect(getByTestId('Actions-operations')).toBeInTheDocument()
      expect(getByTestId('Actions-downloadPdfUrl')).toContainHTML(
        'http://localhost:3000/platform/staff/invoices/430334/download.pdf'
      )
      expect(getByTestId('Actions-downloadHtmlUrl')).toContainHTML(
        'http://localhost:3000/platform/staff/invoices/430334/download'
      )
      expect(getByTestId('Actions-translationCode')).toContainHTML('invoice')
      expect(getByTestId('Actions-documentNumber')).toContainHTML('377249')
    })
  })

  describe('when `loading` is `true`', () => {
    beforeEach(() => {
      mockGetInvoiceDetailsHeader.mockReturnValue({
        data: fixtures.MockInvoice,
        loading: true,
        initialLoading: false
      })
    })

    it('default render', () => {
      const { getByTestId } = render()

      expect(getByTestId('add-payment')).toHaveTextContent('Add Payment')
    })
  })

  describe('when `initialLoading` is `true`', () => {
    beforeEach(() => {
      mockGetInvoiceDetailsHeader.mockReturnValue({
        data: fixtures.MockInvoice,
        loading: false,
        initialLoading: true
      })
    })

    it('default render', () => {
      const { getByTestId } = render()

      expect(getByTestId('InlineActionsSkeleton')).toBeInTheDocument()
    })
  })

  describe('when consolidated invoice is not specified, but it is a draft', () => {
    beforeEach(() => {
      mockGetInvoiceDetailsHeader.mockReturnValue({
        data: {
          ...fixtures.MockInvoice,
          status: 'DRAFT',
          consolidatedInvoice: undefined
        },
        loading: false
      })
    })

    it('no consolidated invoice tooltip render', () => {
      const { getByTestId } = render()

      expect(getByTestId('Tooltip-content')).toHaveTextContent(
        'You cannot add payment to a draft invoice.'
      )
      expect(getByTestId('Actions-operations')).not.toHaveTextContent(
        'You cannot download an original invoice'
      )
    })
  })

  describe('when consolidated invoice is not specified', () => {
    beforeEach(() => {
      mockGetInvoiceDetailsHeader.mockReturnValue({
        data: {
          ...fixtures.MockInvoice,
          consolidatedInvoice: undefined
        },
        loading: false
      })
    })

    it('no consolidated invoice tooltip render', () => {
      const { getByTestId, queryByTestId } = render()

      expect(queryByTestId('Tooltip-content')).toBeNull()
      expect(getByTestId('Actions-operations')).not.toHaveTextContent(
        'You cannot download an original invoice'
      )
    })
  })
})
