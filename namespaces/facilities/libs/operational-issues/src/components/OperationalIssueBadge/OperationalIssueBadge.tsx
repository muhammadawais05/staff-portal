import React from 'react'
import { Tooltip, Badge, Container } from '@toptal/picasso'

export interface Props {
  count: number
}

const OperationalIssueBadge = ({ count }: Props) => {
  return <Tooltip content={`This issue has ${count} occurrences`}>
    <Container>
      <Badge content={count} variant='red' />
    </Container>
  </Tooltip>
}

export default OperationalIssueBadge
