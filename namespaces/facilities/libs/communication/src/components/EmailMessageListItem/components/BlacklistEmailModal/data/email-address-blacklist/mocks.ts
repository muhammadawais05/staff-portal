import { EMAIL_ADDRESS_BLACKLIST } from './email-address-blacklist.lens.gql'

export const createEmailAddressBlacklistMock = ({
  address
}: {
  address: string
}) => ({
  request: { query: EMAIL_ADDRESS_BLACKLIST, variables: { address } },
  result: {
    data: {
      emailAddressBlacklist: {
        messages: [],
        result: {
          blacklisted: true,
          email: address,
          __typename: 'EmailAddress'
        },
        successful: true,
        __typename: 'EmailAddressPayload'
      }
    }
  }
})

export const createEmailAddressBlacklistInvalidMock = ({
  address
}: {
  address: string
}) => ({
  request: { query: EMAIL_ADDRESS_BLACKLIST, variables: { address } },
  result: {
    data: {
      emailAddressBlacklist: {
        messages: [
          {
            code: '127365',
            field: 'someField',
            message: 'something is invalid',
            __typename: 'ValidationMessage'
          }
        ],
        result: {
          blacklisted: false,
          email: address,
          __typename: 'EmailAddress'
        },
        successful: false,
        __typename: 'EmailAddressPayload'
      }
    }
  }
})

export const createEmailAddressBlacklistFailedMock = ({
  address,
  error
}: {
  address: string
  error: Error
}) => ({
  request: { query: EMAIL_ADDRESS_BLACKLIST, variables: { address } },
  error
})
