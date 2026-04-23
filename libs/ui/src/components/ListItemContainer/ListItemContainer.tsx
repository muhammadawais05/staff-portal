import React, { ReactNode } from 'react'
import { Section, Container, ContainerProps } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  children: ReactNode
  itemWithoutSection?: boolean
  variant?: ContainerProps['variant']
}

const ListItemContainer = ({
  children,
  itemWithoutSection,
  variant = 'white'
}: Props) => (
  <Container css={S.listItemContainer} variant={variant}>
    {itemWithoutSection ? (
      children
    ) : (
      <Section variant='bordered'>{children}</Section>
    )}
  </Container>
)

export default ListItemContainer
