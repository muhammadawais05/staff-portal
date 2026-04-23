import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ initialValues, isEdit }) => (
    <div data-testid='NoteEditModalForm'>
      <span data-testid='NoteEditModalForm-initialValues'>
        {JSON.stringify(initialValues)}
      </span>
      <span data-testid='NoteEditModalForm-isEdit'>
        {JSON.stringify(isEdit)}
      </span>
    </div>
  ))

export default MockComponent
