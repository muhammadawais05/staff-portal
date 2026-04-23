import {
  gql,
  useMutation,
  LENS_CONTEXT
} from '@staff-portal/data-layer-service'

import {
  EmailAddressBlacklistDocument,
  EmailAddressBlacklistMutation
} from './email-address-blacklist.lens.gql.types'

export type { EmailAddressBlacklistMutation }

export const EMAIL_ADDRESS_BLACKLIST: typeof EmailAddressBlacklistDocument = gql`
  mutation EmailAddressBlacklist($address: Address!) {
    emailAddressBlacklist(address: $address) {
      messages {
        field
        message
        __typename
      }
      result {
        email
        blacklisted
        __typename
      }
      successful
      __typename
    }
  }
`

export const useEmailAddressBlacklist = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: EmailAddressBlacklistMutation) => void
  onError: (error: Error) => void
}) =>
  useMutation(EMAIL_ADDRESS_BLACKLIST, {
    onCompleted,
    onError,
    context: { type: LENS_CONTEXT }
  })
