import { getClientDataHook } from '@staff-portal/clients'

import { GetClientEnterpriseSalesExecutiveDocument } from '../data'

export const getClientEnterpriseSalesExecutiveHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientEnterpriseSalesExecutiveDocument,
    data => data?.node?.enterpriseSalesExecutive?.id
  )
