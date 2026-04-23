import React, { forwardRef } from 'react'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { ExecutionResult } from 'graphql'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { GetTalentNewOnlineTestAttemptQuery } from '../TalentSendNewOnlineTestAttemptModal/data/get-talent-new-online-test-attempt'
import TalentSendNewOnlineTestAttemptFormContent from '../TalentSendNewOnlineTestAttemptFormContent'
import {
  useSendNewTestForOnlineTestAttempt,
  SendNewTestForOnlineTestAttemptMutation
} from './data/send-new-online-test-attempt'

type FormValues = { serviceName: string; onlineTestId: string; comment: string }

export interface FormProps {
  data: GetTalentNewOnlineTestAttemptQuery
  onlineTestAttemptId: string
  talentId: string
  onClose: () => void
}

export interface TalentSendNewOnlineTestAttemptFormMethods {
  submit: () => Promise<
    ExecutionResult<SendNewTestForOnlineTestAttemptMutation> | undefined
  >
}

const initialValues: FormValues = {
  serviceName: '',
  onlineTestId: '',
  comment: ''
}

const TalentSendNewOnlineTestAttemptForm = forwardRef(
  ({ data, onClose, onlineTestAttemptId, talentId }: FormProps, ref) => {
    const { showError } = useNotifications()
    const emitMessage = useMessageEmitter()
    const { handleMutationResult } = useHandleMutationResult()
    const [sendNewTestAttempt] = useSendNewTestForOnlineTestAttempt({
      onError: () => showError('Failed creating the online test attempt.'),
      talentId
    })

    if (data && !data.onlineTests.nodes.length) {
      throw new Error('At least one online test must be available')
    }

    const handleSubmit = async (formValues: FormValues) => {
      const { data: submitResult } = await sendNewTestAttempt({
        variables: {
          input: {
            onlineTestAttemptId,
            onlineTestId: formValues.onlineTestId,
            comment: formValues.comment
          }
        }
      })

      return handleMutationResult({
        mutationResult: submitResult?.sendNewTestForOnlineTestAttempt,
        successNotificationMessage: 'Online test attempt has been created.',
        onSuccessAction: () => {
          emitMessage(TALENT_UPDATED, { talentId })
          onClose()
        }
      })
    }

    return (
      <Form<FormValues> onSubmit={handleSubmit} initialValues={initialValues}>
        <TalentSendNewOnlineTestAttemptFormContent data={data} ref={ref} />
      </Form>
    )
  }
)

export default TalentSendNewOnlineTestAttemptForm
