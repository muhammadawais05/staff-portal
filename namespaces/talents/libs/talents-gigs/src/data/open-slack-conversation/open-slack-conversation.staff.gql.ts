import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { OpenSlackConversationDocument, OpenSlackConversationMutation } from '.'

export const OPEN_SLACK_CONVERSATION: typeof OpenSlackConversationDocument = gql`
  mutation OpenSlackConversation($input: OpenSlackConversationInput!) {
    openSlackConversation(input: $input) {
      ...MutationResultFragment
      slackChannel {
        id
        url
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useOpenSlackConversation = ({
  talentId,
  onCompleted,
  onError
}: {
  talentId: string
  onCompleted?: (data: OpenSlackConversationMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(OPEN_SLACK_CONVERSATION, {
    variables: { input: { roles: [talentId] } },
    onCompleted,
    onError
  })
