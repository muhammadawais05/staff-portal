import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { DetailedList } from '@staff-portal/ui'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { BillingNotesField } from '@staff-portal/billing';

import MinimumCommitmentItem from '../MinimumCommitmentItem'
import BillingAddressItem from '../BillingAddressItem'
import YesOrNoItem from '../YesOrNoItem'
import NetTermsItem from '../NetTermsItem'
import CollectionSpeedItem from '../CollectionSpeedItem'
import { GetClientBillingDetailsQuery } from '../../data/getClientBillingDetails.graphql.types'
import { useBillingDetailsItemsInlineUpdate } from '../../utils/useBillingDetailsItemsInlineUpdate'
import useGetBillingDetailsItemsInlineData from '../../utils/useGetBillingDetailsItemsInlineData'

type Client = Exclude<GetClientBillingDetailsQuery['node'], null | undefined>
export type DetailedListItem = {
  label: NonNullable<ReactNode>
  value: ReactNode
}

const BillingDetailsItems = ({ client }: { client: Client }) => {
  const { t: translate } = useTranslation(['billingDetails', 'common'])

  const {
    id: clientId,
    billingPhone,
    billingNotes,
    netTerms,
    enterprise,
    collectionSpeed,
    notifyAboutNewInvoices,
    autoAllocateMemos,
    attachTimesheetsToInvoices,
    investmentGrade,
    commitmentSettings,
    operations: {
      updateClientCommitment,
      updateBillingNotes,
      updateClientNetTerms,
      updateClientCollectionSpeed,
      updateClientNotifyAboutNewInvoices,
      updateClientAutoAllocateMemos,
      updateClientAttachTimesheetsToInvoices,
      updateClientInvestmentGrade
    }
  } = client

  const {
    updateClientNotifyAboutNewInvoicesMutation,
    updateClientAutoAllocateMemosMutation,
    updateClientAttachTimesheetsToInvoicesMutation,
    updateClientInvestmentGradeMutation
  } = useBillingDetailsItemsInlineUpdate()
  const {
    getClientBillingAutoAllocateMemos,
    getClientBillingNotifyAboutNewInvoices,
    getClientBillingAttachTimesheetsToInvoices,
    getClientBillingInvestmentGrade
  } = useGetBillingDetailsItemsInlineData({
    variables: { clientId }
  })

  return (
    <DetailedList
      labelColumnWidth={12}
      data-testid={`BillingDetailsContent-billingDetails`}
    >
      <DetailedList.Row>
        <DetailedList.Item
          label={translate('billingDetails:labels.billingAddress')}
        >
          <BillingAddressItem enableEdit key='billingAddress' client={client} />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item
          label={translate('billingDetails:labels.billingPhone')}
          value={billingPhone || EMPTY_DATA}
        />
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item
          label={translate('billingDetails:labels.billingNotes')}
        >
          <BillingNotesField
            key='billingNotes'
            roleOrClientId={clientId}
            billingNotes={billingNotes || undefined}
            operation={updateBillingNotes}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item label={translate('billingDetails:labels.netTerms')}>
          <NetTermsItem
            key='netTerms'
            initialValues={{
              clientId,
              netTerms
            }}
            operation={updateClientNetTerms}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item
          label={translate('billingDetails:labels.notifyAboutNewInvoices')}
        >
          <YesOrNoItem
            key='notifyAboutNewInvoices'
            name='notifyAboutNewInvoices'
            onSubmit={updateClientNotifyAboutNewInvoicesMutation}
            queryValue={getClientBillingNotifyAboutNewInvoices}
            value={notifyAboutNewInvoices}
            initialValues={{ clientId }}
            operation={updateClientNotifyAboutNewInvoices}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item
          label={translate('billingDetails:labels.autoAllocateMemos')}
        >
          <YesOrNoItem
            key='autoAllocateMemos'
            name='autoAllocateMemos'
            onSubmit={updateClientAutoAllocateMemosMutation}
            queryValue={getClientBillingAutoAllocateMemos}
            value={autoAllocateMemos}
            initialValues={{ clientId }}
            operation={updateClientAutoAllocateMemos}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item
          label={translate('billingDetails:labels.attachTimesheetsToInvoices')}
        >
          <YesOrNoItem
            key='attachTimesheetsToInvoices'
            name='attachTimesheetsToInvoices'
            onSubmit={updateClientAttachTimesheetsToInvoicesMutation}
            queryValue={getClientBillingAttachTimesheetsToInvoices}
            value={attachTimesheetsToInvoices}
            initialValues={{ clientId }}
            operation={updateClientAttachTimesheetsToInvoices}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        <DetailedList.Item
          label={translate('billingDetails:labels.investmentGrade')}
        >
          <YesOrNoItem
            key='investmentGrade'
            name='investmentGrade'
            onSubmit={updateClientInvestmentGradeMutation}
            queryValue={getClientBillingInvestmentGrade}
            value={investmentGrade}
            initialValues={{ clientId }}
            hasEmptyOption
            operation={updateClientInvestmentGrade}
          />
        </DetailedList.Item>
      </DetailedList.Row>
      <DetailedList.Row>
        {enterprise && (
          <DetailedList.Item
            label={translate('billingDetails:labels.collectionSpeed')}
          >
            <CollectionSpeedItem
              key='collectionSpeed'
              initialValues={{
                clientId,
                collectionSpeed: collectionSpeed || undefined
              }}
              operation={updateClientCollectionSpeed}
            />
          </DetailedList.Item>
        )}
      </DetailedList.Row>
      <DetailedList.Row>
        {commitmentSettings && (
          <DetailedList.Item
            label={translate('billingDetails:labels.minimumCommitment')}
          >
            <MinimumCommitmentItem
              key='minimumCommitment'
              clientId={client.id}
              minimumHours={commitmentSettings.minimumHours}
              operation={updateClientCommitment}
            />
          </DetailedList.Item>
        )}
      </DetailedList.Row>
    </DetailedList>
  )
}

export default BillingDetailsItems
