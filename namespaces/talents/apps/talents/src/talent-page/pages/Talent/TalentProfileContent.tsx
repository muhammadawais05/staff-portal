import React, { useMemo } from 'react'
import { Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { DEBOUNCE_LIMIT } from '@staff-portal/config'
import { ActionLoader, NavigationTabsProvider } from '@staff-portal/ui'
import { PersistentFormProvider } from '@staff-portal/forms'
import {
  PublicLink,
  ROLE_UPDATED,
  SendTalentToJobButton,
  JobSpecificResumeButton,
  TALENT_UPDATED,
  TalentTabValue,
  useGetTalent
} from '@staff-portal/talents'
import { Operation } from '@staff-portal/operations'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { HistoryButton } from '@staff-portal/chronicles'
import { useCommunicateWithTopCall } from '@staff-portal/communication'
import { getRoleTypeText } from '@staff-portal/facilities'
import { NodeStatusMessageNotifications } from '@staff-portal/status-messages'

import PossibleDuplicatesTalentsSection from '../../../talent-profile-tab/components/PossibleDuplicatesTalentsSection'
import {
  PassPrescreeningButton,
  RejectApplicationButton,
  RestoreApplicationButton,
  RestoreOnboardingButton,
  ResumeTalentButton,
  TalentMoreActionsDropdown,
  TalentTabPanel,
  TalentTabsList
} from '../../components'
import { collectDataForTopCall } from './utils'
import { useGetTalentResumeSpecificJobs } from './hooks/use-get-talent-resume-specific-jobs'

type Props = {
  talentId: string
  talentLegacyId: string
}

const TOP_CALL_EMPTY_DATA = {
  talent: undefined
}

// eslint-disable-next-line complexity
const TalentProfileContent = ({ talentId, talentLegacyId }: Props) => {
  const { data: talent, loading, refetch } = useGetTalent(talentId)
  const { resumeSpecificJobs, loading: resumeJobsLoading } =
    useGetTalentResumeSpecificJobs(talentId)

  const specializationApplication = talent?.specializationApplications?.nodes[0]

  const topCallData = useMemo(
    () => collectDataForTopCall(talentLegacyId, talent),
    [talentLegacyId, talent]
  )

  useCommunicateWithTopCall(topCallData, TOP_CALL_EMPTY_DATA)

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => id === talentId && refetch()
  )

  const actions =
    loading || resumeJobsLoading ? (
      <>
        <ActionLoader />
        <ActionLoader />
        <ActionLoader />
        <ActionLoader />
        <ActionLoader circular />
      </>
    ) : (
      talent?.specializationApplications && (
        <>
          <Operation
            operation={talent.operations.passOnboardingTalentPrescreening}
            render={disabled => (
              <Container left='xsmall'>
                <PassPrescreeningButton
                  talentId={talent.id}
                  disabled={disabled}
                />
              </Container>
            )}
          />

          <ResumeTalentButton talent={talent} />

          {specializationApplication && (
            <RejectApplicationButton
              talentId={talent.id}
              specializationApplicationId={specializationApplication.id}
              operation={
                specializationApplication.operations
                  .rejectSpecializationApplication
              }
            />
          )}

          {talent.eligibleForAutomaticRestore && (
            <RestoreApplicationButton talent={talent} />
          )}

          <RestoreOnboardingButton talent={talent} />

          {talent.sendToJobUrl && (
            <Container left='xsmall'>
              <SendTalentToJobButton
                fullName={talent.fullName}
                suspended={talent.suspended}
                sendToJobUrl={talent.sendToJobUrl}
              />
            </Container>
          )}

          {!!resumeSpecificJobs?.length && (
            <Container left='xsmall'>
              <JobSpecificResumeButton resumeJobs={resumeSpecificJobs} />
            </Container>
          )}

          {talent.resumeUrl && (
            <Container left='xsmall'>
              <PublicLink url={talent?.resumeUrl}>Public Profile</PublicLink>
            </Container>
          )}

          {talent.historyLink?.url && (
            <Container left='xsmall'>
              <HistoryButton entity='Talent' id={talentId} />
            </Container>
          )}

          <TalentMoreActionsDropdown
            talentLegacyId={talentLegacyId}
            talent={talent}
          />
        </>
      )
    )

  const browserTitle =
    loading || !talent
      ? undefined
      : `${talent.fullName} (${getRoleTypeText(talent.type)} Profile)`

  return (
    <PersistentFormProvider debounceLimit={DEBOUNCE_LIMIT}>
      <NavigationTabsProvider tabValues={TalentTabValue}>
        <ContentWrapper
          title={talent?.fullName}
          browserTitle={browserTitle}
          titleLoading={loading}
          actions={actions}
          tabs={
            <TalentTabsList talentId={talentId} tabValues={TalentTabValue} />
          }
          additionalStatusMessages={
            <NodeStatusMessageNotifications
              refetchOnMessages={[ROLE_UPDATED, TALENT_UPDATED]}
              id={talentId}
            />
          }
          prependContent={
            <WidgetErrorBoundary emptyOnError>
              <PossibleDuplicatesTalentsSection talentId={talentId} />
            </WidgetErrorBoundary>
          }
        >
          <TalentTabPanel talentId={talentId} tabValues={TalentTabValue} />
        </ContentWrapper>
      </NavigationTabsProvider>
    </PersistentFormProvider>
  )
}

export default TalentProfileContent
