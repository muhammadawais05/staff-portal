import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <thead data-testid='MemorandumListTableHeader'>
    <tr>
      <th>{JSON.stringify(props)}</th>
    </tr>
  </thead>
))

export default MockComponent
