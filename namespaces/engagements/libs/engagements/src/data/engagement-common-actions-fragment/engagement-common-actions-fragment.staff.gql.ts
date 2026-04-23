import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

import { ENGAGEMENT_COMMON_ACTIONS_OPERATIONS_FRAGMENT } from '../engagement-common-actions-operations-fragment'

export const ENGAGEMENT_COMMON_ACTIONS_FRAGMENT = gql`
  fragment EngagementCommonActionsFragment on Engagement {
    id
    endDate
    status
    nextTopNumber
    talent {
      id
      type
      fullName
      resumeUrl
      slackContacts: contacts(filter: { type: COMMUNITY_SLACK }) {
        nodes {
          id
          webResource {
            url
          }
        }
      }
      ...WebResourceFragment
    }
    client {
      id
      contracts(
        filter: {
          kinds: [STA]
          statuses: [SIGNED, RECIPIENT_SIGNED]
          showDescendants: false
        }
      ) {
        totalCount
      }
      ...WebResourceFragment
    }
    job {
      id
      talentCount
      ...WebResourceFragment
    }
    operations {
      ...EngagementCommonActionsOperationsFragment
    }
    clientEmailMessaging {
      id
      operations {
        sendEmailTo {
          ...OperationFragment
        }
      }
    }
    talentEmailMessaging {
      id
      operations {
        sendEmailTo {
          ...OperationFragment
        }
      }
    }
  }

  ${ENGAGEMENT_COMMON_ACTIONS_OPERATIONS_FRAGMENT}
  ${WEB_RESOURCE_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
