import React from 'react'
import { useTranslation } from 'react-i18next'
import {
  Button,
  Plus16,
  EmptyState,
  Section,
  SectionProps
} from '@toptal/picasso'
import * as OperationsHelper from '@staff-portal/billing/src/_lib/helpers/operations'
import {
  ApolloContextEvents,
  ModalKey
} from '@staff-portal/billing/src/@types/types'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetPlacementFeesQuery } from '../../data/getPlacementFees.graphql.types'
import Table from '../Table'
import * as S from './styles'

const displayName = 'PlacementFees'

interface Props {
  engagementId: string
  variant?: SectionProps['variant']
}

export const PlacementFees = ({ engagementId, variant = 'default' }: Props) => {
  const id = decodeId({ id: engagementId, type: 'engagement' })
  const { t: translate } = useTranslation('placementFees')
  const { handleOnOpenModalWithUrlSearch } = useModals()
  const openAddPlacementFeeModal = () =>
    handleOnOpenModalWithUrlSearch(ModalKey.placementFeeAdd, {
      engagementId: id.toString()
    })
  const { data, loading, refetch, initialLoading } = useGetNode(
    useGetPlacementFeesQuery
  )({
    id: engagementId
  })

  const canCreatePlacementFee = OperationsHelper.isOperationEnabled({
    key: 'createAndConfirmPlacementFee',
    operations: data?.placementFees?.operations
  })

  useRefetch(ApolloContextEvents.placementFeeCreate, refetch)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <Section variant={variant} title={translate('Table.title')}>
          <TableSkeleton row={3} column={9} />
        </Section>
      }
    >
      <Section
        variant={variant}
        title={translate('Table.title')}
        css={S.wrapper}
        actions={
          canCreatePlacementFee && (
            <Button
              data-testid='placement-fees-add'
              icon={<Plus16 />}
              onClick={openAddPlacementFeeModal}
              size='small'
            >
              {translate('AddModal.trigger')}
            </Button>
          )
        }
        data-testid={displayName}
      >
        {data?.placementFees?.nodes?.length ? (
          <Table documents={data?.placementFees} refetch={refetch} />
        ) : (
          <EmptyState.Collection data-testid={`${displayName}-empty`}>
            {translate('Table.emptyTable')}
          </EmptyState.Collection>
        )}
      </Section>
    </ContentLoader>
  )
}

PlacementFees.displayName = displayName

export default PlacementFees
