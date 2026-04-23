import { Container, Grid, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'

import * as S from './styles'

interface Props {
  title: string
  titleColor?: 'black' | 'green' | 'grey' | 'red' | 'yellow' | 'light-grey'
  hasBorderMargin?: boolean
}

const displayName = 'ModalSection'

const GridItem = Grid.Item

export const ModalSection: FC<Props> = memo(
  ({ title, children, titleColor, hasBorderMargin }) => {
    return (
      <GridItem css={S.gridItem} data-testid={displayName}>
        <Container bottom={hasBorderMargin ? 2 : 0}>
          <Typography
            color={titleColor}
            size='medium'
            variant='heading'
            weight='semibold'
          >
            {title}
          </Typography>
          <Typography as='div' size='medium'>
            {children}
          </Typography>
        </Container>
      </GridItem>
    )
  }
)

ModalSection.displayName = displayName

ModalSection.defaultProps = {
  hasBorderMargin: true
}

export default ModalSection
