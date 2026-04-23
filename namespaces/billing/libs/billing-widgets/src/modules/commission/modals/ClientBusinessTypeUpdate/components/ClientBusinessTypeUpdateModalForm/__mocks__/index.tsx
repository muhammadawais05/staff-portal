import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ title, initialValues }) => (
    <div data-testid='ClientBusinessTypeUpdateModalForm'>
      <div data-testid='ClientBusinessTypeUpdateModalForm-title'>{title}</div>
      <div data-testid='ClientBusinessTypeUpdateModalForm-initialValues-businessType'>
        {initialValues.businessType}
      </div>
    </div>
  ))

export default MockComponent
