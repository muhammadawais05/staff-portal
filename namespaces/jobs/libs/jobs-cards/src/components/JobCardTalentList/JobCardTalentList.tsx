import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { JobStatus } from '@staff-portal/graphql/staff'
import { Maybe } from '@toptal/picasso/utils'

import JobCardTalentItem from '../JobCardTalentItem/JobCardTalentItem'
import JobCardTalentListLoading from '../JobCardTalentListLoading/JobCardTalentListLoading'
import { useGetJobTalents } from './data/get-job-talents/get-job-talents.staff.gql'

export interface Props {
  jobId: string
  jobStatus: Maybe<string>
}

const JobCardTalentList = ({ jobId, jobStatus }: Props) => {
  const onlyHiredTalents = jobStatus === JobStatus.ACTIVE

  const { data, loading } = useGetJobTalents({ jobId, onlyHiredTalents })

  const renderItems = () =>
    data?.length ? (
      data.map(engagement => (
        <JobCardTalentItem key={engagement.id} engagement={engagement} />
      ))
    ) : (
      <Container flex alignItems='center' padded='large'>
        <Typography size='medium'>
          Currently, there are no talents to display.
        </Typography>
      </Container>
    )

  return (
    <Container>
      {loading ? <JobCardTalentListLoading /> : renderItems()}
    </Container>
  )
}

export default JobCardTalentList
