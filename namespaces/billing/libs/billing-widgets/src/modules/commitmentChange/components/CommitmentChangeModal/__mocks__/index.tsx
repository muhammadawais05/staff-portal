import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => (
  <div data-testid='CommitmentChangeModal'>
    {JSON.stringify(props.operation)}
    {JSON.stringify(props.engagement.id)}
  </div>
))

export default MockComponent
