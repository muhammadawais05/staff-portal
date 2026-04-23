import { Tag, Container, ContainerProps } from '@toptal/picasso'
import React from 'react'

export type TaskCardLayoutTagsProps = ContainerProps

const TaskCardLayoutTags = ({ children, ...rest }: TaskCardLayoutTagsProps) => {
  return (
    <Container bottom='small' {...rest}>
      <Tag.Group>{children}</Tag.Group>
    </Container>
  )
}

export default TaskCardLayoutTags
