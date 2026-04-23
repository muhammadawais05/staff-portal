import React from 'react'
import { Typography } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'

export interface Props {
  talentsCount?: Maybe<number>
}

const SourcingRequestLinkedTalentsCountField = ({ talentsCount }: Props) => (
  <Typography size='medium'>{talentsCount ?? 0}</Typography>
)

export default SourcingRequestLinkedTalentsCountField
