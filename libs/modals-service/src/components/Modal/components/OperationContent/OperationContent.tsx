import React, { ReactNode } from 'react'
import { Alert, Modal } from '@toptal/picasso'
import {
  useGetOperation,
  GetLazyOperationVariables
} from '@staff-portal/operations'

import ModalSuspender from '../../../ModalSuspender'

export type Props = {
  defaultTitle: ReactNode
  loading?: boolean
  operationVariables: GetLazyOperationVariables
  children?: ReactNode
}

const OperationContent = ({
  children,
  defaultTitle,
  operationVariables
}: Props) => {
  const { enabled, error, loading } = useGetOperation(operationVariables)

  if (error) {
    return (
      <>
        <Modal.Title>{defaultTitle}</Modal.Title>
        <Modal.Content>
          <Alert>{error}</Alert>
        </Modal.Content>
      </>
    )
  }

  if (!loading && !enabled) {
    return null
  }

  if (loading) {
    return <ModalSuspender />
  }

  return <>{children}</>
}

export default OperationContent
