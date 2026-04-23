import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { BASE_ERROR_KEY } from '@staff-portal/mutation-result-handlers'
import { UserError } from '@staff-portal/graphql/staff'

import ResetScreeningStepModal from './ResetScreeningStepModal'
import { useResetScreeningStep } from './data'

jest.mock('./data', () => ({
  __esModule: true,
  useResetScreeningStep: jest.fn()
}))

jest.mock('@toptal/picasso/utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

const showError = jest.fn()
const showSuccess = jest.fn()

const mockReturnValues = (success = true, errors: UserError[] = []) => {
  const mockUseResetScreeningStep = useResetScreeningStep as jest.Mock
  const mockUseNotifications = useNotifications as jest.Mock

  mockUseNotifications.mockImplementation(() => ({ showError, showSuccess }))

  mockUseResetScreeningStep.mockReturnValue([
    () => ({
      data: {
        unapproveRoleStep: {
          success: success,
          errors: errors
        }
      }
    }),
    { loading: false }
  ])
}

const STEP_NAME = 'Payment Details'

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <ResetScreeningStepModal
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
  const submitButton = screen.getByTestId('reset-step-submit')

  fireEvent.click(submitButton)
}

describe('ResetScreeningStepModal', () => {
  describe('without errors', () => {
    beforeEach(() => mockReturnValues())

    it('checks that Modal has required copies', () => {
      arrangeTest()

      expect(screen.getByText(`Reset ${STEP_NAME}`)).toBeInTheDocument()
      expect(
        screen.getByText(`Do you really want to reset the ${STEP_NAME} step?`)
      ).toBeInTheDocument()
      expect(screen.getByText('Comment')).toBeInTheDocument()
      expect(screen.getByText(`Reset Step`)).toBeInTheDocument()
    })

    it('checks a success message after submitting the form', async () => {
      arrangeTest()

      await fillCommentField()

      submitForm()

      await act(() => Promise.resolve())

      expect(showSuccess).toHaveBeenCalledWith(
        `The ${STEP_NAME} step was successfully reset.`
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
