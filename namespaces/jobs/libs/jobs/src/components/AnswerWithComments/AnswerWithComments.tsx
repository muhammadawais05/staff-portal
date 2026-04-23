import React, { ReactNode } from 'react'
import { Container, Typography, TypographyOverflow } from '@toptal/picasso'
import { isString } from '@toptal/picasso/utils'

const renderAnswer = (answer: ReactNode) =>
  isString(answer) ? <Typography inline>{answer}</Typography> : answer

interface Props {
  answer?: ReactNode
  comments?: string | null
  'data-testid'?: string
}

export const AnswerWithComments = ({
  answer,
  comments,
  'data-testid': dataTestId
}: Props) => {
  if (!answer && !comments) {
    return null
  }

  return (
    <Container data-testid={dataTestId} flex>
      {answer && renderAnswer(answer)}
      <TypographyOverflow as='span' tooltipContent={comments}>
        {comments && answer ? <>&nbsp;- {comments}</> : comments}
      </TypographyOverflow>
    </Container>
  )
}

export default AnswerWithComments
