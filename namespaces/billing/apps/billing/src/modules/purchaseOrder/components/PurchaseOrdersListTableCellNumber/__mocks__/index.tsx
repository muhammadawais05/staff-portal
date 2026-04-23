import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ archived, poNumber, webResource }) => (
    <div data-testid='PurchaseOrdersListTableCellNumber'>
      <span data-testid='PurchaseOrdersListTableCellNumber-archived'>
        {JSON.stringify(archived)}
      </span>
      <span data-testid='PurchaseOrdersListTableCellNumber-poNumber'>
        {poNumber}
      </span>
      <span data-testid='PurchaseOrdersListTableCellNumber-webResource'>
        {JSON.stringify(webResource)}
      </span>
    </div>
  ))

export default MockComponent
