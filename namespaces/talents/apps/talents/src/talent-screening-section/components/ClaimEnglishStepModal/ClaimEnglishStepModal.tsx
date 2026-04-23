import React, { useCallback } from 'react'
import {
  MutationResult,
  useModalFormChangeHandler
} from '@staff-portal/mutation-result-handlers'
import { useQuery } from '@staff-portal/data-layer-service'
import { PromptModal } from '@staff-portal/modals-service'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { RoleStepNextActionFragment } from '../../data'
import { GetClaimEnglishDataDocument } from './data/get-claim-english-data/get-claim-english-data.staff.gql.types'
import {
  ClaimEnglishRoleStepDocument,
  ClaimEnglishRoleStepMutation
} from './data/claim-english-role-step/claim-english-role-step.staff.gql.types'
import { ClaimEnglishStepModalContent } from './components'

export interface Props {
  roleStepId: string
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ClaimEnglishStepModal = ({
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { data, loading, initialLoading } = useQuery(
    GetClaimEnglishDataDocument,
    {
      variables: { roleStepId }
    }
  )

  const stepTitle = data?.node?.step.title

  const { handleSubmit: handleMutationSubmit, loading: mutationLoading } =
    useModalFormChangeHandler<
      ClaimEnglishRoleStepMutation,
      MutationResult & RoleStepNextActionFragment
    >({
      mutationDocument: ClaimEnglishRoleStepDocument,
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

  const handleSubmit = useCallback(async () => {
    return handleMutationSubmit({
      roleStepId
    })
  }, [roleStepId, handleMutationSubmit])

  return (
    <PromptModal
      open
      onClose={hideModal}
      title={`Claim ${stepTitle}`}
      initialLoading={initialLoading}
      loading={loading || mutationLoading}
      message={
        <ClaimEnglishStepModalContent
          stepTitle={data?.node?.step?.title}
          talentFullName={data?.node?.talent?.fullName}
          talentPartnerFullName={data?.node?.talent?.talentPartner?.fullName}
        />
      }
      submitText={`Claim ${stepTitle} Step`}
      onSubmit={handleSubmit}
    />
  )
}

export default ClaimEnglishStepModal
