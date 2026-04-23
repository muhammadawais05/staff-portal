import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SkillsWithExperience from './SkillsWithExperience'
import { TalentSkillSetFragment } from '../../data/get-talent-skills-with-experience/get-talent-skills-with-experience.staff.gql.types'

const createSkillItem = ({
  publicUrl
}: {
  publicUrl?: string
}): TalentSkillSetFragment => ({
  id: 'test-id',
  experience: 2,
  skill: {
    id: '123',
    name: 'TEST_NAME',
    skillPage: {
      publicUrl
    }
  }
})

const arrangeTest = (skills: TalentSkillSetFragment[]) =>
  render(
    <TestWrapper>
      <SkillsWithExperience skills={skills} />
    </TestWrapper>
  )

describe('SkillsWithExperience', () => {
  it('renders the skills', () => {
    const skillItem = createSkillItem({})

    arrangeTest([skillItem])

    expect(
      screen.getByText(`${skillItem.experience} years`)
    ).toBeInTheDocument()
    expect(screen.getByText(skillItem.skill.name)).toBeInTheDocument()
  })

  it('renders the skill with link if publicUrl exists', () => {
    const skillItem = createSkillItem({
      publicUrl: 'TEST_LINK'
    })

    arrangeTest([skillItem])

    const skillLink = screen.getByTestId('skill-link')

    expect(skillLink).toBeInTheDocument()
    expect(skillLink).toHaveAttribute(
      'href',
      skillItem.skill.skillPage?.publicUrl
    )
  })
})
