import { getClientDataHook } from '@staff-portal/clients'

import { GetClientActualSignDateDocument } from '../data/get-client-actual-sign-date.staff.gql.types'

export const getClientActualSignDateHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientActualSignDateDocument,
    data => data?.node?.actualSignDate
  )
