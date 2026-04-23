import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetClientSocialMediaDocument } from '../data'
import { adjustInputValues } from './adjust-input-values'

export const getClientSocialMediaHook =
  (clientId: string, valueKey: keyof PatchClientProfileInput) => () => {
    const [request, { data, loading, called, error }] = useLazyQuery(
      GetClientSocialMediaDocument,
      { variables: { clientId } }
    )

    return {
      request,
      loading,
      error,
      data: adjustInputValues(data?.node)[valueKey] || undefined,
      called
    }
  }
