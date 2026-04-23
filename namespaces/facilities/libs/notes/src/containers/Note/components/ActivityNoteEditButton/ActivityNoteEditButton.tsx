import { Button, Pencil16 } from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'
import { ActivityFragment, EditActivityModal } from '@staff-portal/activities'

export interface ActivityNoteDeleteButtonProps {
  activity: ActivityFragment
  updateActivityOperation: OperationType
  onEdit?: () => void
}

const ActivityNoteEditButton = ({
  activity,
  updateActivityOperation,
  onEdit
}: ActivityNoteDeleteButtonProps) => {
  const { showModal, hideModal, isOpen } = useModal()

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: activity.id,
    nodeType: NodeType.ACTIVITY,
    operationName: 'updateActivity'
  }

  const onEditActivity = () => {
    hideModal()
    onEdit?.()
  }

  return (
    <>
      {isOpen && (
        <EditActivityModal
          activity={activity}
          typeHidden
          onClose={hideModal}
          onEditActivity={onEditActivity}
        />
      )}
      <LazyOperation
        initialOperation={updateActivityOperation}
        getLazyOperationVariables={getLazyOperationVariables}
        onSuccess={showModal}
      >
        {({ checkOperation, loading, disabled }) => (
          <Button.Circular
            disabled={disabled}
            variant='flat'
            icon={<Pencil16 />}
            loading={loading}
            onClick={checkOperation}
            aria-label='Edit Activity'
          />
        )}
      </LazyOperation>
    </>
  )
}

export default ActivityNoteEditButton
