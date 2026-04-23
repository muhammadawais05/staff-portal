import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useRemoveTalentInfraction } from '../../data'

export interface Props {
  infractionId: string
  hideModal: () => void
  onRemove: () => void
}

const TalentInfractionRemoveModal = ({
  infractionId,
  hideModal,
  onRemove
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const onError = () => showError('Unable to delete the infraction')

  const [removeTalentInfraction, { loading }] = useRemoveTalentInfraction({
    onError
  })

  const onSuccessAction = () => {
    onRemove()
    hideModal()
  }

  const handleSubmit = async ({ comment }: { comment: string }) => {
    const { data, errors } = await removeTalentInfraction({
      variables: {
        input: {
          talentInfractionId: infractionId,
          comment
        }
      }
    })

    if (errors) {
      return onError()
    }

    return handleMutationResult({
      mutationResult: data?.removeTalentInfraction,
      successNotificationMessage: 'The infraction was successfully deleted.',
      onSuccessAction
    })
  }

  return (
    <Modal withForm onClose={hideModal} open size='small'>
      <Form onSubmit={handleSubmit}>
        <Modal.Title>Delete Infraction</Modal.Title>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Are you sure that you want to delete this infraction?
            </Typography>
          </Container>
          <Form.Input
            required
            width='full'
            label='Comment'
            data-testid='talent-infraction-remove-modal-comment'
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
          <Button
            type='submit'
            data-testid='talent-infraction-remove-modal-remove-button'
            variant='negative'
            loading={loading}
          >
            Remove
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default TalentInfractionRemoveModal
