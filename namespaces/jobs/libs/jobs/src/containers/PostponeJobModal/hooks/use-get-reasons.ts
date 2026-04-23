import { useMemo } from 'react'
import { useGetData } from '@staff-portal/data-layer-service'

import { GetJobPostponeReasonsDocument } from '../data/get-reasons/get-reasons.staff.gql.types'

export const useGetReasons = () => {
  const { data, loading } = useGetData(
    GetJobPostponeReasonsDocument,
    'feedbackReasons'
  )()

  const reasonsSelectOptions = useMemo(
    () =>
      data?.nodes.map(item => ({
        value: item.id,
        text: item.name
      })) || [],
    [data]
  )

  return {
    reasonsSelectOptions,
    loading
  }
}
