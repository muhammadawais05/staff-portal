import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { JobWorkType, Scalars } from '@staff-portal/graphql/staff'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetOperation } from '@staff-portal/operations'

import CloneJobModal from './CloneJobModal'
import { GetCloneJobInfoQuery } from './data/get-clone-job-info.staff.gql.types'
import useCloneJobMutation from './hooks/use-clone-job-mutation'

jest.mock('./hooks/use-clone-job-mutation')
jest.mock('@staff-portal/data-layer-service')

jest.mock('@staff-portal/operations', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/operations'),
  useGetOperation: jest.fn()
}))

const useQueryMock = useQuery as jest.Mock
const useCloneJobMutationMock = useCloneJobMutation as jest.Mock
const useGetOperationMock = useGetOperation as jest.Mock
const JOB_ID = 'job-id'
const SPECIALIZATION_ID = 'specialization-123'
const START_DATE: Scalars['Date'] = '2021-11-10'
const LONGSHOT_REASONS = ['Some longshot reason']
const JOB_LOCATION = {
  cityName: 'City name',
  country: {
    id: 'country-id'
  }
}

const getCloneJobInfoMock = (
  props?: Partial<GetCloneJobInfoQuery>
): GetCloneJobInfoQuery => ({
  node: {
    id: JOB_ID,
    availableSpecializations: {
      nodes: [
        { id: SPECIALIZATION_ID, title: 'Core' },
        { id: 'specialization-456', title: 'AR/VR' }
      ]
    },
    toptalProjects: true,
    specialization: { id: SPECIALIZATION_ID },
    skillLongShot: false,
    startDate: START_DATE,
    workType: JobWorkType.REMOTE,
    location: JOB_LOCATION,
    longshotReasons: LONGSHOT_REASONS,
    ...props
  },
  jobLongshotReasons: LONGSHOT_REASONS
})

const arrangeTest = () =>
  render(
    <TestWrapper>
      <CloneJobModal jobId={JOB_ID} hideModal={() => {}} />
    </TestWrapper>
  )

describe('CloneJobModal', () => {
  it('submits the cloned job', async () => {
    const handleSubmitMock = jest.fn()

    useQueryMock.mockReturnValue({
      data: getCloneJobInfoMock()
    })

    useCloneJobMutationMock.mockReturnValue({
      handleSubmit: handleSubmitMock,
      mutationLoading: false
    })

    useGetOperationMock.mockReturnValue({ enabled: true, loading: false })

    arrangeTest()

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Clone Job/i }))
    })

    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
    expect(handleSubmitMock).toHaveBeenCalledWith(
      {
        specializationId: SPECIALIZATION_ID,
        startDate: START_DATE,
        toptalProjects: 'true',
        location: {
          cityName: JOB_LOCATION.cityName,
          countryId: JOB_LOCATION.country.id
        },
        longshotReasons: LONGSHOT_REASONS
      },
      expect.anything(),
      expect.anything()
    )
  })
})
