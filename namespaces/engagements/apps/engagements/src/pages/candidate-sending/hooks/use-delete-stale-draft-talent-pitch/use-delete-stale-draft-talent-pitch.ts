import { useMutation } from '@staff-portal/data-layer-service'
import { useEffect, useState } from 'react'

import { DeleteStaleDraftTalentPitchDocument } from '../../data/delete-stale-draft-talent-pitch'
import useCandidateSendingContext from '../use-candidate-sending-context'

const useDeleteStaleDraftTalentPitch = () => {
  const { jobId, talentId } = useCandidateSendingContext()
  const [isMutationCompleted, setIsMutationCompleted] = useState(false)

  const shouldDeleteStaleDraftTalentPitch = !!jobId && !!talentId

  const [deleteStaleDraftTalentPitch, { loading }] = useMutation(
    DeleteStaleDraftTalentPitchDocument,
    {
      variables: { jobId, talentId },
      onCompleted: () => {
        setIsMutationCompleted(true)
      },
      onError: () => {
        // On `platform` in case of any error UI anyway is shown
        setIsMutationCompleted(true)
      }
    }
  )

  useEffect(() => {
    if (shouldDeleteStaleDraftTalentPitch) {
      deleteStaleDraftTalentPitch()
    }
  }, [deleteStaleDraftTalentPitch, shouldDeleteStaleDraftTalentPitch])

  return {
    loading,
    isCompleted: shouldDeleteStaleDraftTalentPitch ? isMutationCompleted : true
  }
}

export default useDeleteStaleDraftTalentPitch
