import {
  gql,
  useQuery,
  GraphQLErrorCode,
  LENS_CONTEXT
} from '@staff-portal/data-layer-service'
import { EMAIL_MESSAGE_FRAGMENT } from '@staff-portal/communication'

import {
  GetLatestEmailMessageQuery,
  GetLatestEmailMessageDocument
} from './get-latest-email-message.lens.gql.types'

export const GET_LATEST_EMAIL_MESSAGE: typeof GetLatestEmailMessageDocument = gql`
  query GetLatestEmailMessage($emails: [Address!]!) {
    roleLatestEmailMessage(emails: $emails) {
      ...EmailMessageFragment
    }
  }
  ${EMAIL_MESSAGE_FRAGMENT}
`

export const useGetLatestEmailMessage = (
  emails: string[],
  {
    onCompleted,
    onError
  }: {
    onCompleted?: (data: GetLatestEmailMessageQuery) => void
    onError: () => void
  }
) => {
  const { loading, data } = useQuery(GET_LATEST_EMAIL_MESSAGE, {
    skip: !emails.length,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    variables: { emails: emails! },
    onCompleted,
    onError: error => {
      if (error.message !== GraphQLErrorCode.EMPTY) {
        onError()
      }
    },
    context: { type: LENS_CONTEXT }
  })

  const emailMessage = data?.roleLatestEmailMessage

  return { emailMessage, loading }
}
