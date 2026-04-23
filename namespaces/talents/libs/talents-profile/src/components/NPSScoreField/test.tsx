import React from 'react'
import { screen, render } from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import NPSScoreField from './NPSScoreField'
import { createGetTalentNPSScoreMock } from './data/get-talent-nps-score/mocks'

const TALENT_ID = 'VjEtVGFsZW50LTIxMTY2NjM'

const arrangeTest = (talentId: string, mocks: MockedResponse[]) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <NPSScoreField talentId={talentId} />
    </TestWrapperWithMocks>
  )

describe('NPSScoreField', () => {
  it('shows NPS score with link', async () => {
    const lastAnsweredPromotion = {
      score: 10,
      updatedAt: '2020-11-05T23:28:20+03:00'
    }

    const url = 'https://the-url.com/promotions'

    arrangeTest(TALENT_ID, [
      createGetTalentNPSScoreMock({
        talentId: TALENT_ID,
        lastAnsweredPromotion,
        url
      })
    ])

    expect(await screen.findByTestId('nps-score-field')).toBeInTheDocument()
    expect(
      screen.getByText(
        `${lastAnsweredPromotion.score} (2020-11-05T23:28:20+03:00)`
      )
    ).toHaveAttribute('href', url)
  })

  it('shows NPS score without link', async () => {
    const lastAnsweredPromotion = {
      score: 10,
      updatedAt: '2020-11-05T23:28:20+03:00'
    }

    arrangeTest(TALENT_ID, [
      createGetTalentNPSScoreMock({
        talentId: TALENT_ID,
        lastAnsweredPromotion,
        url: null
      })
    ])

    expect(await screen.findByTestId('nps-score-field')).toBeInTheDocument()
    expect(
      screen.getByText(
        `${lastAnsweredPromotion.score} (2020-11-05T23:28:20+03:00)`
      )
    ).toBeInTheDocument()
  })

  describe('when talent does not have a last answered promotion', () => {
    it('shows a dash', async () => {
      arrangeTest(TALENT_ID, [
        createGetTalentNPSScoreMock({
          talentId: TALENT_ID,
          url: 'https://the-url.com/promotions'
        })
      ])

      expect(await screen.findByTestId('nps-score-field')).toBeInTheDocument()
      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })
})
