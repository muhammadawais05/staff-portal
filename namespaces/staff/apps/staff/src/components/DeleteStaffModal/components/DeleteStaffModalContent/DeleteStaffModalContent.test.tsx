import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DeleteStaffModalContent from './DeleteStaffModalContent'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  decodeEntityId: () => ''
}))
jest.mock('@staff-portal/routes', () => ({
  getTasksPath: () => ''
}))

const renderComponent = (
  props: ComponentProps<typeof DeleteStaffModalContent>
) =>
  render(
    <TestWrapper>
      <DeleteStaffModalContent {...props} />
    </TestWrapper>
  )

describe('DeleteStaffModalContent', () => {
  const fullName = 'fullName'
  const staffId = 'staffId'

  describe('when staff has pending tasks', () => {
    it('renders alert', () => {
      const hasPendingTasks = true

      renderComponent({
        fullName,
        hasPendingTasks,
        staffId
      })

      expect(screen.getByTestId('delete-staff-text-message')).toHaveTextContent(
        `Are you sure you want to delete the Staff account for ${fullName}?`
      )
      expect(
        screen.queryByTestId('delete-staff-text-alert')
      ).toBeInTheDocument()
    })
  })

  describe('when staff does not have pending tasks', () => {
    it('does not render alert', () => {
      renderComponent({
        fullName,
        staffId
      })

      expect(
        screen.queryByTestId('delete-staff-text-alert')
      ).not.toBeInTheDocument()
    })
  })
})
