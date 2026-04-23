import React, { FC, memo, useMemo } from 'react'
import { Table, SkeletonLoader, EmptyState } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import { useGetConsolidationDefaults } from '../../data'
import ConsolidationDefaultsTableHeader from '../ConsolidationDefaultsTableHeader'
import ConsolidationDefaultsTableRow from '../ConsolidationDefaultsTableRow'
import ListTable from '../../../commercialDocument/components/ListTable'
import { GetConsolidationDefaultsQuery } from '../../data/getConsolidationDefaults.graphql.types'

const displayName = 'ConsolidationDefaultsTable'

export type ConsolidationDefault = Exclude<
  GetConsolidationDefaultsQuery['node'],
  undefined | null
>['consolidationDefaults']['nodes'][0]

interface Props {
  clientId: string
  showExpired?: boolean
}

const expiredOrDeleted = (cd: ConsolidationDefault) =>
  cd.deleted ||
  !cd.engagements?.nodes?.some(engagement => engagement?.isWorking)

export const ConsolidationDefaultsTable: FC<Props> = memo(
  ({ clientId, showExpired }) => {
    const { t: translate } = useTranslation('billingDetails')
    const {
      data = { consolidationDefaults: { nodes: [] } },
      loading,
      initialLoading,
      refetch
    } = useGetConsolidationDefaults(clientId)

    useRefetch(
      [
        ApolloContextEvents.consolidationDefaultCreate,
        ApolloContextEvents.consolidationDefaultUpdate
      ],
      refetch
    )

    const consolidationDefaults = data?.consolidationDefaults?.nodes
    const smartConsolidationDefaults = useMemo(
      () =>
        showExpired
          ? consolidationDefaults?.filter(expiredOrDeleted)
          : consolidationDefaults?.filter(cd => !expiredOrDeleted(cd)),
      [showExpired, consolidationDefaults]
    )

    return (
      <ListTable
        loading={loading}
        skeletonComponent={<SkeletonLoader.Typography />}
        emptyMessage={
          <EmptyState.Collection>
            {translate('consolidationDefaults.list.empty')}
          </EmptyState.Collection>
        }
        initialLoading={initialLoading}
        header={<ConsolidationDefaultsTableHeader />}
        body={
          smartConsolidationDefaults?.length !== 0 && (
            <Table.Body>
              {smartConsolidationDefaults?.map(
                (consolidationDefault, index) => (
                  <ConsolidationDefaultsTableRow
                    handleOnActionClick={() => {}}
                    key={consolidationDefault.id}
                    consolidationDefault={consolidationDefault}
                    isEven={Boolean(index % 2)}
                  />
                )
              )}
            </Table.Body>
          )
        }
        fixedWidth={false}
      />
    )
  }
)

ConsolidationDefaultsTable.displayName = displayName

export default ConsolidationDefaultsTable
