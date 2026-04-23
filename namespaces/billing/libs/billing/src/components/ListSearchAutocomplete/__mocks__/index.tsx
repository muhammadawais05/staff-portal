import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ searchBarCategories }) => (
    <div data-testid='ListSearchAutocomplete'>
      {JSON.stringify(searchBarCategories)}
    </div>
  ))

export default MockComponent
