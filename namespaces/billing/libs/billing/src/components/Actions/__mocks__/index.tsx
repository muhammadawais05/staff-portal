import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({
      translationCode,
      documentNumber,
      downloadHtmlUrl,
      downloadPdfUrl,
      operations
    }) => (
      <div data-testid='Actions'>
        <div data-testid='Actions-translationCode'>{translationCode}</div>
        <div data-testid='Actions-documentNumber'>{documentNumber}</div>
        <div data-testid='Actions-downloadHtmlUrl'>{downloadHtmlUrl}</div>
        <div data-testid='Actions-downloadPdfUrl'>{downloadPdfUrl}</div>
        <div data-testid='Actions-operations'>{JSON.stringify(operations)}</div>
      </div>
    )
  )

export default MockComponent
