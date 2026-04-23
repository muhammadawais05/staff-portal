import React, { useState } from 'react'
import { Section } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'

import {
  Investigation as InvestigationType,
  Operations
} from '../../types'
import { getInvestigationTitle } from '../../utils'
import InvestigationActions from '../InvestigationActions'
import InvestigationDetailedListContent from '../InvestigationDetailedListContent'
import * as S from './styles'

interface Props {
  investigation: InvestigationType
  companyId: string
  operations?: Operations
}

const Investigation = ({
  investigation: { reason },
  investigation,
  companyId,
  operations
}: Props) => {
  const [isJobsExpanded, setIsJobsExpanded] = useState(false)
  const [isResolutionExpanded, setIsResolutionExpanded] = useState(false)

  const toggleJobsSection = () =>
    setIsJobsExpanded(currentIsExpanded => !currentIsExpanded)

  const toggleResolutionSection = () =>
    setIsResolutionExpanded(currentIsExpanded => !currentIsExpanded)

  return (
    <Section
      title={getInvestigationTitle(reason)}
      css={S.investigationSection}
      actions={
        <InvestigationActions
          investigation={investigation}
          clientId={companyId}
          toggleResolutionSection={toggleResolutionSection}
          isResolutionExpanded={isResolutionExpanded}
          toggleJobsSection={toggleJobsSection}
          isJobsExpanded={isJobsExpanded}
          operations={operations}
        />
      }
    >
      <DetailedList labelColumnWidth={10}>
        <InvestigationDetailedListContent
          investigation={investigation}
          isResolutionExpanded={isResolutionExpanded}
          isJobsExpanded={isJobsExpanded}
        />
      </DetailedList>
    </Section>
  )
}

export default Investigation
