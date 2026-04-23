import React from 'react'

const MockComponent = jest.fn().mockImplementation(props => {
  const data = null
  const loading = false

  return (
    <div data-testid='ListPage'>
      <div data-testid='ListPage-title'>{props.title}</div>
      <div data-testid='ListPage-header'>
        {typeof props.header === 'function'
          ? props.header({
              list: { data, loading },
              totals: null,
              totalCount: 0
            })
          : props.header}
      </div>
      <div data-testid='ListPage-actions'>
        {typeof props.actions === 'function'
          ? props.actions({
              list: { data, loading },
              totals: null,
              totalCount: 0
            })
          : props.actions}
      </div>
      <div data-testid='ListPage-totals'>{props.totals}</div>
      <div data-testid='ListPage-table'>
        {props.table?.({
          list: { data, loading, totalCount: 0 },
          totals: null
        })}
      </div>
      <div data-testid='ListPagination' />
    </div>
  )
})

export default MockComponent
