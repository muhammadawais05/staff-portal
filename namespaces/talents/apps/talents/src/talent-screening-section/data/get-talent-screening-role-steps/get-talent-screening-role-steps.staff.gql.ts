import {
  gql,
  useQuery,
  filterUnauthorizedErrors
} from '@staff-portal/data-layer-service'

import { GetTalentScreeningRoleStepsDocument } from './get-talent-screening-role-steps.staff.gql.types'

export const GET_TALENT_SCREENING_ROLE_STEPS: typeof GetTalentScreeningRoleStepsDocument = gql`
  query GetTalentScreeningRoleSteps($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        ...ScreeningRoleStepsFragment
        ...ScreeningSectionVisibilityFragment
      }
    }
  }

  fragment ScreeningSectionVisibilityFragment on Talent {
    id
    status
    specializationApplications(filter: { statuses: [PENDING] }) {
      nodes {
        id
        specialization {
          id
        }
      }
    }
  }

  fragment ScreeningRoleStepsFragment on Talent {
    id
    fullName
    screeningRoleSteps {
      nodes {
        ... on RoleStep {
          ...ScreeningRoleStepFragment
        }
      }
    }
  }

  fragment ScreeningRoleStepFragment on RoleStep {
    id
    status
    stepInvolvesMeeting
    interviewInvitationMissing
    interviewInvitationScheduled
    talent {
      id
    }
    step {
      ...ScreeningStepFragment
    }
    claimer {
      __typename
      ... on Node {
        id
      }
    }
    mainAction {
      actionName
      status
      tooltip
    }
    operations {
      reassignRoleStep {
        callable
        messages
      }
      unclaimRoleStep {
        callable
        messages
      }
      unapproveRoleStep {
        callable
        messages
      }
      cancelScheduledInterviewInvitation {
        callable
        messages
      }
    }
    additionalActions {
      nodes {
        actionName
        emailTemplate {
          id
          name
        }
      }
    }
  }

  fragment ScreeningStepFragment on Step {
    id
    stepType
    title
    short
  }
`

export const useGetTalentScreeningRoleSteps = (talentId: string) => {
  const { data, ...restOptions } = useQuery(GET_TALENT_SCREENING_ROLE_STEPS, {
    variables: { talentId },
    fetchPolicy: 'cache-first',
    throwOnError: true,
    errorFilters: [filterUnauthorizedErrors]
  })

  return {
    talent: data?.node,
    ...restOptions
  }
}
