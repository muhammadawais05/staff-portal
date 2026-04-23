import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { within } from '@testing-library/dom'
import { SkillRating } from '@staff-portal/graphql/staff'
import {
  assertOnTooltipText,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'

import { JobSkillSetFragment } from '../../data'
import JobSkillTag from './JobSkillTag'
import { useGetJobSkillTagPermissions } from './data/get-job-skill-tag-permissions'

jest.mock('./data/get-job-skill-tag-permissions')

const mockedUseGetJobSkillTagPermissions =
  useGetJobSkillTagPermissions as jest.Mock

const arrangeTest = (skillSet: JobSkillSetFragment) =>
  render(
    <TestWrapperWithMocks>
      <JobSkillTag skillSet={skillSet} />
    </TestWrapperWithMocks>
  )

const SKILL: JobSkillSetFragment = {
  id: 'test-skillset-id',
  rating: SkillRating.EXPERT,
  main: true,
  niceToHave: false,
  skill: {
    id: 'skill-1',
    name: 'Ruby'
  }
}

describe('JobSkillTag', () => {
  beforeEach(() => {
    mockedUseGetJobSkillTagPermissions.mockReturnValue({
      permits: { canViewTalent: true }
    })
  })

  it('renders skill name', () => {
    arrangeTest(SKILL)
    const skill = screen.getByTestId('test-skillset-id')

    expect(skill).toHaveTextContent('Ruby')
  })

  it('renders ↳ when skill is main', () => {
    arrangeTest({ ...SKILL, main: true, niceToHave: false })
    const mainIcon = screen.queryByTestId('job-skill-tag:main-icon')

    expect(mainIcon).toBeInTheDocument()
  })

  it('does not render ↳ when skill is not main', () => {
    arrangeTest({ ...SKILL, main: false, niceToHave: false })
    const mainIcon = screen.queryByTestId('job-skill-tag:main-icon')

    expect(mainIcon).not.toBeInTheDocument()
  })

  it('renders a link to talent search', () => {
    arrangeTest({ ...SKILL, niceToHave: false })

    const skill = screen.getByTestId('test-skillset-id')
    const pattern = expect.stringMatching(/^\/talents\?.*expert.*$/)

    expect(skill).toHaveAttribute('href', pattern)
  })

  it('renders a link to job search when the user has not permission to view talents', () => {
    mockedUseGetJobSkillTagPermissions.mockReturnValue({
      permits: { canViewTalent: false }
    })

    arrangeTest({ ...SKILL, niceToHave: false })

    const skill = screen.getByTestId('test-skillset-id')
    const pattern = expect.stringMatching(/^\/jobs?.*$/)

    expect(skill).toHaveAttribute('href', pattern)
  })

  it('renders asterisk and tooltip when skill is required', () => {
    arrangeTest({ ...SKILL, niceToHave: false })
    const skill = screen.getByTestId('test-skillset-id')
    const skillTag = within(skill).getByTestId('job-skill-tag')

    assertOnTooltipText(skillTag, 'Required Skill')
    expect(
      within(skill).queryByTestId('job-skill-tag:required-icon')
    ).toBeInTheDocument()
  })

  it('renders tooltip but not asterisk when skill is optional', () => {
    arrangeTest({ ...SKILL, niceToHave: true })
    const skill = screen.getByTestId('test-skillset-id')
    const skillTag = within(skill).getByTestId('job-skill-tag')

    assertOnTooltipText(skillTag, 'Optional Skill')
    expect(
      within(skill).queryByTestId('job-skill-tag:required-icon')
    ).not.toBeInTheDocument()
  })
})
