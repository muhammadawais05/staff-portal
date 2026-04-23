import { useQuery } from '@staff-portal/data-layer-service'

import { GetClientEngagementSurveyQuestionsDocument } from '../data'

const useClientEngagementSurveyQuestions = () => {
  const { data, ...restOptions } = useQuery(
    GetClientEngagementSurveyQuestionsDocument
  )

  return {
    data: data?.clientEngagementSurveyQuestions?.filter(
      ({ type }) => type !== 'textarea'
    ),
    ...restOptions
  }
}

export default useClientEngagementSurveyQuestions
