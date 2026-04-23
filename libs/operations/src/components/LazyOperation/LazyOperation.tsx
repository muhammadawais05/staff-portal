import React, { ReactNode } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { Operation } from '@staff-portal/graphql/staff'
import { concatMessages } from '@staff-portal/data-layer-service'

import {
  useGetLazyOperation,
  GetLazyOperationQuery,
  GetLazyOperationVariables
} from './data/get-lazy-operation'
import checkNodeTypeMismatch from './utils/check-node-type-mismatch'
import { isOperationDisabled, isOperationEnabled } from '../../utils'
import OperationWrapper from '../OperationWrapper'

export interface RenderProps {
  disabled: boolean
  loading: boolean
  checkOperation: () => void
}

export type Props = {
  initialOperation?: Operation | null
  getLazyOperationVariables: GetLazyOperationVariables
  hidden?: boolean
  inline?: boolean
  onSuccess?: () => void
  onFail?: (errorMessage?: string) => void
  onSettled?: () => void
  children: (renderProps: RenderProps) => ReactNode
  disableTooltip?: boolean
  /** Tooltip message on enabled state. Overrides operation.messages */
  tooltipTextOnEnabled?: string
  /** Tooltip message on disabled state. Overrides operation.messages */
  tooltipTextOnDisabled?: string
}

export const useRenderLazyOperation = ({
  initialOperation,
  hidden = false,
  inline = true,
  getLazyOperationVariables,
  onSuccess,
  onFail,
  onSettled,
  disableTooltip,
  tooltipTextOnEnabled,
  tooltipTextOnDisabled
}: Omit<Props, 'children'>) => {
  const { showError } = useNotifications()

  const extractOperation = (data?: GetLazyOperationQuery) => {
    return data?.node?.operations?.[getLazyOperationVariables.operationName]
  }

  const handleFail = (errorMessage?: string) => {
    if (onFail) {
      onFail(errorMessage)
    } else {
      showError(
        errorMessage || 'This operation cannot be performed at this moment.'
      )
    }
  }

  const [getLazyOperation, { data, loading }] = useGetLazyOperation(
    getLazyOperationVariables,
    {
      onCompleted: newData => {
        checkNodeTypeMismatch(newData, getLazyOperationVariables)

        const operation = extractOperation(newData)

        if (isOperationEnabled(operation)) {
          onSuccess?.()
        } else {
          handleFail(concatMessages(operation?.messages))
        }
        onSettled?.()
      },
      onError: error => {
        handleFail(error?.message)
        onSettled?.()
      }
    }
  )

  const currentOperation =
    extractOperation(data) || (initialOperation ?? undefined)

  return (children: (renderProps: RenderProps) => ReactNode) => (
    <OperationWrapper
      operation={currentOperation}
      hidden={hidden}
      inline={inline}
      disableTooltip={disableTooltip}
      tooltipTextOnEnabled={tooltipTextOnEnabled}
      tooltipTextOnDisabled={tooltipTextOnDisabled}
    >
      {children({
        disabled: isOperationDisabled(currentOperation),
        checkOperation: getLazyOperation,
        loading
      })}
    </OperationWrapper>
  )
}

const LazyOperation = ({ children, ...props }: Props) => {
  const renderLazyOperation = useRenderLazyOperation({
    ...props
  })

  return renderLazyOperation(children)
}

export default LazyOperation
