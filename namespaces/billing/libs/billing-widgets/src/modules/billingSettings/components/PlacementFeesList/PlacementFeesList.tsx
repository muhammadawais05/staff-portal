import { useTranslation } from 'react-i18next'
import React from 'react'
import { EmptyState, Section } from '@toptal/picasso'
import InlineSection from '@staff-portal/billing/src/components/InlineSection'
import * as OperationsHelper from '@staff-portal/billing/src/_lib/helpers/operations'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import TableSkeleton from '@staff-portal/billing/src/components/TableSkeleton'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetPlacementFeesQuery } from '../../../placementFees/data/getPlacementFees.graphql.types'
import Table from '../../../placementFees/components/Table/Table'
import PlacementFeesAddInlineForm from '../PlacementFeesAddInlineForm'

const displayName = 'BillingDetailsPlacementFees'

interface Props {
  engagementId: string
}

export const PlacementFeesList = ({ engagementId }: Props) => {
  const { t: translate } = useTranslation('placementFees')

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
        <Section variant='withHeaderBar' title={translate('Table.title')}>
          <TableSkeleton row={3} column={9} />
        </Section>
      }
    >
      <InlineSection
        showRevealButton={canCreatePlacementFee}
        revealText={translate('AddModal.trigger')}
        headerTitle={translate('Table.title')}
        formElement={({ isOpenForm, onCloseForm }) => (
          <PlacementFeesAddInlineForm
            isOpenInlineForm={isOpenForm}
            onCloseForm={onCloseForm}
            engagementId={engagementId}
          />
        )}
        data-testid={displayName}
      >
        {data?.placementFees?.nodes?.length ? (
          <Table documents={data?.placementFees} refetch={refetch} />
        ) : (
          <EmptyState.Collection data-testid={`${displayName}-empty`}>
            {translate('Table.emptyTable')}
          </EmptyState.Collection>
        )}
      </InlineSection>
    </ContentLoader>
  )
}

PlacementFeesList.displayName = displayName

export default PlacementFeesList
