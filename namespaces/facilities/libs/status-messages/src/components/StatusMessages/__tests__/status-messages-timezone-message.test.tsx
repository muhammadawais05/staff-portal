import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { StatusMessageTag } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { assertIsNotNullish } from '@staff-portal/utils'

import { createGetExpiredCallTimerStatusMessagesMock } from '../../../data/get-expired-call-timer-status-messages/mocks'
import { createGetStatusMessagesMock } from '../../../data/get-general-status-messages/mocks'
import {
  createUpdateViewerTimezoneMock,
  createUpdateViewerTimezoneFailedMock
} from '../../../data/update-viewer-timezone/mocks'
import { getCurrentTimezoneSettings } from '../../../utils'
import StatusMessages from '../StatusMessages'

const UPDATE_PROFILE_PATH = '/update_profile'

jest.unmock('@staff-portal/current-user')

jest.mock('@staff-portal/routes', () => ({
  getUpdateProfilePath: () => UPDATE_PROFILE_PATH
}))

window.scrollTo = jest.fn()

declare let global: {
  Intl: unknown
}

const arrangeTest = (mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks} useCache={false} addTypename={false}>
      <MemoryRouter>
        <StatusMessages />
      </MemoryRouter>
    </TestWrapperWithMocks>
  )

describe('Status messages > Timezone message', () => {
  afterEach(() => {
    // eslint-disable-next-line no-restricted-syntax
    localStorage.clear()
  })

  describe('if user has the timezone set up in profile settings', () => {
    it('should show the "The time zone in your profile is set to ..." text and action link if the browser timezone name can be detected', async () => {
      const USER_TIMEZONE = '(UTC+02:00) Europe - Andorra'
      const DETECTED_TIMEZONE = 'Europe/Berlin'

      const MESSAGE = {
        storeKey: 'wrong_time_zone_Europe/Istanbul_Europe/Berlin',
        tag: StatusMessageTag.WRONG_TIME_ZONE,
        data: [
          {
            key: 'current',
            value: USER_TIMEZONE,
            __typename: 'StatusMessageDataEntry'
          },
          {
            key: 'detected',
            value: DETECTED_TIMEZONE,
            __typename: 'StatusMessageDataEntry'
          }
        ]
      }

      const getStatusMessagesMock = createGetStatusMessagesMock([MESSAGE])
      const getExpiredCallTimerMessagesMock =
        createGetExpiredCallTimerStatusMessagesMock([])
      const mocks = [getStatusMessagesMock, getExpiredCallTimerMessagesMock]

      arrangeTest(mocks)

      const message = await screen.findByRole('alert')

      expect(message).toHaveTextContent(
        `The time zone in your profile is set to ${USER_TIMEZONE}, but we've detected a change to ${DETECTED_TIMEZONE}. Save local time zone`
      )
    })

    it('should show the "We detected that your time zone differs ..." text and URL link if the browser timezone name can not be detected', async () => {
      const { timezoneOffset } = getCurrentTimezoneSettings()

      const MESSAGE = {
        storeKey: 'wrong_time_zone_Europe/Istanbul_Europe/Berlin',
        tag: StatusMessageTag.WRONG_TIME_ZONE,
        data: []
      }

      const previousIntl = global.Intl

      global.Intl = jest.fn()

      const getStatusMessagesMock = createGetStatusMessagesMock([MESSAGE], {
        timezoneOffset
      })
      const getExpiredCallTimerMessagesMock =
        createGetExpiredCallTimerStatusMessagesMock([])
      const mocks = [getStatusMessagesMock, getExpiredCallTimerMessagesMock]

      arrangeTest(mocks)

      const message = await screen.findByRole('alert')

      expect(message).toHaveTextContent(
        `We detected that your time zone differs from the one in your profile, please update your time zone.`
      )

      const link = within(message).getByText('update your time zone')

      expect(link.getAttribute('href')).toEqual(UPDATE_PROFILE_PATH)

      global.Intl = previousIntl
    })
  })

  describe('if user does not have the timezone set up in profile settings', () => {
    it('should show the "You have not defined a time zone in your profile ..." text and action link if the browser timezone name can be detected', async () => {
      const DETECTED_TIMEZONE = 'Europe/Berlin'
      const MESSAGE = {
        storeKey: 'wrong_time_zone_undefined_Europe/Berlin',
        tag: StatusMessageTag.WRONG_TIME_ZONE,
        data: [
          {
            key: 'detected',
            value: DETECTED_TIMEZONE,
            __typename: 'StatusMessageDataEntry'
          }
        ]
      }

      const getStatusMessagesMock = createGetStatusMessagesMock([MESSAGE])
      const getExpiredCallTimerMessagesMock =
        createGetExpiredCallTimerStatusMessagesMock([])
      const mocks = [getStatusMessagesMock, getExpiredCallTimerMessagesMock]

      arrangeTest(mocks)

      const message = await screen.findByRole('alert')

      expect(message).toHaveTextContent(
        `You have not defined a time zone in your profile, but we've detected it to be ${DETECTED_TIMEZONE}. Save local time zone.`
      )

      within(message).getByText('Save local time zone')
    })

    it('should show the "We couldn\'t detect your local time zone ..." text and URL link if the browser timezone name can not be detected', async () => {
      const { timezoneOffset } = getCurrentTimezoneSettings()

      const MESSAGE = {
        storeKey: 'wrong_time_zone_undefined_null',
        tag: StatusMessageTag.WRONG_TIME_ZONE,
        data: []
      }

      const previousIntl = global.Intl

      global.Intl = jest.fn()

      const getStatusMessagesMock = createGetStatusMessagesMock([MESSAGE], {
        timezoneOffset
      })
      const getExpiredCallTimerMessagesMock =
        createGetExpiredCallTimerStatusMessagesMock([])
      const mocks = [getStatusMessagesMock, getExpiredCallTimerMessagesMock]

      arrangeTest(mocks)

      const message = await screen.findByRole('alert')

      expect(message).toHaveTextContent(
        `We couldn't detect your local time zone. Please set it in your profile.`
      )

      const link = screen.getByText('set it in your profile')

      expect(link.getAttribute('href')).toEqual(UPDATE_PROFILE_PATH)

      global.Intl = previousIntl
    })

    it('should update user timezone after clicking on action link', async () => {
      const { timezoneName } = getCurrentTimezoneSettings()
      const TIMEZONE_NAME = '(UTC+02:00) Europe - Andorra'
      const TIMEZONE_VALUE = 'Europe/Berlin'

      assertIsNotNullish(timezoneName)

      const MESSAGE = {
        storeKey: 'wrong_time_zone_undefined_null',
        tag: StatusMessageTag.WRONG_TIME_ZONE,
        data: []
      }

      const getStatusMessagesMock = createGetStatusMessagesMock([MESSAGE])
      const getExpiredCallTimerMessagesMock =
        createGetExpiredCallTimerStatusMessagesMock([])
      const updateViewerTimezoneMock = createUpdateViewerTimezoneMock(
        timezoneName,
        {
          name: TIMEZONE_NAME,
          value: TIMEZONE_VALUE
        }
      )
      const mocks = [
        getStatusMessagesMock,
        getExpiredCallTimerMessagesMock,
        updateViewerTimezoneMock
      ]

      arrangeTest(mocks)

      const message = await screen.findByRole('alert')
      const link = within(message).getByText('Save local time zone')

      fireEvent.click(link)

      expect(
        await screen.findByText(
          `Your time zone was updated to ${TIMEZONE_NAME}.`,
          { exact: false }
        )
      ).toBeInTheDocument()
      expect(screen.queryByRole('Save local time zone')).not.toBeInTheDocument()
    })

    it('should display error message if the user timezone update fails', async () => {
      const { timezoneName } = getCurrentTimezoneSettings()

      assertIsNotNullish(timezoneName)

      const MESSAGE = {
        storeKey: 'wrong_time_zone_undefined_null',
        tag: StatusMessageTag.WRONG_TIME_ZONE,
        data: []
      }

      const getStatusMessagesMock = createGetStatusMessagesMock([MESSAGE])
      const getExpiredCallTimerMessagesMock =
        createGetExpiredCallTimerStatusMessagesMock([])
      const updateViewerTimezoneMock =
        createUpdateViewerTimezoneFailedMock(timezoneName)
      const mocks = [
        getStatusMessagesMock,
        getExpiredCallTimerMessagesMock,
        updateViewerTimezoneMock
      ]

      arrangeTest(mocks)

      const message = await screen.findByRole('alert')
      const link = within(message).getByText('Save local time zone')

      fireEvent.click(link)

      expect(
        await screen.findByText('Error occurred when updating user timezone.')
      ).toBeInTheDocument()
      expect(screen.queryByRole('Save local time zone')).not.toBeInTheDocument()
    })
  })
})
