import { Container, ContainerProps, Typography } from '@toptal/picasso'
import React, { memo, ReactElement } from 'react'

interface Props extends Omit<ContainerProps, 'children'> {
  label: string
  answer: ReactElement
}

const QuizItem = memo(({ label, answer, ...props }: Props) => (
  <Container {...props} data-testid='quiz-item'>
    <Typography size='medium' data-testid='quiz-item-label'>
      {label}
    </Typography>
    {answer}
  </Container>
))

export default QuizItem
