import { act, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { VisualComplianceStatus } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID } from '../../../../config'
import CheckComplianceInProgressMessage from '.'
import {
  createGetCheckComplianceStatusFailedMock,
  createGetCheckComplianceStatusMock
} from './data/get-check-compliance-status/mocks'

jest.useFakeTimers()

const COMPANY_NAME = 'Umbrella'
const COMPANY_ID = '1999'

const mockRemoveStatusMessageFn = jest.fn()

jest.mock('@staff-portal/page-wrapper', () => ({
  ...jest.requireActual('@staff-portal/page-wrapper'),
  useCustomStatusMessagesContext: () => ({
    removeStatusMessage: mockRemoveStatusMessageFn
  })
}))

const waitSeconds = async (seconds: number) => {
  await act(async () => {
    jest.advanceTimersByTime(seconds * 1000)
  })
}

const arrangeTest = (mocks: MockedResponse[] = []) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <CheckComplianceInProgressMessage
        companyName={COMPANY_NAME}
        companyId={COMPANY_ID}
      />
    </TestWrapperWithMocks>
  )

describe('CheckComplianceInProgressMessage', () => {
  afterEach(() => mockRemoveStatusMessageFn.mockClear())

  it('renders default message', () => {
    arrangeTest()

    expect(
      screen.queryByText(`Checking compliance for ${COMPANY_NAME}... 0 seconds`)
    ).toBeInTheDocument()
  })

  it('renders incremented seconds with proper suffix', async () => {
    const { unmount } = arrangeTest()

    await waitSeconds(1)

    expect(
      screen.queryByText(`Checking compliance for ${COMPANY_NAME}... 1 second`)
    ).toBeInTheDocument()
    unmount()
  })

  describe('shows success notification', () => {
    it(`if ofacProhibited === false and visualComplianceStatus === 'FULLY_CHECKED'`, async () => {
      const { unmount } = arrangeTest([
        createGetCheckComplianceStatusMock({
          id: COMPANY_ID,
          ofacProhibited: false,
          visualComplianceStatus: VisualComplianceStatus.FULLY_CHECKED
        })
      ])

      await waitSeconds(4)

      expect(
        screen.queryByText(`${COMPANY_NAME} has passed the compliance check.`)
      ).toBeInTheDocument()
      expect(mockRemoveStatusMessageFn).toHaveBeenCalledWith(
        CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID
      )
      unmount()
    })
  })

  describe('continue polling', () => {
    it(`if ofacProhibited !== false`, async () => {
      const { unmount } = arrangeTest([
        createGetCheckComplianceStatusMock({
          id: COMPANY_ID,
          ofacProhibited: true,
          visualComplianceStatus: VisualComplianceStatus.FULLY_CHECKED
        })
      ])

      await waitSeconds(4)

      expect(
        screen.queryByText(`${COMPANY_NAME} has passed the compliance check.`)
      ).not.toBeInTheDocument()
      expect(mockRemoveStatusMessageFn).toHaveBeenCalled()
      unmount()
    })

    it(`if visualComplianceStatus !== 'FULLY_CHECKED'`, async () => {
      const { unmount } = arrangeTest([
        createGetCheckComplianceStatusMock({
          id: COMPANY_ID,
          ofacProhibited: false,
          visualComplianceStatus: VisualComplianceStatus.NOT_FULLY_CHECKED
        })
      ])

      await waitSeconds(4)

      expect(
        screen.queryByText(`${COMPANY_NAME} has passed the compliance check.`)
      ).not.toBeInTheDocument()
      expect(mockRemoveStatusMessageFn).not.toHaveBeenCalled()
      unmount()
    })
  })

  it('shows error notification', async () => {
    const { unmount } = arrangeTest([
      createGetCheckComplianceStatusFailedMock(COMPANY_ID)
    ])

    await waitSeconds(4)

    expect(
      screen.queryByText(`${COMPANY_NAME} did not pass the compliance check.`)
    ).toBeInTheDocument()
    expect(mockRemoveStatusMessageFn).toHaveBeenCalledWith(
      CHECK_COMPLIANCE_IN_PROGRESS_MESSAGE_ID
    )
    unmount()
  })
})
