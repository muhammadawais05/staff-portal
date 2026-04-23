import { gql } from '@staff-portal/data-layer-service'

export const JOB_FAVORITE_TALENTS_FRAGMENT = gql`
  fragment JobFavoriteTalentsFragment on Job {
    id
    favoriteTalents {
      nodes {
        ...JobFavoriteTalentFragment
      }
    }
  }

  fragment JobFavoriteTalentFragment on Talent {
    id
    fullName
    webResource {
      text
      url
    }
  }
`
