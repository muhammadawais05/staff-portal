import { gql, useQuery, LENS_CONTEXT } from '@staff-portal/data-layer-service'
import { EMAIL_MESSAGE_FRAGMENT } from '@staff-portal/communication'

import { EmailMessageDocument } from './get-email-message.lens.gql.types'

export const GET_EMAIL_MESSAGE: typeof EmailMessageDocument = gql`
  query EmailMessage($id: ID!) {
    emailMessage(id: $id) {
      ...EmailMessageFragment
    }
  }
  ${EMAIL_MESSAGE_FRAGMENT}
`

export const useGetEmailMessage = (id: string | undefined) => {
  return useQuery(EmailMessageDocument, {
    skip: !id,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    variables: { id: id! },
    context: { type: LENS_CONTEXT }
  })
}
