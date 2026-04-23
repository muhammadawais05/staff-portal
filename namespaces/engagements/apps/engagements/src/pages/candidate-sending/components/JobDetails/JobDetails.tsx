import { DetailedList as DL } from '@staff-portal/ui'
import React from 'react'
import { Section } from '@toptal/picasso'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import {
  JobStatus,
  JobTimeZoneField,
  ClientLinkField,
  JobBadges
} from '@staff-portal/jobs'
import { NO_VALUE } from '@staff-portal/config'

import {
  getCurrentEngagementCommitment,
  getWorkTypeOption
} from '../../../engagement-page/utils'
import { DesiredCommitment } from '../../../engagement-page/components'
import { GetJobCandidateDataQuery } from '../../data/get-job-candidate-data'
import SectionHeaderLink from '../SectionHeaderLink/SectionHeaderLink'

interface Props {
  job: NonNullable<GetJobCandidateDataQuery['node']>
}

const JobDetails = ({ job }: Props) => (
  <Section
    variant='withHeaderBar'
    title={
      <SectionHeaderLink
        text={job.webResource.text}
        url={job.webResource.url}
      />
    }
    subtitle={
      <JobBadges
        enterprise={job.client?.enterprise}
        rehire={job.rehire}
        automatedAvailabilityRequests={job.automatedAvailabilityRequests}
      />
    }
    data-testid='job-details'
  >
    <DL defaultValue={NO_VALUE} labelColumnWidth={10}>
      {job.postedAt && (
        <DL.Row>
          <DL.Item
            label='Job Posted'
            value={getDateDistanceFromNow(job.postedAt)}
          />
        </DL.Row>
      )}

      <DL.Row>
        <DL.Item
          label='Desired Commitment'
          value={
            <DesiredCommitment
              jobCommitment={job.commitment}
              engagementCommitment={getCurrentEngagementCommitment(
                job.engagements
              )}
              talentCount={job.talentCount}
            />
          }
        />
      </DL.Row>

      <DL.Row>
        <DL.Item
          label='Company'
          value={<ClientLinkField client={job.client} />}
        />
      </DL.Row>

      <DL.Row>
        <DL.Item
          label='Job Timezone'
          value={
            <JobTimeZoneField
              timeZonePreference={job.timeZonePreference}
              hasPreferredHours={job.hasPreferredHours}
              hoursOverlap={job.hoursOverlapEnum}
            />
          }
        />
      </DL.Row>

      <DL.Row>
        <DL.Item label='Work type' value={getWorkTypeOption(job.workType)} />
      </DL.Row>

      <DL.Row>
        <DL.Item label='Status' value={<JobStatus job={job} size='medium' />} />
      </DL.Row>
    </DL>
  </Section>
)

export default JobDetails
