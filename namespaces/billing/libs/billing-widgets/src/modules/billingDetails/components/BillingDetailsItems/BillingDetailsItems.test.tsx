import React from 'react'
import {
  ClientCollectionSpeed,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { useTranslation } from 'react-i18next'
import { DetailedList } from '@staff-portal/ui'
import MockClient from '@staff-portal/billing/src/_fixtures/graphql/gateway/client'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { BillingNotesField } from '@staff-portal/billing'

import useGetBillingDetailsItemsInlineData from '../../utils/useGetBillingDetailsItemsInlineData'
import MinimumCommitmentItem from '../MinimumCommitmentItem'
import BillingAddressItem from '../BillingAddressItem'
import NetTermsItem from '../NetTermsItem'
import CollectionSpeedItem from '../CollectionSpeedItem'
import YesOrNoItem from '../YesOrNoItem'
import BillingDetailsItems from '.'
import { useBillingDetailsItemsInlineUpdate } from '../../utils/useBillingDetailsItemsInlineUpdate'

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: jest.fn()
}))
jest.mock('@staff-portal/ui', () => {
  const mock = jest.fn() as unknown as {
    Row: Function
    Item: Function
  }

  mock.Row = jest.fn()
  mock.Item = jest.fn()

  return {
    DetailedList: mock
  }
})
jest.mock('@staff-portal/billing', () => ({
  BillingNotesField: jest.fn()
}))
jest.mock('../BillingAddressItem', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../MinimumCommitmentItem', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../NetTermsItem', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../CollectionSpeedItem', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../YesOrNoItem', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('../../utils/useBillingDetailsItemsInlineUpdate', () => ({
  useBillingDetailsItemsInlineUpdate: jest.fn()
}))
jest.mock('../../utils/useGetBillingDetailsItemsInlineData', () => ({
  __esModule: true,
  default: jest.fn()
}))

const useTranslationMock = useTranslation as jest.Mock
const DetailedListMock = DetailedList as unknown as jest.Mock
const DetailedListRowMock = DetailedList.Row as unknown as jest.Mock
const DetailedListItemMock = DetailedList.Item as unknown as jest.Mock

const MinimumCommitmentItemMock = MinimumCommitmentItem as unknown as jest.Mock
const BillingNotesFieldMock = BillingNotesField as unknown as jest.Mock
const NetTermsItemMock = NetTermsItem as unknown as jest.Mock
const YesOrNoItemMock = YesOrNoItem as unknown as jest.Mock
const CollectionSpeedItemMock = CollectionSpeedItem as unknown as jest.Mock
const BillingAddressItemMock = BillingAddressItem as unknown as jest.Mock

const useGetBillingDetailsItemsInlineDataMock =
  useGetBillingDetailsItemsInlineData as jest.Mock
const useBillingDetailsItemsInlineUpdateMock =
  useBillingDetailsItemsInlineUpdate as jest.Mock

const mockedUpdateClientNotifyAboutNewInvoicesMutation = jest.fn()
const mockedUpdateClientAutoAllocateMemosMutation = jest.fn()
const mockedUpdateClientAttachTimesheetsToInvoicesMutation = jest.fn()
const mockedUpdateClientInvestmentGradeMutation = jest.fn()

const mockedGetClientBillingAutoAllocateMemos = jest.fn()
const mockedGetClientBillingNotifyAboutNewInvoices = jest.fn()
const mockedGetClientBillingAttachTimesheetsToInvoices = jest.fn()
const mockedGetClientBillingInvestmentGrade = jest.fn()

const clientMock = {
  ...MockClient,
  enterprise: true,
  collectionSpeed: ClientCollectionSpeed.SLOW_PAY,
  operations: {
    ...MockClient.operations,
    updateClientCollectionSpeed: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    }
  }
}

describe('#getBillingDetailsItems', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    useTranslationMock.mockImplementation(() => ({
      t: (...args: (string | object)[]) => args.join()
    }))

    DetailedListMock.mockImplementation(({ children }) => <>{children}</>)
    DetailedListRowMock.mockImplementation(({ children }) => <>{children}</>)
    DetailedListItemMock.mockImplementation(({ children }) => <>{children}</>)

    MinimumCommitmentItemMock.mockImplementation(() => null)
    BillingNotesFieldMock.mockImplementation(() => null)
    NetTermsItemMock.mockImplementation(() => null)
    YesOrNoItemMock.mockImplementation(() => null)
    BillingAddressItemMock.mockImplementation(() => null)
    CollectionSpeedItemMock.mockImplementation(() => null)

    useGetBillingDetailsItemsInlineDataMock.mockReturnValue({
      getClientBillingAutoAllocateMemos:
        mockedGetClientBillingAutoAllocateMemos,
      getClientBillingNotifyAboutNewInvoices:
        mockedGetClientBillingNotifyAboutNewInvoices,
      getClientBillingAttachTimesheetsToInvoices:
        mockedGetClientBillingAttachTimesheetsToInvoices,
      getClientBillingInvestmentGrade: mockedGetClientBillingInvestmentGrade
    })

    useBillingDetailsItemsInlineUpdateMock.mockReturnValue({
      updateClientNotifyAboutNewInvoicesMutation:
        mockedUpdateClientNotifyAboutNewInvoicesMutation,
      updateClientAutoAllocateMemosMutation:
        mockedUpdateClientAutoAllocateMemosMutation,
      updateClientAttachTimesheetsToInvoicesMutation:
        mockedUpdateClientAttachTimesheetsToInvoicesMutation,
      updateClientInvestmentGradeMutation:
        mockedUpdateClientInvestmentGradeMutation
    })
  })

  describe('when all billing details are provided', () => {
    it('renders Detailed List Items', () => {
      renderComponent(<BillingDetailsItems client={clientMock} />)

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          label: 'billingDetails:labels.billingAddress'
        }),
        {}
      )
      expect(BillingAddressItemMock).toHaveBeenCalledTimes(1)
      expect(BillingAddressItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          client: clientMock
        }),
        {}
      )

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          label: 'billingDetails:labels.billingPhone',
          value: clientMock.billingPhone
        }),
        {}
      )

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          label: 'billingDetails:labels.billingNotes'
        }),
        {}
      )
      expect(BillingNotesFieldMock).toHaveBeenCalledTimes(1)
      expect(BillingNotesFieldMock).toHaveBeenCalledWith(
        expect.objectContaining({
          billingNotes: clientMock.billingNotes,
          roleOrClientId: clientMock.id
        }),
        {}
      )

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        4,
        expect.objectContaining({
          label: 'billingDetails:labels.netTerms'
        }),
        {}
      )
      expect(NetTermsItemMock).toHaveBeenCalledTimes(1)
      expect(NetTermsItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          initialValues: {
            clientId: clientMock.id,
            netTerms: clientMock.netTerms
          }
        }),
        {}
      )

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        5,
        expect.objectContaining({
          label: 'billingDetails:labels.notifyAboutNewInvoices'
        }),
        {}
      )
      expect(YesOrNoItemMock).toHaveBeenCalledTimes(4)
      expect(YesOrNoItemMock).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          onSubmit: mockedUpdateClientNotifyAboutNewInvoicesMutation,
          queryValue: mockedGetClientBillingNotifyAboutNewInvoices,
          value: clientMock.notifyAboutNewInvoices,
          initialValues: { clientId: clientMock.id }
        }),
        {}
      )

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        6,
        expect.objectContaining({
          label: 'billingDetails:labels.autoAllocateMemos'
        }),
        {}
      )
      expect(YesOrNoItemMock).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          onSubmit: mockedUpdateClientAutoAllocateMemosMutation,
          queryValue: mockedGetClientBillingAutoAllocateMemos,
          value: clientMock.autoAllocateMemos,
          initialValues: { clientId: clientMock.id }
        }),
        {}
      )

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        7,
        expect.objectContaining({
          label: 'billingDetails:labels.attachTimesheetsToInvoices'
        }),
        {}
      )
      expect(YesOrNoItemMock).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          onSubmit: mockedUpdateClientAttachTimesheetsToInvoicesMutation,
          queryValue: mockedGetClientBillingAttachTimesheetsToInvoices,
          value: clientMock.attachTimesheetsToInvoices,
          initialValues: { clientId: clientMock.id }
        }),
        {}
      )

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        8,
        expect.objectContaining({
          label: 'billingDetails:labels.investmentGrade'
        }),
        {}
      )
      expect(YesOrNoItemMock).toHaveBeenNthCalledWith(
        4,
        expect.objectContaining({
          onSubmit: mockedUpdateClientInvestmentGradeMutation,
          queryValue: mockedGetClientBillingInvestmentGrade,
          value: clientMock.investmentGrade,
          initialValues: { clientId: clientMock.id }
        }),
        {}
      )

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        9,
        expect.objectContaining({
          label: 'billingDetails:labels.collectionSpeed'
        }),
        {}
      )
      expect(CollectionSpeedItemMock).toHaveBeenCalledTimes(1)
      expect(CollectionSpeedItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          initialValues: {
            clientId: clientMock.id,
            collectionSpeed: clientMock.collectionSpeed
          }
        }),
        {}
      )

      expect(DetailedListItemMock).toHaveBeenNthCalledWith(
        10,
        expect.objectContaining({
          label: 'billingDetails:labels.minimumCommitment'
        }),
        {}
      )
      expect(MinimumCommitmentItemMock).toHaveBeenCalledTimes(1)
      expect(MinimumCommitmentItemMock).toHaveBeenCalledWith(
        expect.objectContaining({
          clientId: clientMock.id,
          minimumHours: clientMock.commitmentSettings.minimumHours
        }),
        {}
      )
    })
  })

  describe('when commitment settings are not available', () => {
    it('does not include item for minimum commitment', () => {
      renderComponent(
        <BillingDetailsItems
          client={{ ...clientMock, commitmentSettings: undefined }}
        />
      )

      expect(MinimumCommitmentItemMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('when company is not enterprise', () => {
    it('does not include item for collection speed', () => {
      renderComponent(
        <BillingDetailsItems client={{ ...clientMock, enterprise: false }} />
      )

      expect(CollectionSpeedItemMock).toHaveBeenCalledTimes(0)
    })
  })
})
