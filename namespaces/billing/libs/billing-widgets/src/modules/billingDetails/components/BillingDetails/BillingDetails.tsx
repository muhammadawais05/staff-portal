import React, { FC, memo } from 'react'
import { Container } from '@toptal/picasso'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

import BillingDetailsContent from '../BillingDetailsContent'
import Skeleton from './Skeleton'
import { useGetClientBillingDetailsQuery } from '../../data/getClientBillingDetails.graphql.types'

const displayName = 'BillingDetails'

interface Props {
  companyId: string
}

export const BillingDetails: FC<Props> = memo(({ companyId }) => {
  const { data, loading, initialLoading, refetch } =
    useGetClientBillingDetailsQuery({
      variables: { clientId: companyId }
    })

  useRefetch(
    [
      ApolloContextEvents.billingAddressEdit,
      ApolloContextEvents.billingOptionRemove,
      ApolloContextEvents.billingOptionUpdate,
      ApolloContextEvents.jobCreateTemplate,
      ApolloContextEvents.jobDeleteTemplate,
      ApolloContextEvents.jobUpdateTemplate,
      ApolloContextEvents.reverifyCreditCardBillingOption,
      ApolloContextEvents.preferEnterpriseBillingOption,
      ApolloContextEvents.unsetPreferredBillingOption,
      ApolloContextEvents.wireVerification
    ],
    refetch
  )

  return (
    <Container top='medium'>
      <ContentLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<Skeleton />}
      >
        {data?.node && (
          <BillingDetailsContent client={data?.node} viewer={data?.viewer} />
        )}
      </ContentLoader>
    </Container>
  )
})

BillingDetails.displayName = displayName

export default BillingDetails
