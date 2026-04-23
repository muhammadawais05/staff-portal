import { getClientDataHook } from '@staff-portal/clients'

import { GetClientAccountOwnerDocument } from '../data'

export const getClientAccountOwnerHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientAccountOwnerDocument,
    data => data?.node?.accountOwner?.id
  )
