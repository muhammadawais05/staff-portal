import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <div data-testid='InlineActionsSkeleton'>
    <span data-testid='InlineActionsSkeleton-numberOfButtons'>
      {props?.numberOfButtons}
    </span>
    <span data-testid='InlineActionsSkeleton-size'>{props?.size}</span>
  </div>
))

export default MockComponent
