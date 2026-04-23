import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetCompanyHqPhoneDocument } from '../data/get-company-hq-phone.staff.gql.types'

export const getCompanyHqPhoneHook = (clientId: string) => () => {
  const [
    request,
    { data, loading, called, error }
  ] = useLazyQuery(GetCompanyHqPhoneDocument, { variables: { clientId } })

  return {
    request,
    loading,
    error,
    data: data?.node?.companyHqPhone ?? '',
    called
  }
}
