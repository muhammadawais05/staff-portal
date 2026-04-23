import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { formatNumber } from '@staff-portal/utils'

import { calculateVettedResultQuartileInformation } from './utils'
import * as S from './styles'

interface VettingSectionProps {
  label: string
  value: string | number
  threshold25: number
  threshold75: number
}

const VettingSection = ({
  label,
  value: valueRaw,
  threshold25,
  threshold75
}: VettingSectionProps) => {
  const value = Number(valueRaw)
  const { color, description } = calculateVettedResultQuartileInformation(
    value,
    threshold25,
    threshold75
  )

  return (
    <Container flex justifyContent='space-between' bottom='small'>
      <Container
        flex
        justifyContent='space-between'
        css={S.labelAndValueContainer}
      >
        <Typography color='dark-grey'>{label}</Typography>
        <Typography color='black' weight='semibold' align='right'>
          {formatNumber(value)}
        </Typography>
      </Container>
      <Typography color={color} data-testid={`VettingSection-color:${color}`}>
        {description}
      </Typography>
    </Container>
  )
}

VettingSection.displayName = 'VettingSection'

export default VettingSection
