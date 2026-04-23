import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({ status, billingMethod, comment, verificationStatuses }) => (
      <div data-testid='VerificationStatus'>
        <span data-testid='VerificationStatus-status'>{status}</span>
        <span data-testid='VerificationStatus-billingMethod'>
          {billingMethod}
        </span>
        <span data-testid='VerificationStatus-comment'>{comment}</span>
        <span data-testid='VerificationStatus-verificationStatuses'>
          {verificationStatuses}
        </span>
      </div>
    )
  )

export default MockComponent
