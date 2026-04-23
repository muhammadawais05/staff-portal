import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import {
  createGetRoleEmailEditPreviewFailedMock,
  createGetRoleEmailEditPreviewMock
} from '../../RoleEmailPreview/data/get-role-email-edit-preview/mocks'
import { createEmailContextMock } from '../../../data/get-email-context/mocks'
import SendEmailModalContent from '../index'
import EmailBodyField from '../../EmailBodyField'

describe('Send Email form (email preview)', () => {
  it('should fetch the email preview for edited email body', async () => {
    const ENTITY_ID = '123123'
    const ROLE_TYPE = 'Staff'
    const ROLE_ID = encodeEntityId(ENTITY_ID, ROLE_TYPE)

    const BODY = 'test body (xjc782)'
    const BODY_PREVIEW = 'test body preview (apc83s)'

    const getEmailPreviewMock = createGetRoleEmailEditPreviewMock(
      { body: BODY, id: ROLE_ID },
      BODY_PREVIEW
    )

    render(
      <TestWrapperWithMocks mocks={[getEmailPreviewMock]}>
        <SendEmailModalContent
          emailContext={createEmailContextMock({
            emailMessaging: { defaultSendTo: { id: ROLE_ID } }
          })}
          hideModal={() => {}}
        >
          <EmailBodyField />
        </SendEmailModalContent>
      </TestWrapperWithMocks>
    )

    const bodyField = screen.getByLabelText(/Body/, { selector: 'textarea' })

    fireEvent.change(bodyField, { target: { value: BODY } })

    expect(bodyField).toHaveValue(BODY)

    fireEvent.click(screen.getByText('Preview'))

    expect(await screen.findByText(BODY_PREVIEW)).toBeInTheDocument()
  })

  it('should show error if the email preview fetching fails', async () => {
    const ENTITY_ID = '456456'
    const ROLE_TYPE = 'Staff'
    const ROLE_ID = encodeEntityId(ENTITY_ID, ROLE_TYPE)

    const BODY = 'test body (fkos63)'

    const getEmailPreviewMock = createGetRoleEmailEditPreviewFailedMock({
      body: BODY,
      id: ROLE_ID
    })

    render(
      <TestWrapperWithMocks mocks={[getEmailPreviewMock]}>
        <SendEmailModalContent
          emailContext={createEmailContextMock({})}
          hideModal={() => {}}
        >
          <EmailBodyField />
        </SendEmailModalContent>
      </TestWrapperWithMocks>
    )

    const bodyField = screen.getByLabelText(/Body/)

    fireEvent.change(bodyField, { target: { value: BODY } })
    fireEvent.click(screen.getByText('Preview'))

    expect(
      await screen.findByText('Unable to get email preview.')
    ).toBeInTheDocument()
  })
})
