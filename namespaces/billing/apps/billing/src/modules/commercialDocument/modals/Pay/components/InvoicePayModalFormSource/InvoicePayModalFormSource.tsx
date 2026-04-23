import { FinalField, FormRenderProps } from '@toptal/picasso-forms'
import { Form } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import {
  BillingMethodName,
  InvoicePaymentSources,
  Maybe
} from '@staff-portal/graphql/staff'
import { BillingMethodsOptions } from '@staff-portal/billing/src/_lib/helpers/billing'
import FormInputRadioGroup from '@staff-portal/billing/src/components/FormInputRadioGroup'

import InvoicePayModalFormAch from '../InvoicePayModalFormAch'
import InvoicePayModalFormCreditCard from '../InvoicePayModalFormCreditCard'
import InvoicePayModalFormExternal from '../InvoicePayModalFormExternal'
import InvoicePayModalFormReceipt from '../InvoicePayModalFormReceipt'
import InvoicePayModalFormUnappliedCash from '../InvoicePayModalFormUnappliedCash'
import {
  Clients,
  filterClientsWithPositiveBalance,
  getIsSingleClientWithSingleUnappliedCashEntry,
  getPaymentSourceItems
} from '../../utils'

const displayName = 'InvoicePayModalFormSource'

interface Props extends Pick<FormRenderProps, 'values'> {
  availableSources: BillingMethodsOptions
  clients: Clients
  clientId: string
  invoiceIssueDate?: Maybe<string>
}

const InvoicePayModalFormSource: FC<Props> = memo(
  ({
    values,
    availableSources = {},
    clients = [],
    clientId,
    invoiceIssueDate
  }) => {
    const { t: translate } = useTranslation('invoice')
    const { paymentSource } = values

    const positiveCashClients = filterClientsWithPositiveBalance(clients)

    const { RECORD, CREDIT_CARD, ACH, PENDING_RECEIPT, UNAPPLIED_CASH } =
      InvoicePaymentSources
    const sourcesCreditCard = availableSources[BillingMethodName.CREDIT_CARD]
    const sourcesAch = availableSources[BillingMethodName.ACH]
    const hasOtherBillingMethods = !!sourcesAch?.options?.length

    const isSingleClientWithSingleUnappliedCashEntry =
      getIsSingleClientWithSingleUnappliedCashEntry(
        positiveCashClients,
        clientId
      )

    const fields = getPaymentSourceItems({
      availableSources,
      clients: positiveCashClients,
      isSingleClientWithSingleUnappliedCashEntry
    })

    return (
      <>
        <FinalField
          component={FormInputRadioGroup}
          label={translate('payModal.fields.paymentSource.label')}
          name='paymentSource'
          options={fields}
          required
          testId={displayName}
          type='radio'
          validate={value =>
            value
              ? undefined
              : translate('payModal.fields.paymentSource.validationError')
          }
        />

        <Form.Field>
          {paymentSource === RECORD && <InvoicePayModalFormExternal />}
          {paymentSource === CREDIT_CARD && (
            <InvoicePayModalFormCreditCard
              hasOtherBillingMethods={hasOtherBillingMethods}
              options={sourcesCreditCard?.options || []}
            />
          )}
          {paymentSource === ACH && (
            <InvoicePayModalFormAch options={sourcesAch?.options || []} />
          )}
          {paymentSource === PENDING_RECEIPT && <InvoicePayModalFormReceipt />}
          {paymentSource === UNAPPLIED_CASH && (
            <InvoicePayModalFormUnappliedCash
              clients={positiveCashClients}
              invoiceIssueDate={invoiceIssueDate}
            />
          )}
        </Form.Field>
      </>
    )
  }
)

InvoicePayModalFormSource.displayName = displayName

export default InvoicePayModalFormSource
