import { MockedResponse } from '@staff-portal/data-layer-service'

import { TalentCompletedStepsFragment } from './get-apply-to-different-vertical-steps.staff.gql.types'
import { GET_APPLY_TO_DIFFERENT_VERTICAL_STEPS } from '.'

export const createGetApplyToDifferentVerticalStepsMock = (
  talentId: string,
  steps?: TalentCompletedStepsFragment
): MockedResponse => ({
  request: {
    query: GET_APPLY_TO_DIFFERENT_VERTICAL_STEPS,
    variables: { id: talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        completedScreeningSteps: [],
        completedProfileWizardSteps: [],
        completedProfileFields: [],
        ...steps,
        __typename: 'Talent'
      }
    }
  }
})

export const createGetApplyToDifferentVerticalStepsFailedMock = ({
  id
}: {
  id: string
}) => ({
  request: { query: GET_APPLY_TO_DIFFERENT_VERTICAL_STEPS, variables: { id } },
  error: new Error('Network error occurred')
})
