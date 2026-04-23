import React, { useMemo } from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import { ActionLoader, NavigationTabsProvider } from '@staff-portal/ui'
import { InlineActionsWrapper } from '@staff-portal/operations'
import { PersistentFormProvider } from '@staff-portal/forms'
import { Redirect, useHistory } from '@staff-portal/navigation'
import { RoutePath, getClientProfilePath } from '@staff-portal/routes'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { PublicMessages as BillingMessages } from '@staff-portal/billing'
import {
  CLIENT_UPDATED,
  TOPSCREEN_FEATURE_ENABLED,
  RepauseCompanyItem,
  ResumeCompanyItem,
  CheckComplianceButton,
  useGetClientRoleIdParam,
  userCanViewCompanyPage,
  ClientTabValue
} from '@staff-portal/clients'
import { CreateClaimerButton } from '@staff-portal/clients-applicants'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { HistoryButton } from '@staff-portal/chronicles'
import { useCommunicateWithTopCall } from '@staff-portal/communication'
import { NodeStatusMessageNotifications } from '@staff-portal/status-messages'

import {
  ApproveCompanyButton,
  RestoreCompanyFromBlackFlagButton,
  RestoreFromBadLeadModalButton,
  RestoreApplicationModalButton,
  RequestEngagementsPauseButton,
  SendInitialClaimEmailButton,
  EnableTopscreenButton
} from '../../../modals'
import { useGetClient } from '../../data/get-client'
import {
  CompanyHierarchyButton,
  CompanyMoreActionsDropdown,
  EditableClientName,
  PossibleDuplicatesCompaniesSection
} from '../../components'
import { collectDataForTopCall } from '../../utils'
import ClientProfileTabPanel from './components/ClientProfileTabPanel/ClientProfileTabPanel'
import ClientProfileTabsList from './components/ClientProfileTabsList/ClientProfileTabsList'

const TOP_CALL_EMPTY_DATA = {
  company: undefined
}

// todo: remove complexity disabling
// eslint-disable-next-line complexity
export const ClientProfile = () => {
  const history = useHistory()
  const { clientId, clientLegacyId } = useGetClientRoleIdParam()

  const { client, loading, refetch } = useGetClient(clientId)

  // TODO: move within success callback once modal is not being used on platform
  // this modal is being exported from billing-fe
  // and it's also being used in legacy platform,
  // that's why the navigation logic was placed within
  // the ClientProfile page instead of onSuccess callback of the modal
  useMessageListener([BillingMessages.unappliedCashRecord], () =>
    history.replace(
      getClientProfilePath(clientLegacyId, { section: 'billing' })
    )
  )
  // TODO: remove message listener, once the problem would be investigated
  // https://toptal-core.atlassian.net/browse/SPB-2852
  useMessageListener(
    [CLIENT_UPDATED],
    ({ companyId }) => clientId === companyId && refetch()
  )

  useMessageListener(
    [TOPSCREEN_FEATURE_ENABLED],
    ({ clientId: messageClientId }) => clientId === messageClientId && refetch()
  )

  const topCallData = useMemo(
    () => collectDataForTopCall(clientLegacyId, client),
    [clientLegacyId, client]
  )

  useCommunicateWithTopCall(topCallData, TOP_CALL_EMPTY_DATA)

  if (!userCanViewCompanyPage(client)) {
    return <Redirect to={RoutePath.Dashboard} />
  }

  const title = client ? (
    <EditableClientName
      value={client.fullName}
      clientId={client.id}
      operation={client.operations.patchClientProfile}
      icon={<CompanyHierarchyButton client={client} />}
    />
  ) : undefined

  return (
    <PersistentFormProvider debounceLimit={DEBOUNCE_LIMIT}>
      <NavigationTabsProvider
        options={{ keepMounted: true }}
        tabValues={ClientTabValue}
      >
        <ContentWrapper
          additionalStatusMessages={
            <NodeStatusMessageNotifications
              id={clientId}
              refetchOnMessages={[CLIENT_UPDATED]}
            />
          }
          title={title}
          browserTitle={
            // todo: extract to a helper and cover by tests
            client ? `${client.fullName} (Company Profile)` : undefined
          }
          tooltipDisabled
          titleLoading={loading}
          actions={
            // TODO: decompose to `ClientProfileHeader` component
            loading ? (
              <>
                <ActionLoader />
                <ActionLoader circular />
              </>
            ) : (
              client && (
                <>
                  <InlineActionsWrapper
                    marginSizeBetweenChildren='xsmall'
                    data-testid='company-profile-primary-actions'
                  >
                    <CreateClaimerButton
                      companyId={client.id}
                      buttonTitle={'Claim Company'}
                      operation={client.operations.createClientClaimer}
                    />

                    <SendInitialClaimEmailButton
                      companyId={client.id}
                      operation={client.operations.sendClientClaimEmail}
                    />

                    <CheckComplianceButton
                      clientId={client.id}
                      clientName={client.fullName}
                      operation={client.operations.checkClientCompliance}
                    />

                    <EnableTopscreenButton
                      companyId={client.id}
                      operation={client.operations.enableTopscreenFeature}
                    />

                    <ApproveCompanyButton
                      companyId={client.id}
                      operation={client.operations.approveClient}
                    />

                    <ResumeCompanyItem
                      componentType='button'
                      variant='secondary'
                      size='small'
                      companyId={client.id}
                      operation={client.operations.resumeClient}
                    />

                    <RepauseCompanyItem
                      componentType='button'
                      variant='secondary'
                      size='small'
                      companyId={client.id}
                      operation={client.operations.repauseClient}
                    />

                    <RestoreCompanyFromBlackFlagButton
                      companyId={client.id}
                      operation={client.operations.restoreClientFromBlackFlag}
                    />

                    <RestoreApplicationModalButton
                      title='Restore Application'
                      companyId={client.id}
                      operation={client.operations.restoreClient}
                    />

                    <RestoreFromBadLeadModalButton
                      clientId={client.id}
                      clientName={client.fullName}
                      operation={client.operations.restoreClientFromBadLead}
                    />

                    <RequestEngagementsPauseButton
                      size='small'
                      companyId={client.id}
                      operation={
                        client.operations.requestClientEngagementsPause
                      }
                    />

                    {client.historyLink?.url && (
                      <HistoryButton entity='Client' id={client.id} />
                    )}
                  </InlineActionsWrapper>
                  <CompanyMoreActionsDropdown company={client} />
                </>
              )
            )
          }
          tabs={
            <ClientProfileTabsList
              clientId={clientId}
              tabValues={ClientTabValue}
            />
          }
          prependContent={
            <WidgetErrorBoundary emptyOnError>
              <PossibleDuplicatesCompaniesSection
                clientId={clientId}
                operation={
                  client?.operations.markClientPossibleRoleDuplicatesResolved
                }
              />
            </WidgetErrorBoundary>
          }
        >
          <ClientProfileTabPanel
            clientId={client?.id}
            clientName={client?.fullName}
            topScreenClientId={client?.topscreenClient?.id}
            tabValues={ClientTabValue}
          />
        </ContentWrapper>
      </NavigationTabsProvider>
    </PersistentFormProvider>
  )
}

export default ClientProfile
