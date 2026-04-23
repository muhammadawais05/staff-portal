import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetMemorandumQuery } from './getMemorandum.graphql.types'

export const useGetMemorandum = (memorandumId: string) =>
  useGetNode(useGetMemorandumQuery)({ memorandumId })
