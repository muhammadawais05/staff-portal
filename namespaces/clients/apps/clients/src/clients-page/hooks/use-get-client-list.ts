import { useGetSearchList } from '@staff-portal/error-handling'

import {
  GetClientsListDocument,
  GetClientsListQueryVariables
} from '../data/get-clients-list'

export const useGetClientsList = (
  variables: GetClientsListQueryVariables,
  skip?: boolean
) => {
  const { data, ...rest } = useGetSearchList(GetClientsListDocument, {
    variables,
    skip
  })

  return {
    data: {
      clients: data?.clients?.nodes,
      totalCount: data?.clients?.totalCount
    },
    ...rest
  }
}
