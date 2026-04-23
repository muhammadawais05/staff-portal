import React from 'react'

const SearchBar = props => {
  if (props.onError) {
    props.onError('error')
  }

  return (
    <div data-testid={props['data-testid'] || 'SearchBar'}>
      {JSON.stringify(props)}
    </div>
  )
}

export default SearchBar
