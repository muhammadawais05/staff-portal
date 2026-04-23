import React from 'react'
import { render } from '@testing-library/react'
import { when } from 'jest-when'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import JobDetailsInformation from './JobDetailsInformation'
import { GetJobDetailsInformationDocument } from './data/get-job-details-information/get-job-details-information.staff.gql.types'

const JOB_ID = 'job-123'

jest.mock('@staff-portal/data-layer-service')
jest.mock('../../components')
jest.mock('@staff-portal/engagements')

const mockUseQuery = useQuery as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobDetailsInformation jobId={JOB_ID} />
    </TestWrapper>
  )

describe('JobDetailsInformation', () => {
  it('displays skeleton loader when data is loading', () => {
    when(mockUseQuery)
      .calledWith(GetJobDetailsInformationDocument, expect.anything())
      .mockImplementation(() => ({
        data: undefined,
        loading: true
      }))

    const { getByTestId, queryByTestId } = arrangeTest()

    expect(getByTestId('job-details-information-loader')).toBeInTheDocument()
    expect(getByTestId('job-details-description-loader')).toBeInTheDocument()
    expect(queryByTestId('job-details-information')).toBeNull()
    expect(queryByTestId('job-details-description')).toBeNull()
  })
})
