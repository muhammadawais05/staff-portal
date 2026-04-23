import React from 'react'
import { render, screen } from '@testing-library/react'
import { OfacStatus } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { EmailContext } from '../../types'
import { createEmailContextMock } from '../../data/get-email-context/mocks'
import SendEmailModalContent from '../SendEmailModalContent'
import OfacStatusNotification from './OfacStatusNotification'

const arrangeTest = (recipient: EmailContext) =>
  render(
    <TestWrapperWithMocks>
      <SendEmailModalContent emailContext={recipient} hideModal={() => {}}>
        <OfacStatusNotification />
      </SendEmailModalContent>
    </TestWrapperWithMocks>
  )

describe('OFAC Status Notification', () => {
  it('should show notification for any status', async () => {
    const OFAC_STATUS = {
      value: OfacStatus.INVESTIGATION,
      text: 'investigation'
    }

    const recipientMock = createEmailContextMock({
      emailMessaging: {
        ofacStatus: OFAC_STATUS.value
      }
    })

    arrangeTest(recipientMock)

    expect(
      screen.getByText(
        `${recipientMock.fullName} is in the "${OFAC_STATUS.text}" OFAC status - communication with them should be avoided except the communication required for the OFAC investigation.`
      )
    ).toBeInTheDocument()
  })
})
