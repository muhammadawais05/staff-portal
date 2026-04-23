import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  assertOnTooltipText,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'

import NewLeadNotificationsSection from './NewLeadNotificationsSection'
import { createPollClaimableClientsMock } from './data/poll-claimable-clients/mocks'

jest.mock('@staff-portal/notifications', () => ({
  ...jest.requireActual('@staff-portal/notifications'),
  Notifications: {
    create: jest.fn(),
    requestPermission: jest.fn(),
    isSupported: jest.fn(),
    isPermissionDenied: jest.fn()
  }
}))

const mockNotifications = jest.requireMock(
  '@staff-portal/notifications'
).Notifications

const arrangeTest = (
  mocks: MockedResponse[],
  { escalationsEnabled = false }: { escalationsEnabled?: boolean } = {}
) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <NewLeadNotificationsSection escalationsEnabled={escalationsEnabled} />
    </TestWrapperWithMocks>
  )

const PLAY_BUTTON_TITLE = 'Turn the live updates on'
const STOP_BUTTON_TITLE = 'Turn the live updates off'
const SOUND_ON_BUTTON_TITLE = 'Turn the sound on'
const SOUND_OFF_BUTTON_TITLE = 'Turn the sound off'

describe('New Lead Notifications section', () => {
  beforeEach(() => {
    mockNotifications.requestPermission.mockReturnValue(Promise.resolve(true))
    mockNotifications.isSupported.mockReturnValue(true)
    mockNotifications.isPermissionDenied.mockReturnValue(false)
  })

  afterEach(() => {
    // eslint-disable-next-line no-restricted-syntax
    localStorage.clear()
  })

  it('should display fallback text if Notifications are not available', async () => {
    mockNotifications.isSupported.mockReturnValue(false)

    arrangeTest([])

    expect(
      screen.getByText(`Notifications are not supported by this browser`)
    ).toBeInTheDocument()
  })

  it('should have the fetching turned off and sound turned on by default', async () => {
    arrangeTest([])
    expect(screen.getByTitle(PLAY_BUTTON_TITLE)).toBeInTheDocument()
    expect(screen.getByTitle('Turn the sound off')).toBeInTheDocument()
  })

  it('should fetch new leads information and show the notification when the Play button is clicked', async () => {
    arrangeTest([createPollClaimableClientsMock([{}])])

    fireEvent.click(screen.getByTitle(PLAY_BUTTON_TITLE))

    const stopButton = await screen.findByTitle(STOP_BUTTON_TITLE)

    expect(stopButton).toBeInTheDocument()

    await waitFor(() => {
      expect(mockNotifications.requestPermission).toHaveBeenCalledTimes(2)
      expect(mockNotifications.create).toHaveBeenCalledTimes(1)
    })
  })

  it('should show new leads as escalations notifications when older than 7 minutes and escalations are enabled', async () => {
    const MINUTES_FOR_ESCALATION = 7
    const MINUTES_FOR_ESCALATION_IN_MS = MINUTES_FOR_ESCALATION * 60000

    arrangeTest(
      [
        createPollClaimableClientsMock([
          {
            id: 'VjEtQ2xpZW50LTQxMDc3NQ',
            claimableSince: new Date(
              Date.now() - MINUTES_FOR_ESCALATION_IN_MS
            ).toISOString()
          },
          {
            id: 'VjEtQ2xpZW50LTQxMDgxMA',
            claimableSince: new Date(
              Date.now() - MINUTES_FOR_ESCALATION_IN_MS + 500
            ).toISOString()
          }
        ])
      ],
      { escalationsEnabled: true }
    )

    fireEvent.click(screen.getByTitle(PLAY_BUTTON_TITLE))

    await waitFor(() => {
      expect(mockNotifications.requestPermission).toHaveBeenCalled()
      expect(mockNotifications.create).toHaveBeenCalledTimes(2)
    })

    expect(mockNotifications.create.mock.calls[0][0]).toBe('UNCLAIMED LEAD')
    expect(mockNotifications.create.mock.calls[1][0]).toBe(
      'New lead is claimable'
    )
  })

  it('should only notify new leads that are claimable by the user', async () => {
    arrangeTest(
      [
        createPollClaimableClientsMock([
          {
            id: '1',
            operations: {
              createClientClaimer: {
                callable: OperationCallableTypes.ENABLED
              }
            }
          },
          {
            id: '2',
            operations: {
              createClientClaimer: {
                callable: OperationCallableTypes.HIDDEN
              }
            }
          },
          {
            id: '3',
            operations: {
              createClientClaimer: {
                callable: OperationCallableTypes.DISABLED
              }
            }
          }
        ])
      ],
      { escalationsEnabled: true }
    )

    fireEvent.click(screen.getByTitle(PLAY_BUTTON_TITLE))

    await waitFor(() => {
      expect(mockNotifications.requestPermission).toHaveBeenCalled()
      expect(mockNotifications.create).toHaveBeenCalledTimes(1)
    })

    expect(mockNotifications.create.mock.calls[0][0]).toBe(
      'New leads are claimable (2)'
    )
  })

  it('should preserve fetching and sound settings between page reloads', async () => {
    const { unmount } = arrangeTest([createPollClaimableClientsMock([{}])])

    const playButton = screen.getByTitle(PLAY_BUTTON_TITLE)

    fireEvent.click(playButton)
    const soundButton = screen.getByTitle(SOUND_OFF_BUTTON_TITLE)

    fireEvent.click(soundButton)

    await waitFor(() => {})

    unmount()

    arrangeTest([createPollClaimableClientsMock([{}])])

    // TODO: replace line below with better solution to avoid act error
    // https://toptal-core.atlassian.net/browse/SP-1013
    await waitFor(() => {})

    expect(screen.getByTitle(STOP_BUTTON_TITLE)).toBeInTheDocument()
    expect(screen.getByTitle(SOUND_ON_BUTTON_TITLE)).toBeInTheDocument()
  })

  it('should show tooltip over Play button when notifications are blocked by user', async () => {
    mockNotifications.isPermissionDenied.mockReturnValue(true)

    arrangeTest([createPollClaimableClientsMock([{}])])

    const playButton = screen.getByTitle(PLAY_BUTTON_TITLE)

    assertOnTooltipText(playButton, 'Browser notifications need to be enabled')
  })
})
