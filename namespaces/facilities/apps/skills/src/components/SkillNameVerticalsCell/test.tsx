import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { SkillNameVerticalsCell } from '..'
import { createSkillNamesListItemSkillFragmentMock } from '../../data/get-skill-names-list/mocks'
import { Props } from './SkillNameVerticalsCell'

const arrangeTest = ({ skills }: Props) =>
  render(
    <TestWrapper>
      <SkillNameVerticalsCell skills={skills} />
    </TestWrapper>
  )

describe('SkillNameVerticalsCell', () => {
  describe('when there is no skills', () => {
    it("renders 'No Verticals' placeholder", () => {
      arrangeTest({ skills: [] })

      expect(screen.getByText('No Verticals')).toBeInTheDocument()
    })
  })

  describe('when there are skills', () => {
    it('renders table header and vertical details', () => {
      arrangeTest({ skills: [createSkillNamesListItemSkillFragmentMock()] })

      expect(screen.getByText('Developer')).toBeInTheDocument()
    })
  })
})
