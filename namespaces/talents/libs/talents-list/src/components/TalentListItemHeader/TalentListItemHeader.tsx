import React, { memo, ReactNode } from 'react'
import {
  OfacStatus,
  TalentJobInterestStatus
} from '@staff-portal/graphql/staff'
import { RoleFlags } from '@staff-portal/role-flags'
import { TalentHeader } from '@staff-portal/talents'

import JobNotInterestedFlag from '../JobNotInterestedFlag/JobNotInterestedFlag'
import OFACFlag from '../OFACFlag/OFACFlag'

interface Props {
  talentId: string
  talentName: string
  talentPhoto?: string | null
  talentUrl?: string | null
  talentPartnerName?: string | null
  talentPartnerUrl?: string | null
  ofacStatus?: OfacStatus | null
  ofacStatusComment?: string | null
  jobInterestStatus?: TalentJobInterestStatus | null
  jobNotInterestedReason?: string | null
  actions?: ReactNode
}

const TalentListItemHeader = ({
  talentId,
  talentName,
  talentPhoto,
  talentUrl,
  talentPartnerName,
  talentPartnerUrl,
  ofacStatus,
  ofacStatusComment,
  jobInterestStatus,
  jobNotInterestedReason,
  actions
}: Props) => (
  <TalentHeader
    fullName={talentName}
    url={talentUrl}
    photo={talentPhoto}
    actions={actions}
    talentPartnerName={talentPartnerName}
    talentPartnerUrl={talentPartnerUrl}
    flags={
      <>
        <OFACFlag
          ofacStatus={ofacStatus}
          ofacStatusComment={ofacStatusComment}
        />
        <JobNotInterestedFlag
          interestStatus={jobInterestStatus}
          notInterestedReason={jobNotInterestedReason}
        />
        <RoleFlags roleId={talentId} />
      </>
    }
  />
)

export default memo(TalentListItemHeader)
