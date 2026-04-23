import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { TaskCardCompanyNpsScoreFragment } from '../../../data/company-task-card-fragment'
import { getCompanyNpsScore } from '../get-company-nps-score'

const DATE = '2020-04-16T00:00:00+00:00'
const DATE_FORMATTED = 'Apr 16, 2020'
const SCORE = 22

const arrangeTest = (
  params: Pick<
    TaskCardCompanyNpsScoreFragment,
    'promotions' | 'lastAnsweredPromotion'
  >
) => render(<TestWrapper>{getCompanyNpsScore(params)}</TestWrapper>)

describe('get company NPS score', () => {
  it('should handle empty promotions', () => {
    const result = getCompanyNpsScore({
      lastAnsweredPromotion: null,
      promotions: { webResource: { url: null } }
    })

    expect(result).toBeUndefined()
  })

  it('should handle missing score', () => {
    const result = getCompanyNpsScore({
      lastAnsweredPromotion: { score: null, updatedAt: DATE },
      promotions: { webResource: { url: null } }
    })

    expect(result).toBeUndefined()
  })

  it('should handle missing date', () => {
    const result = getCompanyNpsScore({
      lastAnsweredPromotion: { score: SCORE, updatedAt: null },
      promotions: { webResource: { url: null } }
    })

    expect(result).toBeUndefined()
  })

  it('should return score and updated at', () => {
    arrangeTest({
      lastAnsweredPromotion: { score: SCORE, updatedAt: DATE },
      promotions: { webResource: { url: null } }
    })

    expect(screen.getByText(`${SCORE} (${DATE_FORMATTED})`)).toBeInTheDocument()
  })
})
