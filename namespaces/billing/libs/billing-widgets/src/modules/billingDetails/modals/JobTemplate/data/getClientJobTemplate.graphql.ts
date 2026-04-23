import gql from 'graphql-tag'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { jobTemplateFragment } from '../../../../__fragments__/jobTemplateFragment.graphql'

export default gql`
  query GetClientJobTemplate($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        jobTemplate {
          ...JobTemplateFragment
        }
        parent {
          id
          fullName
          webResource {
            ...WebResourceFragment
          }
          jobTemplate {
            id
          }
        }
        jobTemplateChangeInfo {
          affectedChildren {
            totalCount
          }
          excludedChildren {
            nodes {
              id
              webResource {
                ...WebResourceFragment
              }
            }
            totalCount
          }
        }
      }
    }
  }

  ${webResourceFragment}
  ${jobTemplateFragment}
`
