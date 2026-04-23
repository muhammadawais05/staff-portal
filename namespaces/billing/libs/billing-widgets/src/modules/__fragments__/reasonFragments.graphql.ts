import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

export const reasonFragments = gql`
  fragment ReasonTalent on Talent {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
    referrer {
      ...RoleType
      ...RoleOrClientInfo
    }
  }

  fragment ReasonTalentPartner on TalentPartner {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
    referrer {
      ...RoleType
      ...RoleOrClientInfo
    }
  }

  fragment ReasonRoleStep on RoleStep {
    id
    step {
      title
      short
    }
    # alias done intentionally: RoleStep has 'Talent!' signature instead of 'Talent'
    # and cannot be requested without alias in parallel to Engagement
    roleStepTalent: talent {
      id
      fullName
      webResource {
        ...WebResourceFragment
      }
    }
  }

  fragment ReasonClient on Client {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }

  fragment ReasonEngagement on Engagement {
    id
    talent {
      id
      fullName
      webResource {
        ...WebResourceFragment
      }
    }
    webResource {
      ...WebResourceFragment
    }
  }

  ${webResourceFragment}
`
