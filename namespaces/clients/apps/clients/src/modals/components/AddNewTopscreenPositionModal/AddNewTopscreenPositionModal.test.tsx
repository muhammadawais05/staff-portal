import React from 'react'
import { cleanup, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetOperation } from '@staff-portal/operations'

import AddNewTopscreenPositionForm from './components/AddNewTopscreenPositionForm'
import AddNewTopscreenPositionModal from '.'

jest.mock('@staff-portal/operations', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/operations'),
  useGetOperation: jest.fn()
}))
jest.mock('./components/AddNewTopscreenPositionForm')

const mockAddNewTopscreenPositionForm = AddNewTopscreenPositionForm as jest.Mock
const useGetOperationMock = useGetOperation as jest.Mock
const hideModal = jest.fn()

describe('AddNewTopscreenPositionModal', () => {
  beforeEach(() => {
    mockAddNewTopscreenPositionForm.mockReturnValue(null)
    useGetOperationMock.mockReturnValue({ enabled: true, loading: false })
  })

  afterEach(cleanup)

  it('renders content', () => {
    render(
      <TestWrapper>
        <AddNewTopscreenPositionModal
          topscreenClientId='111-222'
          hideModal={hideModal}
        />
      </TestWrapper>
    )

    expect(mockAddNewTopscreenPositionForm).toHaveBeenCalledTimes(1)
  })
})
