import React, { ReactNode } from 'react'
import {
  Section,
  Rating,
  ThumbsDown16,
  ThumbsUp16,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetNode } from '@staff-portal/data-layer-service'
import {
  DetailedList as DL,
  ContainerLoader,
  LinkWrapper,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { INTERVIEW_UPDATED } from '@staff-portal/engagements-interviews'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { NO_VALUE } from '@staff-portal/config'
import {
  InterviewRatingFacetValues,
  InterviewStatus
} from '@staff-portal/graphql/staff'

import * as S from './styles'
import { GetEngagementClientInterviewFeedbackDocument } from './data/get-engagement-client-interview-feedback/get-engagement-client-interview-feedback.staff.gql.types'

const ICON_MAPPING: Record<InterviewRatingFacetValues, ReactNode> = {
  [InterviewRatingFacetValues.THUMBS_UP]: <ThumbsUp16 />,
  [InterviewRatingFacetValues.THUMBS_DOWN]: <ThumbsDown16 />,
  [InterviewRatingFacetValues.UNKNOWN]: null
}

export interface Props {
  engagementId: string
  labelColumnWidth?: number
}

const EngagementClientInterviewFeedback = ({
  engagementId,
  labelColumnWidth
}: Props) => {
  const { data, loading, initialLoading, refetch } = useGetNode(
    GetEngagementClientInterviewFeedbackDocument
  )({ engagementId })

  const { client, interview } = data || {}

  const {
    status,
    rating,
    ratingComment,
    ratingFacets,
    notReadyFeedback,
    timeRejectComment
  } = interview || {}

  useMessageListener(
    [ENGAGEMENT_UPDATED, INTERVIEW_UPDATED],
    message => message.engagementId === engagementId && refetch()
  )

  const isRejectionCommentFieldVisible =
    timeRejectComment || status === InterviewStatus.TIME_REJECTED

  return (
    <ContainerLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <SectionWithDetailedListSkeleton
          title='Client Interview Feedback'
          labelColumnWidth={labelColumnWidth}
          dataTestId='client-interview-feedback-skeleton-loader'
          columns={1}
          items={6}
        />
      }
    >
      {data?.interview?.rating && (
        <Section
          variant='withHeaderBar'
          title='Client Interview Feedback'
          data-testid='engagement-client-interview-feedback-section'
        >
          <DL labelColumnWidth={labelColumnWidth} defaultValue={NO_VALUE}>
            <DL.Row>
              <DL.Item label='Submitter'>
                <LinkWrapper
                  wrapWhen={Boolean(client?.webResource.url)}
                  href={client?.webResource.url as string}
                  data-testid='interview-submitter-link'
                >
                  <TypographyOverflow
                    as='span'
                    weight='inherit'
                    color='inherit'
                  >
                    {client?.webResource.text}
                  </TypographyOverflow>
                </LinkWrapper>
              </DL.Item>
              <DL.Item label='Rating'>
                <Rating.Stars
                  css={S.noWrap}
                  name='rating'
                  value={Number(rating)}
                  interactive={false}
                />
              </DL.Item>
            </DL.Row>

            <DL.Row>
              <DL.Item label='Rating Comment' value={ratingComment} />
            </DL.Row>

            {ratingFacets?.map(({ name, value }) => (
              <DL.Row key={name}>
                <DL.Item label={name} value={ICON_MAPPING[value]} />
              </DL.Row>
            ))}

            {notReadyFeedback && (
              <DL.Row>
                <DL.Item label='Feedback'>
                  {notReadyFeedback?.answers.nodes?.[0]?.option?.value && (
                    <Typography size='medium' weight='regular' as='em'>
                      {notReadyFeedback.answers.nodes[0].option.value}
                    </Typography>
                  )}
                  {notReadyFeedback?.comment && (
                    <Typography size='medium'>
                      "{notReadyFeedback.comment}"
                    </Typography>
                  )}
                </DL.Item>
              </DL.Row>
            )}

            {isRejectionCommentFieldVisible && (
              <DL.Row>
                <DL.Item
                  label='Rejection Comment'
                  value={`"${timeRejectComment}"`}
                />
              </DL.Row>
            )}
          </DL>
        </Section>
      )}
    </ContainerLoader>
  )
}

export default EngagementClientInterviewFeedback
