import React from 'react'
import { Dropdown, Menu } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useModal } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isNotNullish } from '@staff-portal/utils'
import { REFRESH_CALLS_LIST } from '@staff-portal/communication'

import DismissCallModal from '../DismissCallModal'
import CallMenuItem from '../CallMenuItem'
import { useToggleCallDismissed } from './data'
import openLinkInNewTab from '../../utils/open-link-in-new-tab'

interface Props {
  isUnfilled: boolean
  isDismissed: boolean
  callId: string
  voicemailUrl: string | undefined | null
}

const CallActionsCell = ({
  isUnfilled,
  isDismissed,
  callId,
  voicemailUrl
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const [toggleCallDismissed, { loading }] = useToggleCallDismissed({
    onError: () => showError('An error occurred.')
  })

  const handleToggleDismiss = async () => {
    const { data } = await toggleCallDismissed({
      variables: {
        input: { callId }
      }
    })

    return handleMutationResult({
      mutationResult: data?.toggleCallDismissedFlag,
      successNotificationMessage: isDismissed ? 'Undismissed' : 'Dismissed',
      onSuccessAction: () => emitMessage(REFRESH_CALLS_LIST)
    })
  }

  const { showModal } = useModal(DismissCallModal, {
    onSubmit: handleToggleDismiss,
    loading
  })

  const openVoicemail = () => openLinkInNewTab(voicemailUrl)

  if (!isUnfilled && !isDismissed && !isNotNullish(voicemailUrl)) {
    return null
  }

  return (
    <>
      <Dropdown
        data-testid='call-actions-dropdown'
        content={
          <Menu data-testid='menu'>
            <CallMenuItem
              disabled={loading}
              show={isUnfilled}
              onClick={showModal}
              label='Dismiss call'
            />
            <CallMenuItem
              disabled={loading}
              show={isDismissed}
              onClick={handleToggleDismiss}
              label='Undismiss call'
            />
            <CallMenuItem
              disabled={loading}
              show={isNotNullish(voicemailUrl)}
              onClick={openVoicemail}
              label='Listen Voicemail'
            />
          </Menu>
        }
      >
        Actions
        <Dropdown.Arrow data-testid='open-call-actions-dropdown' />
      </Dropdown>
    </>
  )
}

export default CallActionsCell
