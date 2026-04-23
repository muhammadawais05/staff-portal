import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import RestoreStaffModalContent from './RestoreStaffModalContent'

const renderComponent = (
  props: ComponentProps<typeof RestoreStaffModalContent>
) =>
  render(
    <TestWrapper>
      <RestoreStaffModalContent {...props} />
    </TestWrapper>
  )

describe('RestoreStaffModalContent', () => {
  it('renders message', () => {
    const fullName = 'fullName'

    renderComponent({
      fullName
    })

    expect(screen.getByTestId('restore-staff-text-message')).toHaveTextContent(
      `Are you sure you want to restore the Staff account for ${fullName}?`
    )
  })
})
