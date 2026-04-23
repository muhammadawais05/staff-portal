import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { formatNumber } from '@staff-portal/utils'

import {
  VettedResultQuartileColor,
  VettedResultQuartileDescription
} from '../../constants'
import { calculateVettedResultQuartile } from '../../services'
import * as S from './styles'

interface Props {
  label: string
  value: number
  threshold25: number
  threshold75: number
}

const Vetting = ({ label, value, threshold25, threshold75 }: Props) => {
  const vettingResult = calculateVettedResultQuartile(
    value,
    threshold25,
    threshold75
  )

  const color = VettedResultQuartileColor[vettingResult]
  const description = VettedResultQuartileDescription[vettingResult]

  return (
    <Container flex justifyContent='space-between' alignItems='center'>
      <Container
        flex
        justifyContent='space-between'
        css={S.labelAndValueContainer}
      >
        <Typography size='medium' color='dark-grey'>
          {label}:
        </Typography>
        <Typography
          size='medium'
          color='dark-grey'
          weight='semibold'
          align='right'
        >
          {formatNumber(value)}
        </Typography>
      </Container>
      <Typography size='xsmall' color={color}>
        {description}
      </Typography>
    </Container>
  )
}

export default Vetting
