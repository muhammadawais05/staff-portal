import React from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import {
  ContainerLoader,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { Container } from '@toptal/picasso'

import { GetCompanyFinancialInformationDocument } from './data'
import CompanyFinancialInformationContent from './components/CompanyFinancialInformationContent'

interface Props {
  companyId: string
}

const CompanyFinancialInformation = ({ companyId }: Props) => {
  const {
    data: companyDetails,
    loading,
    initialLoading
  } = useGetNode(GetCompanyFinancialInformationDocument)(
    { clientId: companyId },
    {
      // do not notify about network status changes,
      // so refetch ui state won't be visible and all updates would be in background
      notifyOnNetworkStatusChange: false
    }
  )

  return (
    <Container top='medium'>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <SectionWithDetailedListSkeleton
            title='Financial Information'
            labelColumnWidth={9}
            items={4}
            columns={2}
          />
        }
      >
        {companyDetails && (
          <CompanyFinancialInformationContent companyDetails={companyDetails} />
        )}
      </ContainerLoader>
    </Container>
  )
}

export default CompanyFinancialInformation
