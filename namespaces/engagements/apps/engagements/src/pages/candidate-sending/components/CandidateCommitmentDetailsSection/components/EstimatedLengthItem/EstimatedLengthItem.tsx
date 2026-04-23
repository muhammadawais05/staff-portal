import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { JobEstimatedLengths, Maybe } from '@staff-portal/graphql/staff'
import { ESTIMATED_LENGTH_MAPPING } from '@staff-portal/jobs'

export type Props = {
  estimatedLength?: Maybe<JobEstimatedLengths>
}

const EstimatedLengthItem = ({ estimatedLength }: Props) => (
  <DetailedList.Row>
    <DetailedList.Item label='Estimated length'>
      {estimatedLength && ESTIMATED_LENGTH_MAPPING[estimatedLength]}
    </DetailedList.Item>
  </DetailedList.Row>
)

export default EstimatedLengthItem
