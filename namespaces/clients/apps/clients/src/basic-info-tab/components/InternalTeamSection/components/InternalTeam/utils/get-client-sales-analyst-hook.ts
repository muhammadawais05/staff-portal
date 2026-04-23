import { getClientDataHook } from '@staff-portal/clients'

import { GetClientSalesAnalystDocument } from '../data'

export const getClientSalesAnalystHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientSalesAnalystDocument,
    data => data?.node?.salesAnalyst?.id
  )
