import { useCallback } from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useNotifications } from '@staff-portal/error-handling'
import {
  RejectedApplicationFeedbackInput,
  NewEngagementWizardStep
} from '@staff-portal/graphql/staff'

import { FormValues } from '../../CandidateSendingFeedbackStepForm'
import getIsFormDirty from '../get-is-form-dirty/get-is-form-dirty'
import getFilteredInternalFeedback from '../get-filtered-internal-feedback/get-filtered-internal-feedback'
import { CreateTalentRejectionFeedbackDocument } from '../../data/create-talent-rejection-feedback/create-talent-rejection-feedback.staff.gql.types'
import { useCandidateSendingContext } from '../../../../hooks'

const useHandleSubmit = () => {
  const { goToNextStep } = useCandidateSendingContext()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [mutate] = useMutation(CreateTalentRejectionFeedbackDocument, {
    onError: () => showError('An error occurred, the feedback was not sent.')
  })

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      const isDirty = getIsFormDirty(values)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rejectedApplications, ...restValues } = values
      const feedbacksAttributes: RejectedApplicationFeedbackInput[] = []

      for (const [key, value] of Object.entries(restValues)) {
        const { feedback, internalFeedback } = value

        feedbacksAttributes.push({
          applicationId: key,
          feedback: feedback ?? '',
          internalFeedback: getFilteredInternalFeedback({ internalFeedback })
        })
      }

      if (isDirty) {
        const { data } = await mutate({
          variables: {
            input: { feedbacksAttributes }
          }
        })

        return handleMutationResult({
          mutationResult: data?.createTalentRejectionFeedback,
          onSuccessAction: () => {
            goToNextStep([NewEngagementWizardStep.NEXT])
          }
        })
      }

      return goToNextStep([NewEngagementWizardStep.NEXT])
    },
    [goToNextStep, handleMutationResult, mutate]
  )

  return { handleSubmit }
}

export default useHandleSubmit
