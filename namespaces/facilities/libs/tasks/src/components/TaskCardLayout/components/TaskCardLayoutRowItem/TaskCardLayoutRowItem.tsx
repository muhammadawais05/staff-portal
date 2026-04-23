import React, { ReactNode } from 'react'
import { Container, Grid, TypographyOverflow } from '@toptal/picasso'

import { ItemValue } from './ItemValue'
import * as S from './styles'

export interface TaskCardLayoutRowItemProps {
  leftContent: string
  rightContent: ReactNode
}

const GridItem = Grid.Item

const TaskCardLayoutRowItem = ({
  leftContent,
  rightContent
}: TaskCardLayoutRowItemProps) => {
  return (
    <>
      <GridItem small={4}>
        <Container>
          <TypographyOverflow size='inherit'>{leftContent}</TypographyOverflow>
        </Container>
      </GridItem>
      <GridItem small={8}>
        <Container css={S.rightContent}>
          <ItemValue label={leftContent} content={rightContent} />
        </Container>
      </GridItem>
    </>
  )
}

export default TaskCardLayoutRowItem
