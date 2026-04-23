import React from 'react'

const MockComponent = ({
  totalCount,
  isExpanded
}: {
  totalCount: number
  isExpanded: boolean
}) => (
  <div data-testid='InvestigationsToggleButton'>
    <div data-testid='InvestigationsToggleButton-totalCount'>{totalCount}</div>
    <div data-testid='InvestigationsToggleButton-isExpanded'>{`${isExpanded}`}</div>
  </div>
)

export default MockComponent
