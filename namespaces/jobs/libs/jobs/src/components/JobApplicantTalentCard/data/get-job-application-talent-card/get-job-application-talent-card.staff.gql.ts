import { gql } from '@staff-portal/data-layer-service'

export const GET_JOB_APPLICATION_TALENT_CARD = gql`
  query GetJobApplicationTalentCard($jobApplicationId: ID!) {
    node(id: $jobApplicationId) {
      ...JobApplicationTalentCardFragment
    }
  }

  fragment JobApplicationTalentCardFragment on JobApplication {
    id
    applicationComment
    createdAt
    talent {
      id
      photo {
        small
      }
      fullName
      locationV2 {
        country {
          id
          name
        }
        stateName
        cityName
      }
      topSkillTitle
      webResource {
        url
      }
    }

    talentPitch {
      ...SkillItemsTalentPitchFragment
      ...IndustryItemsTalentPitchFragment
      ...HighlightItemsTalentPitchFragment
      ...PortfolioItemsTalentPitchFragment
    }
  }

  fragment SkillItemsTalentPitchFragment on TalentPitch {
    skillItems {
      nodes {
        title
        skillSet {
          id
          experience
        }
      }
    }
  }
  fragment IndustryItemsTalentPitchFragment on TalentPitch {
    industryItems {
      nodes {
        title
      }
    }
  }
  fragment HighlightItemsTalentPitchFragment on TalentPitch {
    highlights {
      nodes {
        title
        years
        additionalText
        companyName
        roleName
      }
    }
  }
  fragment PortfolioItemsTalentPitchFragment on TalentPitch {
    designPortfolioItems {
      nodes {
        directUrl
        coverThumbImageUrlWithFallback
        title
      }
    }
  }
`
