import React from 'react'

const AutocompleteHighlightOption = props => (
  <div data-testid={props['data-testid'] || 'AutocompleteHighlightOption'}>
    {JSON.stringify({
      label: props.label,
      labelHighlight: props.labelHighlight,
      nodeTypes: props.nodeTypes
    })}
  </div>
)

export default AutocompleteHighlightOption
