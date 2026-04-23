import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import React, { Suspense } from 'react'

import { useSendEmail } from '../SendEmailModal/data/send-email'
import SendGeneralEmailModal from './SendGeneralEmailModal'

jest.mock('../EmailTemplatesField', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('../SubjectField', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('../ToField', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('../CCSuggestedField', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('../EmailBodyField', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('../OfacStatusNotification', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('../GoogleAppsAuthNotification', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('../LatestEmailMessageSection', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('../SendEmailModal/data/send-email', () => ({
  __esModule: true,
  useSendEmail: jest.fn()
}))

jest.mock('../SendGeneralEmailModalContent/data', () => ({
  useGetGeneralEmailContext: () => ({
    loading: false,
    refetchEmailContext: () => {},
    emailContext: {
      id: '1',
      fullName: 'test',
      roleType: 'Talent',
      defaultSendTo: { id: '1' },
      optionsSendTo: { nodes: [] },
      emailTemplates: { edges: [] },
      viewerPendingCommunications: {
        nodes: [
          {
            id: '1',
            priority: 'LOW',
            description: 'Task description',
            status: 'pending'
          }
        ]
      }
    }
  })
}))

const mockReturnValues = () => {
  const mockedUseSendEmail = useSendEmail as jest.Mock

  mockedUseSendEmail.mockReturnValue({
    sendEmail: () => ({
      data: {
        sendEmailTo: {
          success: true,
          errors: []
        }
      }
    }),
    loading: false
  })
}

const arrangeTest = ({
  onCompleted = () => {}
}: Partial<{
  onCompleted?: () => void
}> = {}) => {
  mockReturnValues()

  return render(
    <TestWrapper>
      <Suspense fallback={null}>
        <SendGeneralEmailModal
          nodeId='123'
          hideModal={() => {}}
          onCompleted={onCompleted}
        />
      </Suspense>
    </TestWrapper>
  )
}

describe('SendGeneralEmailModal', () => {
  it('not triggers the task refetch', async () => {
    const onCompletedMock = jest.fn()

    arrangeTest({ onCompleted: onCompletedMock })

    expect(await screen.findByText('Send Email')).toBeInTheDocument()
    expect(screen.getByText('Task description')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Send Email'))

    await waitFor(() =>
      expect(onCompletedMock).toHaveBeenCalledWith({ refetchTasks: false })
    )
  })

  it('triggers the task refetch', async () => {
    const onCompletedMock = jest.fn()

    arrangeTest({ onCompleted: onCompletedMock })

    expect(await screen.findByText('Send Email')).toBeInTheDocument()
    expect(screen.getByText('Task description')).toBeInTheDocument()

    const checkbox = screen
      .getByTestId('pending-tasks-checkbox')
      .querySelectorAll('input[type="checkbox"]')[0]

    fireEvent.click(checkbox)

    fireEvent.click(screen.getByText('Send Email'))

    await waitFor(() =>
      expect(onCompletedMock).toHaveBeenCalledWith({ refetchTasks: true })
    )
  })
})
