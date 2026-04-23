import React from 'react'
import { useParams } from '@staff-portal/navigation'
import { Section, Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  BATCH_KEY,
  encodeEntityId,
  useGetNode
} from '@staff-portal/data-layer-service'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import {
  GetEngagementDocument,
  INTERVIEW_UPDATED,
  INTERVIEW_SCHEDULED
} from '@staff-portal/engagements-interviews'
import {
  ENGAGEMENT_UPDATED,
  ENGAGEMENT_BILLING_CYCLES_UPDATE,
  EngagementBreaks,
  EngagementFeedbacks
} from '@staff-portal/engagements'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { StaffEngagementWidget } from '@staff-portal/billing-widgets'

import {
  EngagementActions,
  EngagementClientInterviewFeedback,
  EngagementCompany,
  EngagementInterviews,
  EngagementJobDetails,
  EngagementStatusSection,
  EngagementTalent,
  EngagementTalentInterviewFeedback,
  EngagementTitle
} from '../../components'
import { isShowBillingEngagement } from '../../utils/is-show-billing-engagement'
import * as S from './styles'

const LABEL_COLUMN_WIDTH = 12

const EngagementPage = () => {
  const { id: engagementLegacyId } = useParams<{ id: string }>()
  const engagementId = encodeEntityId(engagementLegacyId, 'Engagement')

  const { data: engagement, refetch } = useGetNode(GetEngagementDocument)(
    { engagementId },
    {
      throwOnError: true,
      context: { [BATCH_KEY]: 'engagement-above-the-fold-data' }
    }
  )

  useMessageListener(
    [ENGAGEMENT_UPDATED, INTERVIEW_SCHEDULED],
    ({ engagementId: id }) => id === engagementId && refetch()
  )

  useMessageListener(
    INTERVIEW_UPDATED,
    ({ interviewId: id }) => id === engagement?.interview?.id && refetch()
  )

  const { job, client } = engagement || {}
  const title =
    job && client ? (
      <EngagementTitle
        clientWebResource={client.webResource}
        jobWebResource={job.webResource}
      />
    ) : undefined
  const browserTitle =
    job && client
      ? `Position ${job.webResource.text} at ${client.webResource.text}`
      : undefined

  return (
    <ContentWrapper
      title={title}
      browserTitle={browserTitle}
      titleLoading={!title}
      actions={<EngagementActions engagement={engagement} />}
    >
      <Container css={S.container} data-testid='EngagementPage-content'>
        <WidgetErrorBoundary emptyOnError>
          <EngagementCompany
            engagementId={engagementId}
            labelColumnWidth={LABEL_COLUMN_WIDTH}
          />
        </WidgetErrorBoundary>

        <WidgetErrorBoundary emptyOnError>
          <EngagementTalent
            engagementId={engagementId}
            labelColumnWidth={LABEL_COLUMN_WIDTH}
          />
        </WidgetErrorBoundary>

        <WidgetErrorBoundary emptyOnError>
          <EngagementBreaks
            sectionVariant='withHeaderBar'
            engagementId={engagementId}
          />
        </WidgetErrorBoundary>

        <WidgetErrorBoundary emptyOnError>
          <EngagementJobDetails
            engagementId={engagementId}
            labelColumnWidth={LABEL_COLUMN_WIDTH}
          />
        </WidgetErrorBoundary>

        <WidgetErrorBoundary emptyOnError>
          <EngagementStatusSection
            engagementId={engagementId}
            labelColumnWidth={LABEL_COLUMN_WIDTH}
          />
        </WidgetErrorBoundary>

        <WidgetErrorBoundary emptyOnError>
          <EngagementInterviews engagementId={engagementId} />
        </WidgetErrorBoundary>

        <WidgetErrorBoundary emptyOnError>
          <EngagementFeedbacks
            sectionVariant='withHeaderBar'
            engagementId={engagementId}
            labelColumnWidth={LABEL_COLUMN_WIDTH}
          />
        </WidgetErrorBoundary>

        <WidgetErrorBoundary emptyOnError>
          <EngagementClientInterviewFeedback
            engagementId={engagementId}
            labelColumnWidth={LABEL_COLUMN_WIDTH}
          />
        </WidgetErrorBoundary>

        <WidgetErrorBoundary emptyOnError>
          <EngagementTalentInterviewFeedback
            engagementId={engagementId}
            labelColumnWidth={LABEL_COLUMN_WIDTH}
          />
        </WidgetErrorBoundary>

        <WidgetErrorBoundary emptyOnError>
          {isShowBillingEngagement(engagement?.status) && (
            <Section
              css={S.billingSection}
              data-testid='engagement-billing-section'
            >
              <StaffEngagementWidget
                engagementId={engagementId}
                listenedBillingCycleMessages={[
                  ENGAGEMENT_BILLING_CYCLES_UPDATE
                ]}
              />
            </Section>
          )}
        </WidgetErrorBoundary>
      </Container>
    </ContentWrapper>
  )
}

export default EngagementPage
