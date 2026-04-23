import { Container, SkeletonLoader, Typography } from '@toptal/picasso'
import React from 'react'

const QuizQuestionFormLoader = () => (
  <Container data-testid='QuizQuestionFormLoader'>
    <Container bottom='small'>
      <Container>
        <Typography>Question</Typography>
      </Container>
      <SkeletonLoader.Typography rows={3} />
    </Container>
    <Container bottom='small'>
      <Container>
        <Typography>Wrong Answer</Typography>
      </Container>
      <SkeletonLoader.Typography rows={3} />
    </Container>
    <Container bottom='small'>
      <Container>
        <Typography>Correct answer</Typography>
      </Container>
      <SkeletonLoader.Typography rows={3} />
    </Container>
    <Container bottom='small'>
      <Container>
        <Typography>Feedback</Typography>
      </Container>
      <SkeletonLoader.Typography rows={3} />
    </Container>
    <Container bottom='small'>
      <Container>
        <Typography>Vertical</Typography>
      </Container>
      <SkeletonLoader.Typography />
    </Container>
    <Container>
      <Container>
        <Typography>Type of Quiz</Typography>
      </Container>
      <SkeletonLoader.Typography />
    </Container>
  </Container>
)

export default QuizQuestionFormLoader
