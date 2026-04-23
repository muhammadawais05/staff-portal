import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import LinkedCompaniesSection from '../LinkedCompaniesSection'
import CompanyOpportunitiesSection from '../CompanyOpportunitiesSection'
import TransferRequestSection from '../TransferRequestSection'
import AccountOverviewSection from '../AccountOverviewSection'
import RelatedTasksSection from '../RelatedTasksSection'
import CallRequestsSection from '../CallRequestsSection'
import AboutSection from '../AboutSection'
import MissionSection from '../MissionSection'
import InternalTeamSection from '../InternalTeamSection'
import ClientScheduledMeetings from '../ClientScheduledMeetings/ClientScheduledMeetings'

export interface Props {
  companyId: string
}

const BasicInfo = ({ companyId }: Props) => {
  return (
    <>
      <WidgetErrorBoundary emptyOnError>
        <AccountOverviewSection companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <AboutSection companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <MissionSection companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <InternalTeamSection companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <TransferRequestSection companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <CompanyOpportunitiesSection companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <RelatedTasksSection companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <ClientScheduledMeetings companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <CallRequestsSection companyId={companyId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <LinkedCompaniesSection companyId={companyId} />
      </WidgetErrorBoundary>
    </>
  )
}

export default BasicInfo
