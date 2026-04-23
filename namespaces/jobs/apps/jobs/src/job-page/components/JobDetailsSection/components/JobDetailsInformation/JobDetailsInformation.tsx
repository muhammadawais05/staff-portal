import React from 'react'
import { Typography } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { SubSection, DescriptionFormatter } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'

import {
  JOB_GENERAL_DETAILS_BATCH_KEY,
  JOB_INFORMATION_TITLE
} from '../../config'
import { GetJobDetailsInformationDocument } from './data/get-job-details-information/get-job-details-information.staff.gql.types'
import JobDetailsInformationSkeletonLoader from './JobDetailsInformationSkeletonLoader'
import JobDetailedList from './components/JobDetailedList'

interface Props {
  jobId: string
}

const JobDetailsInformation = ({ jobId }: Props) => {
  const { data, loading, refetch } = useQuery(
    GetJobDetailsInformationDocument,
    {
      variables: { jobId },
      context: { [BATCH_KEY]: JOB_GENERAL_DETAILS_BATCH_KEY }
    }
  )

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  if (loading && !data) {
    return <JobDetailsInformationSkeletonLoader />
  }

  if (!data?.node) {
    return null
  }

  return (
    <>
      <SubSection
        title={JOB_INFORMATION_TITLE}
        data-testid='job-details-information'
        last={!data?.node?.description}
      >
        <JobDetailedList
          job={data.node}
          canViewOpportunities={data.viewer.permits.canViewOpportunities}
        />
      </SubSection>

      {data?.node?.description && (
        <SubSection
          last
          title='Job Description'
          data-testid='job-details-description'
        >
          <Typography size='medium' as='div'>
            <DescriptionFormatter
              blockSpacing='small'
              text={data.node.description}
            />
          </Typography>
        </SubSection>
      )}
    </>
  )
}

export default JobDetailsInformation
