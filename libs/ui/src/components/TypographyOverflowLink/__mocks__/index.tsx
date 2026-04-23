import React, { ReactNode } from 'react'

interface Props {
  'data-testid': string
  children: ReactNode
  tooltipContent?: ReactNode
}

const TypographyOverflowLink = ({
  children,
  tooltipContent,
  'data-testid': testId = 'TypographyOverflowLink'
}: Props) => (
  <div data-testid={testId}>
    <div data-testid={`${testId}-tooltipContent`}>{tooltipContent}</div>
    {children}
  </div>
)

export default TypographyOverflowLink
