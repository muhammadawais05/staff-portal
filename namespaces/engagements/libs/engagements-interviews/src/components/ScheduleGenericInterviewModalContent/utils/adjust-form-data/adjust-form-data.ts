import {
  InterviewInitiator,
  InterviewType,
  Maybe
} from '@staff-portal/graphql/staff'

import { ScheduleInterviewFragment } from '../../../../data/fragments/schedule-interview-fragment'
import { ScheduleEngagementFragment } from '../../../../data/fragments/schedule-engagement-fragment'
import { ScheduleInterviewFormValues } from '../../../../types'
import {
  getInterviewModalTimeZone,
  getScheduleInterviewEventDescription
} from '../../../../utils'
import { adjustComment } from '../adjust-comment'
import { getInterviewContacts } from '../get-interview-contacts'
import { getPrimaryContactId } from '../get-primary-contact-id'

export const adjustFormData = ({
  scheduleEngagement,
  scheduleInterview,
  currentUserTimeZone
}: {
  scheduleEngagement: ScheduleEngagementFragment
  scheduleInterview: ScheduleInterviewFragment
  currentUserTimeZone?: Maybe<{
    name: string
    value: string
  }>
}): ScheduleInterviewFormValues => {
  const { job, client, talent } = scheduleEngagement
  const {
    interviewType,
    interviewContacts,
    kind,
    timeZone,
    preferredDuration,
    availableContacts,
    disableCompanyNotifications,
    schedulingComment
  } = scheduleInterview

  const timeZoneValue = getInterviewModalTimeZone({
    timeZone,
    kind,
    currentUserTimeZone,
    clientTimeZone: client?.timeZone
  })
  const initiator =
    scheduleInterview.initiator ?? InterviewInitiator.INTERVIEWER
  const communication = scheduleInterview.communication ?? undefined
  const contacts = getInterviewContacts(interviewContacts, availableContacts)
  const primaryContactId = getPrimaryContactId(contacts, interviewContacts)

  return {
    timeZoneName: timeZoneValue,
    preferredDuration: preferredDuration ?? undefined,
    initiator,
    interviewType: interviewType ?? InterviewType.GENERAL,
    communication,
    acceptForTalent: false,
    sendGoogleCalendarInvitation: false,
    disableCompanyNotifications: disableCompanyNotifications ?? false,
    interviewContacts: contacts,
    date: undefined,
    time: undefined,
    comment: adjustComment({ comment: schedulingComment, communication }),
    scheduledAtTimes: [{ date: undefined, time: '' }],
    gcSummary: `Toptal Interview with ${talent?.fullName} for ${job?.title}`,
    gcDescription: getScheduleInterviewEventDescription({
      kind,
      initiator,
      communicationType: communication,
      scheduleEngagement
    }),
    gcUserReceivers: [],
    primaryContactId
  }
}
