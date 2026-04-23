import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { JobSkillSetFragment } from '../../data'
import ReadonlySkillList from './ReadonlySkillList'
import { createJobListItemFragment } from '../JobListItem/data/job-list-item-fragment/mocks'

const arrangeTest = (skillSets: JobSkillSetFragment[] | undefined) =>
  render(
    <TestWrapperWithMocks>
      <ReadonlySkillList skillSets={skillSets} />
    </TestWrapperWithMocks>
  )

describe('ReadonlySkillList', () => {
  it('renders skill tags', () => {
    arrangeTest(createJobListItemFragment().skillSets?.nodes)
    const skillList = screen.getByTestId('skill-list')

    expect(skillList).toBeInTheDocument()
  })
})
