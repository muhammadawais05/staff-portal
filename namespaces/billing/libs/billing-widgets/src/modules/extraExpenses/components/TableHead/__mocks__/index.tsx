import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <thead data-testid='TableHead' />)

export default MockComponent
