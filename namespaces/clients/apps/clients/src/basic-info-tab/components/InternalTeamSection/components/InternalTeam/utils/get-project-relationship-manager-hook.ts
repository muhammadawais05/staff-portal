import { getClientDataHook } from '@staff-portal/clients'

import { GetProjectRelationshipManagerDocument } from '../data'

export const getProjectRelationshipManagerHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetProjectRelationshipManagerDocument,
    data => data?.node?.projectRelationshipManager?.id
  )
