import { Container, ContainerProps } from '@toptal/picasso'
import React from 'react'

type TaskCardLayoutHeaderProps = ContainerProps

const TaskCardLayoutHeader = ({
  children,
  ...rest
}: TaskCardLayoutHeaderProps) => {
  return (
    <Container
      flex
      alignItems='center'
      justifyContent='space-between'
      bottom='small'
      {...rest}
    >
      {children}
    </Container>
  )
}

export default TaskCardLayoutHeader
