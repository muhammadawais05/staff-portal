import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { SkillRating } from '@staff-portal/graphql/staff'

import SkillTags from './SkillTags'
import { SkillPair } from '../../types'

jest.mock('@staff-portal/talents/src/components/SkillTag', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div>{name}</div>
}))

const arrangeTest = (
  skills: SkillPair[] = [
    {
      name: 'React',
      rating: SkillRating.EXPERT
    },
    {
      name: 'Java',
      rating: SkillRating.EXPERT
    },
    {
      name: 'Javascript',
      rating: undefined
    }
  ],
  disable = false
) =>
  render(
    <TestWrapper>
      <SkillTags skills={skills} disableNoRating={disable} />
    </TestWrapper>
  )

describe('Skills Tags', () => {
  it('renders skills correctly', () => {
    arrangeTest()

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByTestId('skill-white-tag')).toBeInTheDocument()
    expect(screen.getByText('Javascript')).toBeInTheDocument()
  })

  it('renders disabled skills correctly', async () => {
    arrangeTest(undefined, true)

    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Java')).toBeInTheDocument()
    expect(screen.getByTestId('skill-white-tag-disabled')).toBeInTheDocument()
    expect(screen.getByText('Javascript')).toBeInTheDocument()
  })
})
