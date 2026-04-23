import React, { useState, useEffect } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal } from '@staff-portal/modals-service'
import { Button, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { LinkWrapper } from '@staff-portal/ui'
import { NodeType } from '@staff-portal/graphql'

import { SpecialistAssignmentFragment } from '../../../../data'
import {
  useUnassignScreeningSpecialist,
  UnassignScreeningSpecialistMutation
} from '../../../../data/unassign-screening-specialist'
import {
  useAssignScreeningSpecialist,
  AssignScreeningSpecialistMutation
} from '../../../../data/assign-screening-specialist'
import AssignDropdown from '../AssignDropdown'

export interface Props {
  talentId: string
  initialAssignment?: SpecialistAssignmentFragment | null
  hideModal: () => void
}

/* eslint-disable complexity */
const AssignModal = ({ talentId, hideModal, initialAssignment }: Props) => {
  const { showError } = useNotifications()

  const initialAssignmentId = initialAssignment?.id
  const initialSpecialist = initialAssignment?.assignee
  const [isAssignmentChanged, setAssignmentChanged] = useState(false)
  const [currentSpecialist, setCurrentSpecialist] = useState(initialSpecialist)

  const { unassignScreeningSpecialist, loading: unassignLoading } =
    useUnassignScreeningSpecialist({
      onCompleted: ({
        unassignScreeningSpecialist: result
      }: UnassignScreeningSpecialistMutation) => {
        if (result?.errors.length) {
          const mutationErrorMessages = concatMutationErrors(
            result.errors,
            'Unable to unassign screening specialist'
          )

          showError(mutationErrorMessages)
        }

        hideModal()
      },
      onError: () => {
        showError('Unable to unassign screening specialist.')
      }
    })

  const { assignScreeningSpecialist, loading: assignLoading } =
    useAssignScreeningSpecialist({
      onCompleted: ({
        assignScreeningSpecialist: result
      }: AssignScreeningSpecialistMutation) => {
        if (result?.errors.length) {
          const mutationErrorMessages = concatMutationErrors(
            result.errors,
            'Unable to assign screening specialist'
          )

          showError(mutationErrorMessages)
        }

        hideModal()
      },
      onError: () => {
        showError('Unable to assign screening specialist.')
      }
    })

  const loading = unassignLoading || assignLoading

  const handleSubmit = async () => {
    if (currentSpecialist) {
      await assignScreeningSpecialist(talentId, currentSpecialist.id)
    } else if (initialAssignmentId) {
      await unassignScreeningSpecialist(initialAssignmentId)
    }
  }

  useEffect(() => {
    setAssignmentChanged(currentSpecialist?.id !== initialSpecialist?.id)
  }, [currentSpecialist, initialSpecialist])

  return (
    <Modal
      open
      onClose={hideModal}
      size='small'
      operationVariables={{
        nodeId: talentId,
        nodeType: NodeType.TALENT,
        operationName: 'assignScreeningSpecialistToTalent'
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Title>Assign</Modal.Title>
        <Modal.Content>
          <Typography inline>
            TSS Specialist {!currentSpecialist && '-'}
            {currentSpecialist && (
              <LinkWrapper
                wrapWhen={Boolean(currentSpecialist.webResource.url)}
                href={currentSpecialist.webResource.url as string}
                target='_blank'
              >
                {currentSpecialist.fullName}
              </LinkWrapper>
            )}{' '}
          </Typography>
          <AssignDropdown
            currentSpecialist={currentSpecialist}
            onSelect={setCurrentSpecialist}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={hideModal} variant='secondary' disabled={loading}>
            Cancel
          </Button>
          <Button
            type='submit'
            variant='positive'
            disabled={!isAssignmentChanged}
            loading={loading}
            data-testid='assign-modal-submit-button'
          >
            {!initialSpecialist && 'Assign'}
            {initialSpecialist && currentSpecialist && 'Reassign'}
            {initialSpecialist && !currentSpecialist && 'Unassign'}
          </Button>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}
/* eslint-enable complexity */

export default AssignModal
