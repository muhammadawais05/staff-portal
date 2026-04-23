import { ColorType } from '@toptal/picasso'
import { PublicationGigStatus } from '@staff-portal/graphql/staff'

const getRequestStatusDetails = (
  requestStatus: PublicationGigStatus,
  hasReachout = false
): [string, ColorType] => {
  switch (requestStatus) {
    case PublicationGigStatus.PENDING:
      return ['Pending Claim', 'yellow']
    case PublicationGigStatus.CLAIMED:
      return ['Pending Approval', 'yellow']
    case PublicationGigStatus.APPROVED:
      return [hasReachout ? 'Reach Out Sent' : 'Pending Candidate', 'yellow']
    case PublicationGigStatus.MATCHED:
      return ['Candidate Sent', 'green']
    case PublicationGigStatus.COMPLETED:
      return ['Completed', 'dark-grey']
    case PublicationGigStatus.CLOSED:
      return ['Closed', 'red']
    default:
      return ['Pending Claim', 'yellow']
  }
}

export default getRequestStatusDetails
