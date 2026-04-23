import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export default gql`
  query GetTalentApplicantItem($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        ...TalentApplicantItemFragment
      }
    }
  }

  fragment TalentApplicantItemFragment on Talent {
    id
    fullName
    isNew
    webResource {
      url
    }
    admissionPostUrl
    roleFlags {
      nodes {
        id
        flag {
          id
          token
        }
      }
    }
    eligibleForAutomaticRestore
    operations {
      resumeTalentApplication {
        ...OperationFragment
      }
      restoreTalentActivation {
        ...OperationFragment
      }
      pauseTalent {
        ...OperationFragment
      }
      resumeTalent {
        ...OperationFragment
      }
      updateTalentApplicantSkills {
        ...OperationFragment
      }
    }
    specializationApplications(filter: { statuses: [PENDING, APPROVED] }) {
      nodes {
        id
        status
        specialization {
          id
          title
        }
        operations {
          id
          rejectSpecializationApplication {
            ...OperationFragment
          }
        }
      }
    }
    email
    locationV2 {
      countryName
    }
    ipLocation: ipLocationV2 {
      cityName
      countryName
    }
    currentSignInAt
    currentSignInIp
    timeZone {
      name
      value
    }
    applicantSkills {
      nodes {
        id
        name
      }
    }

    cumulativeStatus
    investigations {
      nodes {
        id
        startedAt
        resolvedAt
      }
    }
    newcomer
    topShield
    vertical {
      id
      specializations {
        totalCount
      }
    }
    joinedAt
    updatedAt
    type
  }

  ${OPERATION_FRAGMENT}
`
