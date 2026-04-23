import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <tr data-testid='MemorandumListRow'>
    <td>{JSON.stringify(props)}</td>
  </tr>
))

export default MockComponent
