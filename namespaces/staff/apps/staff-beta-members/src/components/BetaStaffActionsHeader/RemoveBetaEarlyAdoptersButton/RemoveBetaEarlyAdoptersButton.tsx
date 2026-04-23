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
import { useRemoveBetaEarlyAdopters } from './data/remove-beta-early-adopters'

interface Props {
  staffIds: string[]
  operation: OperationType
}

const RemoveBetaEarlyAdoptersButton = ({ staffIds, operation }: Props) => {
  const { showModal, hideModal, isOpen } = useModal()

  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const onCompleted = () => {
    emitMessage(STAFF_BETA_STATUS_UPDATED, { staffIds })
  }

  const { removeBetaEarlyAdopters, loading } = useRemoveBetaEarlyAdopters({
    onError: () =>
      showError(
        `Unable to remove the selected staff members from the early adopters group.`
      ),
    onCompleted
  })

  const { handleMutationResult } = useHandleMutationResult()

  const confirm = async () => {
    hideModal()
    const { data } = await removeBetaEarlyAdopters(staffIds)

    return handleMutationResult({
      mutationResult: data?.removeBetaEarlyAdopters,
      successNotificationMessage: `The selected staff members were successfully removed from the early adopters group.`
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
              data-testid='remove-early-adopters-button'
              variant='negative'
            >
              Remove Early Adopters
            </Button>

            <PromptModal
              open={isOpen}
              onClose={hideModal}
              title='Remove Early Adopters'
              message='Are you sure you want to remove the selected staff members from the early adopters group?'
              submitText='Remove Early Adopters'
              variant='negative'
              onSubmit={confirm}
            />
          </Container>
        )
      }
    />
  )
}

export default RemoveBetaEarlyAdoptersButton
