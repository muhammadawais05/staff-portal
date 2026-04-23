import { getClientDataHook } from '@staff-portal/clients'

import { GetClientClientPartnerDocument } from '../data/get-client-client-partner.staff.gql.types'

export const getClientClientPartnerHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientClientPartnerDocument,
    data => data?.node?.clientPartner?.id
  )
