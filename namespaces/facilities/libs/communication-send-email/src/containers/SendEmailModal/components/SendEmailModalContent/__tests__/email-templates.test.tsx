import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createGetRoleEmailEditPreviewMock } from '../../RoleEmailPreview/data/get-role-email-edit-preview/mocks'
import { createEmailContextMock } from '../../../data/get-email-context/mocks'
import SendEmailModalContent from '../index'
import EmailBodyField from '../../EmailBodyField'
import EmailTemplatesField from '../../EmailTemplatesField'
import SubjectField from '../../SubjectField'

describe('Send Email form templates', () => {
  it('when selected template changes, it should update form subject and body and put email preview in edit mode', async () => {
    const ENTITY_ID = '2983474'
    const ROLE_TYPE = 'Talent'
    const ROLE_ID = encodeEntityId(ENTITY_ID, ROLE_TYPE)

    const TEMPLATE_1_NAME = 'test template 1 name (woef88)'
    const TEMPLATE_1_SUBJECT = 'test template 1 subject (2g98h)'
    const TEMPLATE_1_BODY = 'test template 1 body (a49f8j)'
    const TEMPLATE_1_BODY_PREVIEW = 'test template 1 body preview (go48ht)'

    const TEMPLATE_2_NAME = 'test template 2 name (dfgndt)'
    const TEMPLATE_2_SUBJECT = 'test template 2 subject (aefe5)'
    const TEMPLATE_2_BODY = 'test template 2 body (7j67)'
    const TEMPLATE_2_BODY_PREVIEW = 'test template 2 body preview (sviuhiayr)'

    const BLANK_EMAIL_TEMPLATE_BODY = 'test body blank template (cjchs7)'

    const getEmailTemplate1PreviewMock = createGetRoleEmailEditPreviewMock(
      { body: TEMPLATE_1_BODY, id: ROLE_ID },
      TEMPLATE_1_BODY_PREVIEW
    )

    const getEmailTemplate2PreviewMock = createGetRoleEmailEditPreviewMock(
      { body: TEMPLATE_2_BODY, id: ROLE_ID },
      TEMPLATE_2_BODY_PREVIEW
    )

    const emailContextMock = createEmailContextMock({
      emailMessaging: {
        defaultSendTo: {
          id: ROLE_ID
        },
        emailTemplates: {
          edges: [
            {
              node: {
                id: encodeEntityId('1000', 'Test'),
                name: TEMPLATE_1_NAME
              },
              rendered: {
                subject: TEMPLATE_1_SUBJECT,
                body: TEMPLATE_1_BODY
              }
            },
            {
              node: {
                id: encodeEntityId('1001', 'Test'),
                name: TEMPLATE_2_NAME
              },
              rendered: {
                subject: TEMPLATE_2_SUBJECT,
                body: TEMPLATE_2_BODY
              }
            }
          ]
        },
        renderedBlankEmailTemplate: {
          subject: null,
          body: BLANK_EMAIL_TEMPLATE_BODY
        }
      }
    })

    render(
      <TestWrapperWithMocks
        mocks={[getEmailTemplate1PreviewMock, getEmailTemplate2PreviewMock]}
      >
        <SendEmailModalContent
          emailContext={emailContextMock}
          hideModal={() => {}}
        >
          <EmailTemplatesField />
          <SubjectField />
          <EmailBodyField />
        </SendEmailModalContent>
      </TestWrapperWithMocks>
    )

    const templateField = screen.getByLabelText(/Email template/i)
    const subjectField = screen.getByLabelText(/Subject/)
    let bodyField = screen.getByLabelText(/Body/, { selector: 'textarea' })

    expect(subjectField).toHaveValue('')
    expect(bodyField).toHaveValue(BLANK_EMAIL_TEMPLATE_BODY)

    fireEvent.click(templateField)
    fireEvent.click(screen.getByText(TEMPLATE_1_NAME))

    expect(subjectField).toHaveValue(TEMPLATE_1_SUBJECT)
    expect(bodyField).toHaveValue(TEMPLATE_1_BODY)

    fireEvent.click(screen.getByText('Preview'))

    expect(await screen.findByText(TEMPLATE_1_BODY_PREVIEW)).toBeInTheDocument()

    fireEvent.click(templateField)
    fireEvent.click(screen.getByText(TEMPLATE_2_NAME))

    expect(subjectField).toHaveValue(TEMPLATE_2_SUBJECT)

    bodyField = screen.getByLabelText(/Body/, { selector: 'textarea' })

    expect(bodyField).toHaveValue(TEMPLATE_2_BODY)

    fireEvent.click(screen.getByText('Preview'))

    expect(await screen.findByText(TEMPLATE_2_BODY_PREVIEW)).toBeInTheDocument()
  })

  it('should hide email templates field when no email templates are available for user', async () => {
    render(
      <TestWrapperWithMocks>
        <SendEmailModalContent
          emailContext={createEmailContextMock({
            emailMessaging: {
              emailTemplates: {
                edges: []
              }
            }
          })}
          hideModal={() => {}}
        >
          <div />
        </SendEmailModalContent>
      </TestWrapperWithMocks>
    )

    expect(screen.queryByLabelText(/Email Template/i)).not.toBeInTheDocument()
  })
})
