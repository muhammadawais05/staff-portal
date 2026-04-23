import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { BASE_ERROR_KEY } from '@staff-portal/mutation-result-handlers'
import { UserError } from '@staff-portal/graphql/staff'
import { useGetOperation } from '@staff-portal/operations'

import { useGetStepClaimers } from '../StepClaimerSelect/data'
import ReassignScreeningStepModal from './ReassignScreeningStepModal'
import { useReassignScreeningStep } from './data'

jest.mock('../StepClaimerSelect/data', () => ({
  useGetStepClaimers: jest.fn()
}))

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  useGetOperation: jest.fn()
}))

jest.mock('../StepClaimerSelect', () => ({
  StepClaimerSelect: () => <>StepClaimerSelect Input</>
}))

jest.mock('./data', () => ({
  useReassignScreeningStep: jest.fn()
}))

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

const showError = jest.fn()
const showSuccess = jest.fn()

const useGetStepClaimersMock = useGetStepClaimers as jest.Mock

const mockReturnValues = (success = true, errors: UserError[] = []) => {
  const mockUseReassignScreeningStep = useReassignScreeningStep as jest.Mock
  const mockUseNotifications = useNotifications as jest.Mock

  mockUseNotifications.mockImplementation(() => ({ showError, showSuccess }))

  mockUseReassignScreeningStep.mockReturnValue([
    () => ({
      data: {
        reassignRoleStep: {
          success: success,
          errors: errors
        }
      }
    }),
    { loading: false }
  ])
}

const STEP_NAME = 'English'

const arrangeTest = () => {
  const useGetOperationMock = useGetOperation as jest.Mock

  useGetOperationMock.mockReturnValue({ enabled: true, loading: false })
  useGetStepClaimersMock.mockReturnValue({ claimers: [], loading: false })

  return render(
    <TestWrapper>
      <ReassignScreeningStepModal
        roleStep={{
          id: '00000000000123',
          step: {
            id: 'stepId1',
            title: STEP_NAME,
            short: STEP_NAME
          }
        }}
        hideModal={jest.fn()}
      />
    </TestWrapper>
  )
}

const fillCommentField = async () => {
  const commentInput = await screen.findByLabelText(/Comment/i)

  fireEvent.change(commentInput, {
    target: { value: 'test' }
  })
}

const submitForm = () => {
  const submitButton = screen.getByTestId('reassign-step-submit')

  fireEvent.click(submitButton)
}

describe('ReassignScreeningStepModal', () => {
  describe('without errors', () => {
    beforeEach(() => mockReturnValues())

    it('checks that Modal has required copies', () => {
      arrangeTest()

      expect(screen.getByText(`Reassign ${STEP_NAME}`)).toBeInTheDocument()
      expect(
        screen.getByText(
          `Do you really want to reassign the ${STEP_NAME} step?`
        )
      ).toBeInTheDocument()
      expect(screen.getByText('StepClaimerSelect Input')).toBeInTheDocument()
      expect(screen.getByText('Comment')).toBeInTheDocument()
      expect(screen.getByText(`Reassign Step`)).toBeInTheDocument()
    })

    it('checks a success message after submitting the form', async () => {
      arrangeTest()

      await fillCommentField()

      submitForm()

      await act(() => Promise.resolve())

      expect(showSuccess).toHaveBeenCalledWith(
        `The ${STEP_NAME} step was successfully reassigned to you.`
      )
    })
  })

  describe('with errors', () => {
    it('displays an error after submitting the form', async () => {
      mockReturnValues(false, [
        { code: 'code', key: BASE_ERROR_KEY, message: 'Something went wrong' }
      ])

      arrangeTest()

      await fillCommentField()

      submitForm()

      await act(() => Promise.resolve())

      expect(showError).toHaveBeenCalledWith('Something went wrong')
    })
  })
})
