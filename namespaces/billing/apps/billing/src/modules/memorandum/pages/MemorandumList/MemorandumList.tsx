import React from 'react'
import { useTranslation } from 'react-i18next'
import { MemorandumsFilter } from '@staff-portal/graphql/staff'
import ListPage from '@staff-portal/billing/src/components/ListPage'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import WidgetErrorBoundary from '@staff-portal/billing/src/components/WidgetErrorBoundary'

import MemorandumListHeader from '../../components/MemorandumListHeader'
import MemorandumListSearch from '../../components/MemorandumListSearch'
import MemorandumListTable from '../../components/MemorandumListTable'
import {
  memorandumListUpdateDataEvents,
  useMemorandumActionHandler
} from '../../utils'
import {
  MemorandumListContext,
  MemorandumListQueryParams,
  Memorandums
} from '../../context/MemorandumListContext'
import {
  getGqlParamsConfig,
  getQueryParamsConfig
} from '../../components/MemorandumListState/MemorandumListState'
import { useGetMemorandumsListQuery } from '../../data'

const MemorandumList = () => {
  const { t: translate } = useTranslation('memorandumList')
  const { handleOnActionClick } = useMemorandumActionHandler()

  return (
    <ListPage<Memorandums, null, MemorandumsFilter, MemorandumListQueryParams>
      state={{
        context: MemorandumListContext,
        updateDataEvents: memorandumListUpdateDataEvents,
        getQueryParamsConfig,
        getGqlParamsConfig,
        useGetList: ({ gqlVariables }) =>
          useGetData(useGetMemorandumsListQuery, 'memorandums')(gqlVariables, {
            abortKey: 'MemorandumList'
          })
      }}
      title={translate('header.title')}
      actions={
        <WidgetErrorBoundary emptyOnError>
          <MemorandumListHeader />
        </WidgetErrorBoundary>
      }
      search={<MemorandumListSearch />}
      table={({ list: memorandums }) => (
        <MemorandumListTable
          memorandums={memorandums}
          handleOnActionClick={handleOnActionClick}
        />
      )}
    />
  )
}

MemorandumList.displayName = 'MemorandumList'

export default MemorandumList
