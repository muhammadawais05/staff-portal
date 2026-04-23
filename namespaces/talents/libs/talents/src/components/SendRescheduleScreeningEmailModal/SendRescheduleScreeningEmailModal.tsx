import React, { useCallback } from 'react'
import {
  SendEmailModal as SEM,
  EmailPreview,
  SendEmailFormValuesToAdjust
} from '@staff-portal/communication-send-email'

import { RescheduleScreeningBookingDocument } from './data/reschedule-screening-booking/reschedule-screening-booking.staff.gql.types'
import { useGetRescheduleBookingEmailContext } from './data/get-reschedule-booking-email-context/get-reschedule-booking-email-context.staff.gql'

export interface Props {
  talentId: string
  hideModal: () => void
}

const SendRescheduleScreeningEmailModal = ({ talentId, hideModal }: Props) => {
  const adjustFormValues = useCallback(
    ({
      body,
      ccSuggested,
      ccAdditional,
      bookingObjectId,
      to
    }: SendEmailFormValuesToAdjust) => {
      if (!bookingObjectId) {
        throw new Error(
          'Cannot find "bookingObjectId", make sure the field is rendered'
        )
      }

      return {
        body,
        cc: [...ccSuggested, ...ccAdditional.map(({ value }) => value)],
        bookingObjectId,
        projectBrief: '',
        emailMessagingTalentBookingRescheduleId: to
      }
    },
    []
  )

  return (
    <SEM
      nodeId={talentId}
      queryHook={useGetRescheduleBookingEmailContext}
      mutationDocument={RescheduleScreeningBookingDocument}
      mutationResult='rescheduleTalentScreeningBooking'
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

export default SendRescheduleScreeningEmailModal
