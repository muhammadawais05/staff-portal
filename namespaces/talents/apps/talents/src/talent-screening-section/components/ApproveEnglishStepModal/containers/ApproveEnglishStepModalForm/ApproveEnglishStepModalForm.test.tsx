import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import ApproveEnglishStepModalForm from './ApproveEnglishStepModalForm'

jest.mock('../../../ReassignScreeningStepCheckbox', () => ({
  ReassignScreeningStepCheckbox: () => <div>ReassignScreeningStepCheckbox</div>
}))

const arrangeTest = ({
  claimer,
  applicantSkills = [],
  specializations = [],
  englishApprovalRequiresSpecialization
}: {
  applicantSkills?: { id: string; name: string }[]
  specializations?: { id: string; title: string }[]
  claimer?: { id: string; fullName: string }
  englishApprovalRequiresSpecialization?: boolean
}) => {
  return render(
    <TestWrapperWithMocks>
      <ApproveEnglishStepModalForm
        talentId='talent-id'
        roleStep={{
          id: '1',
          englishApprovalRequiresSpecialization,
          claimer,
          talent: {
            id: '2',
            applicantSkills: {
              nodes: applicantSkills
            },
            vertical: {
              id: '3',
              specializations: {
                nodes: specializations
              }
            }
          }
        }}
        hideModal={jest.fn}
      />
    </TestWrapperWithMocks>
  )
}

describe('ApproveEnglishStepModal', () => {
  it('renders default modal', () => {
    const SKILL_NAME = 'Test Skill'

    arrangeTest({ applicantSkills: [{ id: '1', name: SKILL_NAME }] })

    expect(
      screen.getByText('Do you really want to approve the English step?')
    ).toBeInTheDocument()
    expect(screen.getByText('Applicant Skills')).toBeInTheDocument()
    expect(screen.getByText(SKILL_NAME)).toBeInTheDocument()
  })

  it('renders specialization field', async () => {
    arrangeTest({
      englishApprovalRequiresSpecialization: true,
      specializations: []
    })

    expect(screen.getByText('Specialization')).toBeInTheDocument()
  })
})
