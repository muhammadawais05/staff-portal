import { useModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import TalentSendNewOnlineTestAttemptModal from '../TalentSendNewOnlineTestAttemptModal'

interface Props {
  talentId: string
  nodeType: NodeType.CODILITY_RESULT | NodeType.HACKER_RANK_RESULT
  onlineTestAttemptId: string
}

export const useNewOnlineTestAttemptModal = ({
  talentId,
  onlineTestAttemptId,
  nodeType
}: Props) => {
  const { showModal } = useModal(TalentSendNewOnlineTestAttemptModal, {
    talentId,
    onlineTestAttemptId,
    nodeType
  })

  return {
    showModal
  }
}
