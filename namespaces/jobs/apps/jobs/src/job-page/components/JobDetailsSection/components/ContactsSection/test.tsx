import React from 'react'
import { screen, render } from '@testing-library/react'
import {
  OperationCallableTypes,
  ContactType
} from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import ContactsSection from './ContactsSection'

jest.mock('@staff-portal/engagements')
jest.mock('@staff-portal/data-layer-service')
jest.mock('./EditContacts', () => ({
  __esModule: true,
  default: () => <div />
}))

const mockContact = {
  id: 'someid',
  fullName: 'John Doe',
  phoneNumber: '+790000000',
  email: 'john@gmail.com',
  timeZone: {
    name: '(UTC+05:00) Asia - Dushanbe',
    value: 'Asia/Dushanbe'
  },
  contacts: {
    nodes: [
      {
        id: 'test-id',
        primary: true,
        type: ContactType.PHONE,
        value: 'test-value'
      }
    ]
  }
}

jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  PhoneLink: () => <div>{mockContact.phoneNumber}</div>
}))

const mockUseGetNode = useGetNode as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ContactsSection jobId='111' />
    </TestWrapper>
  )

describe('contacts section', () => {
  beforeEach(() => {
    mockUseGetNode.mockReturnValue(() => ({
      data: {
        operations: {
          removeJobContact: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          },
          createJobContactFromJob: {
            callable: OperationCallableTypes.ENABLED,
            messages: []
          }
        },
        contacts: {
          nodes: []
        },
        client: {
          contact: mockContact
        }
      }
    }))
    arrangeTest()
  })

  it('shows job contacts field', () => {
    const jobContactsSection = screen.getByTestId('job-contacts-section')

    expect(jobContactsSection).toBeInTheDocument()
    expect(jobContactsSection).toHaveTextContent(mockContact.fullName)
    expect(jobContactsSection).toHaveTextContent(mockContact.phoneNumber)
    expect(jobContactsSection).toHaveTextContent(mockContact.email)
    expect(jobContactsSection).toHaveTextContent(
      `${mockContact.timeZone.name}, now`
    )
  })
})
