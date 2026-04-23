import { useNavigate } from '@staff-portal/navigation'
import { useMutation } from '@staff-portal/data-layer-service'
import { useNotifications } from '@toptal/picasso/utils'

import { CreateConversationForStaffDocument } from '../../data/create-conversation-for-staff/create-conversation-for-staff.staff.gql.types'

export const useCreateConversationForStaff = ({
  representativeId
}: {
  representativeId: string
}) => {
  const { showError } = useNotifications()
  const navigate = useNavigate()
  const [createConversation] = useMutation(CreateConversationForStaffDocument, {
    variables: { input: { companyRepresentativeId: representativeId } }
  })

  return async () => {
    const { data } = await createConversation()

    if (
      data?.createConversationForStaff?.topChatConversation?.slackChannelUrl
    ) {
      navigate(
        data.createConversationForStaff.topChatConversation.slackChannelUrl
      )
    } else if (!data?.createConversationForStaff?.success) {
      showError('Error while opening TopChat Conversation')
    }
  }
}
