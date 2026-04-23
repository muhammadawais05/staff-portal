import React, { FC, ReactNode, MouseEvent } from 'react'
import {
  Button,
  Container,
  Typography,
  Tooltip,
  Calendar16,
  Time16
} from '@toptal/picasso'

import { StepMainButtonWrapper } from '../StepMainButtonWrapper'
import { TooltipContent } from '../TooltipContent'
import * as S from './styles'
import { StepIndicatorData } from '../types'
import StepIndicator from '../StepIndicator'

type StaticProps = {
  Wrapper: typeof StepMainButtonWrapper
  TooltipContent: typeof TooltipContent
}

export type Props = {
  label: string
  disabled?: boolean
  loading?: boolean
  indicatorData?: StepIndicatorData
  showCalendarIcon?: boolean
  showClockIcon?: boolean
  tooltip?: ReactNode
  onClick?: (event: MouseEvent) => void
}

const StepMainButton: FC<Props> & StaticProps = ({
  label,
  disabled,
  loading,
  indicatorData,
  showCalendarIcon,
  showClockIcon,
  tooltip,
  onClick
}) => (
  <Tooltip content={tooltip}>
    <span>
      <Button
        css={S.mainButtonRoot}
        variant='secondary'
        onClick={onClick}
        disabled={disabled}
        loading={loading}
        fullWidth
        data-testid='step-button-main'
      >
        <Container flex alignItems='center' css={S.mainButtonContent}>
          {indicatorData && (
            <StepIndicator
              color={indicatorData.color}
              withArrow={indicatorData.withArrow}
            />
          )}

          {showCalendarIcon && (
            <Container right='xsmall' data-testid='step-calendar-icon'>
              <Calendar16 color='red' />
            </Container>
          )}

          {showClockIcon && (
            <Container right='xsmall' data-testid='step-clock-icon'>
              <Time16 color='blue' />
            </Container>
          )}

          <Typography noWrap weight='semibold' color='inherit' as='span'>
            {label}
          </Typography>
        </Container>
      </Button>
    </span>
  </Tooltip>
)

/* Wrapper is necessary to expand the main button */
StepMainButton.Wrapper = StepMainButtonWrapper

/* TooltipContent is necessary to render a custom tooltip */
StepMainButton.TooltipContent = TooltipContent

export default StepMainButton
