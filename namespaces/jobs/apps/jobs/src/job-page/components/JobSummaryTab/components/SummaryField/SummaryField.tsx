import { FieldCheckResult } from '@staff-portal/graphql/staff'
import { CheckSolid16, ExclamationSolid16, Container } from '@toptal/picasso'
import React, { PropsWithChildren } from 'react'
import { NO_VALUE } from '@staff-portal/config'

export interface Props {
  filled?: FieldCheckResult
  hasValue?: boolean
  noMark?: boolean
}

const SummaryField = ({
  children,
  filled,
  noMark
}: PropsWithChildren<Props>) => {
  let icon

  if (noMark) {
    icon = null
  } else if (filled === FieldCheckResult.COMPLETE) {
    icon = <CheckSolid16 color='green' data-testid='SummaryField-green-icon' />
  } else {
    icon = (
      <ExclamationSolid16 color='red' data-testid='SummaryField-red-icon' />
    )
  }

  return (
    <Container flex alignItems='center' gap='small'>
      {children || NO_VALUE}
      {icon}
    </Container>
  )
}

export default SummaryField
