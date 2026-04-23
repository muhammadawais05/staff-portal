import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { SkillRating } from '@staff-portal/graphql/staff'

import JobSkillsList from './JobSkillsList'

const SKILL_NAME = 'Test Skill Name'
const CATEGORY_MOCK_DESCRIPTION =
  'e.g., Financial Planning and Analysis (FP&A), Mergers and Acquisitions, Three Statement Operating Model'

const SKILLS_MOCK = [
  {
    id: '123',
    main: false,
    niceToHave: false,
    rating: SkillRating.EXPERT,
    skill: {
      category: {
        id: '234',
        title: 'Other',
        description: 'test description',
        position: 18
      },
      competentProfilesCount: 158,
      expertProfilesCount: 346,
      id: '456',
      name: SKILL_NAME,
      strongProfilesCount: 158,
      totalProfilesCount: 662,
      categoryId: '345'
    },
    destroy: false,
    addedAt: new Date().toISOString()
  }
]

const CORE_SKILLS_MOCK = [
  {
    id: '123',
    name: 'Accounting',
    competentProfilesCount: 250,
    expertProfilesCount: 158,
    strongProfilesCount: 115,
    totalProfilesCount: 523,
    category: {
      id: '123',
      title: 'Finance',
      description: CATEGORY_MOCK_DESCRIPTION,
      position: 10
    }
  }
]

const SELECTED_VERTICAL_MOCK = {
  defaultSkillCategory: {
    description: "Skills that don't fit into other categories",
    id: '123',
    position: 18,
    title: 'Other'
  },
  id: 'VjEtVmVydGljYWwtMw',
  skillCategories: {
    nodes: [
      {
        description: "Skills that don't fit into other categories",
        id: '234',
        position: 18,
        title: 'Other'
      },
      {
        description: CATEGORY_MOCK_DESCRIPTION,
        id: '235',
        position: 10,
        title: 'Finance'
      },
      {
        description:
          'e.g., Keynote, Microsoft Excel, Microsoft PowerPoint, Prezi',
        id: '346',
        position: 14,
        title: 'Output Software'
      },
      {
        description: 'e.g., Brazil, Germany, United States',
        id: '365',
        position: 17,
        title: 'Geographic Expertise'
      },
      {
        description: 'e.g., Biotech, Financial Services, Retail and Wholesale',
        id: '645',
        position: 16,
        title: 'Industry Expertise'
      },
      {
        description: 'e.g., Bloomberg, Capital IQ, Iri',
        id: '3569',
        position: 15,
        title: 'Data & Analysis Software'
      }
    ]
  }
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobSkillsList
        skills={SKILLS_MOCK}
        coreSkills={CORE_SKILLS_MOCK}
        onMainSkillChange={() => {}}
        onSkillRatingChange={() => {}}
        onDelete={() => {}}
        onSkillRequiredChange={() => {}}
        selectedVertical={SELECTED_VERTICAL_MOCK}
      />
    </TestWrapper>
  )

describe('JobSkillsList', () => {
  it('should render', () => {
    arrangeTest()

    expect(screen.getByTestId('skill-list-item')).toBeInTheDocument()
    expect(screen.getByTestId('skill-list-item')).toHaveTextContent(SKILL_NAME)

    expect(
      screen.getAllByTestId('job-skills-list-category')[0]
    ).toHaveTextContent(CATEGORY_MOCK_DESCRIPTION)
  })
})
