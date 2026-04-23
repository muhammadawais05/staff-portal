import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ edge }) => (
    <div data-testid='FormInputAutocompleteRoleOption'>
      {JSON.stringify(edge)}
    </div>
  ))

export default MockComponent
