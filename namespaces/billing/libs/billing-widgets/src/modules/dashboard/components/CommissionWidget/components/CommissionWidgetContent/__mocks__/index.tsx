import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ data, gridSize }) => (
  <div data-testid='CommissionWidgetContent'>
    <span data-testid='CommissionWidgetContent-gridSize'>{gridSize}</span>
    <span data-testid='CommissionWidgetContent-data'>
      {JSON.stringify(data)}
    </span>
  </div>
))

export default MockComponent
