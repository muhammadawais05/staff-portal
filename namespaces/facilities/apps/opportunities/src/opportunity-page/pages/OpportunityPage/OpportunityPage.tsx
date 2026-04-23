import React from 'react'
import { Container } from '@toptal/picasso'
import { useParams } from '@staff-portal/navigation'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { ActionLoader, TabsList, useHashTabs } from '@staff-portal/ui'
import { PersistentFormProvider } from '@staff-portal/forms'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { HistoryButton } from '@staff-portal/chronicles'

import { useGetOpportunity } from './data/get-opportunity'
import { useGetOpportunityTabs } from './hooks/use-get-opportunity-tabs'
import OpportunityMoreActionsDropdown from '../../components/OpportunityMoreActionsDropdown'
import OpportunitySalesforceConnectionPopup from '../../components/OpportunitySalesforceConnectionPopup'
import OpportunityJobsSection from '../../components/OpportunityJobsSection/OpportunityJobsSection'
import OpportunityRelatedTasksSection from '../../components/OpportunityRelatedTasksSection/OpportunityRelatedTasksSection'

export const OpportunityPage = () => {
  const { id: opportunityLegacyId } = useParams<{ id: string }>()
  const opportunityId = encodeEntityId(opportunityLegacyId, 'Opportunity')
  const { data, loading } = useGetOpportunity(opportunityId)
  const tabs = useGetOpportunityTabs(opportunityId)
  const { activeTabNumber, selectedTabContent, handleTabChange } =
    useHashTabs(tabs)

  const actions = loading ? (
    <ActionLoader />
  ) : (
    data && (
      <>
        <Container left='small'>
          <HistoryButton entity='Opportunity' id={opportunityId} />
        </Container>
        <OpportunityMoreActionsDropdown opportunity={data} />
      </>
    )
  )

  return (
    <PersistentFormProvider debounceLimit={DEBOUNCE_LIMIT}>
      <>
        <ContentWrapper
          title={data?.name ?? ''}
          actions={actions}
          titleLoading={loading}
          additionalStatusMessages={
            <OpportunitySalesforceConnectionPopup
              salesforceId={data?.salesforceId}
            />
          }
          tabs={
            <TabsList
              tabs={tabs}
              activeTabNumber={activeTabNumber}
              handleTabChange={handleTabChange}
            />
          }
        >
          <Container>{selectedTabContent}</Container>
        </ContentWrapper>
        <OpportunityJobsSection opportunityId={opportunityId} />
        <OpportunityRelatedTasksSection opportunityId={opportunityId} />
      </>
    </PersistentFormProvider>
  )
}

export default OpportunityPage
