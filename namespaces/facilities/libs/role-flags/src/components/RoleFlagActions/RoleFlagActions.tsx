import React, { useCallback } from 'react'
import { Button, Container } from '@toptal/picasso'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import { PropsWithCustomTooltipAndActions } from '../RoleFlag'
import EditRoleFlagModal from '../EditRoleFlagModal'
import RemoveRoleFlagModal from '../RemoveRoleFlagModal'

type Props = Pick<
  PropsWithCustomTooltipAndActions,
  'roleFlagId' | 'title' | 'comment' | 'operations'
> & { setDisableListeners: (disableListeners: boolean) => void }

const RoleFlagActions = ({
  roleFlagId,
  title,
  comment,
  operations,
  setDisableListeners
}: Props) => {
  const handleModalOpen = useCallback(
    () => setDisableListeners(true),
    [setDisableListeners]
  )
  const handleModalClose = useCallback(
    () => setDisableListeners(false),
    [setDisableListeners]
  )

  const { showModal: showEditModal } = useModal(
    EditRoleFlagModal,
    {
      roleFlagId,
      title,
      existingComment: comment,
      onModalOpen: handleModalOpen,
      onModalClose: handleModalClose
    },
    { leaveOnCallerUnmount: true }
  )
  const { showModal: showRemoveModal } = useModal(
    RemoveRoleFlagModal,
    {
      roleFlagId,
      title,
      onModalOpen: handleModalOpen,
      onModalClose: handleModalClose
    },
    { leaveOnCallerUnmount: true }
  )

  return (
    <Container top='small'>
      <Operation
        operation={operations.updateRoleFlag}
        render={disabled => (
          <Button
            size='small'
            variant='secondary'
            onClick={showEditModal}
            disabled={disabled}
            data-testid='edit-role-flag-button'
          >
            Edit
          </Button>
        )}
      />

      <Operation
        operation={operations.removeRoleFlag}
        render={disabled => (
          <Button
            size='small'
            variant='negative'
            onClick={showRemoveModal}
            disabled={disabled}
            data-testid='remove-role-flag-button'
          >
            Delete
          </Button>
        )}
      />
    </Container>
  )
}

export default RoleFlagActions
