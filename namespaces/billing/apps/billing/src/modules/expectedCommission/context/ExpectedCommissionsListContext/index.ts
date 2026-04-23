import { useContext } from 'react'
import { ExpectedCommissionsFilter } from '@staff-portal/graphql/staff'
import {
  createListContext,
  ListQueryParams
} from '@staff-portal/billing/src/components/ListContext/ListContext'

import {
  GetExpectedCommissionsListQuery,
  GetExpectedCommissionsTotalsQuery
} from '../../data'

export interface ExpectedCommissionsListQueryParams extends ListQueryParams {}

export type ExpectedCommissions = Exclude<
  GetExpectedCommissionsListQuery['expectedCommissions'],
  undefined | null
>
export type ExpectedCommissionsTotals = Exclude<
  GetExpectedCommissionsTotalsQuery['expectedCommissions'],
  undefined | null
>

export const ExpectedCommissionsListContext = createListContext<
  ExpectedCommissions,
  ExpectedCommissionsTotals,
  ExpectedCommissionsFilter,
  ExpectedCommissionsListQueryParams
>()

export const useExpectedCommissionsListContext = () =>
  useContext(ExpectedCommissionsListContext)
