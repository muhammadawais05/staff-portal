import React, { ReactNode } from 'react'
import {
  ColorType,
  Container,
  Tooltip,
  QuestionMark16,
  TypographyProps,
  TypographyOverflow
} from '@toptal/picasso'

import * as S from './styles'

export interface Props {
  status: ReactNode
  color?: ColorType
  weight?: TypographyProps['weight']
  size?: TypographyProps['size']
  lines?: number
  disableTooltip?: boolean
  tooltipContent?: ReactNode
  tooltipIcon?: ReactNode
  extraStatusContent?: ReactNode
  'data-testid'?: string
}

export const ColoredStatus = ({
  status,
  color = 'black',
  weight = 'semibold',
  size = 'inherit',
  lines = 1,
  disableTooltip = false,
  tooltipContent,
  tooltipIcon = <QuestionMark16 />,
  extraStatusContent,
  'data-testid': dataTestId
}: Props) => {
  const content = (
    <>
      <TypographyOverflow
        as='span'
        color={color}
        weight={weight}
        lines={lines}
        size={size}
        disableTooltip={disableTooltip}
        data-testid={dataTestId}
      >
        {status}
      </TypographyOverflow>
      {extraStatusContent}
    </>
  )

  return tooltipContent ? (
    <Container inline flex alignItems='center' css={S.container}>
      {content}
      <Tooltip interactive content={tooltipContent}>
        <Container as='span' left='xsmall' flex data-testid='tooltip-icon'>
          {tooltipIcon}
        </Container>
      </Tooltip>
    </Container>
  ) : (
    <Container inline flex alignItems='center' css={S.container}>
      {content}
    </Container>
  )
}

export default ColoredStatus
