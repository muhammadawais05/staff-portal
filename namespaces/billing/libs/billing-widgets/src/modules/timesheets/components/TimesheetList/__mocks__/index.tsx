import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(({ limitElements, timesheets }) => (
    <div data-testid='TimesheetList'>
      <div data-testid='TimesheetList-limitElements'>{limitElements}</div>
      <div data-testid='TimesheetList-timesheets'>
        {JSON.stringify(timesheets)}
      </div>
    </div>
  ))

export default MockComponent
