import { useMemo } from 'react'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetEmployeeTypeItemsDocument } from '../data'

const getEmployeeTypesItemsHook = () => () => {
  const [request, { data, loading, called, error }] = useLazyQuery(
    GetEmployeeTypeItemsDocument
  )

  const nodes = data?.rolesPaymentsEmployeeTypes
  const options = useMemo(
    () =>
      nodes?.map(employeeType => ({
        text: employeeType,
        value: employeeType
      })),
    [nodes]
  )

  return {
    request,
    loading,
    error,
    data: options,
    called
  }
}

export default getEmployeeTypesItemsHook
