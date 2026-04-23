import React, { FC, ReactNode } from 'react'
import { Container, Typography } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  title: string
  actions?: ReactNode
  subTitle?: string
  children?: ReactNode
  testIds?: {
    widget?: string
  }
}

const SidebarWidget: FC<Props> & {
  Section: FC<Props>
  BottomContainer: FC
} = ({ title, subTitle, children, testIds }) => {
  return (
    <Container
      padded='small'
      data-testid={
        'sidebar-widget' + (testIds?.widget ? `:${testIds?.widget}` : '')
      }
    >
      <Container css={S.titleWrapper}>
        <Typography size='large' weight='semibold' noWrap>
          {title}
        </Typography>
        {subTitle && (
          <Container top='xsmall'>
            <Typography size='xsmall'>{subTitle}</Typography>
          </Container>
        )}
      </Container>
      {children}
    </Container>
  )
}

const Section = ({ title, actions, children }: Props) => {
  return (
    <>
      <Container top='medium' flex alignItems='center' css={S.titleWrapper}>
        <Typography size='medium' weight='semibold'>
          {title}
        </Typography>
        {actions && <Container left='xsmall'>{actions}</Container>}
      </Container>
      <Container>{children}</Container>
    </>
  )
}

const BottomContainer = ({ children }: { children?: ReactNode }) => {
  return (
    <Container flex justifyContent='space-between' css={S.bottomWrapper}>
      {children}
    </Container>
  )
}

SidebarWidget.Section = Section
SidebarWidget.BottomContainer = BottomContainer

export default SidebarWidget
