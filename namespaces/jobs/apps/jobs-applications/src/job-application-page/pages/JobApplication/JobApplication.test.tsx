import React from 'react'
import { render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { MemoryRouter } from '@staff-portal/navigation'
import ContentWrapper from '@staff-portal/page-wrapper'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { createGetJobApplicationMock } from '../../data/get-job-application/mocks'
import { useGetJobApplicationIdParam } from './hooks'
import JobApplication from './JobApplication'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/page-wrapper', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))

jest.mock('../../components', () => ({
  ...jest.requireActual('../../components'),
  JobApplicationActions: () => <div data-testid='job-application-actions' />,
  JobApplicationContent: () => <div data-testid='job-application-content' />
}))

jest.mock('./hooks', () => ({
  useGetJobApplicationIdParam: jest.fn()
}))

const ContentWrapperMock = ContentWrapper as jest.Mock
const useGetJobApplicationIdParamMock = useGetJobApplicationIdParam as jest.Mock
const useGetNodeMock = useGetNode as jest.Mock
const useMessageListenerMock = useMessageListener as jest.Mock

const TEST_ID = 'TEST_ID'
const jobApplicationMock = createGetJobApplicationMock({ id: TEST_ID })

const arrangeTest = () =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <JobApplication />
      </TestWrapper>
    </MemoryRouter>
  )

describe('JobApplication', () => {
  beforeEach(() => {
    ContentWrapperMock.mockImplementation(({ children, actions }) => (
      <>
        <div>{actions}</div>
        <div>{children}</div>
      </>
    ))

    useGetJobApplicationIdParamMock.mockReturnValue(TEST_ID)
    useGetNodeMock.mockImplementation(() => () => ({
      loading: false,
      data: jobApplicationMock
    }))
  })

  it('receives correct props', () => {
    const { getByTestId } = arrangeTest()

    expect(ContentWrapperMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Job Application',
        browserTitle: 'Job Application'
      }),
      expect.anything()
    )

    expect(getByTestId('job-application-actions')).toBeInTheDocument()
  })

  it('requests data to be displayed', () => {
    arrangeTest()

    expect(useGetJobApplicationIdParamMock).toHaveBeenCalledTimes(1)
    expect(useGetNodeMock).toHaveBeenCalledTimes(1)
    expect(useMessageListenerMock).toHaveBeenCalledTimes(1)
  })

  it('renders skeleton loader while fetching data', () => {
    useGetNodeMock.mockImplementation(() => () => ({
      loading: true,
      data: undefined
    }))

    const { getByTestId } = arrangeTest()

    expect(getByTestId('job-application-skeleton-loader')).toBeInTheDocument()
  })

  it('renders job application content', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId('job-application-content')).toBeInTheDocument()
  })
})
