import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetApplyToDifferentVerticalStepsDocument } from './get-apply-to-different-vertical-steps.staff.gql.types'

export const GET_APPLY_TO_DIFFERENT_VERTICAL_STEPS: typeof GetApplyToDifferentVerticalStepsDocument = gql`
  query GetApplyToDifferentVerticalSteps($id: ID!) {
    node(id: $id) {
      ... on Talent {
        id
        ...TalentCompletedStepsFragment
      }
    }
  }

  fragment TalentCompletedStepsFragment on Talent {
    completedScreeningSteps
    completedProfileWizardSteps
    completedProfileFields
  }
`

export const useGetApplyToDifferentVerticalSteps = ({
  talentId,
  onError
}: {
  talentId: string
  onError: () => void
}) => {
  const { data, error, loading } = useQuery(
    GET_APPLY_TO_DIFFERENT_VERTICAL_STEPS,
    {
      variables: { id: talentId },
      onError
    }
  )

  if (error) {
    throw error
  }

  return { data: data?.node, loading, error }
}
