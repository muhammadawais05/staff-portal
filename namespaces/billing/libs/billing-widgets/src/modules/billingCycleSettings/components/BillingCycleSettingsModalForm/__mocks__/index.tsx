import { omit } from 'lodash-es'
import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation(props => (
    <div data-testid='BillingCycleSettingsModal'>
      {JSON.stringify(omit(props, 'formProps.__versions'))}
    </div>
  ))

export default MockComponent
