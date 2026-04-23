import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <thead data-testid='PurchaseOrderLineJobsTable'>
    <tr>
      <td>{JSON.stringify(props)}</td>
    </tr>
  </thead>
))

export default MockComponent
