import React from 'react'
import { Container } from '@toptal/picasso'
import { FieldArray } from '@toptal/picasso-forms'
import { EngagementSurveyQuestion } from '@staff-portal/graphql/staff'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import NegativeField from '../NegativeField'
import QuestionItem from '../QuestionItem'

interface Props {
  engagements: NonNullable<SurveyEngagementFragment['engagements']>
  questions: EngagementSurveyQuestion[]
}

const ScoresField = ({ engagements, questions }: Props) => (
  <Container bottom='medium'>
    <FieldArray name='scores'>
      {({ fields }) =>
        fields.map((name, index) => (
          <Container key={name}>
            <QuestionItem
              name={name}
              question={questions[index]}
              value={fields.value[index]}
            />
            {engagements?.totalCount > 1 && (
              <NegativeField engagements={engagements} scoreIndex={index} />
            )}
          </Container>
        ))
      }
    </FieldArray>
  </Container>
)

export default ScoresField
