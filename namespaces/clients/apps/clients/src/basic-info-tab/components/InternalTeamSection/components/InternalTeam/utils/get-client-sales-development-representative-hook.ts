import { getClientDataHook } from '@staff-portal/clients'

import { GetClientSalesDevelopmentRepresentativeDocument } from '../data'

export const getClientSalesDevelopmentRepresentativeHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientSalesDevelopmentRepresentativeDocument,
    data => data?.node?.salesDevelopmentRepresentative?.id
  )
