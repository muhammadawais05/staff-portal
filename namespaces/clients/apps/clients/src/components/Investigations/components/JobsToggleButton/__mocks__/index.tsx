import React from 'react'

const MockComponent = ({
  totalCount,
  isExpanded
}: {
  totalCount: number
  isExpanded: boolean
}) => (
  <div data-testid='JobsToggleButton'>
    <div data-testid='JobsToggleButton-totalCount'>{totalCount}</div>
    <div data-testid='JobsToggleButton-isExpanded'>{`${isExpanded}`}</div>
  </div>
)

export default MockComponent
