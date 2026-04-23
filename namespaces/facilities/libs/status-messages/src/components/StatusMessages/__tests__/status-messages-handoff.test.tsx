import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { StatusMessageTag } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createStatusMessageFragmentMock } from '../../../data/status-message-fragment/mocks'
import {
  createFinishRelatedHandoffsMock,
  createFinishRelatedHandoffsInvalidMock,
  createFinishRelatedHandoffsFailedMock
} from '../../GeneralStatusMessageHandoff/data/finish-related-handoffs/mocks'
import StatusMessages from '../StatusMessages'
import { createGetStatusMessagesMock } from '../../../data/get-general-status-messages/mocks'
import { createGetExpiredCallTimerStatusMessagesMock } from '../../../data/get-expired-call-timer-status-messages/mocks'

const TRANSFERRED_WORK_PATH = '/transfer_work'

jest.mock('@staff-portal/routes', () => ({
  getTransferredWorkPath: () => TRANSFERRED_WORK_PATH
}))

const createHandoffStatusMessageFragmentMock = () =>
  createStatusMessageFragmentMock({
    tag: StatusMessageTag.HANDOFF_FINISHED
  })

const arrangeTest = (mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <MemoryRouter>
        <StatusMessages />
      </MemoryRouter>
    </TestWrapperWithMocks>
  )

describe('Status messages > Handoff', () => {
  afterEach(() => {
    // eslint-disable-next-line no-restricted-syntax
    localStorage.clear()
  })

  it('should show its message and action link', async () => {
    const getStatusMessagesMock = createGetStatusMessagesMock([
      createHandoffStatusMessageFragmentMock()
    ])
    const getExpiredCallTimerMessagesMock =
      createGetExpiredCallTimerStatusMessagesMock([])

    arrangeTest([getStatusMessagesMock, getExpiredCallTimerMessagesMock])
    const statusMessages = await screen.findByTestId('status-messages')
    const actionLink = screen.getByTestId('finish-handoff-action')

    expect(statusMessages).toHaveTextContent(
      /If you are back from vacation, please click here to reclaim your clients./i
    )
    expect(actionLink).toHaveTextContent(/click here to reclaim your clients/i)
  })

  it('should show its modal with a title and 2 buttons', async () => {
    const getStatusMessagesMock = createGetStatusMessagesMock([
      createHandoffStatusMessageFragmentMock()
    ])
    const getExpiredCallTimerMessagesMock =
      createGetExpiredCallTimerStatusMessagesMock([])

    arrangeTest([getStatusMessagesMock, getExpiredCallTimerMessagesMock])

    fireEvent.click(await screen.findByTestId('finish-handoff-action'))

    const modalTitle = screen.getByTestId('finish-handoff-modal-title')
    const showClientsButton = screen.getByTestId('show-clients-button')
    const transferClientsButton = screen.getByTestId('transfer-clients-button')

    expect(modalTitle).toHaveTextContent(/Transfer clients/i)
    expect(showClientsButton).toHaveTextContent(/Show Clients/i)
    expect(showClientsButton).toHaveAttribute('href', TRANSFERRED_WORK_PATH)
    expect(transferClientsButton).toHaveTextContent(/Transfer Clients/i)
  })

  it('should show successful message and hide status message on successful clients transfer', async () => {
    const getStatusMessagesMock = createGetStatusMessagesMock([
      createHandoffStatusMessageFragmentMock()
    ])
    const getExpiredCallTimerMessagesMock =
      createGetExpiredCallTimerStatusMessagesMock([])
    const finishRelatedHandoffsMock = createFinishRelatedHandoffsMock()

    arrangeTest([
      getStatusMessagesMock,
      getExpiredCallTimerMessagesMock,
      finishRelatedHandoffsMock
    ])
    const actionLink = await screen.findByTestId('finish-handoff-action')

    fireEvent.click(actionLink)

    fireEvent.click(screen.getByTestId('transfer-clients-button'))

    expect(
      await screen.findByText(
        /Your vacation has been ended and all clients have been transferred back to you. Please check your task list and get in touch with the matchers who were covering you./i
      )
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(
        screen.queryByTestId('finish-handoff-action')
      ).not.toBeInTheDocument()
    })

    expect(
      screen.queryByTestId('finish-handoff-modal-title')
    ).not.toBeInTheDocument()
  })

  it('should show error message and keep status message on invalid clients transfer', async () => {
    const getStatusMessagesMock = createGetStatusMessagesMock([
      createHandoffStatusMessageFragmentMock()
    ])
    const getExpiredCallTimerMessagesMock =
      createGetExpiredCallTimerStatusMessagesMock([])
    const errorMessage = 'TEST_MESSAGE'
    const finishRelatedHandoffsInvalidMock =
      createFinishRelatedHandoffsInvalidMock(errorMessage)

    arrangeTest([
      getStatusMessagesMock,
      getExpiredCallTimerMessagesMock,
      finishRelatedHandoffsInvalidMock
    ])
    const actionLink = await screen.findByTestId('finish-handoff-action')

    fireEvent.click(actionLink)

    fireEvent.click(screen.getByTestId('transfer-clients-button'))

    expect(
      await screen.findByText(/Unable to transfer clients/i)
    ).toBeInTheDocument()
    expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument()
    expect(actionLink).toBeInTheDocument()
    expect(
      screen.queryByTestId('finish-handoff-modal-title')
    ).toBeInTheDocument()
  })

  it('should show error message and keep status message on failed clients transfer', async () => {
    const getStatusMessagesMock = createGetStatusMessagesMock([
      createHandoffStatusMessageFragmentMock()
    ])
    const getExpiredCallTimerMessagesMock =
      createGetExpiredCallTimerStatusMessagesMock([])
    const finishRelatedHandoffsFailedMock =
      createFinishRelatedHandoffsFailedMock()

    arrangeTest([
      getStatusMessagesMock,
      getExpiredCallTimerMessagesMock,
      finishRelatedHandoffsFailedMock
    ])
    const actionLink = await screen.findByTestId('finish-handoff-action')

    fireEvent.click(actionLink)

    fireEvent.click(screen.getByTestId('transfer-clients-button'))

    expect(
      await screen.findByText(/Unable to transfer clients/i)
    ).toBeInTheDocument()
    expect(actionLink).toBeInTheDocument()
    expect(
      screen.queryByTestId('finish-handoff-modal-title')
    ).toBeInTheDocument()
  })
})
