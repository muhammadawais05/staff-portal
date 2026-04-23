import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { AutocompleteModels } from '@staff-portal/graphql/staff'
import {
  encodeEntityId,
  MockedResponse
} from '@staff-portal/data-layer-service'

import { createGetUserAutocompleteMock } from '../CCAdditionalField/data/get-user-autocomplete/mocks'
import { EmailContext } from '../../types'
import SendEmailModalContent from './SendEmailModalContent'
import {
  createSendEmailFailedMock,
  createSendEmailMock
} from '../SendEmailModal/data/send-email/mocks'
import {
  createEmailContextMock,
  createGetEmailContextMock
} from '../../data/get-email-context/mocks'
import CCSuggestedField from '../CCSuggestedField'
import CCAdditionalField from '../CCAdditionalField'
import SubjectField from '../SubjectField'
import EmailBodyField from '../EmailBodyField'

jest.mock('../SendEmailScheduledSubmitButton', () => ({
  __esModule: true,
  default: () => <>Mock Send Email Scheduled Submit Button</>
}))

const arrangeTest = ({
  mocks,
  emailContext,
  scheduledSend,
  handleSubmit = () => {},
  hideModal = () => {}
}: {
  mocks: MockedResponse[]
  emailContext: EmailContext
  scheduledSend?: boolean
  handleSubmit?: () => void
  hideModal?: () => void
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <SendEmailModalContent
        handleSubmit={handleSubmit}
        emailContext={emailContext}
        hideModal={hideModal}
        scheduledSend={scheduledSend}
      >
        <SubjectField />
        <CCSuggestedField />
        <CCAdditionalField />
        <EmailBodyField />
      </SendEmailModalContent>
    </TestWrapperWithMocks>
  )

describe('SendEmailModalContent', () => {
  it('should send email', async () => {
    const ENTITY_ROLE = 'Talent'
    const ROLE_ID = encodeEntityId('123', ENTITY_ROLE)
    const BLANK_TEMPLATE_BODY = 'blank template body (vj1)'
    const EMAIL_SUBJECT = 'Test subject (aiw)'
    const EMAIL_BODY = 'Test body (1m5)'
    const CC_SUGGESTED_LABEL_1 = 'Company Representative 1'
    const CC_SUGGESTED_NAME_1 = 'Suggested Name 1'
    const CC_SUGGESTED_EMAIL_1 = 'test1000@example1.com'
    const CC_SUGGESTED_LABEL_2 = 'Company Representative 2'
    const CC_SUGGESTED_NAME_2 = 'Suggested Name 2'
    const CC_SUGGESTED_EMAIL_2 = 'test1000@example2.com'
    const CC_AUTOCOMPLETE_NAME = 'John Doe'
    const CC_AUTOCOMPLETE_EMAIL = 'test1001@example.com'

    const RECIPIENT_NAME = 'Corkery, Renner and Renner (du3)'

    const sendEmailMock = createSendEmailMock({
      title: EMAIL_SUBJECT,
      body: EMAIL_BODY,
      toId: ROLE_ID,
      cc: [CC_SUGGESTED_EMAIL_1, CC_SUGGESTED_EMAIL_2, CC_AUTOCOMPLETE_EMAIL]
    })
    const autocompleteMock = createGetUserAutocompleteMock({
      term: CC_AUTOCOMPLETE_NAME,
      model: AutocompleteModels.ACTIVE_STAFF,
      nodes: [
        {
          fullName: CC_AUTOCOMPLETE_NAME,
          email: CC_AUTOCOMPLETE_EMAIL
        }
      ]
    })

    const getEmailContextMock = createGetEmailContextMock(ROLE_ID)

    const handleSubmit = jest.fn()

    arrangeTest({
      mocks: [
        sendEmailMock,
        autocompleteMock,
        autocompleteMock,
        getEmailContextMock
      ],
      emailContext: createEmailContextMock({
        emailMessaging: {
          defaultSendTo: { id: ROLE_ID },
          fullName: RECIPIENT_NAME,
          emailCarbonCopyOptions: {
            nodes: [
              {
                label: CC_SUGGESTED_LABEL_1,
                default: true,
                role: {
                  id: encodeEntityId('1000', 'Test'),
                  fullName: CC_SUGGESTED_NAME_1,
                  email: CC_SUGGESTED_EMAIL_1
                }
              },
              {
                label: CC_SUGGESTED_LABEL_2,
                default: false,
                role: {
                  id: encodeEntityId('1001', 'Test'),
                  fullName: CC_SUGGESTED_NAME_2,
                  email: CC_SUGGESTED_EMAIL_2
                }
              }
            ]
          },
          renderedBlankEmailTemplate: {
            body: BLANK_TEMPLATE_BODY,
            subject: null
          }
        }
      }),
      handleSubmit
    })

    fireEvent.change(screen.getByLabelText(/Subject/i), {
      target: { value: EMAIL_SUBJECT }
    })

    const secondSuggestedCCOption = screen.getByLabelText(
      `${CC_SUGGESTED_LABEL_2} (${CC_SUGGESTED_NAME_2} <${CC_SUGGESTED_EMAIL_2}>)`
    )

    fireEvent.click(secondSuggestedCCOption)

    const additionalCCAutocompleteInput = screen.getByLabelText(
      /CC Other Staff Member/i
    )

    fireEvent.change(additionalCCAutocompleteInput, {
      target: { value: CC_AUTOCOMPLETE_NAME }
    })

    fireEvent.click(
      await screen.findByText(CC_AUTOCOMPLETE_NAME, undefined, {
        timeout: 1200
      })
    )

    fireEvent.change(screen.getByLabelText(/Body/i), {
      target: { value: EMAIL_BODY }
    })

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /Send/i }))
    })

    expect(handleSubmit).toHaveBeenCalled()
  })

  it('shows general error if sending email fails', async () => {
    const ENTITY_ROLE = 'Staff'
    const ROLE_ID = encodeEntityId('456', ENTITY_ROLE)
    const EMAIL_SUBJECT = 'Test subject (sme)'
    const EMAIL_BODY = 'Test body (oa4)'

    const sendEmailMock = createSendEmailFailedMock({
      title: EMAIL_SUBJECT,
      body: EMAIL_BODY,
      toId: ROLE_ID
    })

    const handleSubmit = jest.fn()

    arrangeTest({
      mocks: [sendEmailMock],
      emailContext: createEmailContextMock({
        emailMessaging: { defaultSendTo: { id: ROLE_ID } }
      }),
      handleSubmit
    })

    fireEvent.change(screen.getByLabelText(/Subject/i), {
      target: { value: EMAIL_SUBJECT }
    })

    fireEvent.change(screen.getByLabelText(/Body/i), {
      target: { value: EMAIL_BODY }
    })

    await waitFor(() => {
      fireEvent.click(screen.getByRole('button', { name: /Send/i }))
    })

    expect(handleSubmit).toHaveBeenCalled()
  })

  it('should require subject and body fields', () => {
    window.Element.prototype.scrollIntoView = jest.fn()

    const sendEmailMock = createSendEmailMock({
      title: 'title',
      body: 'body',
      toId: 'to'
    })

    arrangeTest({
      mocks: [sendEmailMock],
      emailContext: createEmailContextMock({
        emailMessaging: {
          renderedBlankEmailTemplate: { subject: '', body: '' }
        }
      })
    })

    fireEvent.click(screen.getByRole('button', { name: /Send/i }))

    expect(screen.getAllByText('Please complete this field.')).toHaveLength(2)
  })

  describe('when pressing cancel button', () => {
    it('triggers the hide modal function', () => {
      const hideModal = jest.fn()

      const sendEmailMock = createSendEmailMock({
        title: '',
        body: '',
        toId: ''
      })

      arrangeTest({
        mocks: [sendEmailMock],
        emailContext: createEmailContextMock({
          emailMessaging: {
            renderedBlankEmailTemplate: { subject: '', body: '' }
          }
        }),
        hideModal
      })

      fireEvent.click(screen.getByTestId('send-email-modal-cancel-button'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when scheduledSend property is passed', () => {
    it('renders send email scheduled submit button', () => {
      arrangeTest({
        mocks: [],
        emailContext: createEmailContextMock({
          emailMessaging: {
            renderedBlankEmailTemplate: { subject: '', body: '' }
          }
        }),
        scheduledSend: true
      })

      expect(
        screen.getByText('Mock Send Email Scheduled Submit Button')
      ).toBeInTheDocument()
    })
  })
})
