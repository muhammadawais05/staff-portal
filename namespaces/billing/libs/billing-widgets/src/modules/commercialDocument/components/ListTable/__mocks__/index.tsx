import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(
    ({ header, body, top, bottom, rowsCount, columnsCount, emptyMessage }) => (
      <div
        data-testid='ListTable'
        data-top={top}
        data-bottom={bottom}
        data-rows={rowsCount}
        data-cols={columnsCount}
      >
        <table data-testid='ListTable-table'>
          {header}
          {body}
        </table>
        <div data-testid='ListTable-emptyMessage'>{emptyMessage}</div>
      </div>
    )
  )

export default MockComponent
