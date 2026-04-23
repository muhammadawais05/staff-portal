import React from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { Button, Container, Typography } from '@toptal/picasso'
import { ImageUploader, useImageUploader } from '@staff-portal/ui'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import type { Crop } from '@staff-portal/ui'

import { UpdateRolePhotoDocument } from './data/update-role-photo/update-role-photo.staff.gql.types'
import { EditAvatarModalProps } from '../EditAvatarModal/types'
import { TITLE } from '../EditAvatarModal/config'
import { PhotoRequirementsQuery } from '../EditAvatarModalContent/data/photo-requirements/photo-requirements.staff.gql.types'
import { defaultPhotoRequirements } from './config'

export type Props = Omit<EditAvatarModalProps, 'roleType'> & {
  photoRequirements?: PhotoRequirementsQuery['photoRequirements']
  originalImageUrl?: string | null
  originalCrop?: Crop | null
}

const EditAvatarModalForm = ({
  originalImageUrl,
  originalCrop,
  hideModal,
  roleId,
  photoRequirements
}: Props) => {
  const requirements = photoRequirements ?? defaultPhotoRequirements

  const { props, browseImage, imageFile, imageCrop } = useImageUploader({
    originalImageSrc: originalImageUrl,
    imageRequirements: requirements,
    initialCrop: originalCrop
  })

  const { handleSubmit, loading: submitting } = useModalFormChangeHandler({
    mutationDocument: UpdateRolePhotoDocument,
    mutationResultOptions: {
      onSuccessAction: hideModal,
      successNotificationMessage: 'The profile photo was successfully updated.'
    }
  })

  const {
    minDimension: { width, height },
    sizeLimitMB
  } = requirements

  return (
    <ModalForm
      title={TITLE}
      onSubmit={() => {
        return handleSubmit({
          roleId,
          ...imageCrop,
          photo: imageFile,
          ...(imageFile ? {} : { allowEmptyPhoto: true })
        })
      }}
    >
      <Modal.Content>
        <Typography size='medium'>
          {`Please upload a photo that is at least ${width}x${height} pixels, and no larger
          than ${sizeLimitMB} MB.`}
        </Typography>
        <Container
          top='medium'
          flex
          justifyContent='center'
          alignItems='center'
        >
          <ImageUploader {...props} loading={submitting} />
        </Container>
      </Modal.Content>

      <Modal.Actions>
        <Button
          variant='secondary'
          data-testid='edit-role-avatar-modal-upload-photo-button'
          disabled={submitting}
          onClick={browseImage}
        >
          {originalImageUrl || imageFile ? 'Upload Another' : 'Upload Photo'}
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='edit-role-avatar-modal-save-button'
          disabled={!imageFile && !originalImageUrl}
        >
          Save
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default EditAvatarModalForm
