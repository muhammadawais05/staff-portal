import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import HighlightItemPreview from './HighlightItemPreview'

const renderComponent = ({
  title = 'Some Title',
  startDate,
  endDate,
  description
}: {
  title?: string
  startDate?: string | number | null
  endDate?: string | number | null
  description?: string | null
} = {}) =>
  render(
    <TestWrapper>
      <HighlightItemPreview
        title={title}
        description={description}
        startDate={startDate}
        endDate={endDate}
      />
    </TestWrapper>
  )

describe('HighlightItemPreview', () => {
  const DESCRIPTION = 'Some Description'
  const START_DATE = 2021
  const END_DATE = 2022

  it('shows highlight preview', () => {
    renderComponent({
      description: DESCRIPTION,
      startDate: START_DATE,
      endDate: END_DATE
    })

    expect(screen.getByText('Some Title')).toBeInTheDocument()
    expect(
      screen.getByText(`(${START_DATE} - ${END_DATE})`)
    ).toBeInTheDocument()
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument()
  })

  describe('when description is missing', () => {
    it('does not shows the description', () => {
      renderComponent({ startDate: START_DATE, endDate: END_DATE })

      expect(screen.getByText('Some Title')).toBeInTheDocument()
      expect(
        screen.getByText(`(${START_DATE} - ${END_DATE})`)
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('highlight-item-preview-description')
      ).not.toBeInTheDocument()
    })
  })

  describe('when start date is missing', () => {
    it('does not shows the date interval', () => {
      renderComponent({ endDate: END_DATE })

      expect(screen.getByText('Some Title')).toBeInTheDocument()
      expect(
        screen.queryByTestId('highlight-item-preview-interval')
      ).not.toBeInTheDocument()
    })
  })

  describe('when end date is missing', () => {
    it('does not shows the date interval', () => {
      renderComponent({ startDate: START_DATE })

      expect(screen.getByText('Some Title')).toBeInTheDocument()
      expect(screen.getByText(`(${START_DATE} - PRESENT)`)).toBeInTheDocument()
    })
  })
})
