/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import JobEditForm from './JobEditForm'
import { getInitialValues } from './utils/get-initial-values'

jest.mock('./utils/get-initial-values')
jest.mock('../JobBasicInfoFormContent', () => ({
  __esModule: true,
  default: () => <div data-testid='JobBasicInfoFormContent' />
}))
jest.mock('../JobDetailsFormContent', () => ({
  __esModule: true,
  default: () => <div data-testid='JobDetailsFormContent' />
}))
jest.mock('../JobSkillsFields', () => ({
  __esModule: true,
  default: () => <div data-testid='JobSkillSets' />
}))

const getInitialValuesMock = getInitialValues as jest.Mock

const arrangeTest = (job: any = { webResource: {} }) =>
  render(
    <TestWrapperWithMocks>
      <JobEditForm job={job} />
    </TestWrapperWithMocks>
  )

describe('#JobEditForm', () => {
  it('calls `getInitialValues` with the job', () => {
    const job = { webResource: {} }

    arrangeTest(job)

    expect(getInitialValuesMock).toHaveBeenCalledWith(job)
  })

  it('renders JobBasicInfoFormContent', () => {
    arrangeTest()

    expect(screen.getByTestId('JobBasicInfoFormContent')).toBeInTheDocument()
  })

  it('renders JobDetailsFormContent', () => {
    arrangeTest()

    expect(screen.getByTestId('JobDetailsFormContent')).toBeInTheDocument()
  })
})
