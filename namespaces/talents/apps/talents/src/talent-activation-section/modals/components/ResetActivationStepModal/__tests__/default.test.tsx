import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import {
  createResetActivationStepMock,
  createResetStepActivationFailedMock
} from '../data/reset-activation-step/mocks'
import ResetActivationStepModal from '../ResetActivationStepModal'

const activationId = '123'
const stepId = '1234'
const stepName = 'Profile Editing'
const comment = 'comment'

const resetActivationStepMock = createResetActivationStepMock({
  variables: {
    input: {
      comment,
      activationStepId: stepId
    }
  },
  partialResetActivationStepMutation: {
    resetActivationStep: {
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
      <ResetActivationStepModal
        talentId='talent-id'
        stepId={stepId}
        stepName={stepName}
        hideModal={jest.fn()}
      />
    </TestWrapperWithMocks>
  )
}

describe('ResetActivationStepModal', () => {
  it('renders the reset step modal', () => {
    arrangeTest(resetActivationStepMock)

    expect(screen.getByText(`Reset ${stepName}`)).toBeInTheDocument()
    expect(
      screen.getByText(`Do you really want to reset the ${stepName} step?`)
    ).toBeInTheDocument()
    expect(screen.getByText(`Reset Step`)).toBeInTheDocument()
  })

  it('resets a step', async () => {
    arrangeTest(resetActivationStepMock)

    const commentField = screen.getByLabelText(/Comment/)

    fireEvent.change(commentField, { target: { value: comment } })

    fireEvent.click(screen.getByText(`Reset Step`))

    expect(
      await screen.findByText(
        `The ${stepName} Step has been successfully reset.`
      )
    ).toBeInTheDocument()
  })

  it('shows graphql error when unable to reset an activation step', async () => {
    const resetAlreadyResetedActivationStepMock = createResetActivationStepMock(
      {
        variables: {
          input: {
            comment,
            activationStepId: stepId
          }
        },
        partialResetActivationStepMutation: {
          resetActivationStep: {
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
      }
    )

    arrangeTest(resetAlreadyResetedActivationStepMock)

    const commentField = screen.getByLabelText(/Comment/)

    fireEvent.change(commentField, { target: { value: comment } })

    fireEvent.click(screen.getByText(`Reset Step`))

    expect(await screen.findByText('Step is not claimed')).toBeInTheDocument()
  })

  it('shows network error', async () => {
    const resetActivationStepFailedMock = createResetStepActivationFailedMock({
      variables: {
        input: {
          comment,
          activationStepId: stepId
        }
      }
    })

    arrangeTest(resetActivationStepFailedMock)

    const commentField = screen.getByLabelText(/Comment/)

    fireEvent.change(commentField, { target: { value: comment } })

    fireEvent.click(screen.getByText(`Reset Step`))

    expect(await screen.findByText('Unable to reset step.')).toBeInTheDocument()
  })
})
