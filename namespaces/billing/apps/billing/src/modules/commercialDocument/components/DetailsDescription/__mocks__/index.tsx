import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ description, documentNote }) => (
    <div data-testid='DetailsDescription'>
      <span data-testid='DetailsDescription-description'>{description}</span>
      <span data-testid='DetailsDescription-documentNote'>{documentNote}</span>
    </div>
  ))

export default MockComponent
