import { useContext } from 'react'
import {
  createListContext,
  ListQueryParams
} from '@staff-portal/billing/src/components/ListContext/ListContext'

import {
  GetMyExpectedCommissionsQuery,
  GetMyExpectedCommissionsTotalsQuery
} from '../../data'

export interface MyExpectedCommissionsListQueryParams extends ListQueryParams {}

export type MyExpectedCommissions = Exclude<
  GetMyExpectedCommissionsQuery['viewer']['expectedCommissions'],
  undefined | null
>
export type MyExpectedCommissionsTotals = Exclude<
  GetMyExpectedCommissionsTotalsQuery['viewer']['expectedCommissions'],
  undefined | null
>

export const MyExpectedCommissionsListContext = createListContext<
  MyExpectedCommissions,
  MyExpectedCommissionsTotals,
  void,
  MyExpectedCommissionsListQueryParams
>()

export const useMyExpectedCommissionsListContext = () =>
  useContext(MyExpectedCommissionsListContext)
