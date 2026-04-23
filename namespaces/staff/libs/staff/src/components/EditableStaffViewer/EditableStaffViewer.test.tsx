import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import EditableStaffViewer from './EditableStaffViewer'

const renderComponent = (props: ComponentProps<typeof EditableStaffViewer>) =>
  render(
    <TestWrapper>
      <EditableStaffViewer {...props} />
    </TestWrapper>
  )

describe('EditableStaffViewer', () => {
  describe('when a staff is passed', () => {
    it('renders link', () => {
      const fullName = 'Andrea Matus'
      const url = 'https://staging.toptal.net/platform/staff/staff/1391315'

      renderComponent({
        value: {
          fullName,
          webResource: { url, text: fullName }
        }
      })

      expect(screen.getByTestId('EditableStaffViewer-link')).toHaveTextContent(
        fullName
      )
      expect(screen.getByTestId('EditableStaffViewer-link')).toHaveAttribute(
        'href',
        url
      )
      expect(screen.getByTestId('EditableStaffViewer-link')).toHaveAttribute(
        'title',
        fullName
      )
    })
  })

  describe('when there is no staff', () => {
    it('does not render link', () => {
      renderComponent({
        value: undefined
      })

      expect(screen.getByTestId('EditableStaffViewer')).toHaveTextContent(
        NO_VALUE
      )
      expect(screen.queryByTestId('EditableStaffViewer-link')).toBeNull()
    })
  })
})
