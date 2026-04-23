import React from 'react'

const Filters = props => (
  <div data-testid={props['data-testid'] || 'Filters'}>
    {props.children(<></>)}
  </div>
)

export default Filters
