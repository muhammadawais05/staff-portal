import { gql } from '@staff-portal/data-layer-service'
import { TALENT_SKILL_SETS_FRAGMENT } from '@staff-portal/talents'

export default gql`
  query GetApplicantSkills($applicantId: ID!) {
    node(id: $applicantId) {
      ... on AvailabilityRequest {
        id
        job {
          id
          ...ApplicantJobSkillsFragment
        }
        availabilityRequestTalent: talent {
          id
          ...ApplicantTalentSkillsFragment
        }
      }
      ... on JobApplication {
        id
        job {
          id
          ...ApplicantJobSkillsFragment
        }
        jobApplicationTalent: talent {
          id
          ...ApplicantTalentSkillsFragment
        }
      }
    }
  }

  fragment ApplicantTalentSkillsFragment on Talent {
    id
    type
    skillSets {
      ...TalentSkillSetsFragment
    }
  }

  fragment ApplicantJobSkillsFragment on Job {
    id
    skillSets {
      nodes {
        id
        skill {
          id
        }
      }
    }
  }

  ${TALENT_SKILL_SETS_FRAGMENT}
`
