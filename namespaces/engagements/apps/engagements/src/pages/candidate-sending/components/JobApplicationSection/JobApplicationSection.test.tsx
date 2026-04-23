import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import { RelatedJobApplicationFragment } from '../../data/related-job-application-fragment'
import { buildRelatedJobApplication } from '../../utils'
import JobApplicationSection from './JobApplicationSection'

jest.mock('../../utils', () => ({
  buildRelatedJobApplication: jest.fn()
}))

const buildRelatedJobApplicationMock = buildRelatedJobApplication as jest.Mock<
  ReturnType<typeof buildRelatedJobApplication>
>

type Props = {
  applicationComment?: string | null
}

const renderComponent = ({ applicationComment }: Props) => {
  buildRelatedJobApplicationMock.mockImplementation(() => ({
    applicationComment,
    renderDescription: () => <div data-testid='job-application-description' />
  }))

  return render(
    <TestWrapper>
      <JobApplicationSection
        relatedJobApplication={{ id: 'id' } as RelatedJobApplicationFragment}
      />
    </TestWrapper>
  )
}

describe('JobApplicationSection', () => {
  describe('when `applicationComment`', () => {
    it('renders comment', () => {
      renderComponent({
        applicationComment: 'some comment'
      })

      expect(
        screen.getByTestId('job-application-description')
      ).toBeInTheDocument()
      expect(screen.getByText('some comment')).toBeInTheDocument()
    })
  })
})
