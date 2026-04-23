import React from 'react'

export const Collection = props => (
  <div data-testid={props['data-testid'] || 'EmptyState.Collection'}>
    {props.children}
  </div>
)

const EmptyState = {
  Collection
}

export default EmptyState
