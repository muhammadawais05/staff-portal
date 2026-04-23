import { useContext } from 'react'
import { MemorandumsFilter } from '@staff-portal/graphql/staff'
import {
  createListContext,
  ListQueryParams
} from '@staff-portal/billing/src/components/ListContext/ListContext'

import { GetMemorandumsListQuery } from '../../data'

export interface MemorandumListQueryParams extends ListQueryParams {}

export type Memorandums = Exclude<
  GetMemorandumsListQuery['memorandums'],
  undefined | null
>

export const MemorandumListContext = createListContext<
  Memorandums,
  null,
  MemorandumsFilter,
  MemorandumListQueryParams
>()

export const useMemorandumListContext = () => useContext(MemorandumListContext)
