import { titleize } from '@staff-portal/string'

import { ReferredRoleEdgeFragment } from '../../data/referred-role-edge-fragment/referred-role-edge-fragment.staff.gql.types'

export const getReferralRole = (node: ReferredRoleEdgeFragment['node']) => {
  if ('type' in node) {
    return titleize(node.type, { splitter: /(?=[A-Z])/ })
  }

  return 'Company'
}
