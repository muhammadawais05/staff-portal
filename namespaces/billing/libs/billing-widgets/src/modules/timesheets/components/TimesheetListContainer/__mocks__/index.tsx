import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ limitElements, showTitle, engagementId }) => (
    <div data-testid='TimesheetListContainer'>
      <span data-testid='TimesheetListContainer-engagementId'>
        {engagementId}
      </span>
      <span data-testid='TimesheetListContainer-limitElements'>
        {limitElements}
      </span>
      <span data-testid='TimesheetListContainer-showTitle'>
        {JSON.stringify(showTitle)}
      </span>
    </div>
  ))

export default MockComponent
