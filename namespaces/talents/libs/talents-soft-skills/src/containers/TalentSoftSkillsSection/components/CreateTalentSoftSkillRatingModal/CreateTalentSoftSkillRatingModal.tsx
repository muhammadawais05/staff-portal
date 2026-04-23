import React, { ReactNode } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Tooltip, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { SoftSkill } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NodeType } from '@staff-portal/graphql'

import { TalentSoftSkills } from '../../../../types'
import { useCreateTalentSoftSkillRating } from './data/create-talent-soft-skill-rating/create-talent-soft-skill-rating.staff.gql'

const renderRatingTooltip = (
  ratingValue: number,
  icon: ReactNode,
  ratingHints: SoftSkill['ratingHints']
) => {
  const ratingHint = ratingHints[ratingValue - 1]

  const tooltipContent = (
    <Container>
      <Typography weight='semibold' color='inherit'>
        {ratingHint.title}
      </Typography>
      {ratingHint.description}
    </Container>
  )

  return (
    <Tooltip content={tooltipContent}>
      <Container inline data-testid={`rating-icon: ${ratingHint.value}`}>
        {icon}
      </Container>
    </Tooltip>
  )
}

export interface Props {
  hideModal: () => void
  talentId: string
  talentName: string
  softSkill: TalentSoftSkills
}

const CreateTalentSoftSkillRatingModal = ({
  hideModal,
  talentId,
  talentName,
  softSkill
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const onError = () => {
    showError('Unable to rate soft skill.')
  }

  const [createTalentSoftSkillRating, { loading }] =
    useCreateTalentSoftSkillRating({
      onCompleted: data => {
        if (data.createTalentSoftSkillRating?.success) {
          hideModal()
          emitMessage(TALENT_UPDATED, { talentId })
        }
      },
      onError
    })

  const handleSubmit = async ({
    rating,
    comment
  }: {
    rating: string
    comment: string
  }) => {
    const { data } = await createTalentSoftSkillRating({
      variables: {
        input: {
          talentId,
          softSkillId: softSkill.id,
          rating: Number(rating),
          comment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.createTalentSoftSkillRating,
      successNotificationMessage: 'Talent has been rated.'
    })
  }

  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'createTalentSoftSkillRating'
      }}
    >
      <ModalForm
        onSubmit={handleSubmit}
        title={`Rate ${talentName} on ${softSkill.name}`}
      >
        <Modal.Content>
          <Form.Rating.Stars
            required
            width='full'
            label='Rating'
            name='rating'
            data-testid='rating-input'
            renderItem={(value, icon) =>
              renderRatingTooltip(value, icon, softSkill.ratingHints)
            }
          />
          <Form.Input
            required
            width='full'
            label='Comment'
            name='comment'
            multiline
            rows={4}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={hideModal} variant='secondary' disabled={loading}>
            Cancel
          </Button>
          <Button type='submit' variant='positive' loading={loading}>
            Rate
          </Button>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default CreateTalentSoftSkillRatingModal
