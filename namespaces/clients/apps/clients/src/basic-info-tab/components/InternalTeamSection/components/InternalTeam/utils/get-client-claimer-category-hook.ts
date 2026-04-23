import { getClientDataHook } from '@staff-portal/clients'

import { GetClientClaimerCategoryDocument } from '../data/get-client-claimer-category.staff.gql.types'

export const getClientClaimerCategoryHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientClaimerCategoryDocument,
    data => data?.node?.claimerCategory
  )
