import {
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewKind
} from '@staff-portal/graphql/staff'

import { ScheduleEngagementFragment } from '../../data/fragments/schedule-engagement-fragment'
import { getCommunicationPhoneDetails } from '../get-communication-phone-details'
import { getCommunicationSkypeDetails } from '../get-communication-skype-details'
import { getScheduleInterviewEventTitle } from '../get-schedule-interview-event-title'

// eslint-disable-next-line complexity
export const getScheduleInterviewEventDescription = ({
  kind,
  initiator,
  communicationType,
  scheduleEngagement: { client, talent, job }
}: {
  kind: InterviewKind
  initiator: InterviewInitiator
  communicationType?: InterviewCommunicationType
  scheduleEngagement: ScheduleEngagementFragment
}) => {
  const jobTitle = job?.title ?? ''
  const clientFullName = client?.fullName ?? ''
  const clientPhoneNumber = client?.contact?.phoneNumber ?? ''
  const talentFullName = talent?.fullName ?? ''
  const talentSkype = talent?.skype ?? ''
  const talentPhoneNumber = talent?.phoneNumber ?? ''
  const claimerEmail = job?.claimer?.email
  const claimerFullName = job?.claimer?.fullName
  const claimerPhoneNumber = job?.claimer?.phoneNumber ?? ''
  const claimerSkype = job?.claimer?.skype ?? ''

  const title = getScheduleInterviewEventTitle({
    kind,
    jobTitle,
    clientFullName
  })

  let communicationInfo = ''

  switch (communicationType) {
    case InterviewCommunicationType.SKYPE:
      communicationInfo = getCommunicationSkypeDetails({
        initiator,
        kind,
        talentFullName,
        clientFullName,
        talentSkype
      })
      break
    case InterviewCommunicationType.PHONE:
      communicationInfo = getCommunicationPhoneDetails({
        initiator,
        kind,
        talentFullName,
        clientFullName,
        clientPhoneNumber,
        talentPhoneNumber
      })
      break
    case InterviewCommunicationType.BLUEJEANS:
    case InterviewCommunicationType.ZOOM:
      communicationInfo =
        'Interview will happen via webconference. Use this URL to join the conference: {{web_conference_url}}.'
      break
    case InterviewCommunicationType.CUSTOM_WEB_CONFERENCE:
      communicationInfo =
        'Interview will happen via webconference. Use this URL to join the conference: <<MATCHER_ZOOM_URL>>.'
      break
  }

  return `Interview with ${talentFullName} for ${title}.

${communicationInfo}
If you need to reschedule or make changes to the interview, please contact ${claimerFullName}
${claimerEmail}
${claimerPhoneNumber}
Skype: ${claimerSkype}`
}
