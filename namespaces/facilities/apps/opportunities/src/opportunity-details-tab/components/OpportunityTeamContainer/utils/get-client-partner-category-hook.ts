import { getClientDataHook } from '@staff-portal/clients'

import { GetClientPartnerCategoryDocument } from '../data'

export const getClientPartnerCategoryHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientPartnerCategoryDocument,
    data => data?.node?.clientPartnerCategory
  )
