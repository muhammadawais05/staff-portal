import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Typography, Container } from '@toptal/picasso'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'
import { TalentAvailableSpecialization } from '@staff-portal/graphql/staff'

import { useAddTalentToRemoteConsulting } from '../../data/add-talent-to-remote-consulting'
import { useGetAvailableTalentSpecializations } from '../../data/get-available-talent-specializations'

export interface Props {
  hideModal: () => void
  talentId: string
}

const AddTalentToRemoteConsultingModal = ({ hideModal, talentId }: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const { loading: initialLoading, availableSpecializations } =
    useGetAvailableTalentSpecializations({
      talentId,
      availableSpecializationType:
        TalentAvailableSpecialization.REMOTE_CONSULTING,
      onError: () =>
        showError(
          'Unable to get list of available talent remote consulting specializations'
        )
    })

  const specializationOptions = useMemo(
    () =>
      availableSpecializations.map(({ id, title }) => ({
        value: id,
        text: title
      })),
    [availableSpecializations]
  )

  const [addTalentToRemoteConsulting, { loading }] =
    useAddTalentToRemoteConsulting({
      talentId,
      onCompleted: data => {
        if (data.addTalentToRemoteConsulting?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
          hideModal()
        }
      },
      onError: () => showError('Unable to add talent to remote consulting.')
    })

  const handleSubmit = async ({
    specializationId
  }: {
    specializationId: string
  }) => {
    const { data } = await addTalentToRemoteConsulting({
      variables: {
        input: {
          talentId,
          specializationId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.addTalentToRemoteConsulting,
      successNotificationMessage: `Added to Remote Consulting`
    })
  }

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'addTalentToRemoteConsulting'
      }}
    >
      {!initialLoading ? (
        <Form onSubmit={handleSubmit}>
          <Modal.Title>Add to Remote Consulting</Modal.Title>
          <Modal.Content>
            <Container bottom='small'>
              <Typography size='medium'>
                Are you sure you want to add the talent to Remote Consulting?
              </Typography>
            </Container>
            <Container bottom='medium'>
              <Typography size='medium'>
                Performing this action will approve a specialization application
                to your selected Remote Consulting specialization.
              </Typography>
            </Container>
            <Form.Select
              width='full'
              label='Specialization'
              name='specializationId'
              required
              options={specializationOptions}
              loading={initialLoading}
              data-testid='add-talent-to-remote-consulting-modal-specialization'
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={hideModal} variant='secondary' disabled={loading}>
              Cancel
            </Button>
            <Form.SubmitButton variant='positive'>
              Add to Remote Consulting
            </Form.SubmitButton>
          </Modal.Actions>
        </Form>
      ) : (
        <ModalSuspender />
      )}
    </Modal>
  )
}

export default AddTalentToRemoteConsultingModal
