import React from 'react'
import { render, screen } from '@testing-library/react'
import { VettedSkillResult } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { TalentSkillSetVettedResultFragment } from '../../../../../../../../data/talent-skill-set-vetted-result-fragment'
import NotVettedSkill from './NotVettedSkill'

const arrangeTest = (
  vettedResult?: TalentSkillSetVettedResultFragment | null
) => {
  render(
    <TestWrapper>
      <NotVettedSkill vettedResult={vettedResult} />
    </TestWrapper>
  )

  return screen.getByTestId('not-vetted-skill').textContent
}

describe('NotVettedSkill', () => {
  it('shows skill not yet vetted', () => {
    const message = arrangeTest()

    expect(message).toMatchInlineSnapshot(`"Skill not yet vetted."`)
  })

  it('shows reason', () => {
    const message = arrangeTest({
      createdAt: '2021-07-22T00:00:00+00:00',
      result: VettedSkillResult.NOT_VETTABLE,
      reason: 'my reason'
    })

    expect(message).toMatchInlineSnapshot(`"Not vetted due to my reason."`)
  })

  it('shows default message', () => {
    const message = arrangeTest({
      createdAt: '2021-07-22T00:00:00+00:00',
      result: VettedSkillResult.NOT_VETTABLE,
      reason: null
    })

    expect(message).toMatchInlineSnapshot(`"No vetting information."`)
  })
})
