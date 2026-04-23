import React from 'react'
import { Container } from '@toptal/picasso'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import SalesToolsWidget from './components/SalesToolsWidget'
import PlaybookTasksWidget from './components/PlaybookTasksWidget'
import OperationalIssuesWidget from './components/OperationalIssuesWidget'
import JobFavoriteCandidatesWidget from './components/JobFavoriteCandidatesWidget'
import TeamTaskMetricsWidget from './components/TeamTaskMetricsWidget'
import * as S from './styles'

interface Props {
  availableTools?: {
    salesTool: boolean
    salesToolEscalations: boolean
  }
}

const SummarySidebar = ({ availableTools }: Props) => {
  return (
    <Container css={S.root}>
      {availableTools?.salesTool && (
        <WidgetErrorBoundary emptyOnError>
          <SalesToolsWidget availableTools={availableTools} />
        </WidgetErrorBoundary>
      )}

      <WidgetErrorBoundary emptyOnError>
        <PlaybookTasksWidget />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <OperationalIssuesWidget />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <JobFavoriteCandidatesWidget />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <TeamTaskMetricsWidget />
      </WidgetErrorBoundary>
    </Container>
  )
}

export default SummarySidebar
