import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(() => <div data-testid='DashboardCommissionWidget' />)

export default MockComponent
