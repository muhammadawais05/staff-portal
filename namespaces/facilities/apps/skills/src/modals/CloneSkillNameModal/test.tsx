import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'

import { createSkillNamesListItemFragmentMock } from '../../data/get-skill-names-list/mocks'
import CloneSkillNameModal, { Props } from './CloneSkillNameModal'

jest.mock('@staff-portal/data-layer-service')

jest.mock('../../components/SkillNameAutocomplete', () => ({
  __esModule: true,
  default: () => <div data-testid='SkillNameAutocomplete-mock' />
}))
jest.mock('./components/CloneSkillNameConfirmation', () => ({
  __esModule: true,
  default: () => <div data-testid='CloneSkillNameConfirmation-mock' />
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))

const mockUseMutation = useMutation as jest.Mock
const hideModalMock = jest.fn()

const arrangeTest = ({
  skillName = createSkillNamesListItemFragmentMock(),
  hideModal = hideModalMock
}: Partial<Props> = {}) =>
  render(<CloneSkillNameModal skillName={skillName} hideModal={hideModal} />)

describe('CloneSkillNameModal', () => {
  it('shows clone skill modal with input form', () => {
    mockUseMutation.mockReturnValue([() => {}])

    arrangeTest()

    expect(screen.getByTestId('SkillNameAutocomplete-mock')).toBeInTheDocument()

    expect(screen.queryAllByText('Clone Skill')).toHaveLength(2)
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  describe('when in merge flow', () => {
    describe('when success', () => {
      it('shows success merge notification and updates skills list', async () => {
        mockUseMutation.mockReturnValue([
          () => ({
            data: {
              cloneSkillName: {
                success: true,
                requiresMergeConfirmation: true,
                errors: []
              }
            }
          }),
          { loading: false }
        ])

        arrangeTest()

        fireEvent.click(screen.getByTestId('CloneSkillNameModal-submitButton'))

        expect(
          await screen.findByText(
            'The skill Rust was successfully cloned and merged into Rust.'
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
              cloneSkillName: {
                success: false,
                requiresMergeConfirmation: true,
                errors: []
              }
            }
          }),
          { loading: false }
        ])

        arrangeTest()

        fireEvent.click(screen.getByTestId('CloneSkillNameModal-submitButton'))

        expect(
          await screen.findByTestId('CloneSkillNameConfirmation-mock')
        ).toBeInTheDocument()

        expect(screen.queryAllByText('Merge Skill')).toHaveLength(2)

        expect(hideModalMock).not.toHaveBeenCalled()
      })
    })
  })

  describe('when not in merge flow', () => {
    describe('when success', () => {
      it('shows clone notification and updates skills list', async () => {
        mockUseMutation.mockReturnValue([
          () => ({
            data: {
              cloneSkillName: {
                success: true,
                requiresMergeConfirmation: false,
                errors: []
              }
            }
          }),
          { loading: false }
        ])

        arrangeTest()

        fireEvent.click(screen.getByTestId('CloneSkillNameModal-submitButton'))

        expect(
          await screen.findByText(
            'The skill Rust was successfully cloned as Rust'
          )
        ).toBeInTheDocument()

        expect(hideModalMock).toHaveBeenCalled()
      })
    })

    describe('when error', () => {
      it('shows error notification and does not updates list', async () => {
        mockUseMutation.mockReturnValue([
          () => ({
            data: {
              cloneSkillName: {
                success: false,
                requiresMergeConfirmation: false,
                errors: [
                  {
                    code: 'attempted to clone and merge into an unchecked skill, which is not permitted.',
                    key: 'base',
                    message:
                      'Attempted to clone and merge into an unchecked skill, which is not permitted.'
                  }
                ]
              }
            }
          }),
          { loading: false }
        ])

        arrangeTest()

        fireEvent.click(screen.getByTestId('CloneSkillNameModal-submitButton'))

        expect(
          await screen.findByText(
            'Attempted to clone and merge into an unchecked skill, which is not permitted.'
          )
        ).toBeInTheDocument()

        expect(hideModalMock).not.toHaveBeenCalled()
      })
    })
  })
})
