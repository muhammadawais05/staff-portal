import React, { ReactElement } from 'react'

const TypographyOverflow = ({
  color,
  children,
  'data-testid': testId = 'TypographyOverflow'
}: {
  color?: string
  children: ReactElement
  'data-testid': string
}) => (
  <div data-testid={testId} data-color={color}>
    {children}
  </div>
)

export default TypographyOverflow
