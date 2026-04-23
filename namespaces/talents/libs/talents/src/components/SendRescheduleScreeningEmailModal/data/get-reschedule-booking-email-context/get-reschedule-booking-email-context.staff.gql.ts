import { useNotifications } from '@toptal/picasso/utils'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { EmailContext } from '@staff-portal/communication-send-email'

import {
  GetRescheduleBookingEmailContextDocument,
  GetRescheduleBookingEmailContextQuery
} from './get-reschedule-booking-email-context.staff.gql.types'

export default gql`
  query GetRescheduleBookingEmailContext($nodeId: ID!) {
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
        emailMessagingBookingReschedule {
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
        __typename
      }
    }
  }
`

const convertToEmailContext = (
  node: NonNullable<GetRescheduleBookingEmailContextQuery['node']>
): EmailContext | undefined => {
  const { contacts, emailMessagingBookingReschedule, __typename } = node

  if (!emailMessagingBookingReschedule) {
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
  } = emailMessagingBookingReschedule

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
    roleType: __typename,
    defaultSendTo: { id },
    optionsSendTo: {
      nodes: [
        {
          id,
          fullName,
          email: '',
          contacts,
          __typename
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

export const useGetRescheduleBookingEmailContext = ({
  nodeId,
  onCompleted
}: {
  nodeId: string
  onCompleted?: () => void
}) => {
  const { showError } = useNotifications()
  const { data, refetch, loading } = useQuery(
    GetRescheduleBookingEmailContextDocument,
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
