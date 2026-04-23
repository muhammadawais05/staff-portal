import React from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ContainerLoader } from '@staff-portal/ui'
import { CLIENT_UPDATED } from '@staff-portal/clients'
import { AddRoleFlagButton } from '@staff-portal/role-flags'
import { OFAC_UPDATED } from '@staff-portal/ofac-compliance'

import { useGetCompanyOverview } from './data'
import { AccountOverview, SectionContainer, Skeleton } from './components'

const AccountOverviewSection = ({ companyId }: { companyId: string }) => {
  const { company, initialLoading, loading, error, refetch } =
    useGetCompanyOverview(companyId)

  useMessageListener(
    CLIENT_UPDATED,
    ({ companyId: id }) => company?.id === id && refetch()
  )
  useMessageListener(
    OFAC_UPDATED,
    ({ nodeId: id }) => company?.id === id && refetch()
  )

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<Skeleton />}
    >
      <SectionContainer
        actions={
          company && (
            <AddRoleFlagButton
              roleId={company.id}
              fullName={company.fullName}
              operation={company.operations.addClientRoleFlag}
            />
          )
        }
      >
        {company && <AccountOverview company={company} error={error} />}
      </SectionContainer>
    </ContainerLoader>
  )
}

export default AccountOverviewSection
