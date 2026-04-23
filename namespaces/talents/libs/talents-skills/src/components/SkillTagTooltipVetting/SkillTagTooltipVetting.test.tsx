import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { VettedResult, VettingType } from '../../types'
import SkillTagTooltipVetting from './SkillTagTooltipVetting'

const arrangeTest = (vettedResult: VettedResult) => {
  render(
    <TestWrapper>
      <SkillTagTooltipVetting vettedResult={vettedResult} />
    </TestWrapper>
  )
}

describe('SkillTagTooltipVetting', () => {
  describe('when there is a vetted result', () => {
    const vettedResult = {
      type: VettingType.Vetted as const,
      workingHoursCount: 10,
      skillConnectionsCount: 10,
      engagementsCount: 10,
      quartiles: {
        workingHours25: 5,
        workingHours75: 15,
        skillConnections25: 5,
        skillConnections75: 15,
        engagements25: 5,
        engagements75: 15
      },
      performerName: 'John Doe',
      formattedCreatedAt: 'Aug 21, 2021',
      comment: 'Vetted as expert beacuse of the lorem ipsum dolor sit amet.'
    }

    describe('when there is a comment', () => {
      it('shows the comment', () => {
        arrangeTest(vettedResult)

        expect(
          screen.getByText(`"${vettedResult.comment}"`)
        ).toBeInTheDocument()
      })
    })
  })

  describe('when there is no vetted result', () => {
    const vettedResult = {
      type: VettingType.NotVetted as const,
      message: 'This is not vetted due to reason.'
    }

    it('renders the passed message', () => {
      arrangeTest(vettedResult)

      expect(screen.getByText(vettedResult.message)).toBeInTheDocument()
    })
  })
})
