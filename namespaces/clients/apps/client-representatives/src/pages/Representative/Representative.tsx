import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'
import { Redirect, useParams } from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import {
  encodeEntityId,
  checkIfFieldIsForbidden
} from '@staff-portal/data-layer-service'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { HistoryButton } from '@staff-portal/chronicles'
import { NodeStatusMessageNotifications } from '@staff-portal/status-messages'
import {
  userCanViewCompanyPage,
  OPPORTUNITY_LINKED,
  OPPORTUNITY_UNLINKED
} from '@staff-portal/clients'
import {
  useGetCompanyRepresentative,
  ActionsDropdown,
  MainSubsidiaryFlags
} from '@staff-portal/client-representatives'
import {
  OFACComplianceSection,
  OFAC_UPDATED
} from '@staff-portal/ofac-compliance'
import { ROLE_FLAGS_UPDATED } from '@staff-portal/role-flags'

import ProfileSection from './containers/ProfileSection/ProfileSection'
import AboutSection from './containers/AboutSection/AboutSection'
import { OpportunitiesSection } from './components/OpportunitiesSection'

const ActionLoader = () => (
  <Container left='xsmall'>
    <SkeletonLoader.Button />
  </Container>
)

export const CompanyRepresentative = () => {
  const { id: repLegacyId } = useParams<{ id: string }>()

  const encodedRepId = encodeEntityId(repLegacyId, 'CompanyRepresentative')

  const {
    representative,
    loading,
    error,
    initialLoading,
    refetch: refetchCompanyRepresentative
  } = useGetCompanyRepresentative({
    representativeId: encodedRepId
  })

  const shouldDisplayOpportunities = !checkIfFieldIsForbidden(
    'opportunities',
    error
  )

  useMessageListener(
    [OPPORTUNITY_UNLINKED, OPPORTUNITY_LINKED],
    ({ representativeId }) =>
      representativeId === encodedRepId && refetchCompanyRepresentative()
  )
  useMessageListener(
    OFAC_UPDATED,
    ({ nodeId }) => nodeId === encodedRepId && refetchCompanyRepresentative()
  )
  useMessageListener(ROLE_FLAGS_UPDATED, refetchCompanyRepresentative)

  if (!userCanViewCompanyPage(representative?.client)) {
    return <Redirect to={RoutePath.Dashboard} />
  }

  const actions = initialLoading ? (
    <ActionLoader />
  ) : (
    <>
      {representative?.viewerCanViewHistory && (
        <HistoryButton entity='CompanyRepresentative' id={encodedRepId} />
      )}
      {representative?.operations && (
        <ActionsDropdown representative={representative} fullList />
      )}
    </>
  )

  const browserTitle = representative
    ? `${representative.fullName} (Company Contact)`
    : 'Company Contact'

  return (
    <ContentWrapper
      title={representative?.fullName}
      titleActions={
        <Container left='xsmall' flex alignItems='center'>
          <MainSubsidiaryFlags main={representative?.main} />
        </Container>
      }
      additionalStatusMessages={
        <NodeStatusMessageNotifications id={encodedRepId} />
      }
      browserTitle={browserTitle}
      titleLoading={initialLoading}
      actions={actions}
    >
      <Container top='medium'>
        <ProfileSection
          representative={representative}
          loading={loading}
          initialLoading={initialLoading}
        />
      </Container>

      {representative && representative.about !== null && (
        <Container top='medium'>
          <AboutSection
            representative={representative}
            loading={loading}
            initialLoading={initialLoading}
          />
        </Container>
      )}

      <Container top='medium'>
        <OFACComplianceSection
          nodeId={encodedRepId}
          sectionVariant='withHeaderBar'
          listenedMessages={[OFAC_UPDATED]}
        />
      </Container>

      {shouldDisplayOpportunities && (
        <Container top='medium'>
          <OpportunitiesSection
            representative={representative}
            loading={loading}
            initialLoading={initialLoading}
          />
        </Container>
      )}
    </ContentWrapper>
  )
}

export default CompanyRepresentative
