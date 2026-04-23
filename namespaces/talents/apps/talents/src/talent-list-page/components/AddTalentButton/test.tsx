import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { Vertical } from '@staff-portal/graphql/staff'
import { getCreateTalentProfilePath } from '@staff-portal/routes'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createUserVerticalsMock } from '@staff-portal/verticals/src/mocks'

import AddTalentButton from '.'

jest.mock('@staff-portal/routes', () => ({
  getCreateTalentProfilePath: jest.fn()
}))

const getCreateTalentProfilePathMock = getCreateTalentProfilePath as jest.Mock

const arrangeTest = (verticals?: Pick<Vertical, 'id' | 'talentType'>[]) =>
  render(
    <TestWrapperWithMocks>
      <AddTalentButton verticals={verticals} />
    </TestWrapperWithMocks>
  )

describe('AddTalentButton', () => {
  beforeEach(() => {
    getCreateTalentProfilePathMock.mockImplementation((path: string) => path)
  })

  it('redirects to the corresponding new talent page in legacy', () => {
    const DESIGNER_PATH = `designer`
    const DEVELOPER_PATH = `developer`
    const FINANCE_EXPERT_PATH = `finance_expert`
    const PRODUCT_MANAGER_PATH = `product_manager`
    const PROJECT_MANAGER_PATH = `project_manager`

    arrangeTest(createUserVerticalsMock())

    fireEvent.click(screen.getByTestId('add-new-talent'))

    const designerLink = screen.getByTestId('talent-type-designer')
    const developerLink = screen.getByTestId('talent-type-developer')
    const financeExpertLink = screen.getByTestId('talent-type-finance_expert')
    const productManagerLink = screen.getByTestId('talent-type-product_manager')
    const projectManagerLink = screen.getByTestId('talent-type-project_manager')

    expect(getCreateTalentProfilePathMock.mock.calls[0][0]).toBe(DESIGNER_PATH)
    expect(designerLink).toHaveAttribute('href', DESIGNER_PATH)

    expect(getCreateTalentProfilePathMock.mock.calls[1][0]).toBe(DEVELOPER_PATH)
    expect(developerLink).toHaveAttribute('href', DEVELOPER_PATH)

    expect(getCreateTalentProfilePathMock.mock.calls[2][0]).toBe(
      FINANCE_EXPERT_PATH
    )
    expect(financeExpertLink).toHaveAttribute('href', FINANCE_EXPERT_PATH)

    expect(getCreateTalentProfilePathMock.mock.calls[3][0]).toBe(
      PRODUCT_MANAGER_PATH
    )
    expect(productManagerLink).toHaveAttribute('href', PRODUCT_MANAGER_PATH)

    expect(getCreateTalentProfilePathMock.mock.calls[4][0]).toBe(
      PROJECT_MANAGER_PATH
    )
    expect(projectManagerLink).toHaveAttribute('href', PROJECT_MANAGER_PATH)
  })
})
