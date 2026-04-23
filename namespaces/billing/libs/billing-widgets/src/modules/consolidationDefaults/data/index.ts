import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetConsolidationDefaultsQuery } from './getConsolidationDefaults.graphql.types'

export const useGetConsolidationDefaults = (id: string) =>
  useGetNode(useGetConsolidationDefaultsQuery)({ id })
