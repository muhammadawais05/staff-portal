import React from 'react'

const MockComponent = ({ isExpanded }: { isExpanded: boolean }) => (
  <div data-testid='ResolutionToggleButton'>
    <div data-testid='ResolutionToggleButton-isExpanded'>{`${isExpanded}`}</div>
  </div>
)

export default MockComponent
