import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { ACTIVATION_STEP_FRAGMENT } from '@staff-portal/talents'

import { GetTalentActivationStepsDocument } from './get-talent-activation.staff.gql.types'

export default gql`
  query GetTalentActivationSteps($talentId: ID!) {
    node(id: $talentId) {
      ...TalentActivationSteps
    }
  }

  fragment TalentActivationSteps on Talent {
    id
    fullName
    activationSectionInProgress
    activationSectionVisible
    activation {
      id
      status
      steps {
        nodes {
          ...ActivationStepFragment
        }
      }
    }
    activationTemplate {
      id
      steps {
        nodes {
          id
          type
        }
      }
    }
  }

  ${ACTIVATION_STEP_FRAGMENT}
`

export const useGetTalentActivation = (talentId: string) => {
  const { data, loading, refetch } = useGetNode(
    GetTalentActivationStepsDocument
  )({ talentId })

  return {
    talent: data,
    loading,
    refetch
  }
}
