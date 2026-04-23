import { getClientDataHook } from '@staff-portal/clients'

import { GetProjectDeliveryManagerDocument } from '../data'

export const getProjectDeliveryManagerHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetProjectDeliveryManagerDocument,
    data => data?.node?.projectDeliveryManager?.id
  )
