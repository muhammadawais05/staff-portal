import React from 'react'

const Pagination = props => (
  <div data-testid={props['data-testid'] || 'Pagination'}>
    {JSON.stringify([props.activePage, props.limit, props.itemCount])}
  </div>
)

export default Pagination
