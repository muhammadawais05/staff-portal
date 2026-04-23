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
import { useBulkDisableBetaStatus } from './data/disable-beta-status-bulk/bulk-disable-beta-status.staff.gql'

interface Props {
  staffIds: string[]
  operation: OperationType
}

const BetaStaffDisableButton = ({ staffIds, operation }: Props) => {
  const { showModal, hideModal, isOpen } = useModal()

  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()

  const onCompleted = () => {
    emitMessage(STAFF_BETA_STATUS_UPDATED, { staffIds })
  }

  const { bulkDisableBeta, loading } = useBulkDisableBetaStatus({
    onError: () =>
      showError(`Unable to disable beta pages for the selected staff members.`),
    onCompleted
  })

  const { handleMutationResult } = useHandleMutationResult()

  const confirm = async () => {
    hideModal()

    const { data } = await bulkDisableBeta(staffIds)

    return handleMutationResult({
      mutationResult: data?.bulkDisableBeta,
      successNotificationMessage: `The beta pages were disabled for the selected staff members.`
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
              disabled={disableBulkAction || disabled}
              loading={loading}
              data-testid='disable-beta-button'
              variant='negative'
            >
              Disable beta
            </Button>

            <PromptModal
              open={isOpen}
              onClose={hideModal}
              title='Disable beta'
              message='Are you sure you want to disable beta pages for the selected staff members?'
              submitText='Disable'
              variant='negative'
              onSubmit={confirm}
            />
          </Container>
        )
      }
    />
  )
}

export default BetaStaffDisableButton
