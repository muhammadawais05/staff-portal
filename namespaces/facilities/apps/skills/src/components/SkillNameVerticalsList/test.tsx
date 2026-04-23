import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { SkillNameVerticalsList } from '..'
import {
  createGetSkillNamesListMock,
  createSkillNamesListItemFragmentMock
} from '../../data/get-skill-names-list/mocks'
import {
  createGetSkillsVerticalsMock,
  createSkillWithVerticalFragment
} from '../../data/get-skills-verticals/mocks'
import { Props } from './SkillNameVerticalsList'

jest.mock('@staff-portal/ui/src/components/ContainerLoader')
const arrangeTest = async ({
  skills,
  mocks
}: Props & { mocks: MockedResponse[] }) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <SkillNameVerticalsList skills={skills} />
    </TestWrapperWithMocks>
  )
const waitForElementContentChange = async (
  callback: () => HTMLElement,
  textContent: string
) => {
  return waitForElementToBeRemoved(() => {
    const element = callback()

    return element?.textContent === textContent ? element : null
  })
}

describe('SkillNameVerticalsList', () => {
  it('renders empty collection if there are no verticals', async () => {
    const skillNameMock = createSkillNamesListItemFragmentMock()
    const mocks = [
      createGetSkillNamesListMock([skillNameMock]),
      createGetSkillsVerticalsMock(
        skillNameMock.skills.map(({ id }) => id),
        []
      )
    ]

    await arrangeTest({ mocks: mocks, skills: skillNameMock.skills })

    await waitForElementContentChange(
      () => screen.getByTestId('ContainerLoader-loading'),
      'true'
    )
    expect(screen.getByText('No Verticals')).toBeInTheDocument()
  })

  it('renders header and verticals details', async () => {
    const skillWithVerticalFragment = createSkillWithVerticalFragment()
    const skillNameMock = createSkillNamesListItemFragmentMock()
    const mocks = [
      createGetSkillNamesListMock([skillNameMock]),
      createGetSkillsVerticalsMock(
        [skillWithVerticalFragment.id],
        [skillWithVerticalFragment]
      )
    ]

    await arrangeTest({ mocks: mocks, skills: skillNameMock.skills })

    await waitForElementContentChange(
      () => screen.getByTestId('ContainerLoader-loading'),
      'true'
    )

    expect(screen.queryByText('Vertical')).toBeInTheDocument()
    expect(screen.queryByText('Category')).toBeInTheDocument()
    expect(screen.queryByText('Parent Skill')).toBeInTheDocument()
    expect(screen.queryByText('Identifier')).toBeInTheDocument()

    expect(screen.queryByText('Developer')).toBeInTheDocument()
    expect(screen.queryByText('Other')).toBeInTheDocument()
    expect(screen.queryByText('Vertical Root')).toBeInTheDocument()
    expect(screen.queryByText('No')).toBeInTheDocument()
  })
})
