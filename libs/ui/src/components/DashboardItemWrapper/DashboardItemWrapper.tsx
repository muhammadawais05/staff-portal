import React, { ReactNode, ComponentProps } from 'react'
import { Container, Grid, Typography } from '@toptal/picasso'

import * as S from './styles'

interface Props {
  actions?: ReactNode
  children: string | ReactNode
  gridSize?: ComponentProps<typeof Grid.Item>['small']
  showTitleBorder?: boolean
  hasPaddingTop?: boolean
  subtitle?: ReactNode
  title: NonNullable<ReactNode>
  'data-testid'?: string
}

const displayName = 'DashboardItemWrapper'

const DashboardItemWrapper = ({
  actions,
  children,
  gridSize = 6,
  showTitleBorder = true,
  hasPaddingTop = true,
  subtitle,
  title,
  'data-testid': dataTestId = displayName
}: Props) => {
  return (
    <Grid.Item data-testid={dataTestId} small={gridSize}>
      <Container bordered rounded padded='medium'>
        <Container
          alignItems='center'
          css={S.header({ showTitleBorder, hasPaddingTop })}
          flex
          justifyContent='space-between'
        >
          <Typography
            data-testid={`${dataTestId}-title`}
            size='medium'
            weight='semibold'
            color='black'
          >
            {title}
          </Typography>
          {actions && (
            <Container
              alignItems='center'
              data-testid={`${dataTestId}-actions`}
              flex
            >
              {actions}
            </Container>
          )}
        </Container>
        {subtitle && (
          <Container
            alignItems='center'
            css={S.subtitle}
            data-testid={`${dataTestId}-subtitle`}
            flex
            justifyContent='space-between'
          >
            {subtitle}
          </Container>
        )}
        {children}
      </Container>
    </Grid.Item>
  )
}

export default DashboardItemWrapper
