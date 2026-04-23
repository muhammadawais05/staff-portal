import { CallDirection } from '@staff-portal/graphql/staff'

import { CallsListItemFragment } from '../components/CallTablePage/data/get-calls-list/calls-list-item-fragment.staff.gql.types'

const formatCallType = (call: CallsListItemFragment) => {
  if (call.isMissed) {
    return 'Missed'
  }

  if (call.direction === CallDirection.INBOUND) {
    return 'Incoming'
  }

  return 'Outgoing'
}

export default formatCallType
