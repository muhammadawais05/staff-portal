import React from 'react'

const TypographyOverflow = props => (
  <div data-testid={props['data-testid'] || 'TypographyOverflow'}>
    {props.children}
  </div>
)

export default TypographyOverflow
