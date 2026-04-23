import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createEmailContextMock } from '../../../data/get-email-context/mocks'
import SendEmailModalContent from '../index'
import EmailBodyField from '../../EmailBodyField'

describe('Send Email form blank template', () => {
  it('when form is rendered, it should display the blank template in body field', async () => {
    const BLANK_TEMPLATE = 'blank template body (asic8a)'

    const emailContext = createEmailContextMock({
      emailMessaging: {
        renderedBlankEmailTemplate: {
          subject: 'test',
          body: BLANK_TEMPLATE
        }
      }
    })

    render(
      <TestWrapperWithMocks>
        <SendEmailModalContent emailContext={emailContext} hideModal={() => {}}>
          <EmailBodyField />
        </SendEmailModalContent>
      </TestWrapperWithMocks>
    )

    expect(await screen.findByDisplayValue(BLANK_TEMPLATE)).toBeInTheDocument()
  })

  it('should show body field empty when no blank email template is available for user', async () => {
    render(
      <TestWrapperWithMocks>
        <SendEmailModalContent
          emailContext={createEmailContextMock({
            emailMessaging: {
              renderedBlankEmailTemplate: undefined
            }
          })}
          hideModal={() => {}}
        >
          <EmailBodyField />
        </SendEmailModalContent>
      </TestWrapperWithMocks>
    )

    expect(screen.getByLabelText(/Body/)).toHaveValue('')
  })
})
