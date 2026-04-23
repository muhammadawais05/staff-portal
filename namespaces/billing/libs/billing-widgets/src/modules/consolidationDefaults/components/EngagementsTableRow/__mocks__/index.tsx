import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <tr data-testid='EngagementsTableRow' />)

export default MockComponent
