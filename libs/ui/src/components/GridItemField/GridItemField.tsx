import React, { PropsWithChildren, ReactNode } from 'react'
import { Container, Form, Grid, GridProps, SpacingType } from '@toptal/picasso'

import * as S from './styles'
export interface Props {
  label?: ReactNode
  labelFor?: string
  required?: boolean
  disabled?: boolean
  alignItems?: GridProps['alignItems']
  size?: 'small' | 'medium' | 'full'
  bottom?: SpacingType
}

const GridItemField = ({
  children,
  label,
  labelFor,
  required,
  disabled,
  alignItems = 'baseline',
  size = 'medium',
  bottom = 'xsmall'
}: PropsWithChildren<Props>) => (
  <Container bottom={bottom}>
    <Grid alignItems={alignItems} spacing={16}>
      <Grid.Item small={4}>
        {label && (
          <Form.Label
            requiredDecoration={required ? 'asterisk' : undefined}
            disabled={disabled}
            htmlFor={labelFor}
          >
            {label}
          </Form.Label>
        )}
      </Grid.Item>
      <Grid.Item small={8} css={[size !== 'full' && S.size(size)]}>
        {children}
      </Grid.Item>
    </Grid>
  </Container>
)

export default GridItemField
