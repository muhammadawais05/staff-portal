import React from 'react'
import { Section } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import {
  INTERVIEW_UPDATED,
  INTERVIEW_SCHEDULED
} from '@staff-portal/engagements-interviews'

import { GetEngagementJobDetailsDocument } from './data/get-engagement-job-details.staff.gql.types'
import { EngagementJobDetailsDetailedList } from './components'

interface Props {
  engagementId: string
  labelColumnWidth?: number
}

const EngagementJobDetails = ({ engagementId, labelColumnWidth }: Props) => {
  const { loading, data, refetch } = useGetNode(
    GetEngagementJobDetailsDocument
  )({
    engagementId
  })

  useMessageListener(
    [ENGAGEMENT_UPDATED, INTERVIEW_UPDATED, INTERVIEW_SCHEDULED],
    ({ engagementId: id }) => id === engagementId && refetch()
  )

  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Job Details'
        labelColumnWidth={labelColumnWidth}
        columns={1}
        items={7}
      />
    )
  }

  if (!data?.job) {
    return null
  }

  const { job } = data

  return (
    <Section
      variant='withHeaderBar'
      title='Job Details'
      data-testid='engagement-job-details-section'
    >
      <EngagementJobDetailsDetailedList
        labelColumnWidth={labelColumnWidth}
        job={job}
      />
    </Section>
  )
}

export default EngagementJobDetails
