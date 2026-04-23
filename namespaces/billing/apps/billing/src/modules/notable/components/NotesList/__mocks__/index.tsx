import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ nodeId }) => (
    <div data-testid='NotesList'>{nodeId}</div>
  ))

export default MockComponent
