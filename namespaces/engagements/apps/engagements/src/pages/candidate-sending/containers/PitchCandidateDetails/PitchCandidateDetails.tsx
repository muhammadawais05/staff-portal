import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'

import { PitchCandidate } from '../../components'
import { PitchStepDataFragment } from '../../data/get-pitch-step-data'

export type Props = {
  pitchStepData?: Maybe<PitchStepDataFragment>
  loading: boolean
}

const PitchCandidateDetails = ({ pitchStepData, loading }: Props) => {
  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Candidate'
        columns={1}
        items={5}
        labelColumnWidth={10}
      />
    )
  }

  if (!pitchStepData) {
    return null
  }

  return <PitchCandidate candidate={pitchStepData} />
}

export default PitchCandidateDetails
