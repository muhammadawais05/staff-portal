import React from 'react'
import { camelCase } from 'lodash-es'
import { formatAmount } from '@toptal/picasso/utils'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { formatDateFull } from '@staff-portal/billing/src/_lib/dateTime'
import i18n from '@staff-portal/billing/src/utils/i18n'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import {
  getPaymentDuePeriod,
  isPaymentCommission
} from '@staff-portal/billing-widgets/src/modules/payment/utils'
import CommercialDocumentStatus from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/CommercialDocumentStatus'

import {
  GetPaymentDetailsTableQuery,
  GetPaymentDetailsTableSubjectObjectTalentFragment
} from '../data'

const baseKey = 'payment:page.details'

const getPaymentDetailsTableContent = (
  payment: Exclude<GetPaymentDetailsTableQuery['node'], null | undefined>
) => {
  const {
    amount,
    balanceDue,
    billingCycleGid,
    client,
    createdOn,
    dueDate,
    job,
    paymentKind,
    paymentGroup,
    paymentMethod,
    status,
    subjectObject
  } = payment
  const paymentKindValue = paymentKind
    ? i18n.t(`payment:kind.${camelCase(paymentKind)}`)
    : EMPTY_DATA

  const paymentIsPaid = status === DocumentStatus.PAID
  const paymentIsACommission = isPaymentCommission(paymentKind)
  const paymentOnHoldUntil = (
    subjectObject as GetPaymentDetailsTableSubjectObjectTalentFragment
  )?.activePaymentHold?.dateThreshold
  const isCompanyVisible = billingCycleGid && !!client?.webResource?.text
  const isEngagementVisible = billingCycleGid && !!job?.webResource?.text

  return [
    {
      label: i18n.t(`${baseKey}.paymentFor`),
      value: (
        <WebResourceLinkWrapper
          inline
          size='medium'
          webResource={subjectObject?.webResource}
          weight='semibold'
        />
      )
    },
    {
      label: i18n.t(`${baseKey}.company`),
      value: (
        <WebResourceLinkWrapper
          inline
          size='medium'
          webResource={client?.webResource}
          weight='semibold'
        />
      ),
      hidden: !isCompanyVisible
    },
    {
      label: i18n.t(`${baseKey}.engagement`),
      value: (
        <WebResourceLinkWrapper
          inline
          size='medium'
          webResource={job?.webResource}
          weight='semibold'
        />
      ),
      hidden: !isEngagementVisible
    },
    {
      label: i18n.t(`${baseKey}.status`),
      value: status ? (
        <CommercialDocumentStatus document={payment} size='medium' />
      ) : (
        EMPTY_DATA
      )
    },
    {
      label: i18n.t(`${baseKey}.type`),
      value: paymentKindValue
    },
    {
      label: i18n.t(`${baseKey}.amount`),
      value: formatAmount({ amount })
    },
    {
      label: i18n.t(`${baseKey}.balanceDue`),
      value: formatAmount({ amount: balanceDue })
    },
    {
      label: i18n.t(`${baseKey}.paymentMethod`),
      value: i18n.t(
        `paymentMethod:${camelCase(paymentMethod || undefined)}`,
        EMPTY_DATA
      ),
      hidden: !paymentIsPaid
    },
    {
      label: i18n.t(`${baseKey}.paymentGroup`),
      value: (
        <WebResourceLinkWrapper
          inline
          size='medium'
          webResource={paymentGroup?.webResource}
          weight='semibold'
        />
      ),
      hidden: !paymentGroup?.webResource?.text
    },
    {
      label: i18n.t(`${baseKey}.createdOn`),
      value: createdOn ? formatDateFull(createdOn) : EMPTY_DATA
    },
    {
      label: i18n.t(`${baseKey}.dueDate`),
      value: dueDate ? formatDateFull(dueDate) : EMPTY_DATA,
      hidden: paymentIsACommission
    },
    {
      label: i18n.t(`${baseKey}.duePeriod`),
      value: getPaymentDuePeriod({ createdOn, dueDate }),
      hidden: paymentIsACommission
    },
    {
      label: i18n.t(`${baseKey}.paymentOnHold`),
      value: i18n.t(`payment:paymentOnHold.date`, {
        date: paymentOnHoldUntil && formatDateFull(paymentOnHoldUntil)
      }),
      hidden: !paymentOnHoldUntil
    }
  ]
}

export default getPaymentDetailsTableContent
