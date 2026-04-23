import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import RelatedJobApplicationSection from './RelatedJobApplicationSection'
import { RelatedJobApplicationFragment } from '../../data/related-job-application-fragment'
import { buildRelatedJobApplication } from '../../utils'

jest.mock('../../utils', () => ({
  buildRelatedJobApplication: jest.fn()
}))

const buildRelatedJobApplicationMock = buildRelatedJobApplication as jest.Mock<
  ReturnType<typeof buildRelatedJobApplication>
>

const renderComponent = (
  relatedJobApplication: RelatedJobApplicationFragment,
  applicationComment?: string | null
) => {
  buildRelatedJobApplicationMock.mockImplementation(() => ({
    applicationComment,
    renderDescription: () => <div data-testid='job-application-description' />
  }))

  return render(
    <TestWrapper>
      <RelatedJobApplicationSection
        relatedJobApplication={relatedJobApplication}
      />
    </TestWrapper>
  )
}

describe('RelatedJobApplicationSection', () => {
  it('renders description component', () => {
    renderComponent({ id: 'some-id' } as RelatedJobApplicationFragment)

    expect(
      screen.getByTestId('job-application-description')
    ).toBeInTheDocument()
  })

  describe('when there is no `applicationComment`', () => {
    it('does not render `applicationComment`', () => {
      renderComponent(
        {
          id: 'some-id'
        } as RelatedJobApplicationFragment,
        null
      )

      expect(
        screen.queryByTestId('related-job-application-comment')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is `applicationComment`', () => {
    it('renders `applicationComment`', () => {
      renderComponent(
        {
          id: 'some-id'
        } as RelatedJobApplicationFragment,
        'some comment'
      )

      expect(screen.queryByText('some comment')).toBeInTheDocument()
    })
  })
})
