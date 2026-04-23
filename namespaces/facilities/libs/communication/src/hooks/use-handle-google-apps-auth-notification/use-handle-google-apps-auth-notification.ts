import { useGetMailboxes } from './data/get-mailboxes'
import { useGetTeamsWithEmailTracking } from './data/get-teams-with-email-tracking'
import { useGetCommunicationTrackingAuthUrl } from './data/get-communication-tracking-auth-url'

export const useHandleGoogleAppsAuthNotification = () => {
  const { mailboxes } = useGetMailboxes()
  const { teams } = useGetTeamsWithEmailTracking()
  const { authUrl } = useGetCommunicationTrackingAuthUrl()

  return {
    authUrl,
    isAllowedToManageMailboxes: !!mailboxes,
    hasAuthorizedMailboxes: !!mailboxes && mailboxes.length > 0,
    belongsToAtLeastOneTeamWithEmailTrackingEnabled: !!teams && teams.length > 0
  }
}
