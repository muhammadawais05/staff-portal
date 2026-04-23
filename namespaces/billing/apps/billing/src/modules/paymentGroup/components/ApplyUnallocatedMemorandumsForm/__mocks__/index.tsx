import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({ nodeId, isApplyMemosAndPayFlow, availablePrepaymentBalance }) => (
      <div data-testid='ApplyUnallocatedMemorandumsForm'>
        {JSON.stringify({
          nodeId,
          isApplyMemosAndPayFlow,
          availablePrepaymentBalance
        })}
      </div>
    )
  )

export default MockComponent
