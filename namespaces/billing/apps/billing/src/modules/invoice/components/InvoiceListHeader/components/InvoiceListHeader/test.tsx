import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'

import InvoiceListHeader from '.'

jest.mock('@staff-portal/billing/src/utils/graphql')
jest.mock('../../data/getInvoiceListHeader.graphql.types')
jest.mock('../../components/InvoiceListHeaderReconciliationButton')
jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')
jest.mock('@staff-portal/billing/src/components/InlineActionsSkeleton')

const render = () => renderComponent(<InvoiceListHeader />)

describe('InvoiceListHeader', () => {
  describe('for initial loading', () => {
    it('renders a skeleton', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: fixtures.MockInvoiceList.invoices,
        loading: false,
        initialLoading: true
      }))
      const { getByTestId } = render()

      expect(getByTestId('InlineActionsSkeleton')).toBeInTheDocument()
    })
  })

  describe('for subsequent loading', () => {
    it('renders a loader', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: fixtures.MockInvoiceList.invoices,
        loading: true,
        initialLoading: false
      }))
      const { getByTestId } = render()

      expect(getByTestId('LoaderOverlay')).toBeInTheDocument()
    })
  })

  describe('when totalCount is 0', () => {
    it('renders disabled Download button', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: { ...fixtures.MockInvoiceList.invoices, totalCount: 0 }
      }))
      const { getByTestId } = render()
      const button = getByTestId('InvoiceListHeaderDownloadButton')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when has too many records', () => {
    it('renders disabled Download button', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: { ...fixtures.MockInvoiceList.invoices, totalCount: 2001 }
      }))
      const { getByTestId } = render()
      const button = getByTestId('InvoiceListHeaderDownloadButton')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when url is missing', () => {
    it('renders disabled Download button', () => {
      ;(useGetData as jest.Mock).mockReturnValue(() => ({
        data: { ...fixtures.MockInvoiceList.invoices, downloadXlsxUrl: null }
      }))
      const { getByTestId } = render()
      const button = getByTestId('InvoiceListHeaderDownloadButton')

      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  it('renders enabled Download button', () => {
    ;(useGetData as jest.Mock).mockReturnValue(() => ({
      data: fixtures.MockInvoiceList.invoices
    }))
    const { getByTestId } = render()
    const button = getByTestId('InvoiceListHeaderDownloadButton')

    expect(button).toBeInTheDocument()
    expect(button).not.toHaveAttribute('disabled', '')
  })

  it('renders the Consolidated Button button with proper details', () => {
    ;(useGetData as jest.Mock).mockReturnValue(() => ({
      data: fixtures.MockInvoiceList.invoices
    }))
    const { getByTestId } = render()
    const button = getByTestId('InvoiceListHeaderConsolidatedButton')

    expect(button).toBeEnabled()
    expect(button).toContainHTML('Create Consolidated Invoice')
  })
})
