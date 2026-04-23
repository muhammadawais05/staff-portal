import React from 'react'
import { render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { ContainerLoader } from '@staff-portal/ui'

import JobsList from '../CompanyJobs/components/JobsList/JobsList'
import CompanyJobs from './CompanyJobs'

jest.mock('../CompanyJobs/components/JobsList/JobsList')
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  ContainerLoader: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useGetNode: jest.fn()
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  defineMessage: jest.fn(),
  useMessageListener: jest.fn()
}))

const useGetNodeMock = useGetNode as jest.Mock
const jobsListMock = JobsList as jest.Mock
const containerLoaderMock = ContainerLoader as jest.Mock

const getHookResponse =
  (data: object, loading = false) =>
  () => ({
    data,
    loading: loading,
    initialLoading: loading
  })

const clientId = '12345'

describe('Company job', () => {
  beforeEach(() => {
    jobsListMock.mockReturnValue(<div>jobs list</div>)
    containerLoaderMock.mockImplementation(({ children }) => children)
  })

  describe('jobs are loaded', () => {
    it('jobs are present', () => {
      useGetNodeMock.mockReturnValue(
        getHookResponse({
          jobs: {
            nodes: ['job1', 'job2', 'job3']
          }
        })
      )

      render(
        <TestWrapper>
          <CompanyJobs clientId={clientId} />
        </TestWrapper>
      )

      expect(jobsListMock).toHaveBeenCalledTimes(1)
      expect(jobsListMock).toHaveBeenCalledWith(
        expect.objectContaining({
          jobs: ['job1', 'job2', 'job3']
        }),
        {}
      )
    })

    it('jobs list is empty', () => {
      useGetNodeMock.mockReturnValue(
        getHookResponse({
          jobs: {
            nodes: []
          }
        })
      )

      render(
        <TestWrapper>
          <CompanyJobs clientId={clientId} />
        </TestWrapper>
      )

      expect(jobsListMock).toHaveBeenCalledTimes(0)
    })
  })

  describe('jobs are loading', () => {
    it('loader is visible', () => {
      useGetNodeMock.mockReturnValue(getHookResponse({}, true))

      render(
        <TestWrapper>
          <CompanyJobs clientId={clientId} />
        </TestWrapper>
      )

      expect(containerLoaderMock).toHaveBeenCalledTimes(1)
      expect(containerLoaderMock).toHaveBeenCalledWith(
        expect.objectContaining({
          loading: true,
          showSkeleton: true
        }),
        {}
      )
    })
  })
})
