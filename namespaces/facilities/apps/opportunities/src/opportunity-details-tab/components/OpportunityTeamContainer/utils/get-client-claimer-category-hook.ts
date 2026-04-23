import { getClientDataHook } from '@staff-portal/clients'

import { GetClientClaimerCategoryDocument } from '../data'

export const getClientClaimerCategoryHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientClaimerCategoryDocument,
    data => data?.node?.claimerCategory
  )
