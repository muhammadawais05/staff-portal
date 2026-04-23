import React from 'react'

export const Alert = props => (
  <div data-testid={props['data-testid'] || 'Alert'}>{props.children}</div>
)

Alert.Inline = props => <>{props.children}</>

export default Alert
