import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Modal } from '@staff-portal/modals-service'
import { Button, Typography, Container } from '@toptal/picasso'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useRestoreTalentSpecializationApplication } from '../../data/restore-talent-specialization-application'

export interface Props {
  talentId: string
  specializationId: string
  specializationTitle: string
  talentName: string
  hideModal: () => void
}

const ResumeTalentSpecializationApplicationModal = ({
  talentId,
  specializationId,
  specializationTitle,
  talentName,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const onError = () => {
    showError('Unable to resume specialization application.')
  }

  const [restoreTalentSpecialization, { loading }] =
    useRestoreTalentSpecializationApplication({
      talentId,
      onCompleted: data => {
        if (data.restoreSpecializationApplication?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
          hideModal()
        } else {
          onError()
        }
      },
      onError
    })

  const handleSubmit = async ({
    comment
  }: {
    specializationId: string
    comment: string
  }) => {
    const { data } = await restoreTalentSpecialization({
      variables: {
        input: {
          comment,
          specializationApplicationId: specializationId
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.restoreSpecializationApplication,
      successNotificationMessage: `The ${specializationTitle} specialization application was successfully resumed.`
    })
  }

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: specializationId,
        nodeType: NodeType.SPECIALIZATION_APPLICATION,
        operationName: 'restoreSpecializationApplication'
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Title>Resume Specialization Application</Modal.Title>
        <Modal.Content>
          <Container bottom='large'>
            <Typography size='medium'>
              Are you sure you want to resume {talentName}'s{' '}
              {specializationTitle} specialization application? The new
              application will continue from where {talentName}'s previous{' '}
              {specializationTitle} specialization application ended.
            </Typography>
          </Container>
          <Form.Input
            required
            width='full'
            label='Comment'
            name='comment'
            placeholder='Please specify a reason'
            multiline
            rows={4}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={hideModal} variant='secondary' disabled={loading}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>
            Resume Application
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default ResumeTalentSpecializationApplicationModal
