import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import { Stepper } from '@toptal/picasso'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import NewEngagementWizard from './NewEngagementWizard'

jest.mock('./utils', () => ({
  getStepNames: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Stepper: jest.fn()
}))

const StepperMock = Stepper as unknown as jest.Mock

const renderComponent = ({
  steps,
  roleName
}: {
  steps: NewEngagementWizardStep[]
  roleName: string
}) =>
  render(
    <TestWrapper>
      <NewEngagementWizard steps={steps} roleName={roleName} />
    </TestWrapper>
  )

describe('NewEngagementWizard', () => {
  it('renders the proper content', () => {
    StepperMock.mockImplementation(() => null)

    renderComponent({
      steps: [],
      roleName: 'Chief'
    })

    expect(StepperMock).toHaveBeenCalledTimes(1)
    expect(StepperMock).toHaveBeenCalledWith(
      expect.objectContaining({
        active: -1,
        steps: undefined,
        'data-testid': 'new-engagement-wizard'
      }),
      {}
    )
  })
})
