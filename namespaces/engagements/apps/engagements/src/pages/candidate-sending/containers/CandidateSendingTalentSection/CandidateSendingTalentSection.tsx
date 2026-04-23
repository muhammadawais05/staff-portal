import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'
import React from 'react'

import { TalentDetails } from '../../components'
import {
  useCandidateSendingContext,
  useGetTalentCandidateData
} from '../../hooks'

const CandidateSendingTalentSection = () => {
  const { talentId } = useCandidateSendingContext()
  const { talentData, talentDataLoading } = useGetTalentCandidateData({
    talentId,
    skip: !talentId
  })

  if (talentId && talentDataLoading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Talent Details'
        columns={1}
        items={5}
        labelColumnWidth={10}
        dataTestId='candidate-sending-talent-section-skeleton-loader'
      />
    )
  }

  if (!talentData) {
    return null
  }

  return <TalentDetails talent={talentData} />
}

export default CandidateSendingTalentSection
