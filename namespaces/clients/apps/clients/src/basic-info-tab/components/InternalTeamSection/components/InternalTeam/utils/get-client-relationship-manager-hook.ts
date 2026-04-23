import { getClientDataHook } from '@staff-portal/clients'

import { GetClientRelationshipManagerDocument } from '../data'

export const getClientRelationshipManagerHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientRelationshipManagerDocument,
    data => data?.node?.relationshipManager?.id
  )
