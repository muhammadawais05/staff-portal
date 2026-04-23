import { fireEvent } from '@toptal/picasso/test-utils'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { createSkillNamesListItemFragmentMock } from '../../data/get-skill-names-list/mocks'
import { createVerticalWithSkillCategoriesMock } from '../../data/get-verticals-with-categories/mocks'
import { createSkillsListMock } from './data/get-skills-list/mocks'
import { useGetSkillsList } from './hooks'
import EditSkillNameModal, { Props } from './EditSkillNameModal'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))
jest.mock('./components/FormFields', () => ({
  __esModule: true,
  default: () => <div data-testid='FormFields-mock' />
}))
jest.mock('./components/EditSkillNameConfirmation', () => ({
  __esModule: true,
  default: () => <div data-testid='EditSkillNameConfirmation-mock' />
}))
jest.mock('./hooks/use-get-skills-list')

const mockUseMutation = useMutation as jest.Mock
const mockUseGetSkillsList = useGetSkillsList as jest.Mock
const skillNameMock = createSkillNamesListItemFragmentMock()
const hideModalMock = jest.fn()
const verticalsWithCategoriesMock = [createVerticalWithSkillCategoriesMock()]
const skillPageSlugsMock = ['test']

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <EditSkillNameModal {...props} />
    </TestWrapper>
  )

describe('EditSkillNameModal', () => {
  beforeEach(() => {
    mockUseGetSkillsList.mockReturnValue({
      data: [createSkillsListMock()],
      loading: false
    })
  })

  it('renders modal content', () => {
    mockUseMutation.mockReturnValue([() => {}])

    arrangeTest({
      skillName: skillNameMock,
      hideModal: hideModalMock,
      verticalsWithCategories: verticalsWithCategoriesMock,
      skillPageSlugs: skillPageSlugsMock
    })

    expect(screen.getByTestId('FormFields-mock')).toBeInTheDocument()
    expect(
      screen.queryByTestId('EditSkillNameModal-skeleton')
    ).not.toBeInTheDocument()

    expect(screen.getByText('Edit Skill')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  describe('when in merge flow', () => {
    describe('when success', () => {
      it('shows success merge notification and updates skills list', async () => {
        mockUseMutation.mockReturnValue([
          () => ({
            data: {
              updateSkillName: {
                success: true,
                requiresMergeConfirmation: true,
                errors: []
              }
            }
          }),
          { loading: false }
        ])

        arrangeTest({
          skillName: skillNameMock,
          hideModal: hideModalMock,
          verticalsWithCategories: verticalsWithCategoriesMock,
          skillPageSlugs: skillPageSlugsMock
        })

        fireEvent.click(screen.getByTestId('EditSkillNameModal-submitButton'))

        expect(
          await screen.findByText(
            'The skill Rust was successfully updated and merged into Rust.'
          )
        ).toBeInTheDocument()

        expect(hideModalMock).toHaveBeenCalled()
      })
    })

    describe('when failure without errors', () => {
      it('show merge confirmation prompt and does not update skills list', async () => {
        mockUseMutation.mockReturnValue([
          () => ({
            data: {
              updateSkillName: {
                success: false,
                requiresMergeConfirmation: true,
                errors: []
              }
            }
          }),
          { loading: false }
        ])

        arrangeTest({
          skillName: skillNameMock,
          hideModal: hideModalMock,
          verticalsWithCategories: verticalsWithCategoriesMock,
          skillPageSlugs: skillPageSlugsMock
        })

        fireEvent.click(screen.getByTestId('EditSkillNameModal-submitButton'))

        expect(
          await screen.findByTestId('EditSkillNameConfirmation-mock')
        ).toBeInTheDocument()

        expect(screen.queryAllByText('Merge Skill')).toHaveLength(2)

        expect(hideModalMock).not.toHaveBeenCalled()
      })
    })
  })

  describe('when not in merge flow', () => {
    describe('when success', () => {
      it('shows update notification and refresh skills list', async () => {
        mockUseMutation.mockReturnValue([
          () => ({
            data: {
              updateSkillName: {
                success: true,
                requiresMergeConfirmation: false,
                errors: []
              }
            }
          }),
          { loading: false }
        ])

        arrangeTest({
          skillName: skillNameMock,
          hideModal: hideModalMock,
          verticalsWithCategories: verticalsWithCategoriesMock,
          skillPageSlugs: skillPageSlugsMock
        })

        fireEvent.click(screen.getByTestId('EditSkillNameModal-submitButton'))

        expect(
          await screen.findByText('The skill Rust was successfully updated.')
        ).toBeInTheDocument()

        expect(hideModalMock).toHaveBeenCalled()
      })
    })

    describe('when error', () => {
      it('shows error notification and does not updates list', async () => {
        mockUseMutation.mockReturnValue([
          () => ({
            data: {
              updateSkillName: {
                success: false,
                requiresMergeConfirmation: false,
                errors: [
                  {
                    code: 'blah blah',
                    key: 'base',
                    message: "Attempted to update skill, but can't do it, sorry"
                  }
                ]
              }
            }
          }),
          { loading: false }
        ])

        arrangeTest({
          skillName: skillNameMock,
          hideModal: hideModalMock,
          verticalsWithCategories: verticalsWithCategoriesMock,
          skillPageSlugs: skillPageSlugsMock
        })

        fireEvent.click(screen.getByTestId('EditSkillNameModal-submitButton'))

        expect(
          await screen.findByText(
            "Attempted to update skill, but can't do it, sorry"
          )
        ).toBeInTheDocument()

        expect(hideModalMock).not.toHaveBeenCalled()
      })
    })
  })
})
