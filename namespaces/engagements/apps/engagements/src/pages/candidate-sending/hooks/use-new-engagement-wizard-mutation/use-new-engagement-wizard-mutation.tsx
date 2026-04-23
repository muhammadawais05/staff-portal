import { useMutation } from '@staff-portal/data-layer-service'
import {
  EngagementStatus,
  NewEngagementWizardAttributes,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useNavigate } from '@staff-portal/navigation'

import { SubmitNewEngagementWizardDocument } from '../../data/submit-new-engagement-wizard'
import useCandidateSendingContext from '../use-candidate-sending-context'

const useNewEngagementWizardMutation = () => {
  const navigate = useNavigate()
  const { handleMutationResult } = useHandleMutationResult()
  const {
    setNewEngagementId,
    setNewEngagementWizardMutationPayload,
    setCurrentStep,
    nextStep
  } = useCandidateSendingContext()

  const [submitNewEngagementWizard] = useMutation(
    SubmitNewEngagementWizardDocument
  )

  const handleSubmit = async (attributes: NewEngagementWizardAttributes) => {
    if (!attributes) {
      return
    }

    const { data: mutationData } = await submitNewEngagementWizard({
      variables: { input: { attributes } }
    })

    return handleMutationResult({
      mutationResult: mutationData?.submitNewEngagementWizard,
      onSuccessAction: () => {
        const newEngagementId =
          mutationData?.submitNewEngagementWizard?.engagement?.id
        const engagementStatus =
          mutationData?.submitNewEngagementWizard?.engagement?.status
        const jobWebResource =
          mutationData?.submitNewEngagementWizard?.engagement?.job?.webResource

        if (
          engagementStatus === EngagementStatus.DRAFT &&
          jobWebResource?.url
        ) {
          navigate(jobWebResource.url)

          return
        }

        if (newEngagementId) {
          setNewEngagementId(newEngagementId)
          setNewEngagementWizardMutationPayload(
            mutationData?.submitNewEngagementWizard ?? null
          )
          setCurrentStep(nextStep ?? NewEngagementWizardStep.NEXT)
        }
      }
    })
  }

  return handleSubmit
}

export default useNewEngagementWizardMutation
