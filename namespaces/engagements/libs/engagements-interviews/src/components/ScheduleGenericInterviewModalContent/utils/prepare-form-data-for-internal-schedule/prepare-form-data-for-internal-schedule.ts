import {
  InterviewCommunicationType,
  InterviewInitiator
} from '@staff-portal/graphql/staff'

import { ScheduleInterviewFragment } from '../../../../data/fragments/schedule-interview-fragment'
import {
  EmailCarbonCopyOptionFragment,
  ScheduleEngagementFragment
} from '../../../../data/fragments/schedule-engagement-fragment'
import { prepareGoogleInvitation } from '../../../../utils'
import { ScheduleInternalInterviewFormValues } from '../../../../types'
import { adjustFormData } from '../adjust-form-data'
import { prepareInterviewContacts } from '../prepare-interview-contacts'

type Props = {
  values: ScheduleInternalInterviewFormValues
  gcUserReceivers?: EmailCarbonCopyOptionFragment[]
  scheduleEngagement: ScheduleEngagementFragment
  scheduleInterview: ScheduleInterviewFragment
}

export const prepareFormDataForInternalSchedule = ({
  values,
  gcUserReceivers,
  scheduleEngagement,
  scheduleInterview
}: Props) => {
  const {
    communication,
    initiator,
    interviewContacts,
    timeZoneName,
    comment,
    primaryContactId,
    interviewType
  } = values
  const { gcSummary, gcDescription } = adjustFormData({
    scheduleEngagement,
    scheduleInterview
  })

  return {
    communication: communication ?? InterviewCommunicationType.PHONE,
    initiator: initiator ?? InterviewInitiator.INTERVIEWER,
    interviewContacts: prepareInterviewContacts(
      interviewContacts,
      primaryContactId
    ),
    timeZoneName,
    comment,
    googleCalendarInvitation: prepareGoogleInvitation({
      summary: gcSummary,
      description: values.gcDescription ?? gcDescription,
      userReceivers: gcUserReceivers?.map(item => item.role.email) ?? []
    }),
    interviewType
  }
}
