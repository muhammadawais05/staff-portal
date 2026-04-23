import { getClientDataHook } from '@staff-portal/clients'

import { GetMatchingOperationsCoordinatorDocument } from '../data'

export const getMatchingOperationsCoordinatorHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetMatchingOperationsCoordinatorDocument,
    data => data?.node?.matchingOperationsCoordinator?.id
  )
