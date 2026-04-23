import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import DashboardItemWrapper from '.'

const renderComponent = (
  props: ComponentProps<typeof DashboardItemWrapper>
) => {
  const defaultProps = {
    hasPaddingTop: false
  }

  return render(
    <TestWrapper>
      <DashboardItemWrapper {...defaultProps} {...props} />
    </TestWrapper>
  )
}

describe('DetailedListItem', () => {
  describe('mandatory props', () => {
    it('renders Components properly', () => {
      const { getByTestId, queryByTestId } = renderComponent({
        children: <div data-testid='content'>Example Content</div>,
        title: 'Example title'
      })

      expect(getByTestId('DashboardItemWrapper')).toBeInTheDocument()
      expect(getByTestId('DashboardItemWrapper-title')).toContainHTML(
        'Example title'
      )
      expect(getByTestId('content')).toBeInTheDocument()

      expect(
        queryByTestId('DashboardItemWrapper-actions')
      ).not.toBeInTheDocument()
      expect(
        queryByTestId('DashboardItemWrapper-subtitle')
      ).not.toBeInTheDocument()
    })
  })

  describe('when actions provided', () => {
    it('renders Actions properly', () => {
      const { getByTestId } = renderComponent({
        children: <div data-testid='content'>Example Content</div>,
        title: 'Example title',
        actions: 'Example Action'
      })

      expect(getByTestId('DashboardItemWrapper-actions')).toContainHTML(
        'Example Action'
      )
    })
  })

  describe('when subtitle provided', () => {
    it('renders Subtitle properly', () => {
      const { getByTestId } = renderComponent({
        children: <div data-testid='content'>Example Content</div>,
        title: 'Example title',
        subtitle: 'Example Subtitle'
      })

      expect(getByTestId('DashboardItemWrapper-subtitle')).toContainHTML(
        'Example Subtitle'
      )
    })
  })
})
