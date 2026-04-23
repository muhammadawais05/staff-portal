import React, { memo, PropsWithChildren } from 'react'
import { Section, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'
import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { DetailedList as DL, NoSearchResultsMessage } from '@staff-portal/ui'
import {
  TalentEngagementsRates,
  ClientWillHireAgainField,
  RepeatedClientsField,
  DeltaWaitingTimeField,
  AvailabilityResponseSpeedField,
  TrialRateField
} from '@staff-portal/talents'

import { useGetTalentStatsSection } from './data/get-talent-stats-section/get-talent-stats-section.staff.gql'
import StatsTabSkeletonLoader from '../../components/StatsTabSkeletonLoader/StatsTabSkeletonLoader'
import EligibleJobsStatsField from './components/EligibleJobsStatsField/EligibleJobsStatsField'

interface Props {
  talentId: string
  section?: boolean | null
}

interface ContentWrapperProps {
  section?: boolean | null
}

const ContainerWrapper = ({
  children,
  section
}: PropsWithChildren<ContentWrapperProps>) => {
  if (section) {
    return (
      <Section
        variant='withHeaderBar'
        title='Stats'
        data-testid='stats-section'
      >
        {children}
      </Section>
    )
  }

  return <Container data-testid='stats-section'>{children}</Container>
}

const StatsTab = ({ talentId, section }: Props) => {
  const { showError } = useNotifications()
  const { data, loading } = useGetTalentStatsSection({
    talentId,
    onError: () => showError('Failed fetching talent status section.')
  })

  if (loading) {
    return (
      <ContainerWrapper section={section}>
        <StatsTabSkeletonLoader />
      </ContainerWrapper>
    )
  }

  if (!data) {
    return null
  }

  const {
    id,
    cumulativeStatus,
    availabilityResponseSpeed,
    eligibleJobsStatistics,
    engagements: {
      counters: {
        clientsNumber,
        repeatedClientsNumber,
        acceptedInterviewsNumber,
        approvedTrialsNumber,
        interviewsNumber,
        successRate,
        trialsNumber,
        trialSuccessRate,
        successfulTrialsNumber,
        rejectedTrialsNumber
      }
    },
    feedbackStatistics,
    deltaWaitingDays,
    lastClosedEngagementEndDate,
    lastAvailabilityIncreaseDate
  } = data

  const clientWillHireAgainFragment = { id, feedbackStatistics }

  const isActive = cumulativeStatus === TalentCumulativeStatus.ACTIVE

  if (!isActive) {
    return (
      <ContainerWrapper section={section}>
        <NoSearchResultsMessage message='Statistics are not available for inactive talent.' />
      </ContainerWrapper>
    )
  }

  return (
    <ContainerWrapper section={section}>
      <DL defaultValue={NO_VALUE} labelColumnWidth={10}>
        <DL.Row>
          <DL.Item label='Engagement Rate'>
            <TalentEngagementsRates
              acceptedInterviewsNumber={acceptedInterviewsNumber}
              approvedTrialsNumber={approvedTrialsNumber}
              interviewsNumber={interviewsNumber}
              successRate={successRate}
              trialsNumber={trialsNumber}
            />
          </DL.Item>
          <DL.Item label='AR Speed'>
            <AvailabilityResponseSpeedField
              responseSpeed={availabilityResponseSpeed}
            />
          </DL.Item>
        </DL.Row>

        <DL.Row>
          <DL.Item label='Repeated Clients'>
            <RepeatedClientsField
              clientsNumber={clientsNumber}
              repeatedClientsNumber={repeatedClientsNumber}
            />
          </DL.Item>
          <DL.Item label='Already Interviewing'>
            <EligibleJobsStatsField
              value={eligibleJobsStatistics?.alreadyInterviewing}
            />
          </DL.Item>
        </DL.Row>

        <DL.Row>
          <DL.Item label='Trial Rate'>
            <TrialRateField
              counters={{
                trialSuccessRate,
                successfulTrialsNumber,
                rejectedTrialsNumber
              }}
            />
          </DL.Item>
          <DL.Item label='Be First to Apply'>
            <EligibleJobsStatsField
              value={eligibleJobsStatistics?.beFirstToApply}
            />
          </DL.Item>
        </DL.Row>

        <DL.Row>
          <DL.Item label='Client Will Hire Again'>
            <ClientWillHireAgainField
              data={clientWillHireAgainFragment.feedbackStatistics}
            />
          </DL.Item>
          <DL.Item label='Candidate Introduced to Client'>
            <EligibleJobsStatsField
              value={eligibleJobsStatistics?.candidatesIntroducedToClient}
            />
          </DL.Item>
        </DL.Row>

        <DL.Row>
          <DL.Item label='Delta Waiting Time'>
            <DeltaWaitingTimeField
              deltaWaitingDays={deltaWaitingDays}
              lastClosedEngagementEndDate={lastClosedEngagementEndDate}
              lastAvailabilityIncreaseDate={lastAvailabilityIncreaseDate}
              trialsNumber={trialsNumber}
            />
          </DL.Item>
          <DL.Item label='Reviewing Applications'>
            <EligibleJobsStatsField
              value={eligibleJobsStatistics?.reviewingApplications}
            />
          </DL.Item>
        </DL.Row>
      </DL>
    </ContainerWrapper>
  )
}

export default memo(StatsTab)
