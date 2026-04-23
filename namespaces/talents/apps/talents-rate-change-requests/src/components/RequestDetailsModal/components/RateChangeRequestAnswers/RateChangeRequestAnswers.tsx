import React, { ComponentProps } from 'react'
import { Container, Typography, Grid } from '@toptal/picasso'

import RequestDetailsModal from '../../RequestDetailsModal'
import * as S from './styles'

const RateChangeRequestAnswers = ({
  answers
}: Pick<ComponentProps<typeof RequestDetailsModal>, 'answers'>) => {
  if (answers?.nodes.length === 0) {
    return null
  }

  return (
    <Container top='large' data-testid='rate-change-request-answers'>
      <Container top='small' bottom='small'>
        <Typography as='span' weight='semibold' color='black'>
          Talent Answers
        </Typography>
      </Container>

      {answers?.nodes.map((answer, index) => (
        <Grid key={answer.question}>
          <Grid.Item small={1} css={S.itemWrapper}>
            <Typography>{index + 1}.</Typography>
          </Grid.Item>
          <Grid.Item small={11}>
            <Typography>{answer.question}</Typography>
            <Typography weight='semibold'>
              {[answer.answer, answer.comment].filter(Boolean).join('. ')}
            </Typography>
          </Grid.Item>
        </Grid>
      ))}
    </Container>
  )
}

export default RateChangeRequestAnswers
