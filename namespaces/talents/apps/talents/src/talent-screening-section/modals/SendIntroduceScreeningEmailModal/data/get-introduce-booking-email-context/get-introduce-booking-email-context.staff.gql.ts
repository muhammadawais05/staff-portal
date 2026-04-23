import { useNotifications } from '@toptal/picasso/utils'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { EmailContext } from '@staff-portal/communication-send-email'

import {
  GetIntroduceBookingEmailContextDocument,
  GetIntroduceBookingEmailContextQuery
} from './get-introduce-booking-email-context.staff.gql.types'

export default gql`
  query GetIntroduceBookingEmailContext($nodeId: ID!) {
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
        emailMessagingBookingIntroduce {
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
  node: NonNullable<GetIntroduceBookingEmailContextQuery['node']>
): EmailContext | undefined => {
  const { contacts, emailMessagingBookingIntroduce } = node

  if (!emailMessagingBookingIntroduce) {
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
  } = emailMessagingBookingIntroduce

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

export const useGetIntroduceBookingEmailContext = ({
  nodeId,
  onCompleted
}: {
  nodeId: string
  onCompleted?: () => void
}) => {
  const { showError } = useNotifications()
  const { data, refetch, loading } = useQuery(
    GetIntroduceBookingEmailContextDocument,
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
