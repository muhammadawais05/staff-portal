import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import {
  JobSummaryProjectLevelSection,
  JobSummaryCompanyLevelSection,
  JobSummaryJobLevelSection,
  JobSummaryProgress,
  JobSummarySkillsSection
} from './components'
interface Props {
  jobId: string
}

const JobSummaryTab = ({ jobId }: Props) => {
  return <>
    <WidgetErrorBoundary emptyOnError>
      <JobSummaryProgress jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobSummaryCompanyLevelSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobSummaryProjectLevelSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobSummaryJobLevelSection jobId={jobId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <JobSummarySkillsSection jobId={jobId} />
    </WidgetErrorBoundary>
  </>
}

export default JobSummaryTab
