import { gql } from '@staff-portal/data-layer-service'

export default gql`
  query GetRoleTitleData(
    $jobId: ID!
    $talentId: ID!
    $includeJobId: Boolean!
    $includeTalentId: Boolean!
  ) {
    verticals {
      totalCount
      nodes {
        ...GetVerticalsDataFragment
      }
    }

    job: node(id: $jobId) @include(if: $includeJobId) {
      ... on Job {
        id
        jobType
        specialization {
          id
          title
        }
      }
    }

    talent: node(id: $talentId) @include(if: $includeTalentId) {
      ... on Talent {
        id
        type
      }
    }
  }

  fragment GetVerticalsDataFragment on Vertical {
    id
    talentType
    specializations {
      totalCount
    }
  }
`
