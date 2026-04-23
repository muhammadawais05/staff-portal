import React from 'react'
import { Button, Container, PromptModal } from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal, useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { STAFF_BETA_STATUS_UPDATED } from '../../../core/messages'
import { useAddBetaEarlyAdopters } from './data/add-beta-early-adopters'

interface Props {
  staffIds: string[]
  operation: OperationType
}

const AddBetaEarlyAdoptersButton = ({ staffIds, operation }: Props) => {
  const { showModal, hideModal, isOpen } = useModal()

  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const onCompleted = () => {
    emitMessage(STAFF_BETA_STATUS_UPDATED, { staffIds })
  }

  const { addBetaEarlyAdopters, loading } = useAddBetaEarlyAdopters({
    onError: () =>
      showError(
        `Unable to add the selected staff members to the early adopters group.`
      ),
    onCompleted
  })

  const { handleMutationResult } = useHandleMutationResult()

  const confirm = async () => {
    hideModal()
    const { data } = await addBetaEarlyAdopters(staffIds)

    return handleMutationResult({
      mutationResult: data?.addBetaEarlyAdopters,
      successNotificationMessage: `The selected staff members were successfully added to the early adopters group.`
    })
  }
  const disableBulkAction = staffIds.length === 0

  return (
    <Operation
      operation={operation}
      render={disabled =>
        !disabled && (
          <Container left='small'>
            <Button
              size='small'
              onClick={showModal}
              disabled={disableBulkAction}
              loading={loading}
              data-testid='add-beta-early-adopters-button'
              variant='positive'
            >
              Add Early Adopters
            </Button>

            <PromptModal
              open={isOpen}
              onClose={hideModal}
              title='Add Early Adopters'
              message='Are you sure you want to add as early adopers the selected staff members?'
              submitText='Add Early Adopters'
              variant='positive'
              onSubmit={confirm}
            />
          </Container>
        )
      }
    />
  )
}

export default AddBetaEarlyAdoptersButton
