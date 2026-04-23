import { render, screen } from '@testing-library/react'
import React from 'react'
import { SkillRating } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import MainSkillSelect, { Props } from './MainSkillSelect'
import { createSkillMock } from '../../data/skill-fragment/mocks'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <Form onSubmit={jest.fn()}>
        <MainSkillSelect {...props} />
      </Form>
    </TestWrapper>
  )

describe('MainSkillSelect', () => {
  it('renders main skill picker', () => {
    const onChange = jest.fn()

    const skill = createSkillMock({ name: 'Main Skill Select Sample Skill' })

    arrangeTest({
      skills: [skill],
      loading: false,
      onChange,
      label: 'test',
      name: 'test'
    })

    screen.getByPlaceholderText('Not Selected').click()
    screen.getByText('Main Skill Select Sample Skill').click()

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      destroy: false,
      niceToHave: true,
      main: true,
      rating: SkillRating.STRONG,
      skill,
      addedAt: expect.any(String)
    })
  })
})
