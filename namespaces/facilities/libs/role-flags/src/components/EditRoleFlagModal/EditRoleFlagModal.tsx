import React, { useCallback } from 'react'
import { Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { UpdateRoleFlagInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useUpdateRoleFlag } from './data/edit-role-flag'
import { ROLE_FLAGS_UPDATED } from '../../messages'

type FormValues = Pick<UpdateRoleFlagInput, 'comment'>

export interface Props {
  roleFlagId: string
  title: string
  existingComment?: string | null
  hideModal: () => void
  onModalOpen?: () => void
  onModalClose?: () => void
}

const EditRoleFlagModal = ({
  roleFlagId,
  hideModal,
  title,
  existingComment,
  onModalOpen,
  onModalClose
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const [updateRoleFlag, { loading }] = useUpdateRoleFlag({
    onError: () => showError('Failed to update flag.')
  })

  const closeModal = useCallback(() => {
    onModalClose?.()
    hideModal()
  }, [hideModal, onModalClose])

  const handleSubmit = useCallback(
    async ({ comment }: FormValues) => {
      const { data: submitResult } = await updateRoleFlag({
        variables: { input: { roleFlagId, comment } }
      })

      return handleMutationResult({
        mutationResult: submitResult?.updateRoleFlag,
        successNotificationMessage: 'The Flag was successfully updated.',
        onSuccessAction: () => {
          /* TODO: investigate the possibility to get rid of the message emitter
           * https://toptal-core.atlassian.net/browse/SP-2191
           */
          emitMessage(ROLE_FLAGS_UPDATED)
          closeModal()
        }
      })
    },
    [closeModal, emitMessage, handleMutationResult, roleFlagId, updateRoleFlag]
  )

  return (
    <Modal
      open
      size='small'
      onClose={closeModal}
      onOpen={onModalOpen}
      operationVariables={{
        nodeId: roleFlagId,
        nodeType: 'RoleFlag',
        operationName: 'updateRoleFlag'
      }}
    >
      <Form
        onSubmit={handleSubmit}
        initialValues={{ comment: existingComment ?? undefined }}
      >
        <Modal.Title>Update {title} flag</Modal.Title>
        <Modal.Content>
          <Form.Input
            label='Comment'
            name='comment'
            required
            width='full'
            multiline
            rows={4}
            rowsMax={25}
            data-testid='comment-field'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={closeModal} disabled={loading}>
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            data-testid='update-flag-button'
          >
            Update Flag
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default EditRoleFlagModal
