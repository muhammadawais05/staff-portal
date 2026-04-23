import React, { ReactNode } from 'react'
import { Container } from '@toptal/picasso'

const BetaStaffActionsHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      flex
      alignItems='center'
      justifyContent='flex-end'
      bottom='xsmall'
    >
      {children}
    </Container>
  )
}

export default BetaStaffActionsHeader
