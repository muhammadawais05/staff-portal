import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { palette } from '@toptal/picasso/utils'
import {
  StatusMessageTag,
  StatusMessageSeverity
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import StatusMessagesNotifications from '.'
import { createStatusMessageDataMock } from './mocks'
import { StatusMessageFragment } from '../../data/status-message-fragment'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve()
  })
) as jest.Mock
interface Props {
  statusMessages: StatusMessageFragment[]
}
const arrangeTest = ({ statusMessages }: Props) => {
  return render(
    <TestWrapper>
      <StatusMessagesNotifications statusMessages={statusMessages} />
    </TestWrapper>
  )
}

describe('StatusMessagesNotifications', () => {
  it('render status messages', async () => {
    const STATUS_MESSAGE_1 = 'The Incredible Hulk'
    const STATUS_MESSAGE_2 = 'Captain America'

    const statusMessages = [
      createStatusMessageDataMock({
        text: STATUS_MESSAGE_1,
        tag: StatusMessageTag.TALENT_REMOVED
      }),
      createStatusMessageDataMock({
        text: STATUS_MESSAGE_2,
        tag: StatusMessageTag.TALENT_INVESTIGATION
      })
    ]

    arrangeTest({ statusMessages })

    await waitFor(() =>
      expect(
        screen.getByTestId('status-messages-container')
      ).toBeInTheDocument()
    )

    expect(screen.getByText(STATUS_MESSAGE_1)).toBeInTheDocument()
    expect(screen.getByText(STATUS_MESSAGE_2)).toBeInTheDocument()
  })

  it('hides a status messages when closed', async () => {
    const STATUS_MESSAGE_1 = 'Spider Man'
    const STATUS_MESSAGE_2 = 'Iron Man'

    const statusMessages = [
      createStatusMessageDataMock({
        text: STATUS_MESSAGE_1,
        tag: StatusMessageTag.JOB_ACTIVE_REHIRE
      }),
      createStatusMessageDataMock({
        text: STATUS_MESSAGE_2,
        tag: StatusMessageTag.JOB_INVESTIGATION
      })
    ]

    arrangeTest({ statusMessages })

    await waitFor(() =>
      expect(
        screen.getByTestId('status-messages-container')
      ).toBeInTheDocument()
    )

    const closeButtons = screen.queryAllByRole('button')

    fireEvent.click(closeButtons[0])

    expect(screen.queryByText(STATUS_MESSAGE_1)).not.toBeInTheDocument()
    expect(screen.getByText(STATUS_MESSAGE_2)).toBeInTheDocument()
  })

  it('renders the PMBV notice first and colors it red', async () => {
    const STATUS_MESSAGE_1 = 'Spider Man'
    const STATUS_MESSAGE_2 = 'Iron Man'
    const STATUS_MESSAGE_3 = 'Ant Man'

    const statusMessages = [
      createStatusMessageDataMock({
        text: STATUS_MESSAGE_1,
        tag: StatusMessageTag.JOB_ACTIVE_REHIRE,
        severity: StatusMessageSeverity.INFO
      }),
      createStatusMessageDataMock({
        text: STATUS_MESSAGE_2,
        tag: StatusMessageTag.JOB_INVESTIGATION,
        severity: StatusMessageSeverity.INFO
      }),
      createStatusMessageDataMock({
        text: STATUS_MESSAGE_3,
        tag: StatusMessageTag.CLIENT_PMBV_NOTICE,
        severity: StatusMessageSeverity.INFO
      })
    ]

    arrangeTest({ statusMessages })

    await waitFor(() =>
      expect(
        screen.getByTestId('status-messages-container')
      ).toBeInTheDocument()
    )

    expect(
      screen.getByTestId('status-messages-container').firstChild
    ).toHaveStyle(`background-color: ${palette.red.lighter}`)
    expect(
      screen.getByTestId('status-messages-container').firstChild
    ).toHaveTextContent(STATUS_MESSAGE_3)
  })

  it('send empty post request to closeUrl in case CLIENT_COMPANY_WAS_RENAMED', () => {
    const CLOSE_URL = '/space/url'
    const statusMessages = [
      createStatusMessageDataMock({
        closeUrl: CLOSE_URL,
        text: 'Minmatar fighters will win!',
        tag: StatusMessageTag.CLIENT_COMPANY_WAS_RENAMED,
        severity: StatusMessageSeverity.INFO
      })
    ]

    arrangeTest({ statusMessages })

    const closeButton = screen.getByTitle('Close alert')

    fireEvent.click(closeButton)

    expect(fetch).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith(CLOSE_URL, {
      method: 'POST'
    })
  })

  it(`doesn't send empty post request to closeUrl`, () => {
    const statusMessages = [
      createStatusMessageDataMock({
        text: 'Minmatar fighters still sould win!',
        tag: StatusMessageTag.JOB_INVESTIGATION,
        severity: StatusMessageSeverity.INFO
      })
    ]

    arrangeTest({ statusMessages })

    const closeButton = screen.getByTitle('Close alert')

    fireEvent.click(closeButton)

    expect(fetch).not.toHaveBeenCalled()
  })
})
