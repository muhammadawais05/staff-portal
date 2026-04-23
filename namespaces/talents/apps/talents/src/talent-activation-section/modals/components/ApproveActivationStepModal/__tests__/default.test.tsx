import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { AssigneeFragment } from '@staff-portal/talents'

import ApproveActivationStepModal from '../../ApproveActivationStepModal'
import {
  createApproveActivationStepFailedMock,
  createApproveActivationStepMock
} from '../data/approve-activation-step/mocks'

const activationStepId = '123'
const comment = 'TEST_COMMENT'
const profileEditingStepName = 'Profile Editing'

interface TestOptions {
  mock: MockedResponse
  stepName?: string
  otherAssignee?: AssigneeFragment
  needsToptalEmail?: boolean
}

const arrangeTest = ({
  mock,
  stepName = profileEditingStepName,
  otherAssignee,
  needsToptalEmail = false
}: TestOptions) =>
  render(
    <TestWrapperWithMocks mocks={[mock]}>
      <ApproveActivationStepModal
        talentId='test-talent'
        activationStepId={activationStepId}
        stepName={stepName}
        otherAssignee={otherAssignee}
        needsToptalEmail={needsToptalEmail}
        hideModal={jest.fn()}
      />
    </TestWrapperWithMocks>
  )

const approveActivationStepMock = createApproveActivationStepMock({
  variables: {
    input: {
      activationStepId,
      comment
    }
  },
  partialApproveActivationStepMutation: {
    approveActivationStep: {
      activation: {
        id: '123',
        steps: {
          nodes: []
        }
      },
      success: true,
      errors: []
    }
  }
})

describe('ApproveActivationStepModal', () => {
  describe('when user can approve an activation step', () => {
    it('renders the modal', () => {
      arrangeTest({
        stepName: profileEditingStepName,
        mock: approveActivationStepMock
      })

      expect(
        screen.getByText(`Approve ${profileEditingStepName}`)
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          `Do you really want to approve the ${profileEditingStepName} step?`
        )
      ).toBeInTheDocument()
      expect(screen.getByText(`Approve Step`)).toBeInTheDocument()
    })

    it('approves an activation step', async () => {
      arrangeTest({
        stepName: profileEditingStepName,
        mock: approveActivationStepMock
      })

      const commentField = screen.getByLabelText(/Comment/)

      fireEvent.change(commentField, { target: { value: comment } })
      fireEvent.click(screen.getByText(`Approve Step`))

      expect(
        await screen.findByText(
          `The ${profileEditingStepName} Step has been successfully approved.`
        )
      ).toBeInTheDocument()
    })
  })

  describe('when the step is assigned to another staff member', () => {
    it('renders the modal with the re-assign checkbox', () => {
      const otherAssignee = {
        id: '123',
        fullName: 'TEST_NAME'
      }

      arrangeTest({
        stepName: profileEditingStepName,
        mock: approveActivationStepMock,
        otherAssignee
      })

      expect(
        screen.getByLabelText(
          `Reassign this step from ${otherAssignee.fullName} on me`
        )
      ).toBeInTheDocument()
    })
  })

  describe('when the step needs a Toptal email', () => {
    it('renders the modal with an input for the email', () => {
      arrangeTest({
        stepName: profileEditingStepName,
        mock: approveActivationStepMock,
        needsToptalEmail: true
      })

      expect(screen.getByLabelText(/Toptal Email/)).toBeInTheDocument()
    })
  })

  describe('when user is unable to approve an activation step', () => {
    it('shows graphql error', async () => {
      const errorMessage = 'Step has already been approved.'
      const alreadyApprovedActivationStepMock = createApproveActivationStepMock(
        {
          variables: {
            input: {
              activationStepId,
              comment
            }
          },
          partialApproveActivationStepMutation: {
            approveActivationStep: {
              activation: null,
              success: false,
              errors: [
                {
                  code: '',
                  key: 'base',
                  message: errorMessage
                }
              ]
            }
          }
        }
      )

      arrangeTest({
        stepName: profileEditingStepName,
        mock: alreadyApprovedActivationStepMock
      })

      const commentField = screen.getByLabelText(/Comment/)

      fireEvent.change(commentField, { target: { value: comment } })
      fireEvent.click(screen.getByText(`Approve Step`))

      expect(await screen.findByText(errorMessage)).toBeInTheDocument()
    })
  })

  describe('when there is a network error', () => {
    it('shows a notification error', async () => {
      const approveActivationStepFailedMock =
        createApproveActivationStepFailedMock({
          variables: {
            input: {
              activationStepId,
              comment
            }
          }
        })

      arrangeTest({
        stepName: profileEditingStepName,
        mock: approveActivationStepFailedMock
      })

      const commentField = screen.getByLabelText(/Comment/)

      fireEvent.change(commentField, { target: { value: comment } })
      fireEvent.click(screen.getByText(`Approve Step`))

      expect(
        await screen.findByText('Unable to approve step.')
      ).toBeInTheDocument()
    })
  })
})
