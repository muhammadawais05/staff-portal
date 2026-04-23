import React, { useCallback } from 'react'
import {
  SendEmailModal as SEM,
  EmailPreview,
  SendEmailFormValuesToAdjust,
  processEmailBody
} from '@staff-portal/communication-send-email'
import { ROLE_STEP_UPDATED } from '@staff-portal/talents'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { BookingIntroduceTalentDocument } from './data/introduce-screening-booking/introduce-screening-booking.staff.gql.types'
import { useGetIntroduceBookingEmailContext } from './data/get-introduce-booking-email-context/get-introduce-booking-email-context.staff.gql'

interface Props {
  talentId: string
  scheduledSend?: boolean
  hideModal: () => void
}

const SendIntroduceScreeningEmailModal = ({
  talentId,
  scheduledSend,
  hideModal
}: Props) => {
  const adjustFormValues = useCallback(
    ({
      body,
      ccSuggested,
      ccAdditional,
      bookingObjectId,
      to,
      onTime
    }: SendEmailFormValuesToAdjust) => {
      const { emailBody, projectBrief } = processEmailBody(body)

      if (!bookingObjectId) {
        throw new Error(
          'Cannot find "bookingObjectId", make sure the field is rendered'
        )
      }

      return {
        body: emailBody,
        cc: [...ccSuggested, ...ccAdditional.map(({ value }) => value)],
        bookingObjectId,
        projectBrief,
        emailMessagingTalentBookingIntroduceId: to,
        onTime
      }
    },
    []
  )

  const emitMessage = useMessageEmitter()

  return (
    <SEM
      nodeId={talentId}
      queryHook={useGetIntroduceBookingEmailContext}
      mutationDocument={BookingIntroduceTalentDocument}
      mutationResult='bookingIntroduceTalent'
      adjustFormValues={adjustFormValues}
      scheduledSend={scheduledSend}
      hideModal={hideModal}
      onCompleted={() => {
        emitMessage(ROLE_STEP_UPDATED)
      }}
    >
      {({ emailContext }) => (
        <>
          <SEM.BookingObjectField
            autoFocus
            initialSearchTerm={emailContext?.defaultBookingObject?.name || ''}
          />
          <SEM.EmailTemplatesField readOnly />
          <SEM.SubjectField label='Title' readOnly />
          <SEM.ToField />
          <SEM.CCSuggestedField />
          <SEM.CCAdditionalField />
          <SEM.EmailBodyField emailPreview={EmailPreview} />
          <SEM.OfacStatusNotification />
          <SEM.GoogleAppsAuthNotification />
        </>
      )}
    </SEM>
  )
}

export default SendIntroduceScreeningEmailModal
