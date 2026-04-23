import React from 'react'
import { Container, Button, Typography } from '@toptal/picasso'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { useRemoveSoftSkillRating } from './data/remove-soft-skill-rating.staff.gql'

type Props = {
  ratingId: string
  softSkillName: string
  talentName: string
  talentId: string
  hideModal: () => void
}

const RemoveTalentSoftSkillRatingModal = ({
  ratingId,
  softSkillName,
  talentName,
  talentId,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const { removeSoftSkillRating } = useRemoveSoftSkillRating({})
  const handleSubmit = async () => {
    const { data } = await removeSoftSkillRating(ratingId)

    if (!data?.removeSoftSkillRating) {
      hideModal()

      return showError('Failed to delete the rating.')
    }

    return handleMutationResult({
      mutationResult: data?.removeSoftSkillRating,
      successNotificationMessage: 'Rating has been deleted.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        hideModal()
      }
    })
  }

  return (
    <Modal
      onClose={hideModal}
      size='small'
      open
      data-testid='delete-rating-modal'
      operationVariables={{
        nodeId: ratingId,
        nodeType: NodeType.SOFT_SKILL_RATING,
        operationName: 'removeSoftSkillRating'
      }}
    >
      <ModalForm
        onSubmit={handleSubmit}
        title={`Delete ${softSkillName} rating for ${talentName}`}
      >
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium'>
              Are you sure you want to delete this rating?
            </Typography>
          </Container>
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='negative' data-testid='remove-rating'>
            Delete
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default RemoveTalentSoftSkillRatingModal
