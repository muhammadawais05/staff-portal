import { JobProjectSpecCompleteness } from '@staff-portal/graphql/staff'

import { NO_FIELD } from '../../../../config'
import { ProjectSpecCompletenessSurveyFragment } from '../../../DraftJobSection/data/project-spec-completeness-survey-fragment'

export interface Props {
  projectSpecCompleteness?: JobProjectSpecCompleteness | null
  projectSpecCompletenessSurvey: ProjectSpecCompletenessSurveyFragment
}

export const getProjectSpecCompleteness = ({
  projectSpecCompleteness,
  projectSpecCompletenessSurvey
}: Props) => {
  const value = projectSpecCompletenessSurvey.options.find(
    option => option.value === projectSpecCompleteness
  )?.label

  return value || NO_FIELD
}
