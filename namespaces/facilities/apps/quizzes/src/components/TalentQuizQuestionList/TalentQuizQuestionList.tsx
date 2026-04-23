import React from 'react'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'

import { TalentQuizQuestionFragment } from '../../data/talent-quiz-question-fragment'
import { TalentQuizQuestionItem } from '../../components'

const getTalentQuizQuestionKey = ({ id }: TalentQuizQuestionFragment) => id
const renderTalentQuizQuestion = (
  talentQuizQuestion: TalentQuizQuestionFragment
) => <TalentQuizQuestionItem talentQuizQuestion={talentQuizQuestion} />

interface TalentQuizQuestionListParams {
  talentQuizQuestions: TalentQuizQuestionFragment[]
  loading: boolean
}

const TalentQuizQuestionList = ({
  talentQuizQuestions,
  loading
}: TalentQuizQuestionListParams) => {
  return (
    <ItemsList<TalentQuizQuestionFragment>
      data={talentQuizQuestions}
      loading={loading}
      getItemKey={getTalentQuizQuestionKey}
      renderItem={renderTalentQuizQuestion}
      notFoundMessage={<NoSearchResultsMessage message='No quizzes found' />}
    />
  )
}

export default TalentQuizQuestionList
