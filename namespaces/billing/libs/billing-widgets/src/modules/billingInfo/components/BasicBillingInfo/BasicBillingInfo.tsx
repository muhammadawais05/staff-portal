import React, { memo } from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import BasicBillingInfoContent from './components/BasicBillingInfoContent'
import { basicBillingInfoUpdateDataEvents } from '../../utils'
import { useGetClientBasicBillingInfoQuery } from '../../data'
import Skeleton from './Skeleton'

const displayName = 'BasicBillingInfo'

interface Props {
  companyId: string
}

export const BasicBillingInfo = memo(({ companyId }: Props) => {
  const { data, loading, initialLoading, refetch } =
    useGetClientBasicBillingInfoQuery({
      variables: {
        clientId: companyId
      }
    })

  useRefetch(basicBillingInfoUpdateDataEvents, refetch)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<Skeleton />}
    >
      {data?.node && (
        <BasicBillingInfoContent client={data.node} viewer={data.viewer} />
      )}
    </ContentLoader>
  )
})

BasicBillingInfo.displayName = displayName

export default BasicBillingInfo
