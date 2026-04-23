import React, { useCallback } from 'react'
import {
  SendEmailModal as SEM,
  EmailPreview,
  SendEmailFormValuesToAdjust,
  processEmailBody
} from '@staff-portal/communication-send-email'

import { useGetRestoreBookingEmailContext } from './data/get-restore-booking-email-context/get-restore-booking-email-context.staff.gql'
import { BookingRestoreTalentDocument } from './data/restore-screening-booking/restore-screening-booking.staff.gql.types'

interface Props {
  talentId: string
  hideModal: () => void
}

const SendRestoreScreeningEmailModal = ({ talentId, hideModal }: Props) => {
  const adjustFormValues = useCallback(
    ({
      body,
      ccSuggested,
      ccAdditional,
      bookingObjectId,
      to
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
        bookingObjectId: bookingObjectId,
        projectBrief,
        emailMessagingTalentBookingRestoreId: to
      }
    },
    []
  )

  return (
    <SEM
      nodeId={talentId}
      queryHook={useGetRestoreBookingEmailContext}
      mutationDocument={BookingRestoreTalentDocument}
      mutationResult='bookingRestoreTalent'
      adjustFormValues={adjustFormValues}
      hideModal={hideModal}
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

export default SendRestoreScreeningEmailModal
