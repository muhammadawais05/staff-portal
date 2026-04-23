import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import {
  createUnassignActivationStepMock,
  createUnassignStepActivationFailedMock
} from '../data/unassign-activation-step/mocks'
import UnclaimActivationStepModal from '../UnclaimActivationStepModal'

const activationId = '123'
const stepId = '1234'
const stepName = 'Profile Editing'
const comment = 'comment'

const unassignActivationStepMock = createUnassignActivationStepMock({
  variables: {
    input: {
      comment,
      activationStepId: stepId
    }
  },
  partialUnassignActivationStepMutation: {
    unassignActivationStep: {
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

const arrangeTest = (mock: MockedResponse) => {
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapperWithMocks mocks={[mock]}>
      <UnclaimActivationStepModal
        talentId='talent-id'
        stepId={stepId}
        stepName={stepName}
        hideModal={jest.fn()}
      />
    </TestWrapperWithMocks>
  )
}

describe('UnclaimActivationStepModal', () => {
  it('renders the unclaim step modal', () => {
    arrangeTest(unassignActivationStepMock)

    expect(screen.getByText(`Unclaim ${stepName}`)).toBeInTheDocument()
    expect(
      screen.getByText(`Do you really want to unclaim the ${stepName} step?`)
    ).toBeInTheDocument()
    expect(screen.getByText(`Unclaim Step`)).toBeInTheDocument()
  })

  it('unclaims a step', async () => {
    arrangeTest(unassignActivationStepMock)

    const commentField = screen.getByLabelText(/Comment/)

    fireEvent.change(commentField, { target: { value: comment } })

    fireEvent.click(screen.getByText(`Unclaim Step`))

    expect(
      await screen.findByText(
        `The ${stepName} Step has been successfully unclaimed.`
      )
    ).toBeInTheDocument()
  })

  it('shows graphql error when unable to unassign an activation step', async () => {
    const unassignAlreadyUnassignedActivationStepMock =
      createUnassignActivationStepMock({
        variables: {
          input: {
            comment,
            activationStepId: stepId
          }
        },
        partialUnassignActivationStepMutation: {
          unassignActivationStep: {
            activation: null,
            success: false,
            errors: [
              {
                code: '',
                key: 'base',
                message: 'Step is not claimed'
              }
            ]
          }
        }
      })

    arrangeTest(unassignAlreadyUnassignedActivationStepMock)

    const commentField = screen.getByLabelText(/Comment/)

    fireEvent.change(commentField, { target: { value: comment } })

    fireEvent.click(screen.getByText(`Unclaim Step`))

    expect(await screen.findByText('Step is not claimed')).toBeInTheDocument()
  })

  it('shows network error', async () => {
    const unassignActivationStepFailedMock =
      createUnassignStepActivationFailedMock({
        variables: {
          input: {
            comment,
            activationStepId: stepId
          }
        }
      })

    arrangeTest(unassignActivationStepFailedMock)

    const commentField = screen.getByLabelText(/Comment/)

    fireEvent.change(commentField, { target: { value: comment } })

    fireEvent.click(screen.getByText(`Unclaim Step`))

    expect(
      await screen.findByText('Unable to unclaim step.')
    ).toBeInTheDocument()
  })
})
