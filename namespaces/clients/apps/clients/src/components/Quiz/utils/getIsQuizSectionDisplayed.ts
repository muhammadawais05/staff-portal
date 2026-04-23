import { GetQuizQuery } from '../data'

type QuizNode = Exclude<GetQuizQuery['node'], undefined | null>

export const getIsQuizSectionDisplayed = ({
  quizItems,
  referralPage,
  remoteQuizUrl
}: {
  quizItems: Exclude<QuizNode['quizItems'], undefined | null>['nodes']
  referralPage?: QuizNode['referralPage']
  remoteQuizUrl?: QuizNode['remoteQuizUrl']
}) => quizItems.length > 0 || !!referralPage || !!remoteQuizUrl
