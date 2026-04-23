import { render, screen } from '@testing-library/react'
import { waitForElementToBeRemoved } from '@toptal/picasso/test-utils'
import React from 'react'
import { RouteContext } from '@staff-portal/navigation'
import {
  MatchQualityMetricName,
  MatchQualityMetricValue
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import {
  createGetMatchQualitySectionWithJobFailedMock,
  createGetMatchQualitySectionWithJobMock
} from './data/get-match-quality-section-with-job/mocks'
import {
  createGetMatchQualitySectionFailedMock,
  createGetMatchQualitySectionMock
} from './data/get-match-quality-section/mocks'
import MatchQualitySection from './MatchQualitySection'

const TALENT_ID = 'talent-id'
const JOB_ID = 'job-id'
const LOADER_TEST_ID = 'match-quality-content-loader'
const CONTENT_TEST_ID = 'match-quality-section'
const ERROR_MESSAGE = 'Unable to fetch match quality.'

const JOB = {
  id: JOB_ID,
  webResource: {
    text: 'Senior developer',
    url: 'TEST_LINK'
  }
}

jest.mock(
  '../../components/MatchQualitySkeletonLoader/MatchQualitySkeletonLoader',
  () => ({
    __esModule: true,
    default: () => <div data-testid={LOADER_TEST_ID} />
  })
)

const dataMock = {
  [MatchQualityMetricName.PORTFOLIO_COUNT]: {
    label: 'PORTFOLIO_COUNT',
    value: MatchQualityMetricValue.PASSED
  },
  [MatchQualityMetricName.HIGH_QUALITY_PHOTO]: {
    label: 'HIGH_QUALITY_PHOTO',
    value: MatchQualityMetricValue.PASSED
  },
  [MatchQualityMetricName.EXTERNAL_PROFILES]: {
    label: 'EXTERNAL_PROFILES',
    value: MatchQualityMetricValue.FAILED
  },
  [MatchQualityMetricName.EMPLOYMENT_ITEMS]: {
    label: 'EMPLOYMENT_ITEMS',
    value: MatchQualityMetricValue.NOT_AVAILABLE
  },
  [MatchQualityMetricName.NO_YELLOW_FLAG]: {
    label: 'NO_YELLOW_FLAG',
    value: MatchQualityMetricValue.FAILED
  },
  [MatchQualityMetricName.FEEDBACK_SCORE]: {
    label: 'FEEDBACK_SCORE',
    value: MatchQualityMetricValue.FAILED
  },
  [MatchQualityMetricName.NO_CONSECUTIVE_FAILED_ENGAGEMENTS]: {
    label: 'NO_CONSECUTIVE_FAILED_ENGAGEMENTS',
    value: MatchQualityMetricValue.NOT_AVAILABLE
  },
  [MatchQualityMetricName.FAILED_TRIALS_COUNT]: {
    label: 'FAILED_TRIALS_COUNT',
    value: MatchQualityMetricValue.PASSED
  },
  [MatchQualityMetricName.SKILL_MATCH]: {
    label: 'SKILL_MATCH',
    value: MatchQualityMetricValue.PASSED
  },
  [MatchQualityMetricName.COUNTRY_FIT]: {
    label: 'COUNTRY_FIT',
    value: MatchQualityMetricValue.NOT_AVAILABLE
  },
  [MatchQualityMetricName.HOURS_OVERLAP]: {
    label: 'HOURS_OVERLAP',
    value: MatchQualityMetricValue.PASSED
  },
  [MatchQualityMetricName.RATE_MATCH]: {
    label: 'RATE_MATCH',
    value: MatchQualityMetricValue.FAILED
  },
  [MatchQualityMetricName.INTERVIEW_COUNT]: {
    label: 'INTERVIEW_COUNT',
    value: MatchQualityMetricValue.PASSED
  },
  [MatchQualityMetricName.UNSUCCESSFUL_ENGAGEMENT]: {
    label: 'UNSUCCESSFUL_ENGAGEMENT',
    value: MatchQualityMetricValue.PASSED
  }
}

const arrangeTest = (mocks: MockedResponse[], jobId?: string) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <RouteContext.Provider value={path => ({ url: path })}>
        <MatchQualitySection talentId={TALENT_ID} jobId={jobId} />
      </RouteContext.Provider>
    </TestWrapperWithMocks>
  )

describe('MatchQualitySection', () => {
  it('renders skeleton loader', async () => {
    arrangeTest([createGetMatchQualitySectionMock({ talentId: TALENT_ID })])

    expect(screen.queryByTestId(LOADER_TEST_ID)).toBeInTheDocument()
  })

  it('renders labels', async () => {
    arrangeTest([
      createGetMatchQualitySectionMock({ talentId: TALENT_ID }, dataMock)
    ])
    await waitForElementToBeRemoved(() => screen.queryByTestId(LOADER_TEST_ID))

    expect(screen.queryByTestId(CONTENT_TEST_ID)).toBeInTheDocument()

    expect(screen.queryByText('PORTFOLIO_COUNT')).toBeInTheDocument()
    expect(screen.queryByText('HIGH_QUALITY_PHOTO')).toBeInTheDocument()
    expect(screen.queryByText('EXTERNAL_PROFILES')).toBeInTheDocument()
    expect(screen.queryByText('EMPLOYMENT_ITEMS')).toBeInTheDocument()
    expect(screen.queryByText('NO_YELLOW_FLAG')).toBeInTheDocument()
    expect(screen.queryByText('FEEDBACK_SCORE')).toBeInTheDocument()
    expect(
      screen.queryByText('NO_CONSECUTIVE_FAILED_ENGAGEMENTS')
    ).toBeInTheDocument()
    expect(screen.queryByText('FAILED_TRIALS_COUNT')).toBeInTheDocument()

    expect(
      screen.getAllByTestId('match-quality-label-tooltip-icon')
    ).toHaveLength(8)
    expect(
      screen.getAllByTestId('match-quality-value-tooltip-icon')
    ).toHaveLength(8)
  })

  it('renders values', async () => {
    arrangeTest([
      createGetMatchQualitySectionMock({ talentId: TALENT_ID }, dataMock)
    ])
    await waitForElementToBeRemoved(() => screen.queryByTestId(LOADER_TEST_ID))

    expect(screen.queryByTestId(CONTENT_TEST_ID)).toBeInTheDocument()

    expect(screen.getAllByTestId('match-quality-passed')).toHaveLength(3)
    expect(screen.getAllByTestId('match-quality-failed')).toHaveLength(3)
    expect(screen.getAllByTestId('match-quality-not-available')).toHaveLength(2)
  })

  it('handles request with an error', async () => {
    arrangeTest([
      createGetMatchQualitySectionFailedMock({
        talentId: TALENT_ID
      })
    ])
    await waitForElementToBeRemoved(() => screen.queryByTestId(LOADER_TEST_ID))

    expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument()
  })

  describe('When there is a job', () => {
    it('renders job match title and labels', async () => {
      arrangeTest(
        [
          createGetMatchQualitySectionWithJobMock(
            { talentId: TALENT_ID, jobId: JOB_ID },
            dataMock,
            JOB
          )
        ],
        JOB_ID
      )

      await waitForElementToBeRemoved(() =>
        screen.queryByTestId(LOADER_TEST_ID)
      )

      expect(screen.queryByTestId(CONTENT_TEST_ID)).toBeInTheDocument()

      expect(screen.getByText(JOB.webResource.text)).toHaveAttribute(
        'href',
        JOB.webResource.url
      )

      expect(screen.queryByText('SKILL_MATCH')).toBeInTheDocument()
      expect(screen.queryByText('COUNTRY_FIT')).toBeInTheDocument()
      expect(screen.queryByText('HOURS_OVERLAP')).toBeInTheDocument()
      expect(screen.queryByText('RATE_MATCH')).toBeInTheDocument()
      expect(screen.queryByText('INTERVIEW_COUNT')).toBeInTheDocument()
      expect(screen.queryByText('UNSUCCESSFUL_ENGAGEMENT')).toBeInTheDocument()

      expect(
        screen.getAllByTestId('match-quality-label-tooltip-icon')
      ).toHaveLength(14)
      expect(
        screen.getAllByTestId('match-quality-value-tooltip-icon')
      ).toHaveLength(14)
    })

    it('renders job match values', async () => {
      arrangeTest(
        [
          createGetMatchQualitySectionWithJobMock(
            { talentId: TALENT_ID, jobId: JOB_ID },
            dataMock,
            JOB
          )
        ],
        JOB_ID
      )

      await waitForElementToBeRemoved(() =>
        screen.queryByTestId(LOADER_TEST_ID)
      )

      expect(screen.queryByTestId(CONTENT_TEST_ID)).toBeInTheDocument()

      expect(screen.getAllByTestId('match-quality-passed')).toHaveLength(7)
      expect(screen.getAllByTestId('match-quality-failed')).toHaveLength(4)
      expect(screen.getAllByTestId('match-quality-not-available')).toHaveLength(
        3
      )
    })

    it('handles request with an error', async () => {
      arrangeTest(
        [
          createGetMatchQualitySectionWithJobFailedMock({
            talentId: TALENT_ID,
            jobId: JOB_ID
          })
        ],
        JOB_ID
      )

      await waitForElementToBeRemoved(() =>
        screen.queryByTestId(LOADER_TEST_ID)
      )

      expect(screen.getByText(ERROR_MESSAGE)).toBeInTheDocument()
    })
  })
})
