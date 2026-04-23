import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useCallback, useRef, useState } from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import {
  MutationResult,
  useModalFormChangeHandler
} from '@staff-portal/mutation-result-handlers'
import { RoleFlags } from '@staff-portal/role-flags'
import { ClaimerFragment } from '@staff-portal/facilities'
import { OnlineTestsFragment, TALENT_UPDATED } from '@staff-portal/talents'

import { RoleStepNextActionFragment } from '../../../../data'
import { getClaimerName, getClaimRoleStepMessage } from '../../../../utils'
import OnlineTestOptions from '../../../OnlineTestOptions'
import { StepClaimerSelect } from '../../../StepClaimerSelect'
import { OnlineTestDataFragment } from '../../data/get-online-test-data/get-online-test-data.staff.gql.types'
import {
  ClaimOnlineTestRoleStepDocument,
  ClaimOnlineTestRoleStepMutation
} from '../../data/claim-online-test-role-step/claim-online-test-role-step.staff.gql.types'

interface FormData {
  claimerId?: string
  onlineTestId?: string
  testAttemptId?: string
}

export interface Props {
  claimers: ClaimerFragment[]
  onlineTestData: NonNullable<OnlineTestDataFragment['node']>
  onlineTests: OnlineTestsFragment[]
  roleStepId: string
  onSuccess?: (mutationResult: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ClaimOnlineTestStepModalForm = ({
  claimers,
  onlineTestData,
  onlineTests,
  roleStepId,
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const stepTitle = onlineTestData.step.title
  const talent = onlineTestData.talent
  const claimerId = onlineTestData.claimer?.id

  const {
    fullName: talentFullName,
    talentPartner,
    onlineTestAttempts,
    roleFlags
  } = talent

  const currentUser = useGetCurrentUser()
  const [selectedClaimer, setSelectedClaimer] = useState<ClaimerFragment>()

  const initialValues = useRef<FormData>({
    claimerId
  })

  const { handleSubmit: handleMutationSubmit, loading: mutationLoading } =
    useModalFormChangeHandler<
      ClaimOnlineTestRoleStepMutation,
      MutationResult & RoleStepNextActionFragment
    >({
      mutationDocument: ClaimOnlineTestRoleStepDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage: `The ${stepTitle} step was successfully claimed and assigned to ${getClaimerName(
          currentUser,
          selectedClaimer
        )}.`,
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
    async (formData: FormData) => {
      return handleMutationSubmit({
        roleStepId,
        claimerId: formData.claimerId,
        onlineTestId: formData.onlineTestId,
        testAttemptId: formData.testAttemptId
      })
    },
    [roleStepId, handleMutationSubmit]
  )

  const message = getClaimRoleStepMessage({
    stepTitle,
    talentFullName,
    talentPartnerFullName: talentPartner?.fullName
  })

  return (
    <ModalForm<FormData>
      initialValues={initialValues.current}
      title={`Claim ${stepTitle}`}
      onSubmit={handleSubmit}
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>{message}</Typography>

          {Boolean(roleFlags?.nodes.length) && (
            <Container top='small'>
              <RoleFlags roleId={talentId} />
            </Container>
          )}
        </Container>

        <Container bottom='medium'>
          <Container bottom='xsmall'>
            <StepClaimerSelect
              claimers={claimers}
              value={currentUser?.id}
              setSelectedClaimer={setSelectedClaimer}
              name='claimerId'
              label='Claimer'
              width='full'
              autoFocus
              required
            />
          </Container>
          <Typography size='xsmall'>
            Assign step to the recruiter that will check test results.
          </Typography>
        </Container>

        <OnlineTestOptions
          onlineTests={onlineTests}
          onlineTestAttempts={onlineTestAttempts?.nodes}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button
          variant='secondary'
          onClick={hideModal}
          disabled={mutationLoading}
        >
          Cancel
        </Button>
        <Form.SubmitButton variant='positive' loading={mutationLoading}>
          Claim Step
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ClaimOnlineTestStepModalForm
