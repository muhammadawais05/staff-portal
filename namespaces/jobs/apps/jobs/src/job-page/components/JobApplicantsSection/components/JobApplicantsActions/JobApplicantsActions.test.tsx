import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobApplicantsActions from './JobApplicantsActions'

const jobApplicationId = 'job-application-id'
const expandItem = () => {}
const isExpanded = false

const arrangeTest = (props: ComponentProps<typeof JobApplicantsActions>) =>
  render(
    <TestWrapper>
      <JobApplicantsActions {...props} />
    </TestWrapper>
  )

describe('JobApplicantsActions', () => {
  describe('when the new resume page is enabled for client', () => {
    it('displays the view resume button', () => {
      arrangeTest({
        jobApplicationId,
        jobSpecificResumeUrl: 'https://new.resume.url',
        talentResumeUrl: 'https://public.resume.url',
        expandItem,
        isExpanded
      })

      expect(screen.getByText('View Resume')).toBeInTheDocument()
      expect(screen.queryByText('Public Profile')).not.toBeInTheDocument()
    })
  })

  describe('when a new resume page url equals to a public profile url', () => {
    it('displays the public profile button', () => {
      arrangeTest({
        jobApplicationId,
        jobSpecificResumeUrl: 'https://public.resume.url',
        talentResumeUrl: 'https://public.resume.url',
        expandItem,
        isExpanded
      })

      expect(screen.getByText('Public Profile')).toBeInTheDocument()
      expect(screen.queryByText('View Resume')).not.toBeInTheDocument()
    })
  })
})
