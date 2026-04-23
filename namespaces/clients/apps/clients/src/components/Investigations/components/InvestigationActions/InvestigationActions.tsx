import React from 'react'
import { Container, Tooltip } from '@toptal/picasso'
import { InvestigationReason } from '@staff-portal/graphql/staff'

import ResolutionToggleButton from '../ResolutionToggleButton'
import JobsToggleButton from '../JobsToggleButton'
import {
  Investigation,
  Operations
} from '../../types'
import {
  InvestigationUpdateButton,
  InvestigationResolveButton
} from '../../components'

interface Props {
  investigation: Investigation
  clientId: string
  toggleResolutionSection: () => void
  isResolutionExpanded: boolean
  toggleJobsSection: () => void
  isJobsExpanded: boolean
  operations?: Operations
}

const InvestigationActions = ({
  investigation: {
    resolution,
    resolvedAt,
    jobs: { totalCount }
  },
  operations,
  clientId,
  toggleResolutionSection,
  isResolutionExpanded,
  toggleJobsSection,
  isJobsExpanded
}: Props) => {
  const inInvestigation = !resolvedAt

  const jobsToggleButton = (
    <JobsToggleButton
      totalCount={totalCount}
      handleClick={toggleJobsSection}
      isExpanded={isJobsExpanded}
    />
  )

  return (
    <>
      {inInvestigation && (
        <>
          <InvestigationResolveButton
            operation={operations?.resolveClientReportedIssuesInvestigation}
            clientId={clientId}
            investigationReason={InvestigationReason.REPORTED_ISSUES}
          />
          <InvestigationResolveButton
            operation={operations?.resolveClientLegalInvestigation}
            clientId={clientId}
            investigationReason={InvestigationReason.LEGAL}
          />
          <InvestigationResolveButton
            operation={operations?.resolveClientOtherInvestigation}
            clientId={clientId}
            investigationReason={InvestigationReason.OTHER}
          />

          <InvestigationResolveButton
            operation={operations?.resolveClientPaymentProblemInvestigation}
            clientId={clientId}
            investigationReason={InvestigationReason.PAYMENT_PROBLEM}
          />
          <InvestigationResolveButton
            operation={operations?.resolveClientClientFeedbackInvestigation}
            clientId={clientId}
            investigationReason={InvestigationReason.CLIENT_FEEDBACK}
          />
          <InvestigationResolveButton
            operation={operations?.resolveClientAccountingErrorInvestigation}
            clientId={clientId}
            investigationReason={InvestigationReason.ACCOUNTING_ERROR}
          />
          <InvestigationResolveButton
            operation={operations?.resolveClientCcAchDisputeInvestigation}
            clientId={clientId}
            investigationReason={InvestigationReason.CC_ACH_DISPUTE}
          />
          <InvestigationResolveButton
            operation={operations?.resolveClientMatchingInvestigation}
            clientId={clientId}
            investigationReason={InvestigationReason.MATCHING}
          />
          <InvestigationUpdateButton
            operation={operations?.updateClientInvestigation}
            clientId={clientId}
          />
        </>
      )}
      {resolution && !!resolvedAt && (
        <Container left='small'>
          <ResolutionToggleButton
            handleClick={toggleResolutionSection}
            isExpanded={isResolutionExpanded}
          />
        </Container>
      )}
      <Container left='small'>
        {totalCount ? (
          jobsToggleButton
        ) : (
          <Tooltip
            content='There are no jobs currently associated with the investigation.'
            placement='top'
          >
            <span>{jobsToggleButton}</span>
          </Tooltip>
        )}
      </Container>
    </>
  )
}

export default InvestigationActions
