import React from 'react'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Scalars, TalentInfractionReasonValue } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { useCreateTalentInfraction } from '../../data'
import TalentInfractionFormFields from '../TalentInfractionFormFields'
import { TALENT_INFRACTION_CREATED } from '../../messages'

interface TalentInfractionForm {
  addAttachments: []
  description: string
  engagementId: string
  occurredAt: Scalars['Date']
  reasonSlug: TalentInfractionReasonValue
  summary: string
  talentId: string
}

export interface Props {
  forTalentId?: string
  hideModal: () => void
}

const TalentInfractionCreateModal = ({ forTalentId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [createTalentInfraction, { loading }] = useCreateTalentInfraction({
    onError: () => showError('Failed to create an infraction.')
  })

  const onSuccessAction = (talentId: string) => {
    emitMessage(TALENT_INFRACTION_CREATED, { talentId })
    emitMessage(TALENT_UPDATED, { talentId })
    hideModal()
  }

  const handleSubmit = async ({
    addAttachments,
    description,
    engagementId,
    occurredAt,
    reasonSlug,
    summary,
    talentId
  }: TalentInfractionForm) => {
    const { data: createResult } = await createTalentInfraction({
      variables: {
        input: {
          addAttachments,
          description,
          engagementId,
          occurredAt,
          reasonSlug,
          summary,
          talentId
        }
      }
    })

    return handleMutationResult({
      mutationResult: createResult?.createTalentInfraction,
      successNotificationMessage: 'The Infraction was successfully created.',
      onSuccessAction: () => onSuccessAction(talentId)
    })
  }

  return (
    <Modal
      withForm
      onClose={hideModal}
      open
      size='small'
      data-testid='talentInfractionCreateModal'
    >
      <Form<TalentInfractionForm>
        onSubmit={handleSubmit}
        mutators={{ ...arrayMutators }}
        initialValues={{ talentId: forTalentId }}
      >
        <Modal.Title>Add Infraction</Modal.Title>
        <Modal.Content>
          <TalentInfractionFormFields withTalentInput={!forTalentId} />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal} disabled={loading}>
            Cancel
          </Button>
          <Button type='submit' variant='positive' loading={loading}>
            Create
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default TalentInfractionCreateModal
