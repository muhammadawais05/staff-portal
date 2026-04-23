import { Container, ContainerProps } from '@toptal/picasso'
import React from 'react'

export type TaskCardLayoutActionsProps = ContainerProps

const TaskCardLayoutActions = ({
  children,
  ...rest
}: TaskCardLayoutActionsProps) => {
  return (
    <Container flex left='small' {...rest}>
      {children}
    </Container>
  )
}

export default TaskCardLayoutActions
