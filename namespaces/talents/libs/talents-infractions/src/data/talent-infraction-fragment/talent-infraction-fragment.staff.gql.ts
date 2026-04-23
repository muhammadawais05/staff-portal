import { gql } from '@staff-portal/data-layer-service'

export const TALENT_INFRACTION_FRAGMENT = gql`
  fragment TalentInfractionFragment on TalentInfraction {
    attachments {
      nodes {
        id
        webResource {
          text
          url
        }
      }
      totalCount
    }
    createdAt
    creator {
      id
      webResource {
        text
        url
      }
    }
    description
    engagement {
      id
      webResource {
        text
        url
      }
    }
    id
    occurredAt
    operations {
      changeInfraction {
        callable
        messages
      }
      removeInfraction {
        callable
        messages
      }
    }
    reasonSlug
    review
    status
    summary
    talent {
      id
      webResource {
        text
        url
      }
    }
    taskAssignee {
      id
      webResource {
        text
        url
      }
    }
  }
`
