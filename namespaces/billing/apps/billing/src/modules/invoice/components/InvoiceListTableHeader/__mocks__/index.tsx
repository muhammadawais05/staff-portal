import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({
      invoiceIds,
      isActionsVisible,
      isRecipientVisible,
      isSelectionVisible,
      isStatusVisible
    }) => (
      <thead>
        <tr>
          <td data-testid='InvoiceListTableHeader'>
            {invoiceIds && (
              <span data-testid='InvoiceListTableHeader-invoiceIds'>
                {invoiceIds}
              </span>
            )}
            {isActionsVisible && (
              <span data-testid='InvoiceListTableHeader-isActionsVisible' />
            )}
            {isRecipientVisible && (
              <span data-testid='InvoiceListTableHeader-isRecipientVisible' />
            )}
            {isSelectionVisible && (
              <span data-testid='InvoiceListTableHeader-isSelectionVisible' />
            )}
            {isStatusVisible && (
              <span data-testid='InvoiceListTableHeader-isStatusVisible' />
            )}
          </td>
        </tr>
      </thead>
    )
  )

export default MockComponent
