import React from 'react'
import {
  fireEvent,
  getByText,
  queryByText,
  render,
  screen
} from '@testing-library/react'
import { within } from '@toptal/picasso/test-utils'
import { SkillRating } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import SkillsList from './SkillsList'

jest.mock('@staff-portal/talents/src/components/SkillTag', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div>{name}</div>
}))

jest.mock('../../contexts/gig-candidates-context', () => ({
  useGigsContext: () => ({
    selectedSkills: [
      {
        name: 'React',
        rating: 'EXPERT'
      },
      {
        name: 'Java',
        rating: 'EXPERT'
      }
    ]
  })
}))

const arrangeTest = (
  skills: string[] = ['React', 'Java'],
  jobOnlySkills: string[] = [],
  talentOnlySkills: string[] = []
) =>
  render(
    <TestWrapper>
      <SkillsList
        skills={[...skills, ...jobOnlySkills]}
        talentSkills={[...skills, ...talentOnlySkills].map(skill => ({
          rating: SkillRating.EXPERT,
          name: skill
        }))}
      />
    </TestWrapper>
  )

describe('Skills List', () => {
  it('renders talent skills correctly', () => {
    arrangeTest()
    const jobSkill = screen.getByTestId('skills-list')

    expect(getByText(jobSkill, 'React')).toBeInTheDocument()
    expect(getByText(jobSkill, 'Java')).toBeInTheDocument()
  })

  it('renders tooltip correctly', async () => {
    arrangeTest(['React', 'Go'])
    const jobSkill = screen.getByTestId('skills-list')
    const plusN = getByText(jobSkill, '+1 skill')

    expect(plusN).toBeInTheDocument()

    fireEvent.mouseOver(plusN)

    expect(
      within(await screen.findByRole('tooltip')).getByText('Other Skills')
    ).toBeInTheDocument()
    expect(
      within(await screen.findByRole('tooltip')).getByText(
        'In the talent profile'
      )
    ).toBeInTheDocument()
  })

  it('renders job extra skills correctly', async () => {
    arrangeTest(['React', 'Java', 'Go'], [], ['Flutter', 'Cobol', 'Fortran'])
    const jobSkill = screen.getByTestId('skills-list')
    const plusN = getByText(jobSkill, '+1 skill')

    expect(plusN).toBeInTheDocument()

    fireEvent.mouseOver(plusN)

    expect(
      within(await screen.findByRole('tooltip')).getByText('Go')
    ).toBeInTheDocument()
    expect(
      within(await screen.findByRole('tooltip')).queryByText(
        'In the talent profile'
      )
    ).toBeInTheDocument()
    expect(
      within(await screen.findByRole('tooltip')).queryByText(
        'Skills that are not in the talent profile'
      )
    ).not.toBeInTheDocument()
  })

  it('renders white skills correctly', async () => {
    const skillsThatTalentDoesntHave = ['Go', 'Erlang']

    arrangeTest(['React'], skillsThatTalentDoesntHave)
    const jobSkill = screen.getByTestId('skills-list')
    const plusN = getByText(jobSkill, '+2 skills')

    expect(queryByText(jobSkill, 'Go')).not.toBeInTheDocument()
    expect(queryByText(jobSkill, 'Erlang')).not.toBeInTheDocument()

    fireEvent.mouseOver(plusN)

    const elems = within(await screen.findByRole('tooltip')).getAllByTestId(
      'skill-white-tag-disabled'
    )

    elems.forEach(elem => {
      expect(
        skillsThatTalentDoesntHave.includes(elem.firstChild?.textContent || '')
      ).toBeTruthy()
    })

    expect(
      within(await screen.findByRole('tooltip')).queryByText(
        'In the talent profile'
      )
    ).not.toBeInTheDocument()
    expect(
      within(await screen.findByRole('tooltip')).getByText(
        'Skills that are not in the talent profile'
      )
    ).toBeInTheDocument()
  })
})
