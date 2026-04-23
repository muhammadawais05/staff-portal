import React from 'react'

const MockComponent = jest.fn().mockImplementation(
  ({
    invoice: {
      documentNumber,
      downloadHtmlUrl,
      downloadPdfUrl,
      operations: { createTransferInvoice },
      webResource
    }
  }) => (
    <div data-testid='RowAction'>
      {JSON.stringify({
        documentNumber,
        downloadHtmlUrl,
        downloadPdfUrl,
        createTransferInvoice,
        webResource
      })}
    </div>
  )
)

export default MockComponent
