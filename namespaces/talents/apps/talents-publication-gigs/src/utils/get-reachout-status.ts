import { VariantType } from '@toptal/picasso/TagRectangular/TagRectangular'
import { GigReachOutStatus } from '@staff-portal/graphql/staff'

const getReachOutStatus = (
  status?: GigReachOutStatus
): [string, VariantType] => {
  switch (status) {
    case GigReachOutStatus.SENT:
      return ['Sent', 'yellow']
    case GigReachOutStatus.ACCEPTED:
      return ['Accepted', 'green']
    case GigReachOutStatus.INTRODUCED:
      return ['Introduced', 'green']
    case GigReachOutStatus.CANCELED:
      return ['Canceled', 'red']
    case GigReachOutStatus.REJECTED:
      return ['Rejected', 'red']
    default:
      return ['Not Sent', 'dark-grey']
  }
}

export default getReachOutStatus
