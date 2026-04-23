import { render, screen } from '@testing-library/react'
import React from 'react'
import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { TalentSpecializationsFragment } from '../../../../data/talent-fragment'
import { getTalentSpecializations } from './get-talent-specializations'

const arrangeTest = (
  specializationNodes: TalentSpecializationsFragment['specializationApplications']
) =>
  render(
    <TestWrapper>
      {getTalentSpecializations({
        specializationApplications: { nodes: specializationNodes?.nodes ?? [] }
      })}
    </TestWrapper>
  )

describe('getTalentSpecializations', () => {
  describe('when there is no specialization', () => {
    it('returns nothing', () => {
      expect(
        getTalentSpecializations({ specializationApplications: { nodes: [] } })
      ).toBeUndefined()
    })
  })

  describe('when there are some specializations', () => {
    it('returns a filtered list', () => {
      const TITLE = 'Specialization 1'
      const SPECIALIZATIONS = {
        nodes: [
          {
            id: 'a',
            status: TalentSpecializationApplicationStatus.APPROVED,
            specialization: { id: 'ab', title: TITLE }
          },
          {
            id: 'b',
            status: TalentSpecializationApplicationStatus.APPROVED,
            specialization: null
          }
        ]
      }

      arrangeTest(SPECIALIZATIONS)

      expect(screen.getByText(TITLE)).toBeInTheDocument()
      expect(screen.queryAllByTestId('talent-specialization')).toHaveLength(1)
    })
  })
})
