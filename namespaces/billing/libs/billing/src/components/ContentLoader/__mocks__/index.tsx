import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({ children, isModalContainer, showSkeleton, loading }) => (
      <div data-testid='ContentLoader'>
        <span data-testid='ContentLoader-children'>{children}</span>
        <span data-testid='ContentLoader-isModalContainer'>
          {JSON.stringify(isModalContainer)}
        </span>
        <span data-testid='ContentLoader-showSkeleton'>
          {JSON.stringify(showSkeleton)}
        </span>
        <span data-testid='ContentLoader-loading'>
          {JSON.stringify(loading)}
        </span>
      </div>
    )
  )

export default MockComponent
