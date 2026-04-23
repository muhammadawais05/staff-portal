import React, { useState } from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { ROLE_UPDATED } from '@staff-portal/talents'
import { ReferrerInput } from '@staff-portal/facilities'
import { NodeType } from '@staff-portal/graphql'

import { useResetRoleReferrer } from '../../data/reset-role-referrer'
import { useChangeRoleReferrer } from '../../data/change-role-referrer'

export const SUCCESS_NOTIFICATION_MESSAGE =
  'The referrer has been successfully changed.'

export interface Props {
  hideModal: () => void
  roleId: string
  roleHasReferrer: boolean
  canIssueSourcingCommission: boolean
}

const ChangeReferrerModal = ({
  hideModal,
  roleId,
  roleHasReferrer,
  canIssueSourcingCommission
}: Props) => {
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const { handleMutationResult } = useHandleMutationResult()

  const onError = () => {
    showError('Unable to change the referrer.')
  }

  const [resetRoleReferrer, { loading: loadingReset }] = useResetRoleReferrer({
    onCompleted: data => {
      if (data.resetRoleReferrer?.success) {
        hideModal()
        emitMessage(ROLE_UPDATED, { roleId })
      }
    },
    onError
  })

  const [changeRoleReferrer, { loading: loadingChange }] =
    useChangeRoleReferrer({
      onCompleted: data => {
        if (data.changeRoleReferrer?.success) {
          hideModal()
        }
      },
      onError
    })

  const [referrerId, setReferrerId] = useState<string | undefined>()

  const handleSubmit = async ({ comment }: { comment: string }) => {
    if (!referrerId) {
      const { data } = await resetRoleReferrer({
        variables: { input: { roleId, comment } }
      })

      return handleMutationResult({
        mutationResult: data?.resetRoleReferrer,
        successNotificationMessage: SUCCESS_NOTIFICATION_MESSAGE
      })
    }

    const { data } = await changeRoleReferrer({
      variables: { input: { roleOrClientId: roleId, referrerId, comment } }
    })

    return handleMutationResult({
      mutationResult: data?.changeRoleReferrer,
      successNotificationMessage: SUCCESS_NOTIFICATION_MESSAGE
    })
  }

  return (
    <Modal
      open
      onClose={hideModal}
      operationVariables={{
        nodeId: roleId,
        nodeType: NodeType.TALENT,
        operationName: 'changeRoleReferrer'
      }}
    >
      <ModalForm title='Change Referrer' onSubmit={handleSubmit}>
        <Modal.Content>
          {canIssueSourcingCommission && (
            <Container bottom='small'>
              <Typography size='medium'>
                For referrals that have fixed sourcing commissions, payment will
                be sent immediately.
              </Typography>
            </Container>
          )}
          <ReferrerInput
            name='referrer'
            required={!roleHasReferrer}
            label='Referrer'
            placeholder='Type the username...'
            onSelect={setReferrerId}
          />
          <Form.Input
            required
            width='full'
            label='Comment'
            name='comment'
            multiline
            rows={4}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={hideModal}
            variant='secondary'
            disabled={loadingChange || loadingReset}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            variant='positive'
            loading={loadingChange || loadingReset}
          >
            Reassign Referrer
          </Button>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default ChangeReferrerModal
