import React from 'react'
import {
  Container,
  Grid,
  Typography,
  TypographyOverflow
} from '@toptal/picasso'
import { capitalize } from '@toptal/picasso/utils'
import {
  TalentQuizQuestion,
  TalentQuizQuestionKind
} from '@staff-portal/graphql/staff'
import { DetailedList, MarkdownWithHtml } from '@staff-portal/ui'
import { getRoleTypeText } from '@staff-portal/facilities'

import EditQuestionButton from '../EditQuestionButton'
import DeleteQuestionButton from '../DeleteQuestionButton'
import * as S from './styles'

type Props = {
  talentQuizQuestion: TalentQuizQuestion
}

const humanizeKind = (kind: TalentQuizQuestionKind) => {
  return capitalize(kind.toLowerCase())
}

const htmlContent = (htmlString: string) => {
  const domElement = new DOMParser().parseFromString(htmlString, 'text/html')

  return domElement.documentElement.textContent || ''
}

const unescapeHtml = (htmlString: string) => {
  return (
    <TypographyOverflow
      size='medium'
      forwardedAs='div'
      css={S.paragraphWrapper}
    >
      <MarkdownWithHtml allowDangerousHtml linkProps={{ target: '_blank' }}>
        {htmlContent(htmlString)}
      </MarkdownWithHtml>
    </TypographyOverflow>
  )
}

const TalentQuizQuestionItem = ({ talentQuizQuestion }: Props) => {
  const talentQuizQuestionData = [
    { label: 'Wrong Answer', value: talentQuizQuestion.wrongAnswer },
    { label: 'Correct Answer', value: talentQuizQuestion.correctAnswer },
    { label: 'Feedback', value: unescapeHtml(talentQuizQuestion.feedback) },
    [
      {
        label: 'Vertical',
        value: getRoleTypeText(talentQuizQuestion.talentType)
      },
      { label: 'Type of Quiz', value: humanizeKind(talentQuizQuestion.kind) }
    ]
  ]

  // feedback and body need to be parsed for correct
  // rendering of html tags inside of edit modal
  // like it is done in this component
  const editTalentQuizQuestionData = {
    ...talentQuizQuestion,
    body: htmlContent(talentQuizQuestion.body),
    feedback: htmlContent(talentQuizQuestion.feedback)
  }

  return (
    <Container data-testid={`talent-quiz-question-${talentQuizQuestion.id}`}>
      <Container bottom='medium'>
        <Grid justifyContent='space-between' wrap='nowrap'>
          <Grid.Item>
            <Typography variant='heading' size='medium'>
              {htmlContent(talentQuizQuestion.body)}
            </Typography>
          </Grid.Item>
          <Grid.Item>
            <Container flex>
              <EditQuestionButton question={editTalentQuizQuestionData} />
              <DeleteQuestionButton question={talentQuizQuestion} />
            </Container>
          </Grid.Item>
        </Grid>
      </Container>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        multilines
        labelColumnWidth={9}
        items={talentQuizQuestionData}
      />
    </Container>
  )
}

export default TalentQuizQuestionItem
