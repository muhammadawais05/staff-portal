import React, { PropsWithChildren, useMemo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form, useFieldArray } from '@toptal/picasso-forms'

import JobApplicationQuestionsList from './components/JobApplicationQuestionsList'
import JobApplicationQuestionsActions from './components/JobApplicationQuestionsActions'

export interface Props {
  skipStickyQuestions?: boolean
}

const JobApplicationQuestions = ({
  skipStickyQuestions,
  children
}: PropsWithChildren<Props>) => {
  const { fields: questions } = useFieldArray('jobPositionQuestions')
  const isQuestionsEmpty = useMemo(
    () => !questions.value.filter(({ destroy }) => !destroy).length,
    [questions.value]
  )

  return (
    <>
      <Container bottom='medium'>
        <Container bottom='xsmall'>
          <Typography weight='semibold' size='medium'>
            Application Questions
          </Typography>
        </Container>
        <Typography size='medium'>
          These will appear when talent apply to this job or confirm a job
          interest request.
        </Typography>
      </Container>

      {children && <Container bottom='medium'>{children}</Container>}

      {!isQuestionsEmpty && (
        <Container bottom='medium'>
          <JobApplicationQuestionsList />
        </Container>
      )}

      <JobApplicationQuestionsActions
        skipStickyQuestions={skipStickyQuestions}
      />

      {!isQuestionsEmpty && (
        <Container top='small'>
          <Form.Checkbox
            name='requiredApplicationPitch'
            label='Require an application pitch.'
            titleCase={false}
          />
        </Container>
      )}
    </>
  )
}

export default JobApplicationQuestions
