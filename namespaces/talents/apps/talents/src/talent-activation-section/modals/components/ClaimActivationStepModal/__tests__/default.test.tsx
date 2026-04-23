import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import ClaimActivationStepModal from '../../ClaimActivationStepModal'
import {
  createAssignActivationStepMock,
  createAssignStepActivationFailedMock
} from '../data/assign-activation-step/mocks'

const activationId = '123'
const stepId = '123'
const talentFullName = 'TEST_NAME'
const stepName = 'Profile Editing'
const staffId = 'StaffId'
const staffFullName = 'Alexander Danilenko'

const assignActivationStepMock = createAssignActivationStepMock({
  variables: {
    input: {
      staffId,
      activationStepId: stepId
    }
  },
  partialAssignActivationStepMutation: {
    assignActivationStep: {
      activation: {
        id: activationId,
        steps: {
          nodes: []
        }
      },
      success: true,
      errors: []
    }
  }
})

const arrangeTest = (mock: MockedResponse) =>
  render(
    <TestWrapperWithMocks mocks={[mock]}>
      <ClaimActivationStepModal
        talentId='test-talent'
        stepId={stepId}
        stepName={stepName}
        talentFullName={talentFullName}
        staffId={staffId}
        staffFullName={staffFullName}
        hideModal={jest.fn()}
      />
    </TestWrapperWithMocks>
  )

describe('ClaimActivationStepModal', () => {
  it('renders claim step modal', () => {
    arrangeTest(assignActivationStepMock)

    expect(screen.getByText(`Claim ${stepName}`)).toBeInTheDocument()
    expect(
      screen.getByText(
        `Are you sure you want to claim the ${stepName} step for ${talentFullName}?`
      )
    ).toBeInTheDocument()
    expect(screen.getByText(`Claim Step`)).toBeInTheDocument()
  })

  it('claims a step', async () => {
    arrangeTest(assignActivationStepMock)

    fireEvent.click(screen.getByText(`Claim Step`))

    expect(
      await screen.findByText(
        `The ${stepName} Step has been successfully claimed and assigned to ${staffFullName}.`
      )
    ).toBeInTheDocument()
  })

  it('shows graphql error when unable to assign an activation step', async () => {
    const assignAlreadyAssignedActivationStepMock =
      createAssignActivationStepMock({
        variables: {
          input: {
            staffId,
            activationStepId: stepId
          }
        },
        partialAssignActivationStepMutation: {
          assignActivationStep: {
            activation: null,
            success: false,
            errors: [
              {
                code: '',
                key: 'base',
                message: 'Step has already been assigned to a staff member'
              }
            ]
          }
        }
      })

    arrangeTest(assignAlreadyAssignedActivationStepMock)

    fireEvent.click(screen.getByText(`Claim Step`))

    expect(
      await screen.findByText(
        'Step has already been assigned to a staff member'
      )
    ).toBeInTheDocument()
  })

  it('shows network error', async () => {
    const assignActivationStepFailedMock = createAssignStepActivationFailedMock(
      {
        variables: {
          input: {
            staffId,
            activationStepId: stepId
          }
        }
      }
    )

    arrangeTest(assignActivationStepFailedMock)

    fireEvent.click(screen.getByText(`Claim Step`))

    expect(await screen.findByText('Unable to claim step.')).toBeInTheDocument()
  })
})
