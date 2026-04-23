import { useMessageListener } from '@toptal/staff-portal-message-bus'
import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { TalentAvatar, TalentLink, PublicLink } from '@staff-portal/talents'
import { getTalentProfileLinkTarget, JOB_UPDATED } from '@staff-portal/jobs'

import { GetHiredTalentContentDocument } from '../../data'
import HiredTalentRowContentLayout from '../HiredTalentRowContentLayout'
import {
  TalentDetailsSkeletonLoader,
  HiredTalentDetailedList
} from './components'

interface Props {
  engagementId: string
}

const HiredTalentRowContentTalentDetails = ({ engagementId }: Props) => {
  const { data, loading, initialLoading, refetch } = useQuery(
    GetHiredTalentContentDocument,
    {
      variables: { engagementId },
      throwOnError: true
    }
  )

  useMessageListener(JOB_UPDATED, () => refetch())
  useMessageListener(
    ENGAGEMENT_UPDATED,
    ({ engagementId: id }) => id === engagementId && refetch()
  )

  const engagement = data?.node
  const talent = engagement?.talent
  const talentPartnerName = talent?.talentPartner?.webResource?.text
  const talentPartnerUrl = talent?.talentPartner?.webResource?.url
  const isPublicProfileUrl = engagement?.resumeUrl === talent?.resumeUrl

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<TalentDetailsSkeletonLoader />}
    >
      {engagement && talent && (
        <HiredTalentRowContentLayout
          avatar={
            <TalentAvatar
              fullName={talent.fullName}
              photo={talent.photo?.default}
              talentPartnerName={talentPartnerName}
              talentPartnerUrl={talentPartnerUrl}
              avatarSize='small'
              badgeSize='large'
            />
          }
          list={<HiredTalentDetailedList engagement={engagement} />}
          publicProfile={
            isPublicProfileUrl ? (
              <PublicLink url={talent.resumeUrl} variant='primary'>
                Public Profile
              </PublicLink>
            ) : (
              <PublicLink
                url={engagement.resumeUrl || undefined}
                variant='primary'
                data-testid='public-resume-button'
              >
                View Resume
              </PublicLink>
            )
          }
          talentLink={
            <TalentLink
              fullName={talent.fullName}
              size='large'
              weight='semibold'
              url={talent.webResource.url}
              target={getTalentProfileLinkTarget(talent.webResource.url)}
            />
          }
          data-testid='hired-talent-row-content'
        />
      )}
    </ContainerLoader>
  )
}

export default HiredTalentRowContentTalentDetails
