import React, { FC, memo } from 'react'
import { Container } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/data-layer-service'
import {
  SectionWithDetailedListSkeleton,
  ContainerLoader
} from '@staff-portal/ui'

import SocialMediaContent from '../SocialMediaContent'
import { GetClientSocialMediaDocument } from '../../data'

interface Props {
  companyId: string
}

const SocialMediaContainer: FC<Props> = memo(({ companyId }) => {
  const {
    data: companyDetails,
    loading,
    initialLoading
  } = useGetNode(GetClientSocialMediaDocument)(
    { clientId: companyId },
    {
      // do not notify about network status changes,
      // so refetch ui state won't be visible and all updates would be in background
      notifyOnNetworkStatusChange: false
    }
  )

  return (
    <Container top='small'>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <SectionWithDetailedListSkeleton title='Social Media' items={5} />
        }
      >
        {companyDetails && (
          <SocialMediaContent companyDetails={companyDetails} />
        )}
      </ContainerLoader>
    </Container>
  )
})

export default SocialMediaContainer
