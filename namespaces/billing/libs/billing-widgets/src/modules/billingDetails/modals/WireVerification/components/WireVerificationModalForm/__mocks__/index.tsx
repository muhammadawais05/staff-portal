import React from 'react'

const MockComponent = jest.fn().mockImplementation(({ isVerify }) => (
  <div data-testid='WireVerificationModalForm'>
    <div data-testid='WireVerificationModalForm-isVerify'>{`${isVerify}`}</div>
  </div>
))

export default MockComponent
