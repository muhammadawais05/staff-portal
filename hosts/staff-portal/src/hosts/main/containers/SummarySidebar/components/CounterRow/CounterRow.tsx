import React, { ReactNode } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import { isNotNullish } from '@staff-portal/utils'

import { getCounterWeight } from '../../utils'

export interface Props {
  name: string
  counter?: ReactNode
  count?: Maybe<number>
}

const CounterWrapper = ({
  name,
  children
}: {
  name: string
  children?: ReactNode
}) => {
  return (
    <Container flex justifyContent='space-between'>
      <Typography size='medium' color='inherit' titleCase>
        {name}
      </Typography>
      {children}
    </Container>
  )
}

const CounterRow = ({ name, counter, count }: Props) => {
  if (counter) {
    return <CounterWrapper name={name}>{counter}</CounterWrapper>
  }

  if (!isNotNullish(count)) {
    return null
  }

  const weight = getCounterWeight(count)

  return (
    <CounterWrapper name={name}>
      <Typography size='medium' color='inherit' weight={weight}>
        {count}
      </Typography>
    </CounterWrapper>
  )
}

export default CounterRow
