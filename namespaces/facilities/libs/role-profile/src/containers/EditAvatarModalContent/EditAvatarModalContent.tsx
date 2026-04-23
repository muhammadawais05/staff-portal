import React from 'react'
import { ModalSuspender } from '@staff-portal/modals-service'

import { usePhotoAndCrop } from './data/photo-and-crop/use-photo-and-crop'
import { usePhotoRequirements } from './data/photo-requirements/use-photo-requirements'
import { EditAvatarModalProps } from '../EditAvatarModal/types'
import EditAvatarModalForm from '../EditAvatarModalForm/EditAvatarModalForm'

const EditAvatarModalContent = ({
  roleType,
  roleId,
  hideModal
}: EditAvatarModalProps) => {
  const { requirements, loading } = usePhotoRequirements(roleType)
  const {
    originalImageUrl,
    originalImageCrop,
    loading: loadingPhoto
  } = usePhotoAndCrop(roleId)

  if (loading || loadingPhoto) {
    return <ModalSuspender />
  }

  return (
    <EditAvatarModalForm
      roleId={roleId}
      photoRequirements={requirements}
      originalImageUrl={originalImageUrl}
      originalCrop={originalImageCrop}
      hideModal={hideModal}
    />
  )
}

export default EditAvatarModalContent
