import { Typography } from '@toptal/picasso'
import { Trans } from 'react-i18next'
import React, { FC, memo } from 'react'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { normalizeSubjectRole } from '@staff-portal/billing/src/utils/role'
import {
  ReasonClientFragment,
  ReasonEngagementFragment,
  ReasonRoleStepFragment,
  ReasonTalentFragment,
  ReasonTalentPartnerFragment
} from '@staff-portal/billing-widgets/src/modules/__fragments__/reasonFragments.graphql.types'

import {
  ExpectedCommissionFragment,
  ExpectedCommissionReasonFragment_Engagement_
} from '../../../__fragments__/expectedCommissionFragment.graphql.types'
import { getLocaleKey } from './getLocaleKey'

type Reason = Partial<
  ReasonTalentFragment &
    ReasonTalentPartnerFragment &
    ReasonClientFragment &
    ReasonRoleStepFragment &
    ReasonEngagementFragment
>

interface Props {
  expectedCommission: ExpectedCommissionFragment
}

const displayName = 'ExpectedCommissionShortDescription'

const ExpectedCommissionShortDescription: FC<Props> = memo<Props>(
  ({ expectedCommission }) => {
    const reason = (expectedCommission.reason as Reason) ?? {}
    const i18nKey = getLocaleKey(expectedCommission)
    const referrer = reason?.referrer
    const user = reason?.roleStepTalent || reason
    const engagement = reason as ExpectedCommissionReasonFragment_Engagement_
    const { job, client: company, talent } = engagement

    const values = {
      roleType: normalizeSubjectRole(reason).toLowerCase(),
      step: reason?.step?.short,
      referType: normalizeSubjectRole(referrer).toLowerCase(),
      refer: referrer?.fullName
    }

    const components = [
      { key: 'talent', webResource: talent?.webResource, target: '_blank' },
      { key: 'job', webResource: job?.webResource },
      { key: 'company', webResource: company?.webResource },
      { key: 'refer', webResource: referrer?.webResource },
      { key: 'user', webResource: user?.webResource }
    ].map(({ key, webResource, target }) => (
      <WebResourceLinkWrapper
        target={target}
        data-testid={`${key}-link`}
        inline
        key={key}
        webResource={webResource}
      />
    ))

    return (
      <Typography data-testid={displayName} as='span'>
        <Trans
          i18nKey={`expectedCommission:shortDescription.${i18nKey}`}
          values={values}
          components={components}
        />
      </Typography>
    )
  }
)

export default ExpectedCommissionShortDescription
