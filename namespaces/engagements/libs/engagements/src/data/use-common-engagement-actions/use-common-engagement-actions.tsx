/* eslint-disable max-lines */
import { useModal } from '@staff-portal/modals-service'

import CancelEngagementModal from '../../components/CancelEngagementModal'
import { useImportContractAsTopModal } from '../../components/ImportContractAsTopModal'
import { EngagementOperationsFragment } from '../engagement-operations-fragment'
import { EngagementCommonActionsFragment } from '../engagement-common-actions-fragment'
import {
  CURRENT_STATUSES,
  IN_INTERVIEW_STATUSES,
  REQUIRES_DECISION_STATUSES
} from '../../config'
import { useHandleOperationClick, RenderEngagementItem } from '../../services'
import { useMakeRenderEngagementLazyOperation } from '../use-make-render-engagement-lazy-operation/use-make-render-engagement-lazy-operation'

type Props = {
  engagement: EngagementCommonActionsFragment
}

// eslint-disable-next-line max-lines-per-function, max-statements
export const useCommonEngagementActions = ({ engagement }: Props) => {
  const { id, status, job, operations } = engagement

  const hasMultipleTalent = Boolean((job?.talentCount || 0) > 1)

  const { operationIsLoading, setOperationIsLoading, handleOperationClick } =
    useHandleOperationClick(false)

  const MakeRenderLazyOperation = useMakeRenderEngagementLazyOperation({
    id,
    operations: operations as EngagementOperationsFragment,
    setOperationIsLoading
  })

  const { showModal: showImportContractAsTopModal } =
    useImportContractAsTopModal({ engagementId: id })
  const renderImportContractAsTopItem = RenderEngagementItem({
    renderLazyOperation: MakeRenderLazyOperation,
    handleOperationClick,
    showModal: showImportContractAsTopModal,
    'data-testid': 'import-sta-as-top',
    operationName: 'importContractAsTop',
    label: 'Import STA as TOP',
    titleCase: false
  })

  const { showModal: showCancelEngagementModal } = useModal(
    CancelEngagementModal,
    { engagementId: id }
  )
  const renderCancelEngagementItem = RenderEngagementItem({
    renderLazyOperation: MakeRenderLazyOperation,
    handleOperationClick,
    showModal: showCancelEngagementModal,
    'data-testid': 'cancel-engagement',
    operationName: 'cancelEngagementTrial',
    label: 'Cancel Engagement'
  })

  const isInInterviewStatus = !!status && IN_INTERVIEW_STATUSES.includes(status)
  const isCurrentStatus = !!status && CURRENT_STATUSES.includes(status)
  const isRequiresDecisionStatus =
    !!status && REQUIRES_DECISION_STATUSES.includes(status)

  return {
    operationIsLoading,
    setOperationIsLoading,
    handleOperationClick,
    hasMultipleTalent,
    renderImportContractAsTopItem,
    renderCancelEngagementItem,
    isInInterviewStatus,
    isCurrentStatus,
    isRequiresDecisionStatus
  }
}
