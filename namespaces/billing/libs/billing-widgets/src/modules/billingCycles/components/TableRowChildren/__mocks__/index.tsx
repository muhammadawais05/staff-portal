import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <td data-testid='BillingCycleTableRowChildren'>
    {JSON.stringify(props?.childrenCycles?.length)}
    {JSON.stringify(props?.isAltColor)}
  </td>
))

export default MockComponent
