import React from 'react'

const Content = props => (
  <div data-testid={props['data-testid'] || 'Content'}>
    <div data-testid='Content-children'>{props.children}</div>
    <div data-testid='Content-actions'>{props.actions}</div>
    <div data-testid='Content-title'>{props.title}</div>
  </div>
)

export default Content
