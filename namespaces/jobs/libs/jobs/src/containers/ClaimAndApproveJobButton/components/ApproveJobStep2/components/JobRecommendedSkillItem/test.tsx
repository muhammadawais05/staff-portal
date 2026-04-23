import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobRecommendedSkillItem, { Props } from './JobRecommendedSkillItem'

jest.mock(
  '../../../../../../components/RequiredSkillsAutocomplete/data',
  () => ({
    __esModule: true,
    useGetJobSkillsAutocomplete: () => ({
      getJobSkills: () => jest.fn(),
      loading: false
    })
  })
)

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <JobRecommendedSkillItem {...props} />
    </TestWrapper>
  )

describe('JobRecommendedSkillItem', () => {
  it('renders label with total profiles', () => {
    arrangeTest({
      name: 'Ruby on Rails (RoR)',
      totalProfilesCount: 1677
    } as unknown as Props)

    expect(screen.getByText('Ruby on Rails (RoR) (1677)')).toBeInTheDocument()
  })
})
