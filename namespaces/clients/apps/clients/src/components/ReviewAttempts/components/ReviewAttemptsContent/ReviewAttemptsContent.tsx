import React, { useMemo } from 'react'
import { Section, Table, Typography } from '@toptal/picasso'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { parseAndFormatDateTime } from '@staff-portal/date-time-utils'

import { translate , getIsReviewAttemptsSectionCollapsedByDefault } from '../../utils'
import { ReviewAttemptFragment } from '../../data/review-attempt.staff.gql.types'
import ReviewAttemptComment from '../ReviewAttemptComment'
import * as TableStyles from './styles'

type Props = {
  reviewAttempts: ReviewAttemptFragment[]
  clientId: string
}

const displayName = 'ReviewAttemptsContent'

const ReviewAttemptsContent = ({ reviewAttempts }: Props) => {
  const currentUser = useGetCurrentUser()

  const isSectionCollapsedByDefault = useMemo(
    () => getIsReviewAttemptsSectionCollapsedByDefault(reviewAttempts),
    [reviewAttempts]
  )

  if (!reviewAttempts.length) {
    return null
  }

  return (
    <Section
      data-testid='ReviewAttempts'
      title={translate.title}
      variant='withHeaderBar'
      collapsible
      defaultCollapsed={isSectionCollapsedByDefault}
    >
      {!reviewAttempts?.length ? (
        <Typography data-testid={`${displayName}-noAttemptsAvailable`}>
          {translate.noAttemptsAvailable}
        </Typography>
      ) : (
        <Table
          data-testid={`${displayName}-reviewAttemptsList`}
          variant='striped'
          css={TableStyles.table}
        >
          <Table.Head>
            <Table.Row>
              <Table.Cell css={TableStyles.dateCol}>
                {translate.fields.date}
              </Table.Cell>
              <Table.Cell css={TableStyles.resultCol}>
                {translate.fields.result}
              </Table.Cell>
              <Table.Cell>{translate.fields.commentary}</Table.Cell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {reviewAttempts?.map(
              ({ id, createdAt, kind, commentary, reviewLink }) => (
                <Table.Row key={id}>
                  <Table.Cell>
                    {parseAndFormatDateTime(createdAt, {
                      timeZone: currentUser?.timeZone?.value
                    })}
                  </Table.Cell>
                  <Table.Cell>{translate[kind]}</Table.Cell>
                  <Table.Cell>
                    <ReviewAttemptComment
                      commentary={commentary}
                      reviewLink={reviewLink}
                    />
                  </Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table>
      )}
    </Section>
  )
}

export default ReviewAttemptsContent
