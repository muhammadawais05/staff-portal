import React, { memo } from 'react'
import { Section, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'

import { useGetTalentListItem } from './data/get-talent-list-item/get-talent-list-item.staff.gql'
import TalentListItemHeader from '../../components/TalentListItemHeader/TalentListItemHeader'
import {
  JobCandidateTalentListItemFragment,
  TalentListJobDataFragment
} from '../../data'
import TalentListItemActions from '../TalentListItemActions/TalentListItemActions'
import TalentListItemContent from '../TalentListItemContent/TalentListItemContent'
import TalentListItemSkeletonLoader from '../../components/TalentListItemSkeletonLoader/TalentListItemSkeletonLoader'

type Props = {
  talentId: string
  isBestMatchQueryEnabled: boolean
  jobId?: string
  jobData?: TalentListJobDataFragment | null
  jobCandidate?: JobCandidateTalentListItemFragment
  talentIndex: number
}

const TalentListItem = ({
  talentId,
  jobId,
  jobCandidate,
  jobData,
  isBestMatchQueryEnabled,
  talentIndex
}: Props) => {
  const { data: talent, loading } = useGetTalentListItem(
    talentId,
    jobId,
    talentIndex
  )

  if (loading && !talent) {
    return <TalentListItemSkeletonLoader />
  }

  if (!talent) {
    return null
  }

  return (
    <Section
      data-testid='talent-list-item'
      variant='withHeaderBar'
      title={
        <TypographyOverflow weight='inherit' tooltipContent={talent.fullName}>
          <LinkWrapper
            wrapWhen={Boolean(talent.webResource.url)}
            href={talent.webResource.url as string}
            data-testid='talent-link'
          >
            {talent.fullName}
          </LinkWrapper>
        </TypographyOverflow>
      }
      actions={
        <TalentListItemActions
          talentId={talent.id}
          talentName={talent.fullName}
          talentResumeUrl={talent.resumeUrl}
          talentSendToJobUrl={talent.sendToJobUrl}
          talentSuspended={talent.suspended}
          createTalentAvailabilityRequestOperation={
            jobCandidate?.operations.createTalentAvailabilityRequest
          }
          jobId={jobId}
          jobClientId={jobData?.client.id}
          jobClientName={jobData?.client.fullName}
          addTalentToJobFavoritesOperation={
            talent.operations.addTalentToJobFavorites
          }
          removeTalentFromJobFavoritesOperation={
            talent.operations.removeTalentFromJobFavorites
          }
        />
      }
    >
      <TalentListItemHeader
        talentId={talent.id}
        talentName={talent.fullName}
        talentPhoto={talent.photo?.small}
        ofacStatus={talent.ofacStatus}
        ofacStatusComment={talent.ofacStatusComment}
        jobInterestStatus={jobCandidate?.interestStatus}
        jobNotInterestedReason={jobCandidate?.notInterestedReason}
        talentPartnerName={talent.talentPartner?.webResource?.text}
        talentPartnerUrl={talent.talentPartner?.webResource?.url}
      />

      <TalentListItemContent
        talent={talent}
        jobCandidate={jobCandidate}
        jobData={jobData}
        isBestMatchQueryEnabled={isBestMatchQueryEnabled}
      />
    </Section>
  )
}

export default memo(TalentListItem)
