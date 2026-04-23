import React from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import ЕditContacts from './EditContacts'
import { Props } from './ContactItem'
import { contactData } from './data/mocks'

jest.mock('./ContactItem', () => ({
  __esModule: true,
  default: ({ contact }: Props) => <div>{contact.node.fullName}</div>
}))

const operationMock = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ЕditContacts
        jobId='some-id'
        clientId='some-id'
        contacts={[contactData]}
        createOperation={operationMock}
      />
    </TestWrapper>
  )

describe('ЕditContacts', () => {
  it('renders contact list', () => {
    const { getByText } = arrangeTest()

    expect(getByText(contactData.node.fullName)).toBeInTheDocument()
  })
})
