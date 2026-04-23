import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Menu } from '@toptal/picasso'
import { Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import InviteToLoginModal from '../InviteToLoginModal'
import { InviteToLoginCompanyRepresentativeFragment } from '../../data'

interface Props {
  contact: InviteToLoginCompanyRepresentativeFragment
  operation?: OperationType
}

const InviteToLoginModalItem = ({ contact, operation }: Props) => {
  const { showModal } = useModal(InviteToLoginModal, { contact })

  return (
    <Operation
      inline={false}
      operation={operation}
      render={disabled => (
        <Menu.Item
          disabled={disabled}
          data-testid='invite-to-login'
          onClick={showModal}
        >
          Invite to Login
        </Menu.Item>
      )}
    />
  )
}

export default InviteToLoginModalItem
