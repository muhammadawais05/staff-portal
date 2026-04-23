import { encodeEntityId } from '@staff-portal/data-layer-service'
import { StatusMessage } from '@staff-portal/graphql/staff'

export const getStaffOfacStatusMessagesResponse = (
  messages: StatusMessage[] | undefined = []
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Staff'),
      statusMessages: {
        nodes: [...messages],
        __typename: 'StatusMessageConnection'
      },
      __typename: 'Staff'
    }
  }
})
