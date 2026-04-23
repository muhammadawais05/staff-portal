import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Typography, Container } from '@toptal/picasso'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useSendTalentToSpecialization } from '../../data/send-talent-to-specialization'
import { useGetAvailableTalentSpecializations } from '../../data/get-available-talent-specializations'

export interface Props {
  talentId: string
  talentName: string
  availableTalentSpecializations?: { id: string; title: string }[]
  hideModal: () => void
}

const SendTalentToSpecializationModal = ({
  talentId,
  talentName,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const { loading: initialLoading, availableSpecializations } =
    useGetAvailableTalentSpecializations({
      talentId,
      onError: () =>
        showError('Unable to get list of available talent specializations.')
    })

  const specializationOptions = useMemo(
    () =>
      availableSpecializations.map(({ id, title }) => ({
        value: id,
        text: title
      })),
    [availableSpecializations]
  )

  const [sendTalentToSpecialization, { loading }] =
    useSendTalentToSpecialization({
      talentId,
      onCompleted: data => {
        if (data.sendTalentToSpecialization?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
          hideModal()
        }
      },
      onError: () => showError('Unable to begin specialization application.')
    })

  const handleSubmit = async ({
    specializationId,
    comment
  }: {
    specializationId: string
    comment: string
  }) => {
    const { data } = await sendTalentToSpecialization({
      variables: {
        input: {
          talentId,
          comment,
          specializationId
        }
      }
    })

    const specializationTitle =
      availableSpecializations.find(({ id }) => id === specializationId)
        ?.title || ''

    return handleMutationResult({
      mutationResult: data?.sendTalentToSpecialization,
      successNotificationMessage: `Application for ${specializationTitle} specialization has been added.`
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
        operationName: 'sendTalentToSpecialization'
      }}
    >
      {!initialLoading ? (
        <Form onSubmit={handleSubmit}>
          <Modal.Title>Begin Specialization Application</Modal.Title>
          <Modal.Content>
            <Container bottom='large'>
              <Typography size='medium'>
                Are you sure you want to begin a new specialization application
                for {talentName}? If you choose a specialization that the talent
                has previously applied for but did not finish, the application
                will continue from where it left off.
              </Typography>
            </Container>
            <Form.Select
              width='full'
              label='Specialization'
              name='specializationId'
              placeholder='Please select a specialization'
              required
              options={specializationOptions}
              data-testid='send-talent-to-specialization-modal-specialization'
            />
            <Form.Input
              required
              width='full'
              label='Comment'
              name='comment'
              placeholder='Please specify a reason.'
              multiline
              rows={4}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={hideModal} variant='secondary' disabled={loading}>
              Cancel
            </Button>
            <Form.SubmitButton variant='positive'>
              Begin Specialization Application
            </Form.SubmitButton>
          </Modal.Actions>
        </Form>
      ) : (
        <ModalSuspender />
      )}
    </Modal>
  )
}

export default SendTalentToSpecializationModal
