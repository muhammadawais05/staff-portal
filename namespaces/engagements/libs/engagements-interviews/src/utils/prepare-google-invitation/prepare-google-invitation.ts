import { InterviewGoogleCalendarInvitation } from '@staff-portal/graphql/staff'

export const prepareGoogleInvitation = ({
  summary = '',
  description = '',
  userReceivers = [],
  emails
}: InterviewGoogleCalendarInvitation): InterviewGoogleCalendarInvitation => {
  const additionalReceivers = emails
    ?.split(',')
    .filter(email =>
      userReceivers.every(userEmail => email.trim() !== userEmail)
    )
    .join(',')

  return { summary, description, userReceivers, emails: additionalReceivers }
}
