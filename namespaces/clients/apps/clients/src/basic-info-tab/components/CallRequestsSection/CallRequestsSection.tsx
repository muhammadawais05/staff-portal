import React, { useMemo } from 'react'
import { Section, Container } from '@toptal/picasso'
import { ContainerLoader } from '@staff-portal/ui'
import { CompanyCallRequests } from '@staff-portal/clients-call-requests'

import { useGetCompanyCallbackRequests } from './data'
import { CallRequestsSectionSkeleton } from './components'

export interface Props {
  companyId: string
}

const CallRequestsSection = ({ companyId }: Props) => {
  const { callbackRequests, loading, initialLoading } =
    useGetCompanyCallbackRequests(companyId)
  const isSectionCollapsedByDefault = useMemo(
    () => !callbackRequests?.length,
    [callbackRequests]
  )

  return (
    <Container top='medium'>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={<CallRequestsSectionSkeleton />}
      >
        <Section
          title='Call Requests'
          defaultCollapsed={isSectionCollapsedByDefault}
          collapsible
          data-testid='CallRequestsSection-section'
          variant='withHeaderBar'
        >
          <CompanyCallRequests callbackRequests={callbackRequests || []} />
        </Section>
      </ContainerLoader>
    </Container>
  )
}

export default CallRequestsSection
