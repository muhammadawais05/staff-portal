import { gql } from '@staff-portal/data-layer-service'

import { PENDING_COMMUNICATIONS_TASK_FRAGMENT } from './pending-communication-fragment.staff.gql'

export const ROLE_RECIPIENT_FRAGMENT = gql`
  fragment RoleRecipientFragment on Role {
    id
    fullName
    email
    contacts(filter: { type: [EMAIL] }) {
      nodes {
        id
        value
      }
    }
    __typename
  }
`

export const EMAIL_TEMPLATE_EDGE_FRAGMENT = gql`
  fragment EmailTemplateEdgeFragment on EmailTemplateEdge {
    rendered {
      body
      subject
    }
    node {
      id
      name
    }
  }
`

export const EMAIL_MESSAGING_FRAGMENT = gql`
  fragment EmailMessagingFragment on EmailMessaging {
    roleType
    defaultSendTo {
      id
    }
    optionsSendTo {
      nodes {
        ...RoleRecipientFragment
      }
    }
    blankEmailTemplate {
      id
      name
    }
    renderedBlankEmailTemplate {
      body
      subject
    }
    emailCarbonCopyOptions {
      nodes {
        label
        default
        role {
          id
          fullName
          email
        }
      }
    }
    emailTemplates {
      edges {
        ...EmailTemplateEdgeFragment
      }
    }
    fullName
    ofacStatus
    viewerPendingCommunications {
      nodes {
        ...PendingCommunicationsTaskFragment
      }
    }
  }

  ${ROLE_RECIPIENT_FRAGMENT}
  ${EMAIL_TEMPLATE_EDGE_FRAGMENT}
  ${PENDING_COMMUNICATIONS_TASK_FRAGMENT}
`
