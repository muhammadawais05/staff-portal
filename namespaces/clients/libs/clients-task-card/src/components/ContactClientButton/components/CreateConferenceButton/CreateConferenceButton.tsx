import React from 'react'
import { PromptModal, Button } from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal, useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useCreateMeeting } from './data/create-meeting'

const CREATE_CONFERENCE = 'Create Conference'

export type Props = {
  contactUserId: string
  playbookTemplateId?: string
  onSuccess?: () => void
}

const ERROR_MESSAGE = 'Failed to create Conference.'

const CreateConferenceButton = ({
  contactUserId,
  playbookTemplateId,
  onSuccess
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { showModal, hideModal, isOpen } = useModal()
  const [createMeeting] = useCreateMeeting()

  return (
    <>
      <Button onClick={showModal} data-testid='create-conference-button'>
        {CREATE_CONFERENCE}
      </Button>
      <PromptModal
        open={isOpen}
        onClose={hideModal}
        title={CREATE_CONFERENCE}
        message='Are you sure you want to create a conference?'
        submitText={CREATE_CONFERENCE}
        onSubmit={async () => {
          try {
            const { data } = await createMeeting({
              variables: {
                input: {
                  roleOrClientId: contactUserId,
                  playbookTemplateId
                }
              }
            })

            handleMutationResult({
              mutationResult: data?.createMeeting,
              onSuccessAction: onSuccess
            })
          } catch {
            showError(ERROR_MESSAGE)
          }
        }}
      />
    </>
  )
}

export default CreateConferenceButton
