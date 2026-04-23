import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetNode } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { createGetJobListItemMock } from './data/get-job-list-item/mocks'
import JobListItem from './JobListItem'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))

jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  JobItemDetails: () => <div data-testid='job-list-item-details' />,
  JobItemListHeaderActions: () => (
    <div data-testid='job-list-item-header-actions' />
  )
}))

const useGetNodeMock = useGetNode as jest.Mock
const useMessageListenerMock = useMessageListener as jest.Mock

const TEST_ID = 'TEST_ID'
const jobListItemMock = createGetJobListItemMock(TEST_ID)

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobListItem jobId={TEST_ID} />
    </TestWrapper>
  )

describe('JobListItem', () => {
  beforeEach(() => {
    useGetNodeMock.mockImplementation(() => () => ({
      loading: false,
      data: jobListItemMock
    }))
  })

  it('requests data to be displayed', () => {
    arrangeTest()

    expect(useGetNodeMock).toHaveBeenCalledTimes(1)
    expect(useMessageListenerMock).toHaveBeenCalledTimes(1)
  })

  it('renders skeleton loader while loading', () => {
    useGetNodeMock.mockImplementation(() => () => ({
      loading: true,
      data: undefined
    }))

    const { getByTestId } = arrangeTest()

    expect(getByTestId('job-list-item-skeleton-loader')).toBeInTheDocument()
  })

  it('renders job description if available', () => {
    const { container } = arrangeTest()

    // getByTestId returns multiple elements with this testid
    // the containing div also gets the testid, so make the selector more specific
    const jobTitle = container.querySelector('a[data-testid="job-list-item-title"]')

    expect(jobTitle).toHaveTextContent(jobListItemMock.title)
    expect(jobTitle).toHaveAttribute('href', jobListItemMock.webResource.url)
    expect(screen.queryByText(jobListItemMock.description)).toBeInTheDocument()
  })
})
