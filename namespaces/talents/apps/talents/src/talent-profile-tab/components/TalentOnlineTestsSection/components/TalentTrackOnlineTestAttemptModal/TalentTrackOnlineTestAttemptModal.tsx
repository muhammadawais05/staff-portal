import { Button } from '@toptal/picasso'
import React from 'react'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { useNotifications } from '@toptal/picasso/utils'
import { NodeType } from '@staff-portal/graphql'

import TalentTrackOnlineTestAttemptForm from '../TalentTrackOnlineTestAttemptForm'
import { useGetTrackOnlineTestAttempt } from './data/get-track-online-test-attempt'
import { useTrackOnlineTestAttemptFormActions } from '../TalentTrackOnlineTestAttemptForm/hooks'

export interface Props {
  hideModal: () => void
  talentId: string
  onlineTestAttemptId: string
  nodeType: NodeType.CODILITY_RESULT | NodeType.HACKER_RANK_RESULT
}

const TalentTrackOnlineTestAttemptModal = ({
  hideModal,
  talentId,
  onlineTestAttemptId,
  nodeType
}: Props) => {
  const { showError } = useNotifications()
  const { submitting, formRef, submitForm } =
    useTrackOnlineTestAttemptFormActions()

  const showLoadingFailedMessage = () =>
    showError('Failed loading new online test attempt.')

  const { data, loading } = useGetTrackOnlineTestAttempt({
    talentId,
    onlineTestId: onlineTestAttemptId,
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
        operationName: 'trackOnlineTestAttempt'
      }}
    >
      {!loading && data ? (
        <>
          <Modal.Title>Track Online Test</Modal.Title>
          <Modal.Content>
            <TalentTrackOnlineTestAttemptForm
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
              Track Online Test
            </Button>
          </Modal.Actions>
        </>
      ) : (
        <ModalSuspender />
      )}
    </Modal>
  )
}

export default TalentTrackOnlineTestAttemptModal
