import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <thead data-testid='EmailStatusPanelHeader' />)

export default MockComponent
