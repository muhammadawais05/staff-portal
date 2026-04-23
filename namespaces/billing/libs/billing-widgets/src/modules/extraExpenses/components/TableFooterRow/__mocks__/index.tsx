import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <tr data-testid='TableFooterRow'>
    <td>{props.type}</td>
  </tr>
))

export default MockComponent
