import {
  InterviewCommunicationType,
  InterviewInitiator
} from '@staff-portal/graphql/staff'

import { ScheduleInterviewFormValues } from '../../../../types'
import { prepareGoogleInvitation } from '../../../../utils'
import { prepareInterviewContacts } from '../prepare-interview-contacts'

export const prepareFormDataForSchedule = ({
  communication,
  initiator,
  interviewContacts,
  timeZoneName,
  comment,
  disableCompanyNotifications,
  sendGoogleCalendarInvitation,
  gcSummary,
  gcDescription,
  gcUserReceivers,
  gcEmails,
  interviewType,
  primaryContactId
}: ScheduleInterviewFormValues) => ({
  communication: communication ?? InterviewCommunicationType.PHONE,
  initiator: initiator ?? InterviewInitiator.INTERVIEWER,
  interviewContacts: prepareInterviewContacts(
    interviewContacts,
    primaryContactId
  ),
  timeZoneName,
  comment,
  disableCompanyNotifications,
  googleCalendarInvitation: sendGoogleCalendarInvitation
    ? prepareGoogleInvitation({
        summary: gcSummary,
        description: gcDescription,
        userReceivers: gcUserReceivers,
        emails: gcEmails
      })
    : undefined,
  interviewType
})
