import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'

import { useCandidateSendingContext } from '../../hooks'
import TalentAvailability from '../TalentAvailability'
import { AvailabilityStepTalentAvailabilityDataFragment } from '../../data/get-availability-step-talent-availability-data'

type Props = {
  availabilityData?: Maybe<AvailabilityStepTalentAvailabilityDataFragment>
  availabilityDataLoading: boolean
}

const CandidateSendingTalentAvailabilitySection = ({
  availabilityData,
  availabilityDataLoading
}: Props) => {
  const { talentId } = useCandidateSendingContext()

  if (talentId && availabilityDataLoading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Talent Availability'
        columns={1}
        items={5}
        labelColumnWidth={10}
      />
    )
  }

  if (!availabilityData) {
    return null
  }

  return <TalentAvailability availabilityData={availabilityData} />
}

export default CandidateSendingTalentAvailabilitySection
