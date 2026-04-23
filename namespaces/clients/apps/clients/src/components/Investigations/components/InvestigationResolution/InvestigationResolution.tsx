import React from 'react'
import { Grid, Typography, Container } from '@toptal/picasso'

import { Investigation } from '../../types'
import { getResolutionItems } from '../../utils'
import * as S from './styles'

interface Props {
  resolution: Investigation['resolution']
}

const InvestigationResolution = ({ resolution }: Props) => {
  const items = getResolutionItems(resolution)

  return (
    <Grid direction='column' spacing={16}>
      {items.map(([label, value, options]) => (
        <Grid.Item key={label}>
          <Container bottom={options?.hasGap ? 'small' : undefined}>
            <Typography
              size='xsmall'
              data-testid='InvestigationResolution-label'
            >
              {label}
            </Typography>
          </Container>
          <Typography
            size='medium'
            color='black'
            css={S.label}
            data-testid='InvestigationResolution-value'
          >
            {value}
          </Typography>
        </Grid.Item>
      ))}
    </Grid>
  )
}

export default InvestigationResolution
