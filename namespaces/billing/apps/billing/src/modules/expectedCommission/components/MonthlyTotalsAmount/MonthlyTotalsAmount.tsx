import React from 'react'
import { Amount, Container } from '@toptal/picasso'

interface Props {
  name: string
  total: number
  last?: boolean
}

const MonthlyTotalsAmount = ({ name, total, last }: Props) => {
  const testId = `MonthlyTotalsAmount-${name}`

  return (
    <Container key={name} right={last ? undefined : 'small'} as='span'>
      <Amount
        amount={total}
        data-testid={testId}
        color='yellow'
        weight='semibold'
      />
    </Container>
  )
}

export default MonthlyTotalsAmount
