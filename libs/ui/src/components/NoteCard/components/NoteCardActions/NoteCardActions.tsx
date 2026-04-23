import { Container, ContainerProps } from '@toptal/picasso'
import React from 'react'

export type NoteActionsProps = ContainerProps

const NoteCardActions = ({ children, ...rest }: NoteActionsProps) => {
  return (
    <Container flex left='small' {...rest}>
      {children}
    </Container>
  )
}

export default NoteCardActions
