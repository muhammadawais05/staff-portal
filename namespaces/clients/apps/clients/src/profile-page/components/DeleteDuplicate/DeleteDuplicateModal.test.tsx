import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DeleteDuplicateModal from '.'

jest.mock('./hooks', () => ({
  useDeleteDuplicateSubmit: () => ({
    loading: false,
    handleSubmit: () => {}
  })
}))

describe('DeleteDuplicateModal', () => {
  it('default render', () => {
    render(
      <TestWrapper>
        <DeleteDuplicateModal
          fullName='Boyle-Thiel VE'
          companyId='VjEtQ2xpZW50LTUyMzc2NQ'
          hideModal={() => null}
        />
      </TestWrapper>
    )

    expect(
      screen.getByText('Delete Duplicate: Boyle-Thiel VE')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Transfer Jobs')).toBeChecked()
    expect(screen.getByTestId('DeleteDuplicateModal-submit')).toHaveTextContent(
      'Delete'
    )
  })
})
