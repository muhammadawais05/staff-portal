import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Typography, Container } from '@toptal/picasso'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import {
  useConvertSpecializationApplication,
  useGetAvailableTalentSpecializations
} from '../../data'

export interface Props {
  talentId: string
  specializationTitle: string
  specializationApplicationId: string
  specializationId: string
  hideModal: () => void
}

const ConvertSpecializationApplicationModal = ({
  talentId,
  specializationTitle,
  specializationApplicationId,
  specializationId,
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

  const [convertSpecializationApplication, { loading }] =
    useConvertSpecializationApplication({
      talentId,
      onCompleted: data => {
        if (data.convertSpecializationApplication?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
          hideModal()
        }
      },
      onError: () => showError('Unable to convert specialization application.')
    })

  const handleSubmit = async ({
    specializationId: selectedSpecializationId,
    comment
  }: {
    specializationId: string
    comment: string
  }) => {
    const { data } = await convertSpecializationApplication({
      variables: {
        input: {
          comment,
          specializationId: selectedSpecializationId,
          specializationApplicationId
        }
      }
    })

    const selectedSpecializationTitle =
      availableSpecializations.find(({ id }) => id === selectedSpecializationId)
        ?.title || ''

    return handleMutationResult({
      mutationResult: data?.convertSpecializationApplication,
      successNotificationMessage: `The ${specializationTitle} specialization was successfully converted to ${selectedSpecializationTitle}.`
    })
  }

  const specializationsOptions = useMemo(
    () =>
      availableSpecializations
        .filter(specialization => specialization.id !== specializationId)
        .map(specialization => ({
          value: specialization.id,
          text: specialization.title
        })),
    [availableSpecializations, specializationId]
  )

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: specializationApplicationId,
        nodeType: NodeType.SPECIALIZATION_APPLICATION,
        operationName: 'convertSpecializationApplication'
      }}
    >
      {!initialLoading ? (
        <Form onSubmit={handleSubmit}>
          <Modal.Title>Convert Specialization</Modal.Title>
          <Modal.Content>
            <Container bottom='large'>
              <Typography size='medium'>
                Are you sure you want to convert this specialization? The
                current {specializationTitle} application for this talent will
                be cancelled, and any screening steps related to the{' '}
                {specializationTitle} specialization that haven’t been passed
                will become unclaimed. The talent will have to pass each
                screening step for the new specialization from scratch.
              </Typography>
            </Container>
            <Form.Select
              width='full'
              label='To'
              name='specializationId'
              placeholder='Please select a specialization'
              required
              options={specializationsOptions}
              data-testid='convert-specialization-application-modal-specialization'
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
              Convert Specialization
            </Form.SubmitButton>
          </Modal.Actions>
        </Form>
      ) : (
        <ModalSuspender />
      )}
    </Modal>
  )
}

export default ConvertSpecializationApplicationModal
