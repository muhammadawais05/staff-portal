import React, { memo, useCallback } from 'react'
import { Section, Container } from '@toptal/picasso'
import { useUpdateTalentTabsCounters } from '@staff-portal/talents'

import SourcingRequestsTable from '../SourcingRequestsTable'
import LinkSourcingRequestButton from '../LinkSourcingRequestButton'
import { useGetTalentSourcingRequests } from '../data/get-talent-sourcing-requests'

export interface Props {
  talentId: string
}

const SourcingRequestsTab = ({ talentId }: Props) => {
  const {
    data: sourcingRequests,
    operations,
    networkLoading,
    refetch
  } = useGetTalentSourcingRequests(talentId)

  const updateTabsCounters = useUpdateTalentTabsCounters()
  const handleRefetch = useCallback(() => {
    refetch()
    updateTabsCounters()
  }, [refetch, updateTabsCounters])

  return (
    <Section
      title='Sourcing Requests'
      variant='withHeaderBar'
      data-testid='talent-sourcing-requests-section'
      actions={
        <LinkSourcingRequestButton
          talentId={talentId}
          refetch={handleRefetch}
          operation={operations?.linkSourcingRequest}
          loading={networkLoading}
        />
      }
    >
      <Container>
        <SourcingRequestsTable
          sourcingRequests={sourcingRequests}
          loading={networkLoading}
        />
      </Container>
    </Section>
  )
}

export default memo(SourcingRequestsTab)
