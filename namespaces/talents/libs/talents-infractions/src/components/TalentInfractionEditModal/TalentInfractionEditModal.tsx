import React, { useMemo } from 'react'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import {
  Scalars,
  TalentInfractionReasonValue,
  TalentInfractionStatusValue
} from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { TalentInfractionFragment } from '../../data/talent-infraction-fragment'
import { REVIEW_TEMPLATE } from '../../constants'
import {
  useChangeTalentInfraction,
  useGetTalentInfractionAssignees
} from '../../data'
import TalentInfractionFormFields from '../TalentInfractionFormFields'

interface TalentInfractionForm {
  addAttachments: File[]
  description: string
  engagementId: string
  occurredAt: Scalars['Date']
  reasonSlug: TalentInfractionReasonValue
  removeAttachments: string[]
  review: string
  status: TalentInfractionStatusValue
  summary: string
  taskAssigneeId: string
}

interface Props {
  infraction: TalentInfractionFragment
  hideModal: () => void
}

const TalentInfractionEditModal = ({ infraction, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { data: assignees } = useGetTalentInfractionAssignees()

  const [changeTalentInfraction, { loading }] = useChangeTalentInfraction({
    onError: () => showError('Failed to edit the infraction')
  })

  const initialValues = useMemo(
    () => ({
      status: infraction.status,
      summary: infraction.summary,
      reasonSlug: infraction.reasonSlug,
      occurredAt: infraction.occurredAt,
      engagementId: infraction.engagement?.id,
      description: infraction.description ?? undefined,
      review: infraction.review || REVIEW_TEMPLATE,
      talentId: infraction.talent.id
    }),
    [infraction]
  )

  const handleSubmit = async ({
    addAttachments,
    description,
    engagementId,
    occurredAt,
    reasonSlug,
    removeAttachments,
    review,
    status,
    summary,
    taskAssigneeId
  }: TalentInfractionForm) => {
    const { data: createResult } = await changeTalentInfraction({
      variables: {
        input: {
          addAttachments,
          description: description ?? '',
          engagementId,
          occurredAt,
          reasonSlug,
          removeAttachments,
          review: review?.length && review !== REVIEW_TEMPLATE ? review : '',
          status,
          summary,
          talentInfractionId: infraction.id,
          taskAssigneeId
        }
      }
    })

    return handleMutationResult({
      mutationResult: createResult?.changeTalentInfraction,
      successNotificationMessage: 'The Infraction was successfully updated.',
      onSuccessAction: hideModal
    })
  }

  return (
    <Modal withForm onClose={hideModal} open size='small'>
      <Form<TalentInfractionForm>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        mutators={{ ...arrayMutators }}
      >
        <Modal.Title>Edit Infraction</Modal.Title>
        <Modal.Content>
          <TalentInfractionFormFields
            editMode
            assignees={assignees}
            taskAssigneeId={infraction.taskAssignee?.id}
            attachments={infraction.attachments}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal} disabled={loading}>
            Cancel
          </Button>
          <Button
            type='submit'
            data-testid='talent-infraction-edit-button'
            variant='positive'
            loading={loading}
          >
            Update
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default TalentInfractionEditModal
