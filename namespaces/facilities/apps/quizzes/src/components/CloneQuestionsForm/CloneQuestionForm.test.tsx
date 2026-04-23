import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CloneQuestionsForm from './CloneQuestionsForm'
import useCloneQuestionsForm from './use-clone-questions-form'
import { useGetVerticals } from './../../data/get-verticals'
import { createVerticalsMock } from './../../data/get-verticals/mocks'

jest.mock('./../../data/get-verticals')
jest.mock('./use-clone-questions-form')

const mockHideModal = jest.fn()
const mockHandleSubmit = jest.fn()

const mockUseGetVerticals = useGetVerticals as jest.Mock
const mockUseCloneQuestionsForm = useCloneQuestionsForm as jest.Mock

const mockVerticals = createVerticalsMock()

const mockFormInput = {
  sourceVerticalId: mockVerticals[0].id,
  destinationVerticalId: mockVerticals[5].id
}

const arrangeTest = (loading = false) => {
  mockUseGetVerticals.mockImplementation(() => ({
    loading,
    data: mockVerticals
  }))

  mockUseCloneQuestionsForm.mockImplementation(() => ({
    handleSubmit: mockHandleSubmit
  }))

  return render(
    <TestWrapper>
      <CloneQuestionsForm hideModal={mockHideModal} />
    </TestWrapper>
  )
}

describe('CloneQuestionsForm', () => {
  it('renders preloader', () => {
    arrangeTest(true)

    expect(screen.getByTestId('CloneQuestionsFormLoader')).toBeInTheDocument()
  })

  it('handles form submit', async () => {
    arrangeTest()

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Original Vertical/i), {
        target: { value: mockFormInput.sourceVerticalId }
      })
      fireEvent.change(screen.getByLabelText(/Destination Vertical/i), {
        target: { value: mockFormInput.destinationVerticalId }
      })

      await fireEvent.click(
        screen.getByTestId('CloneQuestionsForm-submit-button')
      )
    })

    expect(mockHandleSubmit).toHaveBeenCalledWith(
      mockFormInput,
      expect.anything(),
      expect.anything()
    )
  })
})
