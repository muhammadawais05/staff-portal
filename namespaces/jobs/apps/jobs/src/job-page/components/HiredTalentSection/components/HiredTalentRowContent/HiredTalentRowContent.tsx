import { Container } from '@toptal/picasso'
import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import {
  EngagementBreaks,
  EngagementFeedbacks
} from '@staff-portal/engagements'

import { HiredTalentEngagementFragment } from '../../data/get-hired-talent/get-hired-talent.staff.gql.types'
import HiredTalentRowContentTalentDetails from '../HiredTalentRowContentTalentDetails'
import JobCommissions from '../JobCommissions'
import JobContracts from '../JobContracts'
import JobFeedbacks from '../JobFeedbacks'
import EngagementSurveyAnswers from '../EngagementSurveyAnswers'
import * as S from './styles'
import EngagementPausedFeedbacks from '../EngagementPausedFeedbacks'
import { LABEL_COLUMN_EXPANDED_SECTION_WIDTH } from '../../../../config'

interface Props {
  jobId: string
  engagement: HiredTalentEngagementFragment
  isLastItem?: boolean
}

const HiredTalentRowContent = ({ jobId, engagement }: Props) => (
  <Container padded='small' css={S.content}>
    <WidgetErrorBoundary emptyOnError>
      <HiredTalentRowContentTalentDetails engagementId={engagement.id} />
    </WidgetErrorBoundary>

    <WidgetErrorBoundary emptyOnError>
      <EngagementBreaks
        engagementId={engagement.id}
        fetchPolicy='cache-first'
      />
    </WidgetErrorBoundary>

    <WidgetErrorBoundary emptyOnError>
      <JobFeedbacks
        jobId={jobId}
        labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
      />
    </WidgetErrorBoundary>

    <WidgetErrorBoundary emptyOnError>
      <EngagementFeedbacks
        engagementId={engagement.id}
        labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
        fetchPolicy='cache-first'
      />
    </WidgetErrorBoundary>

    <WidgetErrorBoundary emptyOnError>
      <EngagementPausedFeedbacks
        engagementId={engagement.id}
        labelColumnWidth={LABEL_COLUMN_EXPANDED_SECTION_WIDTH}
        fetchPolicy='cache-first'
      />
    </WidgetErrorBoundary>

    <WidgetErrorBoundary emptyOnError>
      <EngagementSurveyAnswers engagementId={engagement.id} />
    </WidgetErrorBoundary>

    <WidgetErrorBoundary emptyOnError>
      <JobCommissions jobId={jobId} />
    </WidgetErrorBoundary>

    <WidgetErrorBoundary emptyOnError>
      <JobContracts jobId={jobId} engagement={engagement} />
    </WidgetErrorBoundary>
  </Container>
)

export default HiredTalentRowContent
