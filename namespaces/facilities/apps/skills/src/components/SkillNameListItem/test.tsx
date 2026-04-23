import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  SkillNameActions,
  SkillNameListItem,
  SkillNameSwitch,
  SkillNameVerticalsCell,
  SkillNameVerticalsList
} from '..'
import { createSkillNamesListItemFragmentMock } from '../../data/get-skill-names-list/mocks'
import { Props as SkillNameListItemProps } from './SkillNameListItem'

jest.mock('../SkillNameSwitch', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../SkillNameActions', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../SkillNameVerticalsCell', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../SkillNameVerticalsList', () => ({
  __esModule: true,
  default: jest.fn()
}))

const arrangeTest = ({
  skillName,
  stripeEven = false,
  isExpanded = false,
  expandCollapse = () => {},
  verticalsWithCategories = [],
  skillPageSlugs = []
}: SkillNameListItemProps) =>
  render(
    <TestWrapper>
      <table>
        <tbody>
          <SkillNameListItem
            key={skillName.id}
            skillName={skillName}
            stripeEven={stripeEven}
            isExpanded={isExpanded}
            expandCollapse={expandCollapse}
            verticalsWithCategories={verticalsWithCategories}
            skillPageSlugs={skillPageSlugs}
          />
        </tbody>
      </table>
    </TestWrapper>
  )

const skillNameMock = createSkillNamesListItemFragmentMock()
const SkillNameActionsMock = SkillNameActions as jest.Mock
const SkillNameVerticalsCellMock = SkillNameVerticalsCell as jest.Mock
const SkillNameVerticalsListMock = SkillNameVerticalsList as jest.Mock
const SkillNameSwitchMock = SkillNameSwitch as jest.Mock

const expectedSkillNameActionsProps: Partial<
  ComponentProps<typeof SkillNameActionsMock>
> = {
  skillName: skillNameMock
}

const expectedSkillNameVerticalsProps: Partial<
  ComponentProps<typeof SkillNameVerticalsCellMock>
> = {
  skills: skillNameMock.skills
}

const expectedSkillNameVerticalsListProps: Partial<
  ComponentProps<typeof SkillNameVerticalsListMock>
> = {
  skills: skillNameMock.skills
}

const expectedEditorSkillNameSwitchMockProps: Partial<
  ComponentProps<typeof SkillNameSwitchMock>
> = {
  skillName: skillNameMock,
  type: 'editor'
}

const expectedVerticalSkillNameSwitchMockProps: Partial<
  ComponentProps<typeof SkillNameSwitchMock>
> = {
  skillName: skillNameMock,
  type: 'vertical'
}

describe('SkillNameListItem', () => {
  beforeEach(() => {
    SkillNameActionsMock.mockImplementation(() => (
      <div data-testid='SkillNameActions-mock' />
    ))
    SkillNameVerticalsCellMock.mockImplementation(() => (
      <div data-testid='SkillNameVerticalsCell-mock' />
    ))
    SkillNameVerticalsListMock.mockImplementation(() => (
      <div data-testid='SkillNameVerticalsList-mock' />
    ))
    SkillNameSwitchMock.mockImplementation(() => (
      <div data-testid='SkillNameSwitch-mock' />
    ))
  })

  it('renders skill name details', () => {
    arrangeTest({
      skillName: skillNameMock,
      verticalsWithCategories: [],
      skillPageSlugs: []
    })

    expect(screen.getByText('Rust')).toBeInTheDocument()
    expect(
      screen.getByTestId('SkillNameVerticalsCell-mock')
    ).toBeInTheDocument()
    expect(screen.getByTestId('expand-verticals-button')).toBeInTheDocument()
    expect(screen.getAllByTestId('SkillNameSwitch-mock')).toHaveLength(2)
    expect(screen.getByTestId('SkillNameActions-mock')).toBeInTheDocument()
    expect(
      screen.queryByTestId('SkillNameVerticalsList-mock')
    ).not.toBeInTheDocument()

    expect(SkillNameActionsMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedSkillNameActionsProps),
      expect.anything()
    )

    expect(SkillNameVerticalsCellMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedSkillNameVerticalsProps),
      expect.anything()
    )

    expect(SkillNameSwitchMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedEditorSkillNameSwitchMockProps),
      expect.anything()
    )

    expect(SkillNameSwitchMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedVerticalSkillNameSwitchMockProps),
      expect.anything()
    )
  })

  describe('when expanded', () => {
    it('renders verticals list', () => {
      arrangeTest({
        skillName: skillNameMock,
        isExpanded: true,
        verticalsWithCategories: [],
        skillPageSlugs: []
      })

      expect(
        screen.getByTestId('SkillNameVerticalsList-mock')
      ).toBeInTheDocument()

      expect(SkillNameVerticalsListMock).toHaveBeenCalledWith(
        expect.objectContaining(expectedSkillNameVerticalsListProps),
        expect.anything()
      )
    })
  })

  describe('when expansion button clicked', () => {
    it('calls expandCollapse handler', () => {
      const expandCollapseMock = jest.fn()

      arrangeTest({
        skillName: skillNameMock,
        isExpanded: true,
        expandCollapse: expandCollapseMock,
        verticalsWithCategories: [],
        skillPageSlugs: []
      })

      fireEvent.click(screen.getByTestId('expand-verticals-button'))

      expect(
        screen.getByTestId('SkillNameVerticalsList-mock')
      ).toBeInTheDocument()

      expect(SkillNameVerticalsListMock).toHaveBeenCalledWith(
        expect.objectContaining(expectedSkillNameVerticalsListProps),
        expect.anything()
      )

      expect(expandCollapseMock).toHaveBeenCalled()
    })
  })
})
