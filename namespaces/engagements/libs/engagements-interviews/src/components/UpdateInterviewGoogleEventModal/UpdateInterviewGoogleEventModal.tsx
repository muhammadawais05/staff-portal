import { Modal } from '@staff-portal/modals-service'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React, { useRef } from 'react'
import {
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewType
} from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import { FormCancelButton } from '@staff-portal/forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { ScheduleInterviewFragment } from '../../data/fragments/schedule-interview-fragment'
import { ScheduleEngagementFragment } from '../../data/fragments/schedule-engagement-fragment'
import { GoogleCalendarEventFragment } from '../../data/fragments/google-calendar-event-fragment'
import { INTERVIEW_UPDATED } from '../../messages'
import { prepareGoogleInvitation } from '../../utils'
import ScheduleInterviewGoogleForm from '../ScheduleInterviewGoogleForm'
import { UpdateInterviewGoogleCalendarEventDocument } from './data'
import { adjustGoogleCalendarEventValues } from './utils'

type FormValues = {
  sendGoogleCalendarInvitation: boolean
  initiator: InterviewInitiator
  interviewType: InterviewType | null
  communication: InterviewCommunicationType
  gcSummary: string
  gcDescription: string
  gcUserReceivers: string[]
  gcEmails?: string
}

export interface Props {
  interviewId: string
  scheduleEngagement?: ScheduleEngagementFragment | null
  scheduleInterview?: ScheduleInterviewFragment | null
  googleEvent?: GoogleCalendarEventFragment | null
  hideModal: () => void
}

const UpdateInterviewGoogleEventModal = ({
  scheduleEngagement,
  scheduleInterview,
  ...props
}: Props) => {
  if (!scheduleEngagement || !scheduleInterview) {
    return null
  }

  return (
    <UpdateInterviewGoogleEventModalBody
      scheduleEngagement={scheduleEngagement}
      scheduleInterview={scheduleInterview}
      {...props}
    />
  )
}

export interface ModalBodyProps extends Props {
  scheduleEngagement: ScheduleEngagementFragment
  scheduleInterview: ScheduleInterviewFragment
}

const UpdateInterviewGoogleEventModalBody = ({
  interviewId,
  scheduleEngagement,
  scheduleInterview,
  googleEvent,
  hideModal
}: ModalBodyProps) => {
  const { client, talent, id: engagementId } = scheduleEngagement
  const { interviewType } = scheduleInterview
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [updateInterviewDetails] = useMutation(
    UpdateInterviewGoogleCalendarEventDocument,
    {
      onError: () =>
        showError('An error occurred, the Interview was not updated.')
    }
  )

  const initiator = scheduleInterview.initiator ?? undefined
  const communication = scheduleInterview.communication ?? undefined

  const initialValues = useRef({
    sendGoogleCalendarInvitation: true,
    initiator,
    interviewType,
    communication,
    ...adjustGoogleCalendarEventValues({
      googleEvent,
      talentEmail: talent?.toptalEmail,
      clientEmails: client?.emailCarbonCopyOptions?.nodes.map(
        ({ role: { email } }) => email
      )
    })
  })

  const handleSubmit = async ({
    gcDescription,
    gcSummary,
    gcUserReceivers,
    gcEmails
  }: FormValues) => {
    const {
      description = '',
      summary = '',
      userReceivers,
      emails
    } = prepareGoogleInvitation({
      summary: gcSummary,
      description: gcDescription,
      userReceivers: gcUserReceivers,
      emails: gcEmails
    })

    const { data: dataResult } = await updateInterviewDetails({
      variables: {
        input: {
          interviewId,
          gcDescription: description,
          gcSummary: summary,
          gcUserReceivers: userReceivers,
          gcEmails: emails
        }
      }
    })

    return handleMutationResult({
      mutationResult: dataResult?.updateInterviewGoogleCalendarEvent,
      successNotificationMessage: 'The Interview was successfully updated.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(INTERVIEW_UPDATED, { interviewId, engagementId })
      }
    })
  }

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      data-testid='update-interview-modal'
    >
      <Form initialValues={initialValues.current} onSubmit={handleSubmit}>
        <Modal.Title>Edit Interview Details</Modal.Title>

        <Modal.Content>
          <ScheduleInterviewGoogleForm
            autoFocus
            isClassic
            scheduleEngagement={scheduleEngagement}
          />
        </Modal.Content>

        <Modal.Actions>
          <FormCancelButton onClick={hideModal} />
          <Form.SubmitButton
            data-testid='submit-schedule-button'
            variant='positive'
          >
            Update Interview
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default UpdateInterviewGoogleEventModal
