import { getClientDataHook } from '@staff-portal/clients'

import { GetClientDiscountEligibleDocument } from '../data/get-client-discount-eligible.staff.gql.types'

export const getClientDiscountEligibleHook = (clientId: string) =>
  getClientDataHook({ clientId }, GetClientDiscountEligibleDocument, data =>
    Number(data?.node?.discountEligible)
  )
