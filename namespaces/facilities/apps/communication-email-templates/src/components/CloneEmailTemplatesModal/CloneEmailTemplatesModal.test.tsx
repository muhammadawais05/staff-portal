import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TestWrapper } from '@staff-portal/test-utils'

import CloneEmailTemplatesModal from './CloneEmailTemplatesModal'
import { useCloneEmailTemplates, useGetEmailTemplateTargetRoles } from './data'

jest.mock('./data', () => ({
  useCloneEmailTemplates: jest.fn(),
  useGetEmailTemplateTargetRoles: jest.fn()
}))

const mockUseCloneEmailTemplates = useCloneEmailTemplates as jest.Mock
const mockUseGetEmailTemplateTargetRoles =
  useGetEmailTemplateTargetRoles as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <CloneEmailTemplatesModal hideModal={() => {}} />
    </TestWrapper>
  )

describe('CloneEmailTemplatesModal', () => {
  it('clones the email templates', async () => {
    const ORIGINAL_VERTICAL = { text: 'Vertical Original', value: '123' }
    const DESTINATION_VERTICAL = { text: 'Vertical Destination', value: '456' }
    const mutationMock = jest.fn(() =>
      Promise.resolve({
        data: {
          cloneTargetRoleEmailTemplates: {
            success: true,
            errors: []
          }
        }
      })
    )

    mockUseGetEmailTemplateTargetRoles.mockReturnValue({
      originalsOptions: [ORIGINAL_VERTICAL],
      destinationsOptions: [DESTINATION_VERTICAL],
      loading: false
    })
    mockUseCloneEmailTemplates.mockReturnValue([mutationMock])

    arrangeTest()

    userEvent.click(screen.getByLabelText(/Original Vertical/))
    userEvent.click(await screen.findByText(ORIGINAL_VERTICAL.text))

    userEvent.click(screen.getByLabelText(/Destination Vertical/))
    userEvent.click(await screen.findByText(DESTINATION_VERTICAL.text))

    userEvent.click(
      screen.getByRole('button', {
        name: 'Clone Email Templates'
      })
    )

    expect(mutationMock).toHaveBeenCalledWith({
      variables: {
        input: {
          originalTargetRole: ORIGINAL_VERTICAL.value,
          destinationTargetRole: DESTINATION_VERTICAL.value
        }
      }
    })
  })
})
