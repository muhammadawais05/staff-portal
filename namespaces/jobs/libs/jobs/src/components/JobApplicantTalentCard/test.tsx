import React from 'react'
import { screen, render, waitFor } from '@toptal/picasso/test-utils'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createGetJobApplicationTalentCardMock } from './data/get-job-application-talent-card/mocks'
import JobApplicantTalentCard from './JobApplicantTalentCard'

const JOB_APPLICATION_ID = 'job-application-123'

const arrangeTest = async (mocks: MockedResponse[]) => {
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <JobApplicantTalentCard jobApplicationId={JOB_APPLICATION_ID} />
    </TestWrapperWithMocks>
  )

  await waitFor(() => screen.queryByTestId('job-applicant-talent-card'))
}

describe('JobApplicantTalentCard', () => {
  it('hides talent card when talent pitch is not set', async () => {
    const mock = createGetJobApplicationTalentCardMock({
      jobApplicationId: JOB_APPLICATION_ID,
      talentPicth: null
    })

    await arrangeTest([mock])

    expect(
      screen.queryByTestId('job-applicant-talent-card')
    ).not.toBeInTheDocument()
  })

  it('shows talent card name and info', async () => {
    const TALENT_NAME = 'Joshua Ram'
    const mock = createGetJobApplicationTalentCardMock({
      jobApplicationId: JOB_APPLICATION_ID,
      talentName: TALENT_NAME
    })

    await arrangeTest([mock])
    const namePlaces = screen.getAllByText(TALENT_NAME)

    // name should be present in the top info section and in the avatar
    expect(namePlaces).toHaveLength(2)
  })

  it('shows talent card sections in the correct order', async () => {
    const TALENT_NAME = 'Joshua Ram'
    const mock = createGetJobApplicationTalentCardMock({
      jobApplicationId: JOB_APPLICATION_ID,
      talentName: TALENT_NAME
    })

    await arrangeTest([mock])

    const SKILLS_SECTION_TEST_ID = 'skills-talent-card-section'
    const INDUSTRIES_SECTION_TEST_ID = 'industries-talent-card-section'
    const HIGHLIGHTS_SECTION_TEST_ID = 'highlights-talent-card-section'
    const PORTFOLIO_SECTION_TEST_ID = 'portfolio-talent-card-section'

    await waitFor(() => {
      const sections = screen.getAllByTestId(/-talent-card-section$/g)

      expect(sections[0]).toHaveAttribute('data-testid', SKILLS_SECTION_TEST_ID)
      expect(sections[1]).toHaveAttribute(
        'data-testid',
        INDUSTRIES_SECTION_TEST_ID
      )
      expect(sections[2]).toHaveAttribute(
        'data-testid',
        HIGHLIGHTS_SECTION_TEST_ID
      )
      expect(sections[3]).toHaveAttribute(
        'data-testid',
        PORTFOLIO_SECTION_TEST_ID
      )
    })
  })
})
