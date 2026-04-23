import React from 'react'
import {
  Form as PicassoForm,
  Grid,
  Typography,
  Container
} from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { EngagementSurveyQuestion } from '@staff-portal/graphql/staff'
import { isRequiredShort } from '@staff-portal/validators'

import * as S from './styles'

interface Props {
  question: EngagementSurveyQuestion
  name: string
  value: number | null
}

const QuestionItem = ({ question, name, value }: Props) => (
  <Grid>
    <Grid.Item small={9}>
      <Container flex>
        <PicassoForm.Label
          titleCase={false}
          css={S.label}
          requiredDecoration='asterisk'
        >
          <Typography
            size='medium'
            data-testid='leave-feedback-modal-question-item'
          >
            {question.title}
          </Typography>
        </PicassoForm.Label>
      </Container>
    </Grid.Item>

    <Grid.Item small={3}>
      <Container left='small'>
        <Form.RadioGroup
          horizontal
          name={name}
          value={Number(value).toString()}
          validate={isRequiredShort}
          data-testid='leave-feedback-modal-question-item-radiogroup'
        >
          {question.answers.map(({ title, score }) => (
            <Form.Radio key={title} label={title} value={score.toString()} />
          ))}
        </Form.RadioGroup>
      </Container>
    </Grid.Item>
  </Grid>
)

export default QuestionItem
