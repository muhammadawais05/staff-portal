import React from 'react'
import { OverviewBlock, Container, ContainerProps } from '@toptal/picasso'

import * as S from './styles'

export type TaskCardLayoutSummaryProps = ContainerProps

const TaskCardLayoutSummary = ({
  children,
  ...rest
}: TaskCardLayoutSummaryProps) => {
  return (
    <Container bottom='small' css={S.overviewBlockWrapper} {...rest}>
      <OverviewBlock.Group blockWidth='narrow'>{children}</OverviewBlock.Group>
    </Container>
  )
}

export default TaskCardLayoutSummary
