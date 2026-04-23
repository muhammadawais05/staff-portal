import { useNotifications } from '@toptal/picasso/utils'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { EmailContext } from '@staff-portal/communication-send-email'

import {
  GetRestoreBookingEmailContextDocument,
  GetRestoreBookingEmailContextQuery
} from './get-restore-booking-email-context.staff.gql.types'

export default gql`
  query GetRestoreBookingEmailContext($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Talent {
        id
        contacts(filter: { type: [EMAIL] }) {
          nodes {
            id
            value
            __typename
          }
        }
        emailMessagingBookingRestore {
          id
          defaultBookingObject {
            id
            name
          }
          emailTemplate {
            id
            name
          }
          emailTemplateRendered {
            body
            subject
          }
          ofacStatus
          fullName
          ofacProhibited
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
        }
      }
    }
  }
`

const convertToEmailContext = (
  node: NonNullable<GetRestoreBookingEmailContextQuery['node']>
): EmailContext | undefined => {
  const { contacts, emailMessagingBookingRestore } = node

  if (!emailMessagingBookingRestore) {
    return
  }

  const {
    id,
    fullName,
    defaultBookingObject,
    emailCarbonCopyOptions,
    ofacStatus,
    emailTemplate,
    emailTemplateRendered
  } = emailMessagingBookingRestore

  return {
    blankEmailTemplate: emailTemplate,
    renderedBlankEmailTemplate: emailTemplateRendered,
    emailCarbonCopyOptions,
    emailTemplates: {
      edges: [
        {
          node: emailTemplate,
          rendered: emailTemplateRendered
        }
      ]
    },
    roleType: 'Talent',
    defaultSendTo: { id },
    optionsSendTo: {
      nodes: [
        {
          id,
          fullName,
          email: '',
          contacts,
          __typename: 'Talent'
        }
      ]
    },
    fullName,
    ofacStatus,
    defaultBookingObject,
    viewerPendingCommunications: {
      nodes: []
    }
  }
}

export const useGetRestoreBookingEmailContext = ({
  nodeId,
  onCompleted
}: {
  nodeId: string
  onCompleted?: () => void
}) => {
  const { showError } = useNotifications()
  const { data, refetch, loading } = useQuery(
    GetRestoreBookingEmailContextDocument,
    {
      variables: { nodeId },
      onCompleted: ({ node }) => {
        if (!node) {
          showError('Unable to get the email context.')

          return
        }

        onCompleted?.()
      },
      onError: () => {
        showError('Unable to get the email context.')
      },
      fetchPolicy: 'cache-first'
    }
  )

  return {
    emailContext: data?.node ? convertToEmailContext(data.node) : undefined,
    refetchEmailContext: () => {
      refetch?.()
    },
    loading
  }
}
