import { Button, PromptModal, Trash16 } from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal, useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'

import { useRemoveActivity } from './data'

export interface ActivityNoteDeleteButtonProps {
  activityId: string
  removeActivityOperation: OperationType
  onDelete?: () => void
}

const ActivityNoteDeleteButton = ({
  activityId,
  removeActivityOperation,
  onDelete
}: ActivityNoteDeleteButtonProps) => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [removeActivity] = useRemoveActivity({
    activityId,
    onError: () => {
      showError('An error occurred, was not deleted.')
    }
  })

  const handleSubmit = async () => {
    const { data } = await removeActivity()

    return handleMutationResult({
      mutationResult: data?.removeActivity,
      successNotificationMessage: 'Activity has been deleted.',
      onSuccessAction: onDelete
    })
  }

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: activityId,
    nodeType: NodeType.ACTIVITY,
    operationName: 'removeActivity'
  }

  return (
    <>
      <LazyOperation
        initialOperation={removeActivityOperation}
        getLazyOperationVariables={getLazyOperationVariables}
        onSuccess={showModal}
      >
        {({ checkOperation, loading, disabled }) => (
          <Button.Circular
            disabled={disabled}
            variant='flat'
            icon={<Trash16 />}
            loading={loading}
            onClick={checkOperation}
            aria-label='Delete Activity'
          />
        )}
      </LazyOperation>
      <PromptModal
        open={isOpen}
        onClose={hideModal}
        title='Delete Activity'
        message='Are you sure that you want to delete this activity?'
        submitText='Delete Activity'
        variant='negative'
        onSubmit={() => handleSubmit()}
      />
    </>
  )
}

export default ActivityNoteDeleteButton
