import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <thead data-testid='TransfersTableHead' />)

export default MockComponent
