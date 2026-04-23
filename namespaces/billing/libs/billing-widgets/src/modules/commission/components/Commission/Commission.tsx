import React, { FC, memo } from 'react'
import { Container } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { useTranslation } from 'react-i18next'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'

import { useGetCommissionQuery } from '../../data/getCommission.graphql.types'
import CommissionContent from '../CommissionContent'

const displayName = 'Commission'

interface Props {
  nodeId: string
  isActionsHidden?: boolean
}

export const Commission: FC<Props> = memo(
  ({ nodeId, isActionsHidden = false }) => {
    const { t: translate } = useTranslation('commission')

    const { data, loading, initialLoading, refetch } = useGetNode(
      useGetCommissionQuery
    )({
      nodeId
    })

    useRefetch(
      [
        ApolloContextEvents.changeRoleReferrer,
        ApolloContextEvents.clientUpdateClaimer
      ],
      refetch
    )

    return (
      <Container top='medium'>
        <ContentLoader
          loading={loading}
          showSkeleton={initialLoading}
          skeletonComponent={
            <SectionWithDetailedListSkeleton
              title={translate('widget.title')}
              labelColumnWidth={10}
              columns={1}
              items={1}
              striped
            />
          }
        >
          <CommissionContent
            commissionData={data}
            isActionsHidden={isActionsHidden}
          />
        </ContentLoader>
      </Container>
    )
  }
)

Commission.displayName = displayName

export default Commission
