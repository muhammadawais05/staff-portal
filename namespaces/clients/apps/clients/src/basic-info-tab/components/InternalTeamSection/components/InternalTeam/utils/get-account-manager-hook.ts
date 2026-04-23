import { getClientDataHook } from '@staff-portal/clients'

import { GetAccountManagerDocument } from '../data'

export const getAccountManagerHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetAccountManagerDocument,
    data => data?.node?.accountManager?.id
  )
