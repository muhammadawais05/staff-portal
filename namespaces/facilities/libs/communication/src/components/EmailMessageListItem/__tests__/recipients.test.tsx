import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { assertOnTooltip, TestWrapperWithMocks } from '@staff-portal/test-utils'

import EmailMessageListItem, { Props } from '../EmailMessageListItem'
import { createEmailMessageWithUsersMock } from '../mocks'

jest.mock('../utils', () => ({
  buildRoleEmailMessagesPath: () => '#'
}))

jest.mock('@staff-portal/config', () => ({
  ...jest.requireActual('@staff-portal/config'),
  PLATFORM_API_URL: 'https://staging.toptal.net'
}))

const arrangeTest = async ({
  mocks,
  props
}: {
  mocks?: MockedResponse[]
  props: Props
}) => {
  render(
    <MemoryRouter>
      <TestWrapperWithMocks mocks={mocks}>
        <EmailMessageListItem {...props} />
      </TestWrapperWithMocks>
    </MemoryRouter>
  )
}

describe('EmailMessageListItem recipients', () => {
  it('should display tooltip with all the emails addresses for a specific user', async () => {
    const toUserId = '123'
    const toEmailAddress1 = 'TEST_EMAIL_1'
    const toEmailAddress2 = 'TEST_EMAIL_2'
    const toName = 'TEST_NAME'

    arrangeTest({
      props: {
        emailMessageWithUsers: createEmailMessageWithUsersMock({
          toWithUsers: [
            {
              __typename: 'EmailAddress',
              id: toUserId,
              email: toEmailAddress1,
              name: toName,
              path: '/test_path',
              blacklisted: false
            },
            {
              __typename: 'EmailAddress',
              id: toUserId,
              email: toEmailAddress2,
              name: toName,
              path: '/test_path2',
              blacklisted: false
            }
          ]
        })
      }
    })

    assertOnTooltip(screen.getByText(toName), tooltip => {
      expect(tooltip).toHaveTextContent(toEmailAddress1)
      expect(tooltip).toHaveTextContent(toEmailAddress2)
    })
  })

  it('should toggle visibility when total is more than 5', async () => {
    const toEmail1 = 'TEST_EMAIL_1'
    const toEmail2 = 'TEST_EMAIL_2'
    const toEmail3 = 'TEST_EMAIL_3'
    const toEmail4 = 'TEST_EMAIL_4'
    const toEmail5 = 'TEST_EMAIL_5'
    const toEmail6 = 'TEST_EMAIL_6'

    arrangeTest({
      props: {
        emailMessageWithUsers: createEmailMessageWithUsersMock({
          toWithUsers: [
            {
              __typename: 'EmailAddress',
              email: toEmail1,
              blacklisted: false
            },
            {
              __typename: 'EmailAddress',
              email: toEmail2,
              blacklisted: false
            },
            {
              __typename: 'EmailAddress',
              email: toEmail3,
              blacklisted: false
            },
            {
              __typename: 'EmailAddress',
              email: toEmail4,
              blacklisted: false
            },
            {
              __typename: 'EmailAddress',
              email: toEmail5,
              blacklisted: false
            },
            {
              __typename: 'EmailAddress',
              email: toEmail6,
              blacklisted: false
            }
          ]
        })
      }
    })

    expect(screen.getByText(toEmail1)).toBeInTheDocument()
    expect(screen.getByText(toEmail2)).toBeInTheDocument()
    expect(screen.getByText(toEmail3)).toBeInTheDocument()
    expect(screen.getByText(toEmail4)).toBeInTheDocument()
    expect(screen.getByText(toEmail5)).toBeInTheDocument()
    expect(screen.queryByText(toEmail6)).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('and 1 more'))

    expect(screen.getByText(toEmail1)).toBeInTheDocument()
    expect(screen.getByText(toEmail2)).toBeInTheDocument()
    expect(screen.getByText(toEmail3)).toBeInTheDocument()
    expect(screen.getByText(toEmail4)).toBeInTheDocument()
    expect(screen.getByText(toEmail5)).toBeInTheDocument()
    expect(screen.getByText(toEmail6)).toBeInTheDocument()
  })
})
