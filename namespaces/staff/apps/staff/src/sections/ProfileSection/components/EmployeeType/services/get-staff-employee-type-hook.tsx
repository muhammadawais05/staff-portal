import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetEmployeeTypeDocument } from '../data'

const getStaffEmployeeTypeHook = (staffId: string) => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetEmployeeTypeDocument,
    {
      variables: { staffId }
    }
  )

  return {
    request,
    loading,
    error,
    data: data?.node?.paymentsEmployeeType || '',
    called
  }
}

export default getStaffEmployeeTypeHook
