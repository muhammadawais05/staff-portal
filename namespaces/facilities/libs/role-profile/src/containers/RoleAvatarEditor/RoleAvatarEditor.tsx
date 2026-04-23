import React from 'react'
import { AvatarWithActions } from '@staff-portal/ui'
import { Operation, isOperationHidden } from '@staff-portal/operations'
import { AvatarSizeType } from '@toptal/picasso/Avatar/Avatar'
import { useGetStaffNode } from '@staff-portal/data-layer-service'
import { SkeletonLoader } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { RoleType } from '@staff-portal/graphql/staff'

import { GetRoleProfilePhotoDocument } from './data/get-role-profile-photo/get-role-profile-photo.staff.gql.types'
import EditAvatarModal from '../EditAvatarModal/EditAvatarModal'

export type Props = {
  roleId: string
  roleType: RoleType
  size?: Extract<AvatarSizeType, 'medium' | 'large'>
}

const RoleAvatarEditor = ({ roleId, roleType, size = 'medium' }: Props) => {
  const { data: role, loading } = useGetStaffNode(GetRoleProfilePhotoDocument)({
    roleId
  })

  const { showModal: showEditModal } = useModal(EditAvatarModal, {
    roleId,
    roleType
  })

  if (loading && !role) {
    return <SkeletonLoader.Media variant='avatar' size={size} />
  }

  if (!role) {
    return null
  }

  return (
    <AvatarWithActions
      fullName={role.fullName}
      src={size === 'medium' ? role.photo?.small : role.photo?.default}
      size={size}
      originalImageUrl={role.photo?.original}
      actions={[
        {
          key: 'edit',
          action: !isOperationHidden(role.operations.updateRolePhoto) && (
            <Operation
              operation={role.operations.updateRolePhoto}
              render={disabled => (
                <AvatarWithActions.EditButton
                  disabled={disabled}
                  onClick={showEditModal}
                />
              )}
            />
          )
        }
      ]}
    />
  )
}

export default RoleAvatarEditor
