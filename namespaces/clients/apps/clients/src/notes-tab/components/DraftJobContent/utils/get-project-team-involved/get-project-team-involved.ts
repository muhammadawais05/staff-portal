import { JobProjectTeamInvolved } from '@staff-portal/graphql/staff'

import { ProjectTeamInvolvedSurveyFragment } from '../../../DraftJobSection/data/project-team-involved-survey-fragment'

export interface Props {
  projectTeamInvolved?: JobProjectTeamInvolved | null
  projectTeamInvolvedSurvey: ProjectTeamInvolvedSurveyFragment
}

export const getProjectTeamInvolved = ({
  projectTeamInvolvedSurvey,
  projectTeamInvolved
}: Props) => {
  return projectTeamInvolvedSurvey.options.find(
    option => option.value === projectTeamInvolved
  )?.label
}
