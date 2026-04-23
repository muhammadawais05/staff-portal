import { useTranslation } from 'react-i18next'
import React, { memo, SyntheticEvent, useCallback } from 'react'
import { EmptyState, Section } from '@toptal/picasso'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'

import TransfersTable from '../Table'
import { useGetTransfers } from '../../data'
import TransfersTableHead from '../TableHead'
import { transferTableUpdateEvents } from '../../utils'

const displayName = 'TableWrapper'

interface Props {
  nodeId: string
}

const TableWrapper = ({ nodeId }: Props) => {
  const { data, initialLoading, loading, refetch } = useGetTransfers(nodeId)

  useRefetch(transferTableUpdateEvents, refetch)

  const { handleOnOpenModalWithUrlSearch } = useModals()
  const handleTransferActionClick = useCallback(
    (e: SyntheticEvent<HTMLElement>) => {
      const { nodeId: transferNodeId, value: modalName } =
        e.currentTarget.dataset

      return handleOnOpenModalWithUrlSearch(modalName as ModalKey, {
        nodeId: transferNodeId
      })
    },
    [handleOnOpenModalWithUrlSearch]
  )
  const { t: translate } = useTranslation('transfers')

  const transfers = data?.transfers?.nodes

  return (
    <Section title={translate('title')} data-testid='payments-section'>
      <ContentLoader
        showSkeleton={initialLoading}
        skeletonComponent={
          <TableSkeleton column={6}>
            <TransfersTableHead />
          </TableSkeleton>
        }
        loading={loading}
      >
        {!transfers?.length ? (
          <EmptyState.Collection data-testid={`${displayName}-empty`}>
            {translate('empty')}
          </EmptyState.Collection>
        ) : (
          <TransfersTable
            onTransferActionClick={handleTransferActionClick}
            transfers={data?.transfers?.nodes}
          />
        )}
      </ContentLoader>
    </Section>
  )
}

TableWrapper.displayName = displayName

export default memo(TableWrapper)
