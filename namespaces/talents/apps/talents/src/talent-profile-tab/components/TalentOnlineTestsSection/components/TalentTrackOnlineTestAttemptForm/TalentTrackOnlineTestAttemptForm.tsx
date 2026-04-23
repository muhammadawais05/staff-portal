import React, { forwardRef } from 'react'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { ExecutionResult } from 'graphql'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { GetTrackOnlineTestAttemptQuery } from '../TalentTrackOnlineTestAttemptModal/data/get-track-online-test-attempt'
import TalentTrackOnlineTestAttemptFormContent from '../TalentTrackOnlineTestAttemptFormContent'
import {
  useTrackOnlineTestAttempt,
  TrackOnlineTestAttemptMutation
} from './data/track-online-test-attempt'

type FormValues = { comment: string }

export interface FormProps {
  data: GetTrackOnlineTestAttemptQuery
  onlineTestAttemptId: string
  talentId: string
  onClose: () => void
}

export interface TalentTrackOnlineTestAttemptFormMethods {
  submit: () => Promise<
    ExecutionResult<TrackOnlineTestAttemptMutation> | undefined
  >
}

const initialValues: FormValues = {
  comment: ''
}

const TalentTrackOnlineTestAttemptForm = forwardRef(
  ({ data, onClose, onlineTestAttemptId, talentId }: FormProps, ref) => {
    const { showError } = useNotifications()
    const emitMessage = useMessageEmitter()
    const { handleMutationResult } = useHandleMutationResult()
    const [trackOnlineTestAttempt] = useTrackOnlineTestAttempt({
      onError: () => showError('Failed tracking the online test attempt.'),
      talentId
    })

    const handleSubmit = async (formValues: FormValues) => {
      const { data: submitResult } = await trackOnlineTestAttempt({
        variables: {
          input: {
            onlineTestAttemptId,
            comment: formValues.comment
          }
        }
      })

      return handleMutationResult({
        mutationResult: submitResult?.trackOnlineTestAttempt,
        successNotificationMessage: 'Online test is tracked now.',
        onSuccessAction: () => {
          emitMessage(TALENT_UPDATED, { talentId })
          onClose()
        }
      })
    }

    return (
      <Form<FormValues> onSubmit={handleSubmit} initialValues={initialValues}>
        <TalentTrackOnlineTestAttemptFormContent data={data} ref={ref} />
      </Form>
    )
  }
)

export default TalentTrackOnlineTestAttemptForm
