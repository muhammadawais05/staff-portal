import React, { ReactNode } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import {
  RoleStepMainAction,
  Operation,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import {
  OperationWrapper,
  isOperationEnabled,
  isOperationDisabled
} from '@staff-portal/operations'

import { useGetLazyMainAction } from './data/get-lazy-main-action'

export interface RenderProps {
  disabled: boolean
  loading: boolean
  checkOperation: () => void
}

export type Props = {
  roleStepId: string
  initialMainAction: RoleStepMainAction
  inline?: boolean
  disableTooltip?: boolean
  onSuccess?: () => void
  onFail?: () => void
  onSettled?: () => void
  children: (renderProps: RenderProps) => ReactNode
}

const convertMainActionToOperation = (
  mainAction?: RoleStepMainAction
): Operation => ({
  callable: mainAction?.status || OperationCallableTypes.HIDDEN,
  messages: mainAction?.tooltip ? [mainAction.tooltip] : []
})

export const useRenderLazyMainAction = ({
  roleStepId,
  initialMainAction,
  inline = true,
  onSuccess,
  onFail,
  onSettled,
  disableTooltip = true
}: Omit<Props, 'children'>) => {
  const { showError } = useNotifications()

  const handleFail = () => {
    if (onFail) {
      onFail()
    } else {
      showError('This operation cannot be performed at this moment.')
    }
  }

  const [getLazyMainAction, { data, loading }] = useGetLazyMainAction({
    roleStepId,
    onCompleted: newData => {
      if (
        isOperationEnabled(
          convertMainActionToOperation(newData?.node?.mainAction)
        ) &&
        initialMainAction.actionName === newData?.node?.mainAction.actionName
      ) {
        onSuccess?.()
      } else {
        handleFail()
      }
      onSettled?.()
    },
    onError: () => {
      handleFail()
      onSettled?.()
    }
  })

  const currentOperation = convertMainActionToOperation(
    data?.node?.mainAction || initialMainAction
  )

  return (children: (renderProps: RenderProps) => ReactNode) => (
    <OperationWrapper
      operation={currentOperation}
      inline={inline}
      disableTooltip={disableTooltip}
    >
      {children({
        disabled: isOperationDisabled(currentOperation),
        checkOperation: getLazyMainAction,
        loading
      })}
    </OperationWrapper>
  )
}
