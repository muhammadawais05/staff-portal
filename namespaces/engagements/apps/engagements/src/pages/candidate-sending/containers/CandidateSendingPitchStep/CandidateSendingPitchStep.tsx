import React from 'react'

import {
  useCandidateSendingContext,
  useDeleteStaleDraftTalentPitch,
  useGetPitchStepData
} from '../../hooks'
import PitchCandidateDetails from '../PitchCandidateDetails'
import PitchEmailingSections from '../PitchEmailingSections'

const CandidateSendingPitchStep = () => {
  const { stepsAttributes } = useCandidateSendingContext()
  const {
    loading: staleDraftTalentPitchDeletedLoading,
    isCompleted: isStaleDraftTalentPitchDeleteMutationCompleted
  } = useDeleteStaleDraftTalentPitch()

  const { data, buildTalentPitchOperation, loading } = useGetPitchStepData(
    stepsAttributes,
    {
      skip: !isStaleDraftTalentPitchDeleteMutationCompleted
    }
  )

  const pitchStepLoading = staleDraftTalentPitchDeletedLoading || loading

  return (
    <>
      <PitchCandidateDetails pitchStepData={data} loading={pitchStepLoading} />

      <PitchEmailingSections
        pitchStepData={data}
        buildTalentPitchOperation={buildTalentPitchOperation}
        loading={pitchStepLoading}
      />
    </>
  )
}

export default CandidateSendingPitchStep
