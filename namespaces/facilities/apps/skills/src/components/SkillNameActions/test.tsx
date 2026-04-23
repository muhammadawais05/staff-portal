import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { createSkillNamesListItemFragmentMock } from '../../data/get-skill-names-list/mocks'
import {
  SkillNameActions,
  CloneSkillNameButton,
  DeleteSkillNameButton,
  EditSkillNameButton
} from '..'
import { Props } from './SkillNameActions'

const CloneSkillNameButtonMock = CloneSkillNameButton as jest.Mock
const DeleteSkillNameButtonMock = DeleteSkillNameButton as jest.Mock
const EditSkillNameButtonMock = EditSkillNameButton as jest.Mock

jest.mock('../EditSkillNameButton', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../CloneSkillNameButton', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('../DeleteSkillNameButton', () => ({
  __esModule: true,
  default: jest.fn()
}))

const arrangeTest = ({
  skillName,
  verticalsWithCategories,
  skillPageSlugs
}: Props) =>
  render(
    <TestWrapper>
      <SkillNameActions
        skillName={skillName}
        verticalsWithCategories={verticalsWithCategories}
        skillPageSlugs={skillPageSlugs}
      />
    </TestWrapper>
  )

const skillNameMock = createSkillNamesListItemFragmentMock()

describe('SkillNameActions', () => {
  beforeEach(() => {
    DeleteSkillNameButtonMock.mockImplementation(() => (
      <div data-testid='DeleteSkillNameButton-mock' />
    ))
    CloneSkillNameButtonMock.mockImplementation(() => (
      <div data-testid='CloneSkillNameButton-mock' />
    ))
    EditSkillNameButtonMock.mockImplementation(() => (
      <div data-testid='EditSkillNameButton-mock' />
    ))
  })

  it('properly passes props into buttons', () => {
    arrangeTest({
      skillName: skillNameMock,
      skillPageSlugs: [],
      verticalsWithCategories: []
    })

    expect(
      screen.queryByTestId('DeleteSkillNameButton-mock')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('CloneSkillNameButton-mock')
    ).toBeInTheDocument()

    const expectedCloneButtonProps: Partial<
      ComponentProps<typeof CloneSkillNameButtonMock>
    > = {
      skillName: skillNameMock
    }

    const expectedDeleteButtonProps: Partial<
      ComponentProps<typeof DeleteSkillNameButtonMock>
    > = {
      skillName: skillNameMock
    }

    const expectedEditButtonProps: Partial<
      ComponentProps<typeof EditSkillNameButtonMock>
    > = {
      skillName: skillNameMock
    }

    expect(DeleteSkillNameButtonMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedDeleteButtonProps),
      expect.anything()
    )

    expect(CloneSkillNameButtonMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedCloneButtonProps),
      expect.anything()
    )

    expect(EditSkillNameButtonMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedEditButtonProps),
      expect.anything()
    )
  })
})
