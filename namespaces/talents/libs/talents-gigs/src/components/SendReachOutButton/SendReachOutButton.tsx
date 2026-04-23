import React, { useMemo, useState, useCallback } from 'react'
import {
  Button,
  Container,
  Menu,
  Slack16,
  Tooltip,
  Typography
} from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'
import {
  GigReachOutStatus,
  Operation as OperationType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { trackEvent } from '@staff-portal/monitoring-service'
import { concatMutationErrors } from '@staff-portal/data-layer-service'
import { windowOpen } from '@staff-portal/navigation'

import { useOpenSlackConversation } from '../../data/open-slack-conversation'
import SendRequestModal from '../SendRequestModal'

const SP_OpeningSlackDMWithCandidate = 'SP_OpeningSlackDMWithCandidate'

type Props = {
  candidateId: string
  gigId: string
  requestTitle: string
  talentName: string
  onSuccess?: (status: GigReachOutStatus | undefined) => void
  operation?: OperationType
}

const SendReachOutButton = ({
  candidateId,
  gigId,
  talentName,
  onSuccess,
  operation
}: Props) => {
  const { showError } = useNotifications()
  const [buttonState, setButtonState] = useState(operation?.callable)

  const onSuccessAction = useCallback(
    (status: GigReachOutStatus | undefined) => {
      setButtonState(OperationCallableTypes.DISABLED)
      onSuccess?.(status)
    },
    [onSuccess]
  )

  const { showModal } = useModal(SendRequestModal, {
    talentName,
    candidateId,
    gigId,
    onSuccessAction
  })

  const [openSlackConversation] = useOpenSlackConversation({
    talentId: candidateId,
    onCompleted: data => {
      const errors = data?.openSlackConversation?.errors

      if (errors?.length) {
        const mutationErrorMessages = concatMutationErrors(
          errors,
          'Conversation could not be initiated'
        )

        return showError(mutationErrorMessages)
      }

      if (data?.openSlackConversation?.slackChannel?.url) {
        windowOpen(data.openSlackConversation.slackChannel.url)
      }
    },
    onError: () => {
      showError('Conversation could not be initiated, please try again.')
    }
  })

  const [buttonText, toolTipText] = useMemo(() => {
    switch (buttonState) {
      case OperationCallableTypes.ENABLED:
        return [`Send Request`, undefined]
      case OperationCallableTypes.DISABLED:
        return [
          `Request was Sent`,
          'This talent has already received a request, feel free to connect with him directly.'
        ]
      case OperationCallableTypes.HIDDEN:
      default:
        return [
          `Unable to Send Request`,
          `This request cannot be sent, please check if this talent is present on Community Slack.`
        ]
    }
  }, [operation, buttonState])

  const handleSendDM = () => {
    trackEvent(SP_OpeningSlackDMWithCandidate, {
      gigId,
      candidateId
    })

    openSlackConversation()
  }

  const menu = (
    <Menu data-testid='menu'>
      <Menu.Item onClick={handleSendDM} data-testid='open-conversation-button'>
        <Container right='xsmall'>
          <Slack16 color='dark-grey' />
        </Container>
        <Typography variant='body' size='medium' color='black'>
          Send DM
        </Typography>
      </Menu.Item>
    </Menu>
  )

  const reachOutButton = (
    <Button.Split
      menu={menu}
      size='small'
      variant='primary'
      testIds={{
        actionButton: 'reach-out-send-button',
        menuButton: 'reach-out-menu-button'
      }}
      actionButtonProps={{ titleCase: false }}
      onClick={showModal}
      disabled={buttonState !== OperationCallableTypes.ENABLED}
    >
      {buttonText}
    </Button.Split>
  )

  return (
    <>
      {toolTipText ? (
        <Tooltip content={toolTipText}>
          <div>{reachOutButton}</div>
        </Tooltip>
      ) : (
        reachOutButton
      )}
    </>
  )
}

export default SendReachOutButton
