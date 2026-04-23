import { encodeEntityId } from '@staff-portal/data-layer-service'

import { RoleOrClientFragment } from '../data'

export const createRoleOrClientFragment = (
  data?: Partial<RoleOrClientFragment>
): RoleOrClientFragment => ({
  id: encodeEntityId('123', 'Client'),
  fullName: 'Full Name',
  webResource: {
    text: 'Some Web Resource Text',
    url: 'https://staging.toptal.net/platform/staff/staff/1680509'
  },
  ...data
})
