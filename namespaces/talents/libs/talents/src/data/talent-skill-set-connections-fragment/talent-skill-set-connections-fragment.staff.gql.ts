import { gql } from '@staff-portal/data-layer-service'

import { TALENT_SKILL_SET_VETTED_RESULT_FRAGMENT } from '../talent-skill-set-vetted-result-fragment'

export const TALENT_SKILL_SET_CONNECTIONS_FRAGMENT = gql`
  fragment TalentSkillSetConnectionsFragment on SkillSet {
    id
    rating
    connections {
      totalCount
      nodes {
        ... on TalentProfile {
          ...TalentProfileSkillConnection
        }
        ... on TalentEducation {
          ...TalentEducationSkillConnection
        }
        ... on TalentPortfolioItem {
          ...TalentPortfolioItemSkillConnection
        }
        ... on TalentCertification {
          ...TalentCertificationSkillConnection
        }
        ... on TalentEmployment {
          ...TalentEmploymentSkillConnection
        }
      }
    }
    vettedResult {
      ...TalentSkillSetVettedResultFragment
    }
  }

  fragment TalentProfileSkillConnection on TalentProfile {
    id
    __typename
    about
    github {
      text
      url
    }
    resumeFiles {
      nodes {
        uploadedAt
        url
      }
    }
    website
  }

  fragment TalentEducationSkillConnection on TalentEducation {
    __typename
    degree
    title
  }

  fragment TalentPortfolioItemSkillConnection on TalentPortfolioItem {
    id
    __typename
    title
  }

  fragment TalentCertificationSkillConnection on TalentCertification {
    __typename
    certificate
    institution
  }

  fragment TalentEmploymentSkillConnection on TalentEmployment {
    __typename
    startYear
    endYear
    position
    company
  }

  ${TALENT_SKILL_SET_VETTED_RESULT_FRAGMENT}
`
