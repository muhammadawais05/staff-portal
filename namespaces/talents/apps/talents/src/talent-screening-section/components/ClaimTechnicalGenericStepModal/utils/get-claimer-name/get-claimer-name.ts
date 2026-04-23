import { CurrentUser } from '@staff-portal/current-user'
import { ClaimerFragment } from '@staff-portal/facilities'

export const getClaimerName = (
  currentUser?: CurrentUser,
  selectedClaimer?: ClaimerFragment
): string =>
  (selectedClaimer?.id !== currentUser?.id
    ? selectedClaimer?.fullName
    : 'you') || 'you'
