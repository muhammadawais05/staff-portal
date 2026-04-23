import React from 'react'

const PersistentFormProvider = props => (
  <div data-testid={props['data-testid'] || 'PersistentFormProvider'}>
    {props.children}
  </div>
)

export default PersistentFormProvider
