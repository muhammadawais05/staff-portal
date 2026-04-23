import React, { ComponentProps } from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentEngagementsRates from './TalentEngagementsRates'

const arrangeTest = (props: ComponentProps<typeof TalentEngagementsRates>) =>
  render(
    <TestWrapper>
      <TalentEngagementsRates {...props} />
    </TestWrapper>
  )

describe('TalentEngagementsRates', () => {
  describe('when there is at least 1 interview', () => {
    it('renders the rates', () => {
      const props = {
        successRate: 3,
        trialsNumber: 4,
        interviewsNumber: 1,
        acceptedInterviewsNumber: 3,
        approvedTrialsNumber: 4
      }

      arrangeTest(props)

      expect(screen.getByText(`3% (4 / 4 / 3 / 1)`)).toBeInTheDocument()
    })
  })

  describe('when there is no interview', () => {
    it('renders never interviewed message', () => {
      const props = {
        interviewsNumber: 0,
        successRate: 3,
        trialsNumber: 4,
        approvedTrialsNumber: 4,
        acceptedInterviewsNumber: 3
      }

      arrangeTest(props)

      expect(screen.getByText('Never interviewed')).toBeInTheDocument()
    })
  })
})
