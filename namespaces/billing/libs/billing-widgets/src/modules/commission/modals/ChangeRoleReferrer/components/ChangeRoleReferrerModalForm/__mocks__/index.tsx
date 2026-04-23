import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='ChangeRoleReferrerModalForm' />)

export default MockComponent
