import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ nodeType, document, showReceiverField }) => {
    return (
      <div data-testid='MemorandumAddModalForm'>
        {JSON.stringify({
          nodeType,
          document: {
            id: document?.id,
            documentNumber: document?.documentNumber
          },
          showReceiverField
        })}
      </div>
    )
  })

export default MockComponent
