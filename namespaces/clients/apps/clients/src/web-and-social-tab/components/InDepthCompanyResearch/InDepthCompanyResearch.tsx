import React, { FC, memo } from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import {
  ContainerLoader,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'

import { translate } from '../../utils/constants'
import { GetInDepthCompanyResearchDocument } from '../../data'
import InDepthCompanyResearchContent from './components/InDepthCompanyResearchContent'

interface Props {
  companyId: string
}

export const InDepthCompanyResearch: FC<Props> = memo(({ companyId }) => {
  const {
    data: companyDetails,
    loading,
    initialLoading
  } = useGetNode(GetInDepthCompanyResearchDocument)(
    { clientId: companyId },
    {
      // do not notify about network status changes,
      // so refetch UI state won't be visible and all updates would be in background
      notifyOnNetworkStatusChange: false
    }
  )

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <SectionWithDetailedListSkeleton title={translate.title} items={7} />
      }
    >
      {companyDetails && (
        <InDepthCompanyResearchContent companyDetails={companyDetails} />
      )}
    </ContainerLoader>
  )
})

export default InDepthCompanyResearch
