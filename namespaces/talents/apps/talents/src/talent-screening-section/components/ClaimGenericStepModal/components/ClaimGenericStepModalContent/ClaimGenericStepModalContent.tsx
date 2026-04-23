import React, { useCallback } from 'react'
import { PromptModal } from '@staff-portal/modals-service'
import {
  MutationResult,
  useModalFormChangeHandler
} from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { RoleStepNextActionFragment } from '../../../../data/role-step-next-action-fragment'
import { CLAIM_STEP_MUTATION_DOCUMENT_MAPPING } from './../../configs'
import { ClaimGenericMainActions } from './../../types'
import { ClaimGenericRoleStepMutation } from './../../data/claim-generic-role-step/claim-generic-role-step.staff.gql.types'
import { ClaimPortfolioReviewStepMutation } from './../../data/claim-portfolio-review-step/claim-portfolio-review-step.staff.gql.types'

export interface Props {
  roleStepId: string
  talentId: string
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  stepTitle: string
  message?: string
  actionName: ClaimGenericMainActions
}

const ClaimGenericStepModalContent = ({
  roleStepId,
  talentId,
  onSuccess,
  hideModal,
  stepTitle,
  message,
  actionName
}: Props) => {
  const mutationDocument = CLAIM_STEP_MUTATION_DOCUMENT_MAPPING[actionName]

  const { handleSubmit: handleMutationSubmit, loading: mutationLoading } =
    useModalFormChangeHandler<
      ClaimGenericRoleStepMutation | ClaimPortfolioReviewStepMutation,
      MutationResult & RoleStepNextActionFragment
    >({
      mutationDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage: `The ${stepTitle} Step was successfully claimed and assigned to you.`,
        onSuccessAction: mutationResult => {
          hideModal()
          onSuccess?.(mutationResult)
        },
        successMessageEmitOptions: {
          type: TALENT_UPDATED,
          payload: { talentId }
        }
      }
    })

  const handleSubmit = useCallback(
    async () => handleMutationSubmit({ roleStepId }),
    [roleStepId, handleMutationSubmit]
  )

  return (
    <PromptModal
      open
      onClose={hideModal}
      loading={mutationLoading}
      title={`Claim ${stepTitle}`}
      message={message}
      submitText={`Claim ${stepTitle} Step`}
      onSubmit={handleSubmit}
    />
  )
}

export default ClaimGenericStepModalContent
