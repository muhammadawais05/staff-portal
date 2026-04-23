import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { Timeline } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import { EntryTypeNames } from '../../types'
import CommunicationRecord, { Props } from './CommunicationRecord'

jest.mock('@toptal/picasso/Icon', () => {
  const actualPicassoIcon = jest.requireActual('@toptal/picasso/Icon')

  return {
    __esModule: true,
    ...actualPicassoIcon,
    Email16: () => <span data-testid='svg-email-16' />
  }
})

jest.mock('@staff-portal/chronicles', () => ({
  ...jest.requireActual('@staff-portal/chronicles')
}))

const date = '2020-07-23T20:31:19.768Z'
const communicationEntity = {
  id: '11',
  __typename: 'EmailMessage' as const,
  categories: [],
  sentAt: '',
  subject: 'Email Subject',
  body:
    'Only after disaster can we be resurrected.' +
    "It's only after you've lost everything that you're" +
    'free to do anything. Nothing is static, everything' +
    'is evolving, everything is falling apart.',
  from: {
    __typename: 'EmailAddress' as const,
    email: 'from@email.com',
    blacklisted: false
  },
  fromUser: {
    email: 'from@email.com',
    fullName: 'The Narrator',
    webResource: {
      url: 'https://en.wikipedia.org/wiki/The_Narrator_(Fight_Club)'
    }
  },
  to: [
    {
      __typename: 'EmailAddress' as const,
      email: 'first-to@email.com',
      blacklisted: false
    },
    {
      __typename: 'EmailAddress' as const,
      email: 'second-to@email.com',
      blacklisted: false
    }
  ],
  toUsers: [
    {
      id: '123',
      email: 'first-to@email.com',
      fullName: 'Captain Jack Sparrow',
      webResource: {
        url: 'https://www.facebook.com/CaptainJackSparrow/'
      }
    },
    {
      id: '456',
      email: 'second-to@email.com',
      fullName: 'Tyler Durden'
    }
  ]
}

const communicationRecordProps = {
  entry: {
    type: EntryTypeNames.Communication,
    id: '1',
    date,
    entity: communicationEntity
  },
  onExpandClick: () => {}
}

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <Timeline>
        <CommunicationRecord {...props} />
      </Timeline>
    </TestWrapper>
  )

describe('CommunicationRecord', () => {
  it('renders HistoryEntryRow', () => {
    const props = {
      ...communicationRecordProps,
      expanded: true,
      hasConnector: true
    }

    arrangeTest(props)

    expect(
      within(screen.getByTestId('entry-row-1')).getByTestId('svg-email-16')
    ).toBeInTheDocument()
    expect(screen.getByTestId('expandable-content-details')).toHaveTextContent(
      `${communicationEntity.fromUser.fullName} to ${communicationEntity.toUsers[0].fullName}, ${communicationEntity.toUsers[1].email}`
    )
    expect(screen.getByTestId('expandable-content-text')).toHaveTextContent(
      communicationEntity.subject
    )
    expect(screen.getByTestId('expandable-content-text')).toHaveTextContent(
      communicationEntity.body
    )
  })
})
