import React, { memo, useMemo } from 'react'
import { Container } from '@toptal/picasso'
import { TalentOperations } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import {
  JobCandidateOperationsFragment,
  PublicLink,
  SendTalentToJobButton
} from '@staff-portal/talents'

import AddTalentToJobFavoritesButton from './components/AddTalentToJobFavoritesButton/AddTalentToJobFavoritesButton'
import RemoveTalentFromJobFavoritesButton from './components/RemoveTalentFromJobFavoritesButton/RemoveTalentFromJobFavoritesButton'
import RequestAvailabilityButton from './components/RequestAvailabilityButton/RequestAvailabilityButton'
import { getPublicProfileUrl } from './services/get-public-profile-url/get-public-profile-url'
import { getSendToJobUrl } from './services/get-send-to-job-url/get-send-to-job-url'

interface Props {
  talentId: string
  talentName: string
  talentResumeUrl: string
  talentSendToJobUrl?: string | null
  talentSuspended?: boolean | null
  createTalentAvailabilityRequestOperation?: TalentOperations['createTalentAvailabilityRequest']
  jobId?: string
  jobClientId?: string
  jobClientName?: string
  addTalentToJobFavoritesOperation?: JobCandidateOperationsFragment['addTalentToJobFavorites']
  removeTalentFromJobFavoritesOperation?: JobCandidateOperationsFragment['removeTalentFromJobFavorites']
}

export const TalentListItemActions = ({
  talentId,
  talentName,
  talentResumeUrl,
  talentSendToJobUrl,
  talentSuspended,
  createTalentAvailabilityRequestOperation,

  jobId,
  jobClientId,
  jobClientName,
  addTalentToJobFavoritesOperation,
  removeTalentFromJobFavoritesOperation
}: Props) => {
  const publicProfileUrl = useMemo(
    () => getPublicProfileUrl(talentResumeUrl, talentId, jobId),
    [talentResumeUrl, talentId, jobId]
  )

  const sendToJobUrl = useMemo(
    () => getSendToJobUrl(talentSendToJobUrl, jobId),
    [talentSendToJobUrl, jobId]
  )

  return (
    <>
      {jobId ? (
        <PublicLink url={publicProfileUrl} data-testid='public-resume-button'>
          View Resume
        </PublicLink>
      ) : (
        <PublicLink url={publicProfileUrl}>Public Profile</PublicLink>
      )}

      {jobId && (
        <>
          <Operation
            operation={addTalentToJobFavoritesOperation}
            render={disabled => (
              <Container left='small'>
                <AddTalentToJobFavoritesButton
                  disabled={disabled}
                  talentId={talentId}
                  jobId={jobId}
                />
              </Container>
            )}
          />

          <Operation
            operation={removeTalentFromJobFavoritesOperation}
            render={disabled => (
              <Container left='small'>
                <RemoveTalentFromJobFavoritesButton
                  disabled={disabled}
                  talentId={talentId}
                  jobId={jobId}
                />
              </Container>
            )}
          />
        </>
      )}

      <RequestAvailabilityButton
        talentId={talentId}
        createTalentAvailabilityRequestOperation={
          createTalentAvailabilityRequestOperation
        }
        jobId={jobId}
        clientId={jobClientId}
        clientName={jobClientName}
      />

      {!!sendToJobUrl && (
        <Container left='small'>
          <SendTalentToJobButton
            target='_blank'
            fullName={talentName}
            suspended={talentSuspended}
            sendToJobUrl={sendToJobUrl}
          />
        </Container>
      )}
    </>
  )
}

export default memo(TalentListItemActions)
