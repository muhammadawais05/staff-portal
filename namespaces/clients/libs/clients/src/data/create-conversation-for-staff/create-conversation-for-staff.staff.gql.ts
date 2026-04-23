import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation createConversationForStaff(
    $input: CreateConversationForStaffInput!
  ) {
    createConversationForStaff(input: $input) {
      topChatConversation {
        id
        slackChannelUrl
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
