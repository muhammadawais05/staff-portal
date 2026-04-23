import { gql } from '@apollo/client'
import { roleTypeFragment } from '@staff-portal/billing/src/__fragments__/roleTypeFragment.graphql'
import { reasonFragments } from '@staff-portal/billing-widgets/src/modules/__fragments__/reasonFragments.graphql'

import { expectedCommissionSubjectFragment } from './expectedCommissionSubjectFragment.graphql'

export const expectedCommissionFragment = gql`
  fragment ExpectedCommissionFragment on ExpectedCommission {
    id
    amount
    expectedDate
    status
    reason {
      __typename
      ...ExpectedCommissionReasonFragment
    }
    subject {
      ...RoleType
      ...ExpectedCommissionSubjectFragment
    }
    kind
  }

  fragment ExpectedCommissionReasonFragment on ExpectedCommissionReason {
    ... on Client {
      ...ReasonClient
    }
    ... on Engagement {
      ...ReasonEngagement

      client {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      job {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      talent {
        id
        webResource {
          ...WebResourceFragment
        }
      }
    }
    ... on RoleStep {
      ...ReasonRoleStep
    }
    ... on Talent {
      ...ReasonTalent
      roleType: type
      sourcedByTalentAcquisitionTeam
    }
    ... on TalentPartner {
      ...ReasonTalentPartner
      roleType: type
    }
  }

  ${roleTypeFragment}
  ${reasonFragments}
  ${expectedCommissionSubjectFragment}
`
