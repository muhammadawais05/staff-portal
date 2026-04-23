import React from 'react'
import { Typography } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { RateChangeRequestTypeEnum } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

interface RateChangeRequestTypeProps {
  requestTypeEnumValue?: string | null
  engagementLink?: string | null
}

const RateChangeRequestType = ({
  requestTypeEnumValue,
  engagementLink
}: RateChangeRequestTypeProps) => {
  if (
    requestTypeEnumValue === RateChangeRequestTypeEnum.CURRENT_ENGAGEMENT &&
    engagementLink
  ) {
    return (
      <Typography>
        <LinkWrapper href={engagementLink} wrapWhen={Boolean(engagementLink)}>
          Active engagement
        </LinkWrapper>{' '}
        rate change
      </Typography>
    )
  }

  if (requestTypeEnumValue == RateChangeRequestTypeEnum.FUTURE_ENGAGEMENTS) {
    return <Typography>Future engagement rate change</Typography>
  }

  if (requestTypeEnumValue == RateChangeRequestTypeEnum.CONSULTATION) {
    return <Typography>Consultation</Typography>
  }

  return <Typography>{NO_VALUE}</Typography>
}

export default RateChangeRequestType
