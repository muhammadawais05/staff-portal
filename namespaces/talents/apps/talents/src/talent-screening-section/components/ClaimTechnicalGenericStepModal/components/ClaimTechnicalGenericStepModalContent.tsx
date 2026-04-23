/* eslint-disable max-statements */
import { Modal } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useRef, useState } from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { ClaimerFragment } from '@staff-portal/facilities'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { RoleStepNextActionFragment } from '../../../data/role-step-next-action-fragment'
import { getClaimRoleStepMessage } from '../../../utils'
import { StepClaimerSelect } from '../../StepClaimerSelect'
import { CLAIM_TECHNICAL_STEP_MUTATION_HOOK_MAPPING } from '../configs'
import {
  getClaimTechnicalGenericStepMutationResult,
  getClaimerName
} from '../utils'
import { ClaimTechnicalGenericMainActions } from '../types'
import { ClaimTechnicalGenericStepFragment } from '../data'

interface FormData {
  roleStepId: string
  claimerId?: string
}

interface Props {
  claimers: ClaimerFragment[]
  stepData: ClaimTechnicalGenericStepFragment
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ClaimTechnicalGenericStepModalContent = ({
  hideModal,
  onSuccess,
  claimers,
  stepData,
  talentId
}: Props) => {
  const currentUser = useGetCurrentUser()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [selectedClaimer, setSelectedClaimer] = useState<
    ClaimerFragment | undefined
  >()
  const emitMessage = useMessageEmitter()

  const stepTitle = stepData.step.title
  const talentFullName = stepData.talent.fullName
  const talentPartnerFullName = stepData.talent.talentPartner?.fullName
  const roleStepId = stepData.id
  const actionName = stepData.mainAction
    .actionName as ClaimTechnicalGenericMainActions
  const claimer = stepData.claimer

  const useClaimMutation =
    CLAIM_TECHNICAL_STEP_MUTATION_HOOK_MAPPING[actionName]

  const [claimStep, { loading }] = useClaimMutation({
    onError: () => showError('Unable to claim step.')
  })

  const initialValues = useRef<FormData>({
    roleStepId,
    claimerId: claimer?.id
  })

  const handleSubmit = async ({ claimerId }: FormData) => {
    const { data } = await claimStep({
      variables: {
        input: {
          roleStepId,
          claimerId: claimerId
        }
      }
    })

    const mutationResult = getClaimTechnicalGenericStepMutationResult({
      actionName,
      data
    })

    return handleMutationResult({
      mutationResult,
      successNotificationMessage: `The ${stepTitle} step was successfully claimed and assigned to ${getClaimerName(
        currentUser,
        selectedClaimer
      )}.`,
      onSuccessAction: result => {
        hideModal()
        onSuccess?.(result)
        emitMessage(TALENT_UPDATED, { talentId })
      }
    })
  }

  const message = getClaimRoleStepMessage({
    stepTitle,
    talentFullName,
    talentPartnerFullName
  })

  return (
    <>
      <Modal.Title>Claim {stepTitle}</Modal.Title>

      <Form<FormData>
        onSubmit={handleSubmit}
        initialValues={initialValues.current}
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>{message}</Typography>
          </Container>

          <Container bottom='medium'>
            <Typography size='medium' weight='semibold'>
              Before claiming the step, you need to send the screening
              invitation from the drop-down menu of the specific step.
            </Typography>
          </Container>

          <StepClaimerSelect
            claimers={claimers}
            value={currentUser?.id}
            setSelectedClaimer={setSelectedClaimer}
            name='claimerId'
            label='Claimer'
            width='full'
            required
          />

          <Container bottom='medium'>
            <Typography size='medium'>
              Assign step to the recruiter that will check test results.
            </Typography>
          </Container>
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal} disabled={loading}>
            Cancel
          </Button>
          <Form.SubmitButton
            data-testid='claim-technical-step-submit'
            variant='positive'
            loading={loading}
          >
            Claim Step
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </>
  )
}

export default ClaimTechnicalGenericStepModalContent
