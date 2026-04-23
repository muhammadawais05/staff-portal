import React from 'react'
import { render, screen } from '@testing-library/react'
import { assertOnTooltip, TestWrapper } from '@staff-portal/test-utils'

import IndustryTagWithTooltip, { Props } from './IndustryTagWithTooltip'

const COMPANY = 'ClipIt, Inc (via Toptal)'
const POSITION = 'Senior iOS Developer'
const START_DATE = 2020
const END_DATE = 2022

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <IndustryTagWithTooltip {...props} />
    </TestWrapper>
  )

describe('IndustryTagWithTooltip', () => {
  it('renders tooltip with employments history', () => {
    arrangeTest({
      industryName: 'Industry Name',
      connectionsCount: 1,
      profileItems: [
        {
          id: 'VjEtRW1wbG9',
          company: COMPANY,
          endDate: END_DATE,
          position: POSITION,
          startDate: START_DATE,
          __typename: 'Employment'
        }
      ]
    })

    expect(screen.getByText('Industry Name')).toBeInTheDocument()
    assertOnTooltip(screen.getByTestId('industry-tag'), tooltip => {
      expect(tooltip).toHaveTextContent('Employment history')
      expect(tooltip).toHaveTextContent(
        `${POSITION}, ${COMPANY} · ${START_DATE} - ${END_DATE}`
      )
    })
  })
})
