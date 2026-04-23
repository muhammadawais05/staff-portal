import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createUsersByEmailsMock } from '@staff-portal/communication/src/mocks'

import { createEmailContextMock } from '../../../data/get-email-context/mocks'
import SendEmailModalContent from '../index'
import { EmailContext } from '../../../types'
import LatestEmailMessageSection from '../../LatestEmailMessageSection'
import {
  createGetLatestEmailMessageMock,
  createGetLatestEmailMessageEmptyMock
} from '../../LatestEmailMessageSection/data/get-latest-email-message/mocks'

jest.mock('../../LatestEmailMessage', () => ({
  __esModule: true,
  default: () => <div data-testid='latest-email-message' />
}))

const arrangeTest = ({
  emailContext,
  mocks
}: {
  emailContext: EmailContext
  mocks: MockedResponse[]
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <SendEmailModalContent emailContext={emailContext} hideModal={() => {}}>
        <LatestEmailMessageSection />
      </SendEmailModalContent>
    </TestWrapperWithMocks>
  )

describe('Send Email modal (show latest email)', () => {
  describe('when there is at least one email for user', () => {
    it('displays and hides latest email when clicking on the toggle text', async () => {
      const OTHER_EMAIL = 'janedoe@toptal.com'
      const LATEST_EMAIL_BODY = 'some random body for the email'
      const RECIPIENT_NAME = 'John Doe Role (42g3)'
      const RECIPIENT_EMAIL = 'johndoe-role-wf839@toptal.com'

      const emailContextMock = createEmailContextMock({
        emailMessaging: {
          fullName: RECIPIENT_NAME,
          optionsSendTo: {
            nodes: [
              {
                id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIyMjE0MTk',
                fullName: RECIPIENT_NAME,
                email: RECIPIENT_EMAIL,
                contacts: {
                  nodes: [
                    {
                      id: 'VjEtQ29udGFjdC0yNjA4MTc0',
                      value: RECIPIENT_EMAIL
                    }
                  ]
                },
                __typename: 'CompanyRepresentative'
              }
            ]
          }
        }
      })
      const getLatestEmailMessageMock = createGetLatestEmailMessageMock({
        emails: [RECIPIENT_EMAIL],
        body: LATEST_EMAIL_BODY,
        fromEmail: OTHER_EMAIL,
        toEmail: RECIPIENT_EMAIL
      })
      const usersByEmailsMock = createUsersByEmailsMock(
        [OTHER_EMAIL, RECIPIENT_EMAIL],
        []
      )

      arrangeTest({
        emailContext: emailContextMock,
        mocks: [getLatestEmailMessageMock, usersByEmailsMock]
      })

      fireEvent.click(
        await screen.findByText(`Show Latest Email with ${RECIPIENT_NAME}`)
      )

      const latestEmailMessage = await screen.findByTestId(
        'latest-email-message'
      )

      expect(latestEmailMessage).toBeInTheDocument()

      fireEvent.click(
        screen.getByText(`Hide Latest Email with ${RECIPIENT_NAME}`)
      )

      expect(latestEmailMessage).not.toBeInTheDocument()
    })
  })

  describe('when there are no emails for user', () => {
    it('the latest email link is not displayed', async () => {
      const RECIPIENT_NAME = 'John Doe Role (42g3)'
      const RECIPIENT_EMAIL = 'johndoe-role-wf839@toptal.com'

      const emailContextMock = createEmailContextMock({
        emailMessaging: {
          fullName: RECIPIENT_NAME,
          optionsSendTo: {
            nodes: [
              {
                id: 'VjEtQ29tcGFueVJlcHJlc2VudGF0aXZlLTIyMjE0MTk',
                fullName: RECIPIENT_NAME,
                email: RECIPIENT_EMAIL,
                contacts: {
                  nodes: [
                    {
                      id: 'VjEtQ29udGFjdC0yNjA4MTc0',
                      value: RECIPIENT_EMAIL
                    }
                  ]
                },
                __typename: 'CompanyRepresentative'
              }
            ]
          }
        }
      })
      const getLatestEmailMessageEmptyMock =
        createGetLatestEmailMessageEmptyMock({
          emails: [RECIPIENT_EMAIL]
        })

      arrangeTest({
        emailContext: emailContextMock,
        mocks: [getLatestEmailMessageEmptyMock]
      })

      expect(screen.queryByText(/Show Latest Email/)).not.toBeInTheDocument()
    })
  })

  // eslint-disable-next-line jest/no-commented-out-tests
  /*
  // @TODO: uncomment these tests when this ticket is done: https://toptal-core.atlassian.net/browse/SP-591
  test('should show error notification when unable to fetch users by ids', async () => {
    const COMPANY_ID = 123
    const FROM_EMAIL = 'johndoe@toptal.com'
    const TO_EMAIL = 'janedoe@toptal.com'
    const FROM_NAME = 'John Doe'
    const BODY = 'some random body for the email'

    const getEmailAddressesByRoleIdsMock = createGetEmailAddressesByRoleIdsMock(
      {
        roleId: COMPANY_ID,
        emailAddress: FROM_EMAIL
      }
    )
    const getLatestEmailMessageMock = createGetLatestEmailMessageMock({
      emails: [FROM_EMAIL],
      body: BODY,
      fromEmail: FROM_EMAIL,
      toEmail: TO_EMAIL
    })
    const usersByEmailsErrorMock = createUsersByEmailsErrorMock(
      [FROM_EMAIL, TO_EMAIL]
    )

    const { findByText } = arrangeTest(
      [
        getEmailAddressesByRoleIdsMock,
        getLatestEmailMessageMock,
        usersByEmailsErrorMock
      ],
      { companyId: COMPANY_ID }
    )

    fireEvent.click(await findByText(/Show Latest Email/))

    expect(
      await findByText('Unable to fetch latest email message.')
    ).toBeInTheDocument()

  })

  test('should show error notification when unable to fetch email address by role', async () => {
    const COMPANY_ID = 123

    const getEmailAddressesByRoleIdsErrorMock = createGetEmailAddressesByRoleIdsErrorMock(
      COMPANY_ID
    )
    const { findByText } = arrangeTest([getEmailAddressesByRoleIdsErrorMock], {
      companyId: COMPANY_ID
    })

    fireEvent.click(await findByText(/Show Latest Email/))

    expect(
      await findByText('Unable to fetch latest email message.')
    ).toBeInTheDocument()
  })

  test('should show error notification when unable to fetch latest email', async () => {
    const COMPANY_ID = 123
    const EMAIL_ADDRESS = 'blah@toptal.com'

    const getEmailAddressesByRoleIdsMock = createGetEmailAddressesByRoleIdsMock(
      {
        roleId: COMPANY_ID,
        emailAddress: EMAIL_ADDRESS
      }
    )
    const getLatestEmailMessageErrorMock = createGetLatestEmailMessageErrorMock(
      EMAIL_ADDRESS
    )

    const { findByText } = arrangeTest(
      [getEmailAddressesByRoleIdsMock, getLatestEmailMessageErrorMock],
      { companyId: COMPANY_ID }
    )

    fireEvent.click(await findByText(/Show Latest Email/))

    expect(
      await findByText('Unable to fetch latest email message.')
    ).toBeInTheDocument()
  })
  */
})
