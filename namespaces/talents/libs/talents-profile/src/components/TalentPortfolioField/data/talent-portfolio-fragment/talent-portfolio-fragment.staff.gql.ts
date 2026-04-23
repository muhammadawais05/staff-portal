import { gql } from '@staff-portal/data-layer-service'

export const TALENT_PORTFOLIO_FRAGMENT = gql`
  fragment TalentPortfolioFragment on Talent {
    portfolio {
      ...TalentPortfolioFilesFragment
    }
  }

  fragment TalentPortfolioFilesFragment on TalentPortfolio {
    files {
      nodes {
        ...TalentPortfolioFileFragment
      }
    }
  }

  fragment TalentPortfolioFileFragment on PortfolioFile {
    id
    operations {
      voteForTalentPortfolioFile {
        callable
        messages
      }
    }
    specializationApplication {
      id
      specialization {
        id
        title
      }
    }
    webResource {
      text
      url
    }
    createdAt
    votes {
      nodes {
        ...TalentPortfolioVoteFragment
      }
    }
  }

  fragment TalentPortfolioVoteFragment on PortfolioVote {
    id
    vote
    comment
    voter {
      fullName
      id
    }
  }
`
