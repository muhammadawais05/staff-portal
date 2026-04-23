import { useModal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import TalentTrackOnlineTestAttemptModal from '../TalentTrackOnlineTestAttemptModal'

interface Props {
  talentId: string
  onlineTestAttemptId: string
  nodeType: NodeType.CODILITY_RESULT | NodeType.HACKER_RANK_RESULT
}

export const useTrackOnlineTestModal = ({
  talentId,
  onlineTestAttemptId,
  nodeType
}: Props) => {
  const { showModal } = useModal(TalentTrackOnlineTestAttemptModal, {
    talentId,
    onlineTestAttemptId,
    nodeType
  })

  return {
    showModal
  }
}
