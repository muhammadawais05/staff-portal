import React from 'react'
import { PostponeEngagementExpirationInput } from '@staff-portal/graphql/staff'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

const PostponeExpirationModalContent = lazy(
  () =>
    import(
      './components/PostponeExpirationModalContent/PostponeExpirationModalContent'
    )
)

export const MODAL_TITLE = 'Postpone Interview Expiration'

export type PostponeExpirationFormType = Omit<
  PostponeEngagementExpirationInput,
  'clientMutationId' | 'engagementId'
>

export type Props = {
  hideModal: () => void
  engagementId: string
}

const PostponeExpirationModal = ({ hideModal, engagementId }: Props) => (
  <Modal
    operationVariables={{
      nodeId: engagementId,
      nodeType: NodeType.ENGAGEMENT,
      operationName: 'postponeEngagementExpiration'
    }}
    open
    size='small'
    onClose={hideModal}
    defaultTitle={MODAL_TITLE}
  >
    <PostponeExpirationModalContent
      engagementId={engagementId}
      hideModal={hideModal}
    />
  </Modal>
)

export default PostponeExpirationModal
