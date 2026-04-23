/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */

import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { JobProbabilityToConvertScoreCategory } from '@staff-portal/graphql/staff'
import {
  TestWrapper,
  assertOnTooltipText,
  assertOnTooltip
} from '@staff-portal/test-utils'

import ProbabilityToConvert, { Props } from './ProbabilityToConvert'
import { createJobListItemFragment } from '../JobListItem/data/job-list-item-fragment/mocks'

const arrangeTest = ({
  probabilityToConvertData,
  estimatedRevenue,
  estimatedValue
}: Props) =>
  render(
    <TestWrapper>
      <ProbabilityToConvert
        probabilityToConvertData={probabilityToConvertData}
        estimatedRevenue={estimatedRevenue}
        estimatedValue={estimatedValue}
      />
    </TestWrapper>
  )

describe('ProbabilityToConvert', () => {
  it('renders ProbabilityToConvert', async () => {
    const { estimatedRevenue, estimatedValue, probabilityToConvert } =
      createJobListItemFragment()

    arrangeTest({
      estimatedRevenue,
      estimatedValue,
      probabilityToConvertData: probabilityToConvert
    })

    expect(
      screen.getByTestId('probability-to-convert-category')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('probability-to-convert-category').textContent
    ).toBe('High')

    assertOnTooltipText(
      screen.getByTestId('probability-to-convert-category'),
      'Probability to convert'
    )

    assertOnTooltipText(
      screen.getByTestId('probability-to-convert-category'),
      'Score'
    )

    assertOnTooltipText(
      screen.getByTestId('probability-to-convert-category'),
      'Factors'
    )

    assertOnTooltipText(
      screen.getByTestId('probability-to-convert-category'),
      'Estimations'
    )
  })

  it('does not render ProbabilityToConvert when is null', () => {
    const { estimatedRevenue, estimatedValue, probabilityToConvert } =
      createJobListItemFragment({ probabilityToConvert: null })

    arrangeTest({
      estimatedRevenue,
      estimatedValue,
      probabilityToConvertData: probabilityToConvert
    })

    expect(
      screen.queryByTestId('probability-to-convert-category')
    ).not.toBeInTheDocument()
  })

  it('renders only ProbabilityToConvert Score', () => {
    const { estimatedRevenue, estimatedValue, probabilityToConvert } =
      createJobListItemFragment({
        probabilityToConvert: {
          category: JobProbabilityToConvertScoreCategory.MEDIUM,
          score: '0.404224332443353',
          negativeFeatures: [],
          positiveFeatures: []
        },
        estimatedValue: null,
        estimatedRevenue: null
      })

    arrangeTest({
      estimatedRevenue,
      estimatedValue,
      probabilityToConvertData: probabilityToConvert
    })

    const probabilityToConvertTooltip = screen.getByTestId(
      'probability-to-convert-category'
    )

    assertOnTooltip(probabilityToConvertTooltip, tooltip => {
      const score = within(tooltip).getByTestId('probability-to-convert-score')

      const positiveFactor = within(tooltip).queryByTestId(
        'probability-to-convert-positive-factor'
      )

      const negativeFactor = within(tooltip).queryByTestId(
        'probability-to-convert-negative-factor'
      )

      const revenueEstimation = within(tooltip).queryByTestId(
        'probability-to-convert-revenue-estimation'
      )

      const valueEstimation = within(tooltip).queryByTestId(
        'probability-to-convert-value-estimation'
      )

      expect(score).toBeInTheDocument()
      expect(positiveFactor).not.toBeInTheDocument()
      expect(negativeFactor).not.toBeInTheDocument()
      expect(revenueEstimation).not.toBeInTheDocument()
      expect(valueEstimation).not.toBeInTheDocument()
    })
  })

  it('renders only ProbabilityToConvert Positive Factors', () => {
    const { estimatedRevenue, estimatedValue, probabilityToConvert } =
      createJobListItemFragment({
        probabilityToConvert: {
          category: JobProbabilityToConvertScoreCategory.MEDIUM,
          score: '0.404224332443353',
          negativeFeatures: [],
          positiveFeatures: [
            {
              name: 'act_percent',
              position: 2,
              value: '0'
            }
          ]
        },
        estimatedValue: null,
        estimatedRevenue: null
      })

    arrangeTest({
      estimatedRevenue,
      estimatedValue,
      probabilityToConvertData: probabilityToConvert
    })

    const probabilityToConvertTooltip = screen.getByTestId(
      'probability-to-convert-category'
    )

    assertOnTooltip(probabilityToConvertTooltip, tooltip => {
      const score = within(tooltip).getByTestId('probability-to-convert-score')

      const positiveFactor = within(tooltip).getByTestId(
        'probability-to-convert-positive-factor'
      )

      const negativeFactor = within(tooltip).queryByTestId(
        'probability-to-convert-negative-factor'
      )

      const revenueEstimation = within(tooltip).queryByTestId(
        'probability-to-convert-revenue-estimation'
      )

      const valueEstimation = within(tooltip).queryByTestId(
        'probability-to-convert-value-estimation'
      )

      expect(score).toBeInTheDocument()
      expect(positiveFactor).toBeInTheDocument()
      expect(negativeFactor).not.toBeInTheDocument()
      expect(revenueEstimation).not.toBeInTheDocument()
      expect(valueEstimation).not.toBeInTheDocument()
    })
  })

  it('renders only ProbabilityToConvert Negative Factors', () => {
    const { estimatedRevenue, estimatedValue, probabilityToConvert } =
      createJobListItemFragment({
        probabilityToConvert: {
          category: JobProbabilityToConvertScoreCategory.MEDIUM,
          score: '0.404224332443353',
          negativeFeatures: [
            {
              name: 'operating_system',
              position: 1,
              value: 'Missing'
            }
          ],
          positiveFeatures: []
        },
        estimatedValue: null,
        estimatedRevenue: null
      })

    arrangeTest({
      estimatedRevenue,
      estimatedValue,
      probabilityToConvertData: probabilityToConvert
    })

    const probabilityToConvertTooltip = screen.getByTestId(
      'probability-to-convert-category'
    )

    assertOnTooltip(probabilityToConvertTooltip, tooltip => {
      const score = within(tooltip).getByTestId('probability-to-convert-score')

      const negativeFactor = within(tooltip).getByTestId(
        'probability-to-convert-negative-factor'
      )

      const positiveFactor = within(tooltip).queryByTestId(
        'probability-to-convert-positive-factor'
      )

      const revenueEstimation = within(tooltip).queryByTestId(
        'probability-to-convert-revenue-estimation'
      )

      const valueEstimation = within(tooltip).queryByTestId(
        'probability-to-convert-value-estimation'
      )

      expect(score).toBeInTheDocument()
      expect(negativeFactor).toBeInTheDocument()
      expect(positiveFactor).not.toBeInTheDocument()
      expect(revenueEstimation).not.toBeInTheDocument()
      expect(valueEstimation).not.toBeInTheDocument()
    })
  })

  it('renders only ProbabilityToConvert estimated value', () => {
    const { estimatedRevenue, estimatedValue, probabilityToConvert } =
      createJobListItemFragment({
        probabilityToConvert: {
          category: JobProbabilityToConvertScoreCategory.MEDIUM,
          score: '0.404224332443353',
          negativeFeatures: [],
          positiveFeatures: []
        },
        estimatedValue: '12234.00',
        estimatedRevenue: null
      })

    arrangeTest({
      estimatedRevenue,
      estimatedValue,
      probabilityToConvertData: probabilityToConvert
    })

    const probabilityToConvertTooltip = screen.getByTestId(
      'probability-to-convert-category'
    )

    assertOnTooltip(probabilityToConvertTooltip, tooltip => {
      const score = within(tooltip).getByTestId('probability-to-convert-score')

      const valueEstimation = within(tooltip).getByTestId(
        'probability-to-convert-value-estimation'
      )

      const negativeFactor = within(tooltip).queryByTestId(
        'probability-to-convert-negative-factor'
      )

      const positiveFactor = within(tooltip).queryByTestId(
        'probability-to-convert-positive-factor'
      )

      const revenueEstimation = within(tooltip).queryByTestId(
        'probability-to-convert-revenue-estimation'
      )

      expect(score).toBeInTheDocument()
      expect(valueEstimation).toBeInTheDocument()
      expect(revenueEstimation).not.toBeInTheDocument()
      expect(negativeFactor).not.toBeInTheDocument()
      expect(positiveFactor).not.toBeInTheDocument()
    })
  })

  it('renders only ProbabilityToConvert estimated revenue', () => {
    const { estimatedRevenue, estimatedValue, probabilityToConvert } =
      createJobListItemFragment({
        probabilityToConvert: {
          category: JobProbabilityToConvertScoreCategory.MEDIUM,
          score: '0.404224332443353',
          negativeFeatures: [],
          positiveFeatures: []
        },
        estimatedValue: null,
        estimatedRevenue: '3456.00'
      })

    arrangeTest({
      estimatedRevenue,
      estimatedValue,
      probabilityToConvertData: probabilityToConvert
    })

    const probabilityToConvertTooltip = screen.getByTestId(
      'probability-to-convert-category'
    )

    assertOnTooltip(probabilityToConvertTooltip, tooltip => {
      const score = within(tooltip).getByTestId('probability-to-convert-score')

      const revenueEstimation = within(tooltip).getByTestId(
        'probability-to-convert-revenue-estimation'
      )

      const valueEstimation = within(tooltip).queryByTestId(
        'probability-to-convert-value-estimation'
      )

      const negativeFactor = within(tooltip).queryByTestId(
        'probability-to-convert-negative-factor'
      )

      const positiveFactor = within(tooltip).queryByTestId(
        'probability-to-convert-positive-factor'
      )

      expect(score).toBeInTheDocument()
      expect(revenueEstimation).toBeInTheDocument()
      expect(valueEstimation).not.toBeInTheDocument()
      expect(negativeFactor).not.toBeInTheDocument()
      expect(positiveFactor).not.toBeInTheDocument()
    })
  })
})
