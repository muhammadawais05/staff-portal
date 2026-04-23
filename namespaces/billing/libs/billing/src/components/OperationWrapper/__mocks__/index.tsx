import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({ children, disabledText, isLoading, placement, operation }) => (
      <div data-testid='OperationWrapper'>
        <div data-testid='OperationWrapper-children'>{children}</div>
        <div data-testid='OperationWrapper-disabledText'>{disabledText}</div>
        <div data-testid='OperationWrapper-isLoading'>
          {JSON.stringify(isLoading)}
        </div>
        <div data-testid='OperationWrapper-operation'>
          {JSON.stringify(operation)}
        </div>
        <div data-testid='OperationWrapper-placement'>{placement}</div>
      </div>
    )
  )

export default MockComponent
