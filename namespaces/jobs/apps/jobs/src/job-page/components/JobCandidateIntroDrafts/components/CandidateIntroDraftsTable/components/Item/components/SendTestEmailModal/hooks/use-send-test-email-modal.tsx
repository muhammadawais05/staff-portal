// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import React from 'react'
import { Operation } from '@staff-portal/graphql/staff'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { NodeType } from '@staff-portal/graphql'

import SendTestEmailModal from '..'
export interface Props {
  engagementId: string
  initialOperation: Operation
  onLazyOperationSettled?: () => void
}

export const useSendTestEmailModal = ({
  engagementId,
  initialOperation,
  onLazyOperationSettled
}: Props) => {
  const { showModal, hideModal, isOpen } = useModal()

  const renderLazyOperation = useRenderLazyOperation({
    initialOperation,
    getLazyOperationVariables: {
      nodeId: engagementId,
      nodeType: NodeType.ENGAGEMENT,
      operationName: 'sendEngagementTalentIntroductionTestEmail'
    },
    onSettled: () => {
      onLazyOperationSettled?.()
    },
    onSuccess: showModal
  })

  return {
    renderLazyOperation,
    renderModal: () =>
      isOpen && (
        <SendTestEmailModal
          onClose={hideModal}
          onCompleted={hideModal}
          engagementId={engagementId as string}
        />
      )
  }
}
