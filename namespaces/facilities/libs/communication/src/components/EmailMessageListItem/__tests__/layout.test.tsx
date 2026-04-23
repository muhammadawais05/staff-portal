import React from 'react'
import { render, screen } from '@testing-library/react'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import EmailMessageListItem from '../EmailMessageListItem'
import { EmailContact, EmailMessageWithUsers } from '../../../types'

jest.mock('../components/EmailAddressSection', () => ({
  __esModule: true,
  default: () => <>EmailAddressSection</>
}))

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateTimeFormatter: () => (date: string) => date
}))

const arrangeTest = ({
  isLatest,
  title = 'Email Message Title'
}: {
  isLatest: boolean
  title?: string
}) => {
  const roleId = encodeEntityId('123', 'Talent')

  const emailMessageWithUsersMock = {
    fromWithUser: {
      email: 'test@test.com',
      blacklisted: false
    } as EmailContact,
    toWithUsers: [],
    categories: [],
    sentAt: '01.01.2020',
    body: 'Hello World'
  } as unknown as EmailMessageWithUsers

  render(
    <TestWrapper>
      <EmailMessageListItem
        title={title}
        path='/test/path'
        removeReplies={false}
        isLatest={isLatest}
        roleId={roleId}
        emailMessageWithUsers={emailMessageWithUsersMock}
      />
    </TestWrapper>
  )
}

describe('EmailMessageListItem layouts', () => {
  it('is Latest template', () => {
    arrangeTest({ isLatest: true })

    expect(screen.queryByText('See All')).toBeInTheDocument()
    expect(screen.queryByText('Date sent')).toBeInTheDocument()
    expect(screen.queryByText('01.01.2020')).toBeInTheDocument()

    expect(screen.queryByText('Categories')).not.toBeInTheDocument()
  })

  it('is Default template', () => {
    arrangeTest({ isLatest: false })

    expect(screen.queryByText('Categories')).toBeInTheDocument()

    expect(screen.queryByText('See All')).not.toBeInTheDocument()
    expect(screen.queryByText('Date sent')).not.toBeInTheDocument()
  })

  it('is Email without subject', () => {
    arrangeTest({ isLatest: false, title: '' })

    expect(screen.queryByText('(no subject)')).toBeInTheDocument()
  })
})
