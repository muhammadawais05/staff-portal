import React from 'react'

const ContentWrapper = ({ actions, title, children, ...rest }) => (
  <div data-testid={rest['data-testid'] ?? 'ContentWrapper'}>
    <div data-testid='ContentWrapper-actions'>{actions}</div>
    <div data-testid='ContentWrapper-title'>{title}</div>
    <div data-testid='ContentWrapper-children'>{children}</div>
  </div>
)

export default ContentWrapper
