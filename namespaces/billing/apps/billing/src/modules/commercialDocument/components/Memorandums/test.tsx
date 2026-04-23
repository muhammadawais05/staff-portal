import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'
import * as refetch from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import { useGetCommercialDocumentMemorandums } from '../../data'
import Memorandums from '.'

jest.mock('./Table')
jest.mock('../../data')

const mockedRefetch = jest.fn()
const mockHandleOnOpenModalWithUrlSearch = jest.fn()

jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnOpenModalWithUrlSearch: mockHandleOnOpenModalWithUrlSearch
  })
}))

jest.mock('@staff-portal/billing/src/_lib/helpers/apollo/useRefetch')

const mockGetCommercialDocumentMemorandums =
  useGetCommercialDocumentMemorandums as jest.Mock

const render = (props: ComponentProps<typeof Memorandums>) =>
  renderComponent(<Memorandums {...props} />)

describe('Memorandums', () => {
  describe('listening for Apollo context events', () => {
    it('refetches data on predefined events', () => {
      jest.spyOn(refetch, 'useRefetch')
      mockGetCommercialDocumentMemorandums.mockReturnValue({
        data: {
          id: fixtures.MockInvoice.id,
          ...fixtures.MockGetCommercialDocumentMemorandums
        },
        loading: false,
        refetch: mockedRefetch
      })
      render({
        commercialDocumentId: fixtures.MockInvoice.id
      })

      expect(refetch.useRefetch).toHaveBeenCalledTimes(1)
      expect(refetch.useRefetch).toHaveBeenCalledWith(
        [
          ApolloContextEvents.commercialDocumentApplyMemos,
          ApolloContextEvents.invoiceApplyPromotions,
          ApolloContextEvents.memorandumAdd,
          ApolloContextEvents.convertPaymentIntoCreditMemorandum,
          ApolloContextEvents.memorandumRevert,
          ApolloContextEvents.memorandumRevertPrepayment,
          ApolloContextEvents.invoiceApplyPrepayments,
          ApolloContextEvents.invoiceUnconsolidate
        ],
        mockedRefetch
      )
    })
  })

  describe('when memorandums are not empty', () => {
    it('default render', () => {
      mockGetCommercialDocumentMemorandums.mockReturnValue({
        data: {
          id: fixtures.MockInvoice.id,
          ...fixtures.MockGetCommercialDocumentMemorandums
        },
        loading: false
      })
      const { container } = render({
        commercialDocumentId: fixtures.MockInvoice.id
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when memorandums are undefined', () => {
    it('default render', () => {
      mockGetCommercialDocumentMemorandums.mockReturnValue({
        data: undefined,
        loading: false
      })
      const { container } = render({
        commercialDocumentId: fixtures.MockInvoice.id
      })

      expect(container).toMatchSnapshot()
    })
  })
})
