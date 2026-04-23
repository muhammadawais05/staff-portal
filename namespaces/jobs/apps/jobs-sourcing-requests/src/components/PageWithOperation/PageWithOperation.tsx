import React, { ReactNode } from 'react'
import { Alert, Container } from '@toptal/picasso'
import { isOperationEnabled, OperationType } from '@staff-portal/operations'

export interface Props {
  operation: OperationType | undefined
  errorContent?: ReactNode
  children?: ReactNode
}

/**
 * Idea is the same as <Operation> but applied for page.
 * Checks if the operation is enabled and renders the children.
 * If the operation is not enabled, renders an error message.
 */
const PageWithOperation = ({ operation, errorContent, children }: Props) => {
  if (isOperationEnabled(operation)) {
    return <>{children}</>
  }

  if (errorContent) {
    return <>{errorContent}</>
  }

  return (
    <Container top='medium'>
      <Alert variant='red'>
        This operation cannot be performed at this moment.
      </Alert>
    </Container>
  )
}

export default PageWithOperation
