import React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import SendEmailModalContent from '../index'
import { createEmailContextMock } from '../../../data/get-email-context/mocks'
import { EmailContext } from '../../../types'
import EmailBodyField from '../../EmailBodyField'
import EmailTemplatesField from '../../EmailTemplatesField'
import SubjectField from '../../SubjectField'

const arrangeTest = ({
  emailContext,
  preselectedEmailTemplateId,
  mocks
}: {
  emailContext: EmailContext
  preselectedEmailTemplateId?: string
  mocks?: MockedResponse[]
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <SendEmailModalContent
        preselectedEmailTemplateId={preselectedEmailTemplateId}
        emailContext={emailContext}
        hideModal={() => {}}
      >
        <EmailTemplatesField />
        <SubjectField />
        <EmailBodyField />
      </SendEmailModalContent>
    </TestWrapperWithMocks>
  )

describe('SendEmailModal', () => {
  describe('when template identifier is initially provided', () => {
    it('shows the form with preselected template; subject and body fields correspond to the selected template', async () => {
      const TEMPLATE_ID = 'abc123'
      const TEMPLATE_NAME = 'Template Name apo72a'
      const TEMPLATE_SUBJECT = 'Template Title acj812'
      const TEMPLATE_BODY = 'Template Body as876d'

      const emailContextMock = createEmailContextMock({
        emailMessaging: {
          emailTemplates: {
            edges: [
              {
                node: {
                  id: 'abc456',
                  name: 'test'
                },
                rendered: {
                  subject: 'test',
                  body: 'test'
                }
              },
              {
                node: {
                  id: TEMPLATE_ID,
                  name: TEMPLATE_NAME
                },
                rendered: {
                  subject: TEMPLATE_SUBJECT,
                  body: TEMPLATE_BODY
                }
              }
            ]
          }
        }
      })

      arrangeTest({
        emailContext: emailContextMock,
        preselectedEmailTemplateId: TEMPLATE_ID
      })

      const templateField = screen.getByLabelText(/Email template/i)

      expect(templateField).toHaveValue(TEMPLATE_NAME)

      const subjectField = screen.getByLabelText(/Subject/i)

      expect(subjectField).toHaveValue(TEMPLATE_SUBJECT)

      const bodyField = screen.getByLabelText(/Body/i)

      expect(bodyField).toHaveValue(TEMPLATE_BODY)
    })
  })

  describe('when template identifier is not initially provided', () => {
    it('shows the form with empty template, subject and body fields', async () => {
      const emailContextMock = createEmailContextMock({
        emailMessaging: {
          renderedBlankEmailTemplate: {
            subject: '',
            body: ''
          },
          emailTemplates: {
            edges: [
              {
                node: {
                  id: 'abc456',
                  name: 'test'
                },
                rendered: {
                  subject: 'test',
                  body: 'test'
                }
              }
            ]
          }
        }
      })

      arrangeTest({ emailContext: emailContextMock })

      const templateField = screen.getByLabelText(/Email template/i)

      expect(templateField).toHaveValue('')

      const subjectField = screen.getByLabelText(/Subject/i)

      expect(subjectField).toHaveValue('')

      const bodyField = screen.getByLabelText(/Body/i)

      expect(bodyField).toHaveValue('')
    })
  })
})
