import React from 'react'

import { GetQuizQuery } from '../../../data'

type QuizNode = Exclude<GetQuizQuery['node'], undefined | null>

const MockComponent = ({
  quizItems,
  referralPage,
  remoteQuizUrl,
  cumulativeStatus
}: {
  quizItems: Exclude<QuizNode['quizItems'], undefined | null>['nodes']
  referralPage?: QuizNode['referralPage']
  remoteQuizUrl?: QuizNode['remoteQuizUrl']
  cumulativeStatus?: QuizNode['cumulativeStatus']
}) => (
  <div data-testid='QuizContent'>
    <span data-testid='QuizContent-quizItems'>{JSON.stringify(quizItems)}</span>
    <span data-testid='QuizContent-referralPage'>
      {JSON.stringify(referralPage)}
    </span>
    <span data-testid='QuizContent-remoteQuizUrl'>{remoteQuizUrl}</span>
    <span data-testid='QuizContent-cumulativeStatus'>{cumulativeStatus}</span>
  </div>
)

export default MockComponent
