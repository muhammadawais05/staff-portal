import React from 'react'
import { Container, Tooltip, Typography, QuestionMark16 } from '@toptal/picasso'

import { ClientWillHireAgainFragment } from '../../data/client-will-hire-again-fragment'

const getFeedbackStats = (
  data: ClientWillHireAgainFragment['feedbackStatistics']
) => {
  const nodes = data?.nodes

  return nodes?.length
    ? {
        answers: nodes[0].answers.nodes,
        totalCount: nodes[0].answers.totalCount
      }
    : undefined
}

export interface Props {
  data: ClientWillHireAgainFragment['feedbackStatistics']
}

const ClientWillHireAgainField = ({ data }: Props) => {
  const feedbackStats = getFeedbackStats(data)

  return (
    <Container data-testid='client-will-hire-again-field'>
      {feedbackStats ? (
        <Container as='span' flex alignItems='center'>
          {`${feedbackStats.answers[0].score}% (${feedbackStats?.totalCount})`}
          <Tooltip
            content={
              <Typography as='div'>
                <Typography as='span' weight='semibold'>
                  Clients who rated
                </Typography>
                : {feedbackStats.totalCount}
                <br />
                {feedbackStats.answers.map(answer => (
                  <Typography as='span' key={answer.label}>
                    <Typography as='span' weight='semibold'>
                      {answer.label}
                    </Typography>
                    : {answer.score}%
                    <br />
                  </Typography>
                ))}
              </Typography>
            }
            interactive
          >
            <Container
              as='span'
              left='xsmall'
              flex
              alignItems='center'
              data-testid='client-feedback-stats-tooltip-icon'
            >
              <QuestionMark16 color='dark-grey' />
            </Container>
          </Tooltip>
        </Container>
      ) : (
        'Never rated before'
      )}
    </Container>
  )
}

export default ClientWillHireAgainField
