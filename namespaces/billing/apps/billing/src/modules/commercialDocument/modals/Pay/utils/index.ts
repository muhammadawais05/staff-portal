import {
  BillingMethodName,
  InvoicePaymentSources
} from '@staff-portal/graphql/staff'
import { camelCase } from 'lodash-es'
import { formatAmount } from '@toptal/picasso/utils'
import { AnyObject } from '@toptal/picasso-forms'
import {
  BillingMethodsOptions,
  sortByPaymentSourcesOrder
} from '@staff-portal/billing/src/_lib/helpers/billing'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { ClientWithUnappliedCashFragment } from '../data/getPayModalInvoice.graphql.types'
import { getHasSingleUnappliedCashEntry } from './get-has-single-unapplied-cash-entry'

export const filterClientsWithPositiveBalance = (
  clients: ClientWithUnappliedCashFragment[]
) =>
  clients
    .filter(client => Number(client?.unappliedCashBalance) > 0)
    .map(client => ({
      ...client,
      unappliedCashEntries: {
        nodes:
          client.unappliedCashEntries?.nodes?.filter(
            node => Number(node?.availableAmount) > 0
          ) ?? []
      }
    }))

export type Clients = ClientWithUnappliedCashFragment[]

type Params = {
  availableSources: BillingMethodsOptions
  clients: Clients
  isSingleClientWithSingleUnappliedCashEntry: boolean
}

export const getPaymentSourceItems = ({
  availableSources,
  clients,
  isSingleClientWithSingleUnappliedCashEntry
}: Params) => {
  const { CREDIT_CARD, ACH, UNAPPLIED_CASH } = InvoicePaymentSources
  const sourcesCreditCard = availableSources[BillingMethodName.CREDIT_CARD]
  const sourcesAch = availableSources[BillingMethodName.ACH]
  const hasCreditCardSource = !!sourcesCreditCard?.options?.length
  const hasAchSource = !!sourcesAch?.options?.length

  const getLabel = (key: string, disabled: boolean) => {
    if (disabled && key === CREDIT_CARD) {
      return i18n.t(
        `invoice:payModal.fields.${
          camelCase(key) as 'creditCard'
        }.labelInvalid` as const
      )
    }
    if (
      key === UNAPPLIED_CASH &&
      isSingleClientWithSingleUnappliedCashEntry &&
      Number(clients[0].unappliedCashBalance) > 0
    ) {
      return (
        i18n.t(
          `invoice:payModal.fields.${
            camelCase(key) as 'creditCard'
          }.label` as const
        ) + ` ${formatAmount({ amount: clients[0].unappliedCashBalance })}`
      )
    }

    return i18n.t(
      `invoice:payModal.fields.${camelCase(key) as 'creditCard'}.label` as const
    )
  }

  return Object.keys(InvoicePaymentSources)
    .map(key => {
      let disabled = false
      let preferred

      if (key === ACH) {
        disabled = !hasAchSource
        preferred = availableSources[BillingMethodName.ACH]?.preferred
      } else if (key === CREDIT_CARD) {
        disabled = !hasCreditCardSource
        preferred = availableSources[BillingMethodName.CREDIT_CARD]?.preferred
      } else if (key === UNAPPLIED_CASH) {
        disabled = clients.length === 0
      }

      const newestId =
        key === CREDIT_CARD
          ? sourcesCreditCard?.newestId || -1
          : sourcesAch?.newestId || -1

      return {
        disabled,
        label: getLabel(key, disabled),
        newestId,
        preferred: !!preferred,
        value: InvoicePaymentSources[key as InvoicePaymentSources]
      }
    })
    .sort(sortByPaymentSourcesOrder)
}

export const validateUnappliedCash = (value: string, allValues: AnyObject) => {
  if (
    allValues.paymentSource === InvoicePaymentSources.UNAPPLIED_CASH &&
    allValues.unappliedCashAmount
  ) {
    return Number(allValues.unappliedCashAmount) < Number(value)
      ? i18n.t(`invoice:payModal.fields.unappliedCash.validationError`)
      : undefined
  }
}

// only check entries with positive available amount
export const getIsSingleClientWithSingleUnappliedCashEntry = (
  clients: Clients,
  clientId: string
) =>
  clients.length === 1 &&
  clients[0].unappliedCashEntries?.nodes?.filter(
    ({ availableAmount }) => Number(availableAmount) > 0
  )?.length === 1 &&
  clients[0]?.id === clientId

export { getUnappliedCashGroupsAsOptions } from './get-unapplied-cash-entries-from-hierarchy'
export { getHasSingleUnappliedCashEntry }
