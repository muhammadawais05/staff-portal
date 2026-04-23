import React from 'react'
import { Modal } from '@staff-portal/modals-service'
import { lazy } from '@staff-portal/utils'

import { TITLE } from './config'
import { EditAvatarModalProps } from './types'

const ModalContent = lazy(
  () => import('../EditAvatarModalContent/EditAvatarModalContent')
)

const EditAvatarModal = (props: EditAvatarModalProps) => {
  return (
    <Modal open onClose={props.hideModal} defaultTitle={TITLE} size='small'>
      <ModalContent {...props} />
    </Modal>
  )
}

export default EditAvatarModal
