import React, { memo, ReactNode } from 'react'
import { OperationActionItem } from '@staff-portal/operations'
import { ActionItemProps } from '@staff-portal/ui'
import { Operation as OperationType } from '@staff-portal/graphql/staff'

import { useModal } from '../../hooks/use-modal'
import { Modal, PayloadOf } from '../../types'
import { arePropsEqual } from './utils'

export type Props<TTypedModal extends Modal = Modal> =
  (TTypedModal extends Modal<undefined>
    ? {
        modal: TTypedModal
        modalProps?: PayloadOf<TTypedModal> | null
      }
    : {
        modal: TTypedModal
        modalProps: PayloadOf<TTypedModal> | null
      }) &
    ActionItemProps & {
      children: ReactNode
      operation: OperationType | null | undefined
      skipOperationCheck?: boolean
    }

/**
 * This component is a wrapper over `useModal` + `<Operation>` + `<Button>/<Menu.Item>`
 */
const ModalActionItem = memo(
  <TTypedModal extends Modal = Modal>({
    children,
    modal,
    modalProps,
    ...operationActionItemProps
  }: Props<TTypedModal>) => {
    const { showModal } = useModal(modal, modalProps)

    return (
      <OperationActionItem {...operationActionItemProps} onClick={showModal}>
        {children}
      </OperationActionItem>
    )
  },
  arePropsEqual
)

export default ModalActionItem
