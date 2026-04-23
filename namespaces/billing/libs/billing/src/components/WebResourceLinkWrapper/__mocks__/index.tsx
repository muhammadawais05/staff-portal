import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <a
    data-testid={props['data-testid'] || 'WebResourceLinkWrapper'}
    href={props.webResource?.url}
  >
    {props.defaultText || props.webResource?.text}
  </a>
))

export default MockComponent
