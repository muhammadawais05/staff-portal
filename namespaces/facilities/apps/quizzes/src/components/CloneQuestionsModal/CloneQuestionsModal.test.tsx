import React from 'react'
import { render } from '@testing-library/react'

import CloneQuestionsForm from '../CloneQuestionsForm'
import CloneQuestionsModal from './CloneQuestionsModal'

jest.mock('../CloneQuestionsForm')

const mockHideModal = jest.fn()

const MockCloneQuestionsForm = CloneQuestionsForm as jest.Mock

const arrangeTest = () => {
  MockCloneQuestionsForm.mockImplementation(() => null)

  render(<CloneQuestionsModal hideModal={mockHideModal} />)
}

describe('CloneQuestionsModal', () => {
  it('passes properties', () => {
    const context = {}

    arrangeTest()

    expect(MockCloneQuestionsForm).toHaveBeenCalledWith(
      { hideModal: mockHideModal },
      context
    )
  })
})
