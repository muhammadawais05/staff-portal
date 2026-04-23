import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createUserQueryOperationsMock } from '@staff-portal/operations/src/mocks'

import AddNewQuestionButton from './AddNewQuestionButton'

const arrangeTest = async (
  callable: OperationCallableTypes = OperationCallableTypes.ENABLED
) => {
  return render(
    <TestWrapperWithMocks mocks={[createUserQueryOperationsMock(callable)]}>
      <AddNewQuestionButton />
    </TestWrapperWithMocks>
  )
}

describe('AddNewQuestionButton', () => {
  describe('when operation is enabled', () => {
    it('shows delete button', async () => {
      arrangeTest()

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Add New Question' })
        ).toBeInTheDocument()
      })
    })
  })

  describe('when operation is hidden', () => {
    it('hides delete button', async () => {
      arrangeTest(OperationCallableTypes.HIDDEN)

      await waitFor(() => {
        expect(
          screen.queryByRole('button', { name: 'Add New Question' })
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('when operation is disabled', () => {
    it('disables delete button', async () => {
      arrangeTest(OperationCallableTypes.DISABLED)

      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: 'Add New Question' })
        ).toBeDisabled()
      })
    })
  })

  describe('when operations are loading', () => {
    it('shows the loader', () => {
      arrangeTest()

      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })
})
