import { useGetNode } from '@staff-portal/data-layer-service'
import { getRoleTypeText } from '@staff-portal/facilities'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { ScrollToTop } from '@staff-portal/ui'
import React, { useMemo } from 'react'

import {
  CandidateSendingNextLoader,
  TalentAssigned,
  TalentSent
} from '../../components'
import { useCandidateSendingContext } from '../../hooks'
import TalentSentForReview from '../TalentSentForReview'
import { GetCandidateSendingEngagementDocument } from './data'

const CandidateSendingNextStep = () => {
  const { hasPendingAssignment, newEngagementId: engagementId } =
    useCandidateSendingContext()
  const { data, loading } = useGetNode(GetCandidateSendingEngagementDocument)(
    {
      engagementId: engagementId as string
    },
    { skip: !engagementId }
  )

  const content = useMemo(() => {
    if (loading) {
      return <CandidateSendingNextLoader />
    }

    if (!data || !engagementId) {
      return null
    }

    const {
      talent,
      job,
      status,
      webResource: { url: engagementUrl }
    } = data
    const talentType = getRoleTypeText(talent?.type).toLowerCase()
    const isPendingApproval = status === EngagementStatus.PENDING_APPROVAL

    if (hasPendingAssignment) {
      return (
        <TalentAssigned
          talentType={talentType}
          talentLink={talent?.webResource}
          jobLink={job?.webResource}
        />
      )
    }

    if (isPendingApproval) {
      return (
        <TalentSentForReview
          engagementId={engagementId}
          talentType={talentType}
          jobLink={job?.webResource}
        />
      )
    }

    return (
      <TalentSent
        talentType={talentType}
        engagementUrl={engagementUrl}
        talentLink={talent?.webResource}
        jobLink={job?.webResource}
      />
    )
  }, [data, engagementId, hasPendingAssignment, loading])

  return (
    <>
      <ScrollToTop />
      {content}
    </>
  )
}

export default CandidateSendingNextStep
