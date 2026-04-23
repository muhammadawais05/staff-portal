import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Client, ClientCumulativeStatus } from '@staff-portal/graphql/staff'

export const getClientQuizResponse = (client?: Partial<Client>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Client'),
      cumulativeStatus: ClientCumulativeStatus.PENDING_TOS,
      remoteQuizUrl: null,
      quizItems: {
        nodes: [],
        __typename: 'QuizItemConnection'
      },
      referralPage: null,
      ...client,
      __typename: 'Client'
    }
  }
})
