import { render, screen } from '@testing-library/react'
import React from 'react'
import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { createGetTalentProfileSpecializationFragmentMock } from '../../data/talent-specialization-field-fragment/mocks'
import SpecializationsField, { Props } from './SpecializationsField'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <SpecializationsField {...props} />
    </TestWrapper>
  )

describe('SpecializationsField', () => {
  it('show sorted tags', () => {
    const specializations = [
      createGetTalentProfileSpecializationFragmentMock(
        'Last',
        TalentSpecializationApplicationStatus.PENDING
      ),
      createGetTalentProfileSpecializationFragmentMock(
        'Middle',
        TalentSpecializationApplicationStatus.APPROVED
      ),
      createGetTalentProfileSpecializationFragmentMock(
        'First',
        TalentSpecializationApplicationStatus.APPROVED
      )
    ]

    arrangeTest({ specializations })
    const tags = screen.getAllByTestId('specialization-tag')

    expect(tags[0]).toHaveTextContent(specializations[2].specialization.title)
    expect(tags[1]).toHaveTextContent(specializations[1].specialization.title)
    expect(tags[2]).toHaveTextContent(specializations[0].specialization.title)
  })
})
