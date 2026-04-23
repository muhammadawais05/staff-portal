import { ColorType } from '@toptal/picasso'
import React, { ReactNode } from 'react'

const MockComponent = ({
  status,
  color,
  tooltipContent,
  tooltipIcon,
  'data-testid': testId = 'ColoredStatus'
}: {
  status: ReactNode
  color?: ColorType
  tooltipContent?: ReactNode
  tooltipIcon?: ReactNode
  'data-testid'?: string
}) => (
  <div data-testid={testId}>
    <div data-testid={`${testId}-status`}>{status}</div>
    <div data-testid={`${testId}-color`}>{color}</div>
    <div data-testid={`${testId}-tooltipContent`}>{tooltipContent}</div>
    <div data-testid={`${testId}-tooltipIcon`}>{tooltipIcon}</div>
  </div>
)

export default MockComponent
