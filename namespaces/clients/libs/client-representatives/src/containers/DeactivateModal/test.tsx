import { render, screen, act } from '@toptal/picasso/test-utils'
import React from 'react'
import { fireEvent } from '@testing-library/react'
import { CompanyRepresentativeCommunicationOption as CommunicationOption } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { useDeactivateCompanyRepresentative } from './data/deactivate-company-representative/deactivate-company-representative.staff.gql'
import DeactivateModal, { Props } from './DeactivateModal'

const onCloseMock = jest.fn()

const mockDeactivateCompanyRepresentative = jest.fn()

jest.mock(
  './data/deactivate-company-representative/deactivate-company-representative.staff.gql',
  () => ({
    useDeactivateCompanyRepresentative: () => [
      mockDeactivateCompanyRepresentative,
      { loading: false }
    ]
  })
)

const arrangeTest = (disabledCommunicationOptions?: CommunicationOption[]) => {
  mockDeactivateCompanyRepresentative.mockReturnValue(
    Promise.resolve({
      data: { deactivateCompanyRepresentative: { success: true } }
    })
  )

  const defaultProps: Props = {
    hideModal: onCloseMock,
    contact: {
      id: 'representative-id',
      fullName: 'Janet Jackson',
      // todo: remove type cast after https://github.com/toptal/platform/pull/53002 merge
      disabledCommunicationOptions:
        disabledCommunicationOptions as CommunicationOption[],
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
      <DeactivateModal {...defaultProps} />
    </TestWrapper>
  )
}

type DeactivateVariables = Parameters<
  ReturnType<typeof useDeactivateCompanyRepresentative>[0]
>[0]

describe('DeactivateModal', () => {
  it('renders info for disabledCommunicationOptions', () => {
    arrangeTest([
      CommunicationOption.NOTIFY_TALENT_RECOMMENDATIONS,
      CommunicationOption.NOTIFY_OTHER
    ])

    expect(
      screen.getByText(/You are deleting the only contact/)
    ).toBeInTheDocument()
  })

  it('does not render info for empty disabledCommunicationOptions', () => {
    arrangeTest()

    expect(
      screen.queryByText(
        /You are deleting the only contact associated with the following actions: Send Talent Recommendation Emails, Send Other Company Emails./
      )
    ).not.toBeInTheDocument()
  })

  it('calls onClose on cancel click', () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Cancel'))

    expect(onCloseMock).toHaveBeenCalled()
  })

  it('calls the mutation with the correct variables on Delete click', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText('Delete'))

    await act(() => Promise.resolve())

    const expectedVariables: DeactivateVariables = {
      variables: {
        companyRepresentativeId: 'representative-id'
      }
    }

    expect(mockDeactivateCompanyRepresentative).toHaveBeenCalledWith(
      expectedVariables
    )

    expect(
      screen.getByText(
        /The Contact account for Janet Jackson was successfully deleted./
      )
    ).toBeInTheDocument()
  })
})
