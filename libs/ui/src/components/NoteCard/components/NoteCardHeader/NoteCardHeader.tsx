import { Container, ContainerProps } from '@toptal/picasso'
import React from 'react'

export type NoteHeaderProps = ContainerProps

const NoteCardHeader = ({ children, ...rest }: NoteHeaderProps) => {
  return (
    <Container
      flex
      alignItems='center'
      justifyContent='space-between'
      {...rest}
    >
      {children}
    </Container>
  )
}

export default NoteCardHeader
