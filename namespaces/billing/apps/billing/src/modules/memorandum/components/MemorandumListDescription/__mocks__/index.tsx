import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='MemorandumListDescription'>
      portions amount: {props.portions?.length || 0}
    </div>
  ))

export default MockComponent
