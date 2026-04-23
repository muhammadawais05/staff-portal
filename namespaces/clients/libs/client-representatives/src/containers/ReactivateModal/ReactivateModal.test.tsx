import { render, screen, act } from '@toptal/picasso/test-utils'
import React from 'react'
import { fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useReactivateCompanyRepresentative } from './data/reactivate-company-representative/reactivate-company-representative.staff.gql'
import ReactivateModal, { Props } from './ReactivateModal'

const onCloseMock = jest.fn()

const mockReactivateCompanyRepresentative = jest.fn()

jest.mock(
  './data/reactivate-company-representative/reactivate-company-representative.staff.gql',
  () => ({
    useReactivateCompanyRepresentative: () => [
      mockReactivateCompanyRepresentative,
      { loading: false }
    ]
  })
)

const arrangeTest = () => {
  mockReactivateCompanyRepresentative.mockReturnValue(
    Promise.resolve({
      data: { reactivateCompanyRepresentative: { success: true } }
    })
  )

  const defaultProps: Props = {
    hideModal: onCloseMock,
    contact: {
      id: 'representative-id',
      fullName: 'Janet Jackson',
      client: {
        id: 'client-id',
        __typename: 'Client',
        webResource: {
          __typename: 'Link',
          text: 'Great Company'
        }
      }
    }
  }

  render(
    <TestWrapper>
      <ReactivateModal {...defaultProps} />
    </TestWrapper>
  )
}

type ReactivateVariables = Parameters<
  ReturnType<typeof useReactivateCompanyRepresentative>[0]
>[0]

describe('ReactivateModal', () => {
  it('calls onClose on cancel click', () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Cancel'))

    expect(onCloseMock).toHaveBeenCalled()
  })

  it('calls the mutation with the correct variables on Restore click', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Restore'))

    await act(() => Promise.resolve())

    const expectedVariables: ReactivateVariables = {
      variables: {
        companyRepresentativeId: 'representative-id'
      }
    }

    expect(mockReactivateCompanyRepresentative).toHaveBeenCalledWith(
      expectedVariables
    )

    expect(
      screen.getByText(
        /The Contact account for Janet Jackson was successfully restored./
      )
    ).toBeInTheDocument()
  })
})
