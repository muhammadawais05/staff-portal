import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='BillingEngagementDetails' />)

export const BillingEngagementDetailsSkeleton = () => <></>
export default MockComponent
