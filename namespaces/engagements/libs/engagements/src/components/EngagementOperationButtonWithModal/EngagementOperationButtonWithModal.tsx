import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '@toptal/picasso'

import { useHandleOperationClick } from '../../services'
import {
  useMakeRenderEngagementLazyOperation,
  EngagementOperationsFragment,
  EngagementCommonActionsFragment
} from '../../data'

export type Props = {
  children: ReactNode
  engagement: EngagementCommonActionsFragment
  modalData: {
    loading?: boolean
    showModal: () => void
  }
  operationName: keyof EngagementOperationsFragment
  size?: ButtonProps['size']
  variant?: ButtonProps['variant']
  titleCase?: boolean
  'data-testid'?: string
}

const EngagementOperationButtonWithModal = ({
  children,
  engagement,
  modalData,
  operationName,
  size,
  variant,
  titleCase,
  'data-testid': dataTestId
}: Props) => {
  const { id: engagementId, operations } = engagement
  const { showModal, loading: modalIsLoading } = modalData

  const { operationIsLoading, setOperationIsLoading, handleOperationClick } =
    useHandleOperationClick(false)
  const renderLazyOperation = useMakeRenderEngagementLazyOperation({
    id: engagementId,
    operations: operations as EngagementOperationsFragment,
    setOperationIsLoading
  })

  return renderLazyOperation(
    operationName,
    showModal
  )(({ checkOperation, disabled }) => (
    <Button
      data-testid={dataTestId}
      titleCase={titleCase}
      size={size}
      variant={variant}
      disabled={disabled}
      loading={operationIsLoading || modalIsLoading}
      onClick={handleOperationClick(checkOperation)}
    >
      {children}
    </Button>
  ))
}

export default EngagementOperationButtonWithModal
