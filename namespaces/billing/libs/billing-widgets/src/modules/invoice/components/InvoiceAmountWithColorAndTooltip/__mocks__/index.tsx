import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({
      invoice: { amount, subjectObject = { id: '' } },
      testId,
      iconPosition,
      tooltipText,
      weight
    }) => (
      <div data-testid='InvoiceAmountWithColorAndTooltip'>
        {JSON.stringify({
          amount,
          subjectObject: {
            id: subjectObject.id
          },
          testId,
          iconPosition,
          tooltipText,
          weight
        })}
      </div>
    )
  )

export default MockComponent
