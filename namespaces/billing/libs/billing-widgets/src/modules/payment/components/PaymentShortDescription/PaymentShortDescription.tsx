import { Trans } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Typography } from '@toptal/picasso'
import { formatDateRange } from '@staff-portal/billing/src/_lib/dateTime'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { normalizeSubjectRole } from '@staff-portal/billing/src/utils/role'

import {
  ReasonClientFragment,
  ReasonRoleStepFragment,
  ReasonEngagementFragment,
  ReasonTalentFragment,
  ReasonTalentPartnerFragment
} from '../../../__fragments__/reasonFragments.graphql.types'
import { PaymentListItemFragment } from '../../../__fragments__/paymentListItemFragment.graphql.types'
import { getLocaleKey, GetLocalKeyReturnedType } from './getLocaleKey'

const displayName = 'PaymentShortDescription'

type Reason = Partial<
  ReasonTalentFragment &
    ReasonTalentPartnerFragment &
    ReasonClientFragment &
    ReasonRoleStepFragment &
    ReasonEngagementFragment
>

interface Props {
  payment: PaymentListItemFragment
}

const PaymentShortDescription: FC<Props> = memo<Props>(({ payment }) => {
  const { client: company, job, billingCycle } = payment
  const reason = (payment.reason as Reason) ?? {}
  const talent = reason?.roleStepTalent || reason?.talent
  const i18nKey = getLocaleKey(payment) as GetLocalKeyReturnedType
  const referrer = reason?.referrer
  const { startDate: start, endDate: end } = billingCycle || {}
  const shortDuration = start && end ? formatDateRange({ start, end }) : ''

  const values = {
    company: company?.webResource?.text,
    job: job?.webResource?.text,
    talent: talent?.fullName,
    reason: reason?.fullName,
    reasonType: normalizeSubjectRole(reason).toLowerCase(),
    reasonRole: reason?.roleStepTalent?.fullName,
    reasonStepShort: reason?.step?.short,
    reasonReferType: normalizeSubjectRole(referrer).toLowerCase(),
    reasonRefer: referrer?.fullName,
    shortDuration
  }

  const components = [
    { key: 'talent', webResource: talent?.webResource },
    { key: 'job', webResource: job?.webResource },
    { key: 'company', webResource: company?.webResource },
    { key: 'refer', webResource: referrer?.webResource },
    { key: 'reason', webResource: reason?.webResource }
  ].map(({ key, webResource }) => (
    <WebResourceLinkWrapper
      data-testid={`${key}-link`}
      inline
      key={key}
      webResource={webResource}
    />
  ))

  return (
    <Typography data-testid={displayName} as='span'>
      <Trans
        i18nKey={`payment:shortDescription.${i18nKey}`}
        values={values}
        components={components}
      />
    </Typography>
  )
})

PaymentShortDescription.displayName = displayName

export default PaymentShortDescription
