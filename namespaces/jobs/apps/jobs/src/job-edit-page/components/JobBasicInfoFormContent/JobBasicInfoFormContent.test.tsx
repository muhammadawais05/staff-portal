/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'

import JobBasicInfoFormContent from './JobBasicInfoFormContent'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    Input: ({ required, name }: any) => (
      <input name={name} required={required} data-testid={`field-${name}`} />
    )
  }
}))

jest.mock('@staff-portal/forms', () => ({
  FormDatePickerWrapper: ({ required, name }: any) => (
    <input name={name} required={required} data-testid={`field-${name}`} />
  )
}))
jest.mock('@staff-portal/jobs', () => ({
  JobStatus: () => <div data-testid='JobStatus' />
}))

jest.mock('./components', () => ({
  JobTypeSelect: () => <div data-testid='JobTypeSelect' />,
  JobSpecializationSelect: () => <div data-testid='JobSpecializationSelect' />,
  JobDesiredStartDateSelect: () => (
    <div data-testid='JobDesiredStartDateSelect' />
  )
}))

jest.mock('@staff-portal/date-time-utils')

const getDateDistanceFromNowMock = getDateDistanceFromNow as jest.Mock

const arrangeTests = (job: any = {}) =>
  render(
    <TestWrapper>
      <JobBasicInfoFormContent job={job} />
    </TestWrapper>
  )

describe('JobBasicInfoFormContent', () => {
  it('renders Job Title', () => {
    const { getByTestId } = arrangeTests()

    expect(getByTestId('field-title')).toBeInTheDocument()
    expect(getByTestId('field-title')).toHaveAttribute('required')
  })

  it('renders Status', () => {
    const { getByTestId } = arrangeTests()

    expect(getByTestId('JobStatus')).toBeInTheDocument()
  })

  it('renders Job Posted', () => {
    const postedAt = 'postedAt'

    arrangeTests({ postedAt })

    expect(getDateDistanceFromNowMock).toHaveBeenCalledWith(postedAt)
  })

  it('renders Desired Start Date', () => {
    const { getByTestId } = arrangeTests({ startDate: 'startDate' })

    expect(getByTestId('JobDesiredStartDateSelect')).toBeInTheDocument()
  })

  it('renders Job Type', () => {
    const { getByTestId } = arrangeTests()

    expect(getByTestId('JobTypeSelect')).toBeInTheDocument()
  })

  describe('when job has a claimer', () => {
    it('renders Specialization', () => {
      const { getByTestId } = arrangeTests({ claimer: {} })

      expect(getByTestId('JobSpecializationSelect')).toBeInTheDocument()
    })
  })

  describe('when job does not have a claimer', () => {
    it('does not render Specialization', () => {
      const { queryByTestId } = arrangeTests()

      expect(queryByTestId('JobSpecializationSelect')).not.toBeInTheDocument()
    })
  })
})
