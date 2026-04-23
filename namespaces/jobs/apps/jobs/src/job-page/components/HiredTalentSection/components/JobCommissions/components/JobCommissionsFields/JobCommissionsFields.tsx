import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { DetailedList as DL } from '@staff-portal/ui'
import { getRoleTypeText } from '@staff-portal/facilities'
import { NO_VALUE } from '@staff-portal/config'

import {
  ClientCommissionFragment,
  TalentCommissionFragment,
  TalentPartnerCommissionFragment,
  EngagementCommissionFragment
} from '../../data/get-job-commissions'
import JobCommissionItemField from '../JobCommissionItemField'
import { LABEL_COLUMN_WIDTH } from '../../../../../../config'

type Props = {
  client?: Maybe<ClientCommissionFragment>
  talent?: Maybe<TalentCommissionFragment>
  talentType?: string
  talentPartner?: Maybe<TalentPartnerCommissionFragment>
  engagementCommissions?: Maybe<EngagementCommissionFragment[]>
}

const JobCommissionsFields = ({
  client,
  talent,
  talentType,
  talentPartner,
  engagementCommissions
}: Props) => (
  <DL labelColumnWidth={LABEL_COLUMN_WIDTH} defaultValue={NO_VALUE}>
    <DL.Row>
      <JobCommissionItemField
        type='Company'
        commissionsPot={client?.commissions?.commissionsPot}
        referralCommission={client?.commissions?.referralCommissionV2}
        referrer={client?.referrer}
      />
    </DL.Row>
    <DL.Row>
      <JobCommissionItemField
        commissionsPot={talent?.commissions?.commissionsPot}
        referralCommission={talent?.commissions?.referralCommissionV2}
        referrer={talent?.referrer}
        type={getRoleTypeText(talentType)}
      />
    </DL.Row>
    <DL.Row>
      <JobCommissionItemField
        commissionsPot={talentPartner?.commissions?.commissionsPot}
        referralCommission={talentPartner?.commissions?.referralCommission}
        referrer={talentPartner?.referrer}
        type='Partner'
      />
    </DL.Row>

    {engagementCommissions?.map(engagementCommission => (
      <DL.Row key={engagementCommission.subject.id}>
        <JobCommissionItemField
          referralCommission={engagementCommission.value}
          referrer={engagementCommission.subject}
          type={engagementCommission.name}
        />
      </DL.Row>
    ))}
  </DL>
)

export default JobCommissionsFields
