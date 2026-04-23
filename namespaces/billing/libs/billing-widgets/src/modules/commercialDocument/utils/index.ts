import { camelCase } from 'lodash-es'
import {
  DocumentStatus,
  Talent,
  Maybe,
  Scalars
} from '@staff-portal/graphql/staff'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { InvoicesTotalsFragment } from '../../__fragments__/invoicesTotalsFragment.graphql.types'
import { PaymentsTotalsFragment } from '../../__fragments__/paymentsTotalsFragment.graphql.types'
import { Props as CommercialDocumentStatusProps } from '../components/CommercialDocumentStatus/CommercialDocumentStatus'

export enum CommercialDocumentType {
  invoice = 'invoice',
  payment = 'payment'
}

export type CommercialDocumentTotals = Partial<
  InvoicesTotalsFragment & PaymentsTotalsFragment
>

export type DocumentStatusTextProps = {
  actionDueOn?: Maybe<Scalars['Date']>
  status: DocumentStatus
}

export type DocumentStatusTextOptions = {
  withDate?: boolean
}

export const getDocumentStatusText = (
  document: DocumentStatusTextProps,
  options?: DocumentStatusTextOptions
) => {
  const { actionDueOn, status } = document

  if (options?.withDate && status === DocumentStatus.DISPUTED && actionDueOn) {
    return i18n.t('common:documents.statuses.disputedDueOn', {
      actionDueOn: formatDateMed(actionDueOn)
    })
  }

  return i18n.t(`common:documents.statuses.${camelCase(status)}`)
}

export const getTooltipContent = ({
  nodeType,
  document: { statusComment = '', status, subjectObject }
}: Pick<CommercialDocumentStatusProps, 'document' | 'nodeType'>) => {
  const isPaymentOnHold =
    nodeType === CommercialDocumentType.payment &&
    status === DocumentStatus.ON_HOLD

  return isPaymentOnHold
    ? (subjectObject as Talent)?.paymentsHoldDescription
    : statusComment
}

export { useCommercialDocumentDueMessage } from './useCommercialDocumentDueMessage'
export { useCommercialDocumentTillMessage } from './useCommercialDocumentTillMessage'
export { useCommercialDocumentCreditedMessage } from './useCommercialDocumentCreditedMessage'
export { useCommercialDocumentDebitedMessage } from './useCommercialDocumentDebitedMessage'
export { useCommercialDocumentIssueMessage } from './useCommercialDocumentIssueMessage'
export { getCommercialDocumentPaymentMethod } from './getCommercialDocumentPaymentMethod'
export { useListTableRowExpandState } from './useListTableRowExpandState'
