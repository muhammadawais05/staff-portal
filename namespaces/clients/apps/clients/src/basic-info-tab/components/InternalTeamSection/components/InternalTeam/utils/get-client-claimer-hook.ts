import { getClientDataHook } from '@staff-portal/clients'

import { GetClientClaimerDocument } from '../data/get-client-claimer.staff.gql.types'

export const getClientClaimerHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientClaimerDocument,
    data => data?.node?.claimer?.id
  )
