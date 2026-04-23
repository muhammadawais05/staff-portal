import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => {
  const {
    isToggled,
    name,
    type,
    value,
    operation,
    purchaseOrderId,
    successMessage
  } = props
  const testId = props['data-testid'] || 'PurchaseOrderPropertyEditor'

  return (
    <div data-testid={testId}>
      <span data-testid={`${testId}-isToggled`}>
        {JSON.stringify({ isToggled })}
      </span>
      <span data-testid={`${testId}-name`}>{name}</span>
      <span data-testid={`${testId}-operation`}>
        {JSON.stringify({ operation })}
      </span>
      <span data-testid={`${testId}-purchaseOrderId`}>{purchaseOrderId}</span>
      <span data-testid={`${testId}-successMessage`}>{successMessage}</span>
      <span data-testid={`${testId}-type`}>{type}</span>
      <span data-testid={`${testId}-value`}>{value}</span>
    </div>
  )
})

export default MockComponent
