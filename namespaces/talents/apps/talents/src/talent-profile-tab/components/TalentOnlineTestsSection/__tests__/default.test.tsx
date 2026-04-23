import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { assertOnTooltip, TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentOnlineTestsSection from '../TalentOnlineTestsSection'
import {
  createGetTalentOnlineTestsMock,
  createGetTalentOnlineTestsFailedMock,
  getTestMock,
  createTalentOnlineTestHiddenOperations
} from '../data/get-talent-online-results/mocks'

const arrangeTest = (talentId: string, mocks: MockedResponse[]) => {
  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentOnlineTestsSection talentId={talentId} />
    </TestWrapperWithMocks>
  )
}

describe('TalentOnlineTestsSection', () => {
  const actionsTestId = 'talent-online-test-column-title-Actions'
  const talentId = 'VjEtVGFsZW50LTExMzg2MTA'

  const CREATED_AT = {
    ISO_FORMAT: '2018-09-07T10:16:21+03:00',
    USER_FORMAT: '2018-09-07T10:16:21+03:00'
  }

  const FINISHED_AT = {
    ISO_FORMAT: '2018-09-08T10:16:21+03:00',
    USER_FORMAT: '2018-09-08T10:16:21+03:00'
  }

  const TEST_NAME = 'Test Name'
  const ACCEPT_THRESHOLD = 100
  const REJECT_THRESHOLD = 75
  const PURE_SCORE = 60
  const MAX_SCORE = 300

  const defaultTestMock = getTestMock({
    testName: TEST_NAME,
    acceptThreshold: ACCEPT_THRESHOLD,
    rejectThreshold: REJECT_THRESHOLD,
    createdAt: CREATED_AT.ISO_FORMAT,
    finishedAt: FINISHED_AT.ISO_FORMAT,
    pureScore: PURE_SCORE,
    maxScore: MAX_SCORE
  })

  it('should list online tests', async () => {
    const mocks = [
      createGetTalentOnlineTestsMock({
        talentId,
        onlineTests: [defaultTestMock]
      })
    ]

    arrangeTest(talentId, mocks)

    expect(await screen.findByText('Online Tests')).toBeInTheDocument()

    expect(
      screen.getByText(defaultTestMock.test?.name as string)
    ).toBeInTheDocument()
    expect(screen.getByText(CREATED_AT.USER_FORMAT)).toBeInTheDocument()
    expect(screen.getByText(FINISHED_AT.USER_FORMAT)).toBeInTheDocument()
  })

  it('should show no tests message when no claimed tests', async () => {
    const mocks = [
      createGetTalentOnlineTestsMock({ talentId, onlineTests: [] })
    ]

    arrangeTest(talentId, mocks)

    expect(
      await screen.findByText(
        'No online test screening steps have been claimed for this talent so far.'
      )
    ).toBeInTheDocument()
  })

  it('should show Cancel status when test is canceled', async () => {
    const onlineTestMock = {
      ...defaultTestMock,
      canceledAt: '2018-09-07T10:16:21+03:00'
    } as const

    const mocks = [
      createGetTalentOnlineTestsMock({
        talentId,
        onlineTests: [onlineTestMock]
      })
    ]

    arrangeTest(talentId, mocks)

    expect(await screen.findByText('Canceled')).toBeInTheDocument()
  })

  it('should show Pending status when test is pending', async () => {
    const onlineTestMock = {
      ...defaultTestMock,
      pending: true
    }

    const mocks = [
      createGetTalentOnlineTestsMock({
        talentId,
        onlineTests: [onlineTestMock]
      })
    ]

    arrangeTest(talentId, mocks)

    expect(await screen.findByText('Pending')).toBeInTheDocument()
  })

  it('should show Tracked status when test is being tracked', async () => {
    const onlineTestMock = {
      ...defaultTestMock,
      tracked: true
    }

    const mocks = [
      createGetTalentOnlineTestsMock({
        talentId,
        onlineTests: [onlineTestMock]
      })
    ]

    arrangeTest(talentId, mocks)

    expect(await screen.findByText('Tracked')).toBeInTheDocument()
  })

  it('should show testing score status when test is finished', async () => {
    const onlineTestMock = {
      ...defaultTestMock,
      pureScore: PURE_SCORE,
      maxScore: MAX_SCORE
    }

    const mocks = [
      createGetTalentOnlineTestsMock({
        talentId,
        onlineTests: [onlineTestMock]
      })
    ]

    arrangeTest(talentId, mocks)

    expect(
      await screen.findByText(`${PURE_SCORE}/${MAX_SCORE}`)
    ).toBeInTheDocument()
  })

  it('should show an error when unable to fetch online tests', async () => {
    const mocks = [createGetTalentOnlineTestsFailedMock({ talentId })]

    arrangeTest(talentId, mocks)

    expect(
      await screen.findByText('Unable to fetch online tests.')
    ).toBeInTheDocument()
    expect(screen.getByText('Online Tests')).toBeInTheDocument()
  })

  it('should show test result details on tooltip', async () => {
    const mocks = [
      createGetTalentOnlineTestsMock({
        talentId,
        onlineTests: [defaultTestMock]
      })
    ]

    arrangeTest(talentId, mocks)

    expect(await screen.findByText('Online Tests')).toBeInTheDocument()

    const infoIcon = screen.getByTestId('info-icon')

    assertOnTooltip(infoIcon, tooltip => {
      expect(tooltip).toHaveTextContent(
        `The result of this test is ${PURE_SCORE} against a reject threshold ` +
          `${REJECT_THRESHOLD} and an accept threshold of ${ACCEPT_THRESHOLD}`
      )
    })
  })

  it('does not show the button to create a new online test when the test attempt is not tracked', async () => {
    const onlineTestMock = {
      ...defaultTestMock,
      tracked: false
    }

    const mocks = [
      createGetTalentOnlineTestsMock({
        talentId,
        onlineTests: [onlineTestMock]
      })
    ]

    arrangeTest(talentId, mocks)

    await waitFor(() => {
      screen.queryByTestId('items-table')
    })

    expect(
      screen.queryByRole('button', { name: /Test/i })
    ).not.toBeInTheDocument()
  })

  it('should show Actions column if there are operations that are not hidden', async () => {
    const mocks = [
      createGetTalentOnlineTestsMock({
        talentId,
        onlineTests: [defaultTestMock]
      })
    ]

    arrangeTest(talentId, mocks)

    expect(await screen.findByTestId(actionsTestId)).toBeInTheDocument()
  })

  it('should not show Actions column if all operations are hidden', () => {
    const hiddenOperations = createTalentOnlineTestHiddenOperations()
    const onlineTestMock = {
      ...defaultTestMock,
      operations: hiddenOperations
    }

    const mocks = [
      createGetTalentOnlineTestsMock({
        talentId,
        onlineTests: [onlineTestMock]
      })
    ]

    arrangeTest(talentId, mocks)

    expect(screen.queryByTestId(actionsTestId)).not.toBeInTheDocument()
  })
})
