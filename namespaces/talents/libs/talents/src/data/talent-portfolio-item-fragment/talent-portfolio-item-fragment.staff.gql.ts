import { gql } from '@staff-portal/data-layer-service'

export const TALENT_PORTFOLIO_ITEM_FRAGMENT = gql`
  fragment TalentPortfolioItemFragment on PortfolioItem {
    id
    coverPhoto {
      coverUrl
      originalUrl
      thumbUrl
    }
    description
    kindEnum
    link
    position
    title
    files {
      nodes {
        ... on PortfolioItemFile {
          contentType
          description
          title
        }
        ... on PortfolioItemFilePdf {
          id
          fileUrl
          primaryContentType
        }
        ... on PortfolioItemFileImage {
          id
          image {
            coverUrl
            optimizedUrl
            originalUrl
            thumbUrl
          }
        }
      }
    }
    skills {
      nodes {
        id
        name
        skillPage {
          publicUrl
        }
      }
    }
  }
`
