import React from 'react'
import { render, screen, within, fireEvent } from '@testing-library/react'
import { waitFor } from '@toptal/picasso/test-utils'
import { TaskPriorityLevel } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  TestWrapperWithMocks,
  assertOnTooltipText
} from '@staff-portal/test-utils'

import {
  createPendingCommunicationTaskMock,
  createEmailContextMock,
  createGetEmailContextMock
} from '../../../data/get-email-context/mocks'
import { createSendEmailMock } from '../../SendEmailModal/data/send-email/mocks'
import { EmailContext } from '../../../types'
import SendEmailPendingTasks from '../../SendEmailPendingTasks'
import SendEmailModalContent from '../index'
import EmailBodyField from '../../EmailBodyField'
import SubjectField from '../../SubjectField'

const arrangeTest = ({
  emailContext,
  mocks,
  handleSubmit
}: {
  emailContext: EmailContext
  mocks: MockedResponse[]
  handleSubmit?: () => void
}) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <SendEmailModalContent
        emailContext={emailContext}
        hideModal={() => {}}
        handleSubmit={handleSubmit}
      >
        <SubjectField />
        <EmailBodyField />
        <SendEmailPendingTasks />
      </SendEmailModalContent>
    </TestWrapperWithMocks>
  )

const fillRequiredField = ({
  body,
  subject
}: {
  body: string
  subject: string
}) => {
  fireEvent.change(screen.getByPlaceholderText('Subject'), {
    target: { value: subject }
  })

  fireEvent.change(screen.getByLabelText(/Body/i), { target: { value: body } })
}

describe('Send Email modal', () => {
  it('renders pending communication tasks when they exist', async () => {
    const RECIPIENT_NAME = 'Recipient Name (erfiw7)'

    const TASK_ID = 'VjEtVGFzay05NTczNjI4'
    const TASK_ID_2 = 'VjEtVGFzay05NTczNjI5'

    const TASK_PRIORITY = {
      INPUT: TaskPriorityLevel.HIGH,
      OUTPUT: 'High priority'
    }

    const TASK_DESCRIPTION = 'Task Description (aegush7)'

    const TASK_DUE_DATE = {
      INPUT: '2020-05-27',
      OUTPUT: 'May 27, 2020'
    } as const

    const TASK_RECURRING_PERIOD = 10

    const emailContextMock = createEmailContextMock({
      emailMessaging: {
        fullName: RECIPIENT_NAME,
        viewerPendingCommunications: {
          nodes: [
            createPendingCommunicationTaskMock({
              id: TASK_ID,
              priority: TASK_PRIORITY.INPUT,
              description: TASK_DESCRIPTION,
              dueDate: TASK_DUE_DATE.INPUT,
              recurringPeriod: TASK_RECURRING_PERIOD
            }),
            createPendingCommunicationTaskMock({
              id: TASK_ID_2,
              priority: TaskPriorityLevel.LOW,
              description: 'Some description',
              dueDate: '2020-05-28'
            })
          ]
        }
      }
    })

    arrangeTest({ emailContext: emailContextMock, mocks: [] })

    const tasksTable = screen.getByRole('table', {
      name: `Would you like to review ${RECIPIENT_NAME}'s pending tasks?`
    })

    expect(tasksTable).toBeInTheDocument()
    expect(
      within(tasksTable).getByRole('img', { name: TASK_PRIORITY.OUTPUT })
    ).toBeInTheDocument()
    expect(within(tasksTable).getByText(TASK_DESCRIPTION)).toBeInTheDocument()
    expect(
      within(tasksTable).getByText(TASK_DUE_DATE.OUTPUT)
    ).toBeInTheDocument()

    expect(
      screen.queryByTestId(`pending-task-${TASK_ID_2}-recurring-tooltip`)
    ).not.toBeInTheDocument()

    assertOnTooltipText(
      within(tasksTable).getByTestId(
        `pending-task-${TASK_ID}-recurring-tooltip`
      ),
      `Recurring period: ${TASK_RECURRING_PERIOD}`
    )
  })

  // TODO: https://toptal-core.atlassian.net/browse/SP-1445
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should call mutation and show no error when finishing a task by clicking "Send" button', () => {
    const RECIPIENT_ID = 'Recipient ID (28745ghwu)'
    const RECIPIENT_NAME = 'Recipient Name (gjwjgkw)'
    const EMAIL_SUBJECT = 'Email subject (dkfj76ww)'
    const EMAIL_BODY = 'Email body (j46nbkjk)'
    const TASK_ID = 'Task Id (ghw89vmy5)'

    const emailContextMock = createEmailContextMock({
      emailMessaging: {
        fullName: RECIPIENT_NAME,
        viewerPendingCommunications: {
          nodes: [createPendingCommunicationTaskMock({ id: TASK_ID })]
        }
      }
    })
    const sendEmailMock = createSendEmailMock({
      title: EMAIL_SUBJECT,
      body: EMAIL_BODY,
      toId: RECIPIENT_ID,
      taskIds: [TASK_ID]
    })

    const getEmailContextMock = createGetEmailContextMock(RECIPIENT_ID)

    const handleSubmit = jest.fn()

    arrangeTest({
      emailContext: emailContextMock,
      mocks: [sendEmailMock, getEmailContextMock],
      handleSubmit
    })

    waitFor(() =>
      expect(
        screen.getByText(`New Email to ${RECIPIENT_NAME}`)
      ).toBeInTheDocument()
    )

    fillRequiredField({ body: EMAIL_BODY, subject: EMAIL_SUBJECT })

    const tasksTable = screen.getByRole('table', {
      name: `Would you like to review ${RECIPIENT_NAME}'s pending tasks?`
    })

    fireEvent.click(within(tasksTable).getByRole('checkbox'))

    fireEvent.click(screen.getByRole('button', { name: /Send Email/i }))

    expect(handleSubmit).toHaveBeenCalled()
  })
})
