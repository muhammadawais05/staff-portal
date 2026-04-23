import React from 'react'
import { createMemoryHistory } from 'history'
import {
  render,
  screen,
  fireEvent,
  within,
  waitForElementToBeRemoved,
  wait
} from '@testing-library/react'
import { Router } from '@staff-portal/navigation'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  createGetStatusMessagesFailedMock,
  createGetStatusMessagesMock,
  createGetExpiredCallTimerStatusMessagesFailedMock,
  createGetExpiredCallTimerStatusMessagesMock
} from '@staff-portal/status-messages/src/mocks'

import Routes from './components/Routes/Routes'

window.scrollTo = jest.fn()

const arrangeTest = (mocks: MockedResponse[]) => {
  const history = createMemoryHistory()

  return {
    history,
    renderResult: render(
      <TestWrapperWithMocks mocks={mocks} useCache={false} addTypename={false}>
        <Router history={history}>
          <Routes routes={[]} />
        </Router>
      </TestWrapperWithMocks>
    )
  }
}

// TODO: Migrate skipped tests to cypress: https://toptal-core.atlassian.net/browse/SPC-682
// eslint-disable-next-line jest/no-disabled-tests
describe.skip('Status messages', () => {
  afterEach(() => {
    // eslint-disable-next-line no-restricted-syntax
    localStorage.clear()
  })

  // TODO:
  // Do proper unit testing, its a provider test, it's scope to test provider scope only
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should be displayed in order, sticky ones first, when loaded', async () => {
    const STATUS_MESSAGE_1_TEMPORARY_HIDDEN = {
      text: 'status message 1 temporary hidden (22346)'
    }

    const STATUS_MESSAGE_2_STICKY = {
      text: 'status message 2 sticky (w9485hj)',
      sticky: true
    }

    const STATUS_MESSAGE_3_PERMANENTLY_HIDDEN = {
      text: 'status message 3 permanently hidden (gw45g5)',
      storeKey: 'test_store_key'
    }

    const STATUS_MESSAGE_4_STICKY = {
      text: 'status message 4 sticky (5y45y)',
      sticky: true
    }

    const EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME = 'Test Company (w5y45w)'

    const getStatusMessagesMock1 = createGetStatusMessagesMock([
      STATUS_MESSAGE_1_TEMPORARY_HIDDEN,
      STATUS_MESSAGE_2_STICKY,
      STATUS_MESSAGE_3_PERMANENTLY_HIDDEN,
      STATUS_MESSAGE_4_STICKY
    ])

    const getExpiredCallTimerMessagesMock =
      createGetExpiredCallTimerStatusMessagesMock([
        EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME
      ])

    const mocks = [getStatusMessagesMock1, getExpiredCallTimerMessagesMock]

    arrangeTest(mocks)

    await wait()

    const messages = await screen.findAllByRole('alert')

    expect(messages).toHaveLength(5)
    expect(messages[0]).toHaveTextContent(STATUS_MESSAGE_2_STICKY.text)
    expect(messages[1]).toHaveTextContent(STATUS_MESSAGE_4_STICKY.text)
    expect(messages[2]).toHaveTextContent(
      STATUS_MESSAGE_1_TEMPORARY_HIDDEN.text
    )
    expect(messages[3]).toHaveTextContent(
      STATUS_MESSAGE_3_PERMANENTLY_HIDDEN.text
    )
    expect(messages[4]).toHaveTextContent(
      EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME
    )
  })

  // TODO:
  // Do proper unit testing, its a provider test, it's scope to test provider scope only
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('should be displayed on page load; should be updated, remembering hidden messages, on page change', async () => {
    const STATUS_MESSAGE_1_1_STICKY = {
      text: 'status message 1-1 not sticky (sieufha)',
      sticky: true
    }
    const STATUS_MESSAGE_1_2_NOT_STICKY = {
      text: 'status message 1-2 sticky (287ry24)',
      sticky: false
    }
    const EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME = 'Test Company (dkv72s)'

    const STATUS_MESSAGE_2 = { text: 'status message 2-1 (fhs8774)' }
    const getStatusMessagesMock1 = createGetStatusMessagesMock([
      STATUS_MESSAGE_1_1_STICKY,
      STATUS_MESSAGE_1_2_NOT_STICKY
    ])
    const getStatusMessagesMock2 = createGetStatusMessagesMock([
      STATUS_MESSAGE_1_1_STICKY,
      STATUS_MESSAGE_1_2_NOT_STICKY,
      STATUS_MESSAGE_2
    ])
    const getExpiredCallTimerMessagesMock =
      createGetExpiredCallTimerStatusMessagesMock([
        EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME
      ])
    const mocks = [
      getStatusMessagesMock1,
      getStatusMessagesMock2,
      getExpiredCallTimerMessagesMock,
      getExpiredCallTimerMessagesMock
    ]
    const { history } = arrangeTest(mocks)

    await wait()

    const messages = await screen.findAllByRole('alert')

    expect(messages).toHaveLength(3)
    expect(
      within(messages[0]).getByText(STATUS_MESSAGE_1_1_STICKY.text)
    ).toBeInTheDocument()
    expect(within(messages[0]).queryByRole('button')).not.toBeInTheDocument()
    expect(
      within(messages[1]).getByText(STATUS_MESSAGE_1_2_NOT_STICKY.text)
    ).toBeInTheDocument()
    expect(
      within(messages[2]).getByText(EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME)
    ).toBeInTheDocument()

    let closeButton = within(messages[1]).getByRole('button')

    fireEvent.click(closeButton)
    closeButton = within(messages[2]).getByRole('button')
    fireEvent.click(closeButton)

    expect(
      screen.queryByText(STATUS_MESSAGE_1_2_NOT_STICKY.text)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(STATUS_MESSAGE_1_2_NOT_STICKY.text)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME)
    ).not.toBeInTheDocument()

    history.push('/email_messages')
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))

    const statusMessages2 = await screen.findAllByRole('alert')

    expect(statusMessages2).toHaveLength(2)
    expect(
      within(statusMessages2[0]).getByText(STATUS_MESSAGE_1_1_STICKY.text)
    ).toBeInTheDocument()
    expect(
      within(statusMessages2[1]).getByText(STATUS_MESSAGE_2.text)
    ).toBeInTheDocument()
    expect(
      screen.queryByText(EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME)
    ).not.toBeInTheDocument()
  })

  it('should show notification error when message requests fail', async () => {
    const mocks = [
      createGetStatusMessagesFailedMock(),
      createGetExpiredCallTimerStatusMessagesFailedMock()
    ]

    arrangeTest(mocks)

    const notifications = await screen.findAllByRole('alert')

    expect(notifications).toHaveLength(2)
    expect(notifications[0]).toHaveTextContent('Error loading status messages')
    expect(notifications[1]).toHaveTextContent(
      'Error loading expired call timer messages'
    )
  })

  it('should be displayed on page load; temporary hidden messages should re-appear on page reload, permanently hidden ones should not', async () => {
    const STATUS_MESSAGE_1_STICKY = {
      text: 'status message 1 sticky (sobe23)',
      sticky: true
    }

    const STATUS_MESSAGE_2_TEMPORARY_HIDDEN = {
      text: 'status message 2 temporary hidden (ackd73)'
    }

    const STATUS_MESSAGE_3_PERMANENTLY_HIDDEN = {
      text: 'status message 3 permanently hidden (vls2pd)',
      storeKey: 'test_store_key'
    }

    const EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME = 'Test Company (dv73sr)'

    const getStatusMessagesMock1 = createGetStatusMessagesMock([
      STATUS_MESSAGE_1_STICKY,
      STATUS_MESSAGE_2_TEMPORARY_HIDDEN,
      STATUS_MESSAGE_3_PERMANENTLY_HIDDEN
    ])
    const getStatusMessagesMock2 = createGetStatusMessagesMock([
      STATUS_MESSAGE_1_STICKY,
      STATUS_MESSAGE_2_TEMPORARY_HIDDEN,
      STATUS_MESSAGE_3_PERMANENTLY_HIDDEN
    ])
    const getExpiredCallTimerMessagesMock =
      createGetExpiredCallTimerStatusMessagesMock([
        EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME
      ])

    const mocks = [
      getStatusMessagesMock1,
      getStatusMessagesMock2,
      getExpiredCallTimerMessagesMock,
      getExpiredCallTimerMessagesMock
    ]
    const {
      renderResult: { unmount }
    } = arrangeTest(mocks)

    await wait()

    let messages = await screen.findAllByRole('alert')

    expect(messages).toHaveLength(4)
    expect(
      within(messages[0]).getByText(STATUS_MESSAGE_1_STICKY.text)
    ).toBeInTheDocument()
    expect(
      within(messages[1]).getByText(STATUS_MESSAGE_2_TEMPORARY_HIDDEN.text)
    ).toBeInTheDocument()
    expect(
      within(messages[2]).getByText(STATUS_MESSAGE_3_PERMANENTLY_HIDDEN.text)
    ).toBeInTheDocument()
    expect(
      within(messages[3]).getByText(EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME)
    ).toBeInTheDocument()

    let closeButton = within(messages[1]).getByRole('button')

    fireEvent.click(closeButton)
    closeButton = within(messages[2]).getByRole('button')
    fireEvent.click(closeButton)
    closeButton = within(messages[3]).getByRole('button')
    fireEvent.click(closeButton)

    expect(
      screen.queryByText(STATUS_MESSAGE_2_TEMPORARY_HIDDEN.text)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(STATUS_MESSAGE_3_PERMANENTLY_HIDDEN.text)
    ).not.toBeInTheDocument()

    unmount()
    arrangeTest(mocks)
    messages = await screen.findAllByRole('alert')

    expect(messages).toHaveLength(2)
    expect(
      within(messages[0]).getByText(STATUS_MESSAGE_1_STICKY.text)
    ).toBeInTheDocument()
    expect(
      within(messages[1]).getByText(STATUS_MESSAGE_2_TEMPORARY_HIDDEN.text)
    ).toBeInTheDocument()
    expect(
      screen.queryByText(STATUS_MESSAGE_3_PERMANENTLY_HIDDEN.text)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME)
    ).not.toBeInTheDocument()
  })

  it('should open call modal when clicking on link in expired call timer message', async () => {
    const EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME = 'Test Company (dv73sr)'

    const getStatusMessagesMock = createGetStatusMessagesMock([])
    const getExpiredCallTimerMessagesMock =
      createGetExpiredCallTimerStatusMessagesMock([
        EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME
      ])

    const mocks = [getStatusMessagesMock, getExpiredCallTimerMessagesMock]

    arrangeTest(mocks)

    await wait()

    const messages = await screen.findAllByRole('alert')

    expect(messages).toHaveLength(1)

    const companyLink = screen.getByText(EXPIRED_CALL_TIMER_MESSAGE_CLIENT_NAME)

    fireEvent.click(companyLink)
    const dialog = screen.getByRole('dialog')

    expect(dialog).toBeInTheDocument()
  })
})
