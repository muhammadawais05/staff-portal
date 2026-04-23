import React from 'react'
import { Button } from '@toptal/picasso'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { NodeType } from '@staff-portal/graphql'

import { useGetTalentNewOnlineTestAttempt } from './data/get-talent-new-online-test-attempt'
import TalentSendNewOnlineTestAttemptForm from '../TalentSendNewOnlineTestAttemptForm'
import { useSendNewOnlineTestAttemptFormActions } from '../TalentSendNewOnlineTestAttemptForm/hooks'

export type Props = {
  hideModal: () => void
  talentId: string
  onlineTestAttemptId: string
  nodeType: NodeType.CODILITY_RESULT | NodeType.HACKER_RANK_RESULT
}

const TalentSendNewOnlineTestAttemptModal = ({
  hideModal,
  onlineTestAttemptId,
  talentId,
  nodeType
}: Props) => {
  const { showError } = useNotifications()
  const { submitting, formRef, submitForm } =
    useSendNewOnlineTestAttemptFormActions()

  const showLoadingFailedMessage = () =>
    showError('Failed loading new online test attempt.')

  const { data, loading } = useGetTalentNewOnlineTestAttempt({
    onlineTestAttemptId,
    onCompleted: newOnlineTestAttempt => {
      if (!newOnlineTestAttempt) {
        showLoadingFailedMessage()
      }
    },
    onError: showLoadingFailedMessage
  })

  return (
    <Modal
      onClose={hideModal}
      open
      size='small'
      operationVariables={{
        nodeId: onlineTestAttemptId,
        nodeType,
        operationName: 'sendNewTestForOnlineTestAttempt'
      }}
    >
      {!loading && data ? (
        <>
          <Modal.Title>Send New Online Test</Modal.Title>
          <Modal.Content>
            <TalentSendNewOnlineTestAttemptForm
              data={data}
              onClose={hideModal}
              onlineTestAttemptId={onlineTestAttemptId}
              ref={formRef}
              talentId={talentId}
            />
          </Modal.Content>
          <Modal.Actions>
            <Button variant='secondary' onClick={hideModal}>
              Cancel
            </Button>
            <Button
              variant='positive'
              loading={submitting}
              onClick={submitForm}
            >
              Send new online test
            </Button>
          </Modal.Actions>
        </>
      ) : (
        <ModalSuspender />
      )}
    </Modal>
  )
}

export default TalentSendNewOnlineTestAttemptModal
