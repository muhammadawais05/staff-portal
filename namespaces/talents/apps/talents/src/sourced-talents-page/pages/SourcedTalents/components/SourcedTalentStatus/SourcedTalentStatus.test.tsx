import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { SourcingStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { SOURCED_TALENT_STATUS_MAPPING } from '@staff-portal/talents'

import { SourcedTalentFragment } from '../../data/sourced-talent-fragment.staff.gql.types'
import SourcedTalentStatus from './SourcedTalentStatus'

const TALENT_NAME = 'Talent Name'

const arrangeTest = ({
  sourcedTalentStatus,
  technicalStepsProgress
}: ComponentProps<typeof SourcedTalentStatus>) =>
  render(
    <TestWrapper>
      <SourcedTalentStatus
        sourcedTalentStatus={sourcedTalentStatus}
        technicalStepsProgress={technicalStepsProgress}
        sourcedTalentName={TALENT_NAME}
      />
    </TestWrapper>
  )

const technicalStepsProgress: SourcedTalentFragment['technicalStepsProgress'] =
  {
    currentStep: 1,
    totalSteps: 3
  }

describe('SourcedTalentStatus', () => {
  describe('according to the mapping', () => {
    Object.keys(SourcingStatus).forEach(status => {
      it(`renders text for ${status}`, () => {
        arrangeTest({ sourcedTalentStatus: status as SourcingStatus })

        expect(
          screen.getByTestId('SourcedTalent-status-field')
        ).toHaveTextContent(
          SOURCED_TALENT_STATUS_MAPPING[status as SourcingStatus].text
        )
      })
    })
  })

  it('shows the steps progress for SCREENING_TECHNICAL status', () => {
    arrangeTest({
      sourcedTalentStatus: SourcingStatus.SCREENING_TECHNICAL,
      technicalStepsProgress
    })

    expect(screen.getByTestId('SourcedTalent-status-field')).toHaveTextContent(
      `(${technicalStepsProgress.currentStep}/${technicalStepsProgress.totalSteps})`
    )
  })
})
