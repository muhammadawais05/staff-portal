import React, { useCallback } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { UpdateRoleFlagInput } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useRemoveRoleFlag } from './data/remove-role-flag'
import { ROLE_FLAGS_UPDATED } from '../../messages'

type FormValues = Pick<UpdateRoleFlagInput, 'comment'>

export interface Props {
  roleFlagId: string
  title: string
  hideModal: () => void
  onModalOpen?: () => void
  onModalClose?: () => void
}

const RemoveRoleFlagModal = ({
  roleFlagId,
  title,
  hideModal,
  onModalOpen,
  onModalClose
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()
  const [removeRoleFlag, { loading }] = useRemoveRoleFlag({
    onError: () => showError('Failed to remove flag.')
  })

  const closeModal = useCallback(() => {
    onModalClose?.()
    hideModal()
  }, [hideModal, onModalClose])

  const handleSubmit = useCallback(
    async ({ comment }: FormValues) => {
      const { data: submitResult } = await removeRoleFlag({
        variables: { input: { roleFlagId, comment } }
      })

      return handleMutationResult({
        mutationResult: submitResult?.removeRoleFlag,
        successNotificationMessage: 'The Flag was successfully removed.',
        onSuccessAction: () => {
          /* TODO: investigate the possibility to get rid of the message emitter
           * https://toptal-core.atlassian.net/browse/SP-2191
           */
          emitMessage(ROLE_FLAGS_UPDATED)
          closeModal()
        }
      })
    },
    [closeModal, emitMessage, handleMutationResult, removeRoleFlag, roleFlagId]
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
        operationName: 'removeRoleFlag'
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Modal.Title>Delete {title} flag</Modal.Title>
        <Modal.Content>
          <Container bottom='medium'>
            <Typography size='medium' inline>
              Do you really want to delete this flag?
            </Typography>
          </Container>
          <Form.Input
            label='Comment'
            name='comment'
            required
            width='full'
            multiline
            rows={4}
            data-testid='comment-field'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={closeModal} disabled={loading}>
            Cancel
          </Button>
          <Form.SubmitButton
            data-testid='remove-flag-button'
            variant='negative'
          >
            Delete Flag
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default RemoveRoleFlagModal
