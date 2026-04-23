import React from 'react'
import { FlagColor, TalentJobInterestStatus } from '@staff-portal/graphql/staff'
import { RoleFlag } from '@staff-portal/role-flags'
import { Maybe } from '@toptal/picasso/utils'

const JobNotInterestedFlag = ({
  interestStatus,
  notInterestedReason
}: {
  interestStatus: Maybe<TalentJobInterestStatus>
  notInterestedReason: Maybe<string>
}) => {
  if (interestStatus !== TalentJobInterestStatus.NOT_INTERESTED) {
    return null
  }

  const tooltipContent = (
    <>
      Talent hid this job. <br />
      Reason: {notInterestedReason}
    </>
  )

  return (
    <RoleFlag
      title='Not Interested'
      color={FlagColor.RED}
      plainTooltip
      comment={tooltipContent}
    />
  )
}

export default JobNotInterestedFlag
