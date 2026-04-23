import React from 'react'
import { FlagColor, OfacStatus } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import { RoleFlag } from '@staff-portal/role-flags'

import { TalentsListItemFragment } from '../../data'

export interface Props {
  ofacStatus: TalentsListItemFragment['ofacStatus']
  ofacStatusComment?: TalentsListItemFragment['ofacStatusComment']
}

const OFACFlag = ({ ofacStatus, ofacStatusComment }: Props) => {
  if (
    !ofacStatus ||
    ![OfacStatus.RESTRICTED, OfacStatus.INVESTIGATION].includes(ofacStatus)
  ) {
    return null
  }

  return (
    <RoleFlag
      title={`OFAC ${titleize(ofacStatus)}`}
      color={FlagColor.RED}
      comment={ofacStatusComment}
      plainTooltip
    />
  )
}

export default OFACFlag
