import { MatcherFunction, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { SkillUsage } from '../index'
import { Props } from './SkillUsage'
import { createSkillsListMock } from '../../data/get-skills-list/mocks'

const arrangeTest = ({ skill }: Props) =>
  render(
    <TestWrapper>
      <SkillUsage skill={skill} />
    </TestWrapper>
  )

const matchByLabelAndValue =
  (label: string, value: string): MatcherFunction =>
  (content, element) => {
    return content === label && element?.lastChild?.textContent === value
  }

describe('SkillUsage', () => {
  it('renders skill usage information for given skill data', () => {
    arrangeTest({ skill: createSkillsListMock() })

    expect(
      screen.getByText(matchByLabelAndValue('Active jobs (implicit):', '1'))
    ).toBeInTheDocument()
    expect(
      screen.getByText(matchByLabelAndValue('Active jobs (explicit):', '2'))
    ).toBeInTheDocument()
    expect(
      screen.getByText(matchByLabelAndValue('Active talents (implicit):', '3'))
    ).toBeInTheDocument()
    expect(
      screen.getByText(matchByLabelAndValue('Active talents (explicit):', '4'))
    ).toBeInTheDocument()
  })
  it('renders skill usage information with zeros on missing skill data', () => {
    arrangeTest({})
    expect(
      screen.getByText(matchByLabelAndValue('Active jobs (implicit):', '0'))
    ).toBeInTheDocument()
    expect(
      screen.getByText(matchByLabelAndValue('Active jobs (explicit):', '0'))
    ).toBeInTheDocument()
    expect(
      screen.getByText(matchByLabelAndValue('Active talents (explicit):', '0'))
    ).toBeInTheDocument()
    expect(
      screen.getByText(matchByLabelAndValue('Active talents (implicit):', '0'))
    ).toBeInTheDocument()
  })
})
