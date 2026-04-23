import React from 'react'
import { useField, Form } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { SpecialistAssignmentArchivingReasons as Reason } from '@staff-portal/graphql/staff'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { isMaxLength } from '@staff-portal/validators'
import { useAnalytics } from '@staff-portal/monitoring-service'
import { NodeType } from '@staff-portal/graphql'

import {
  useArchiveSpecialistAssignments,
  ArchiveSpecialistAssignmentsMutation
} from './data/archive-specialist-assignments'
import { TssSegmentEvents } from '../../segment-events'
import { ASSIGNMENT_ARCHIVE_REASONS } from '../../constants'

interface ArchiveForm {
  reason: string
  comment: string
}

// The reason for moving out the modal content to a separate component is that
// `useField` can only be used from inside a <Form> component.
const ArchiveModalContent = () => {
  const {
    input: { value: reason }
  } = useField<string>('reason')

  return (
    <Modal.Content>
      <Form.Select
        data-testid='select-archive-reason'
        required
        name='reason'
        label='Reason'
        options={ASSIGNMENT_ARCHIVE_REASONS}
        placeholder='Select an option'
      />

      <Form.Input
        data-testid='archive-comment'
        name='comment'
        validate={isMaxLength}
        required={reason === Reason.OTHER}
        label='Comment'
        multiline
        rows={4}
        placeholder='Add a comment'
        width='full'
      />
    </Modal.Content>
  )
}

interface Props {
  hideModal: () => void
  assignmentIds?: string[]
  trackEvent?: TssSegmentEvents
}

const ArchiveModal = ({ assignmentIds, hideModal, trackEvent }: Props) => {
  const { showError } = useNotifications()
  const { track } = useAnalytics()
  const { archiveSpecialistAssignments } = useArchiveSpecialistAssignments({
    onCompleted: ({
      archiveSpecialistAssignments: result
    }: ArchiveSpecialistAssignmentsMutation) => {
      if (result?.errors.length) {
        const mutationErrorMessages = concatMutationErrors(
          result.errors,
          'Unable to archive specialist assignment'
        )

        showError(mutationErrorMessages)
      }
      hideModal()
    },
    onError: () => {
      showError('Unable to archive specialist assignment.')
      hideModal()
    }
  })

  if (!assignmentIds?.length) {
    return null
  }

  const archive = async (reason: string, comment?: string) => {
    if (trackEvent) {
      track(trackEvent)
    }

    await archiveSpecialistAssignments(
      assignmentIds,
      Reason[reason as keyof typeof Reason],
      comment
    )
  }

  return (
    <Modal
      open
      size='small'
      onClose={hideModal}
      operationVariables={{
        nodeId: assignmentIds[0],
        nodeType: NodeType.SPECIALIST_ASSIGNMENT,
        operationName: 'archiveSpecialistAssignment'
      }}
    >
      <Modal.Title>Archive</Modal.Title>
      <Form<ArchiveForm>
        onSubmit={({ reason, comment }) => archive(reason, comment)}
      >
        <ArchiveModalContent />

        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive' data-testid='archive-button'>
            Archive
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default ArchiveModal
