import React, { memo } from 'react'
// eslint-disable-next-line no-restricted-imports
import { Button, Container, Link as PicassoLink } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { JobStatus } from '@staff-portal/graphql/staff'
import { ActionLoader, WrapWithTooltip } from '@staff-portal/ui'
import { Operation } from '@staff-portal/operations'
import { ClaimAndApproveJobButton, SearchCandidatesButton } from '@staff-portal/jobs'
import { HistoryButton } from '@staff-portal/chronicles'
import { ReopenEngagementAndApproveTrialButton } from '@staff-portal/engagements'

import { JobPageFragment } from '../../pages/JobPage/data/get-job-page-data'
import JobMoreActions from '../JobMoreActions'
import CloneJobButton from '../CloneJobButton'

export interface Props {
  loading: boolean
  job?: JobPageFragment | null
}

const JobActions = ({ loading, job }: Props) => {
  if (loading || !job) {
    return (
      <>
        <ActionLoader />
        <ActionLoader />
        <ActionLoader />
        <ActionLoader />
        <ActionLoader circular />
      </>
    )
  }

  const shouldShowCloneButton =
    job.status && [JobStatus.REMOVED, JobStatus.REJECTED].includes(job.status)

  return (
    <Container flex data-testid='job-actions'>
      {job.sendCandidateUrl && (
        <Container right='xsmall'>
          <Button
            as={Link as typeof PicassoLink}
            variant='positive'
            size='small'
            noUnderline
            href={job.sendCandidateUrl}
            data-testid='send-candidate-link'
          >
            Send Candidate
          </Button>
        </Container>
      )}

      <Operation
        operation={job.operations.approveJob}
        render={disabled => (
          <Container right='xsmall'>
            <ClaimAndApproveJobButton jobId={job.id} disabled={disabled} />
          </Container>
        )}
      />

      {job.jobCurrentEngagement?.id && (
        <ReopenEngagementAndApproveTrialButton
          operation={
            job.jobCurrentEngagement.operations.reopenExpiredEngagement
          }
          engagementId={job.jobCurrentEngagement.id}
        />
      )}

      {shouldShowCloneButton && (
        <Container right='xsmall'>
          <CloneJobButton
            jobId={job.id}
            initialOperation={job.operations?.cloneJob}
          />
        </Container>
      )}

      {job.historyLink?.url && (
        <Container right='xsmall'>
          <HistoryButton entity='Job' id={job.id} />
        </Container>
      )}

      <WrapWithTooltip
        enableTooltip={!job.searchAllowed}
        content='Search Candidate won’t be available for 12 hours because this job has automated availability requests.'
      >
        <SearchCandidatesButton
          searchCandidatesUrl={job.searchCandidatesUrl}
          searchApplicantsUrl={job.searchApplicantsUrl}
          searchRejectedTalentsUrl={job.searchRejectedTalentsUrl}
          disabled={!job.searchAllowed}
        />
      </WrapWithTooltip>

      <JobMoreActions job={job} />
    </Container>
  )
}

export default memo(JobActions)
