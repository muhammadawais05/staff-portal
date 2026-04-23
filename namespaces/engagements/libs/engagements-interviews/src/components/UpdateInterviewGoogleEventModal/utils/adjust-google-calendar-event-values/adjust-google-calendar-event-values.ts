import { GoogleCalendarEventFragment } from '../../../../data/fragments/google-calendar-event-fragment'

export const adjustGoogleCalendarEventValues = ({
  googleEvent,
  talentEmail,
  clientEmails = []
}: {
  googleEvent?: GoogleCalendarEventFragment | null
  clientEmails?: string[]
  talentEmail?: string | null
}) => ({
  gcSummary: googleEvent?.summary ?? '',
  gcDescription: googleEvent?.description ?? '',
  gcUserReceivers:
    googleEvent?.attendees?.filter(email =>
      clientEmails.some(clientEmail => clientEmail === email)
    ) ?? [],
  gcEmails:
    googleEvent?.attendees
      ?.filter(
        email =>
          email !== talentEmail &&
          clientEmails.every(clientEmail => clientEmail !== email)
      )
      .join(', ') ?? ''
})
