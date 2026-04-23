import { fireEvent } from '@toptal/picasso/test-utils'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { createSkillNamesListItemFragmentMock } from '../../data/get-skill-names-list/mocks'
import DeleteSkillNameModal, { Props } from './DeleteSkillNameModal'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))

const mockUseMutation = useMutation as jest.Mock
const skillNameMock = createSkillNamesListItemFragmentMock()
const hideModalMock = jest.fn()

const arrangeTest = ({ skillNameId, hideModal }: Props) =>
  render(
    <TestWrapper>
      <DeleteSkillNameModal skillNameId={skillNameId} hideModal={hideModal} />
    </TestWrapper>
  )

describe('DeleteSkillNameModal', () => {
  it('renders prompt modal', () => {
    mockUseMutation.mockReturnValue([() => {}])

    arrangeTest({ skillNameId: skillNameMock.id, hideModal: hideModalMock })

    expect(
      screen.getByTestId('DeleteSkillNameModal-content')
    ).toBeInTheDocument()
  })

  describe('when successfully deleted', () => {
    it('shows success delete notification', async () => {
      mockUseMutation.mockReturnValue([
        () => ({
          data: {
            removeSkillName: {
              success: true,
              errors: []
            }
          }
        }),
        { loading: false }
      ])

      arrangeTest({ skillNameId: skillNameMock.id, hideModal: hideModalMock })

      fireEvent.click(screen.getByText('Delete Skill', { selector: 'span' }))

      expect(
        await screen.findByText('The Skill was successfully deleted.')
      ).toBeInTheDocument()

      expect(hideModalMock).toHaveBeenCalled()
    })
  })

  describe('when error', () => {
    it('show failed delete notification', async () => {
      mockUseMutation.mockReturnValue([
        () => ({
          data: {
            removeSkillName: {
              success: false,
              errors: [
                {
                  code: 'some_error',
                  key: 'base',
                  message: 'Error message'
                }
              ]
            }
          }
        }),
        { loading: false }
      ])

      arrangeTest({ skillNameId: skillNameMock.id, hideModal: hideModalMock })

      fireEvent.click(screen.getByText('Delete Skill', { selector: 'span' }))

      expect(await screen.findByText('Error message')).toBeInTheDocument()

      expect(hideModalMock).toHaveBeenCalled()
    })
  })
})
