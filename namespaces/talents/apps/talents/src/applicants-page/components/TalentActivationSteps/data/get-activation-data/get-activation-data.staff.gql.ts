import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetTalentActivationData($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        activationSectionInProgress
        activationSectionVisible
        activation {
          id
          status
          steps {
            nodes {
              ...ActivationStepItemFragment
            }
          }
        }
        activationTemplate {
          id
          active
          name
          steps {
            totalCount
            nodes {
              id
              type
            }
          }
        }
      }
    }
  }

  fragment ActivationStepItemFragment on ActivationStep {
    id
    type
    status
    staff {
      id
      fullName
    }
    operations {
      assign {
        ...ActivationStepOperation
      }
      approve {
        ...ActivationStepOperation
      }
      reset {
        ...ActivationStepOperation
      }
      reassign {
        ...ActivationStepOperation
      }
      unassign {
        ...ActivationStepOperation
      }
      sendIntroductionEmail {
        ...ActivationStepOperation
      }
      sendRestorationEmail {
        ...ActivationStepOperation
      }
      sendRescheduleEmail {
        ...ActivationStepOperation
      }
    }
  }

  fragment ActivationStepOperation on Operation {
    callable
    messages
  }
`
