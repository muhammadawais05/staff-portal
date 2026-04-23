import React from 'react'
import { Operation } from '@staff-portal/operations'
import { useQuery } from '@staff-portal/data-layer-service'
import { ActionLoader } from '@staff-portal/ui'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'

import { InviteNewStaffOperationDocument } from './data/invite-new-staff-operation/invite-new-staff-operation.staff.gql.types'
import InviteNewStaffModal from '../InviteNewStaffModal/InviteNewStaffModal'

const InviteNewStaffButton = () => {
  const { showModal } = useModal(InviteNewStaffModal, {})
  const { data, loading } = useQuery(InviteNewStaffOperationDocument)

  if (loading) {
    return <ActionLoader />
  }
  if (!data) {
    return null
  }

  return (
    <Operation
      operation={data.operations.inviteStaff}
      render={disabled => (
        <Button
          disabled={disabled}
          variant='positive'
          size='small'
          onClick={showModal}
        >
          Invite New Staff
        </Button>
      )}
    />
  )
}

export default InviteNewStaffButton
