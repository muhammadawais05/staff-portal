import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  ContainerLoader,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { Container } from '@toptal/picasso'

import BookingPagesSection from './BookingPagesSection'
import { BookingPageRow } from './components'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  SectionWithDetailedListSkeleton: jest.fn(),
  ContainerLoader: jest.fn()
}))
jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  BookingPageRow: jest.fn()
}))

type Props = ComponentProps<typeof BookingPagesSection>

const renderComponent = (props: Props) =>
  render(
    <TestWrapper>
      <BookingPagesSection {...props} />
    </TestWrapper>
  )

const MockContainerLoader = ContainerLoader as jest.Mock
const MockBookingPageItem = BookingPageRow as jest.Mock
const MockSectionWithDetailedListSkeleton =
  SectionWithDetailedListSkeleton as jest.Mock

describe('BookingPagesSection', () => {
  beforeEach(() => {
    MockContainerLoader.mockImplementationOnce(({ children }) => (
      <>{children}</>
    ))
    MockBookingPageItem.mockReturnValueOnce(null)
  })

  const loading = {} as boolean
  const initialLoading = {} as boolean

  describe('when meetingSchedulers are not provided', () => {
    it('does not render section', () => {
      renderComponent({ loading, initialLoading })

      expect(MockContainerLoader).toHaveBeenCalledTimes(1)
      expect(MockContainerLoader).toHaveBeenCalledWith(
        {
          loading,
          showSkeleton: initialLoading,
          skeletonComponent: expect.objectContaining({
            type: MockSectionWithDetailedListSkeleton,
            props: {
              title: 'Booking Pages',
              items: 1,
              columns: 1
            }
          }),
          children: false
        },
        {}
      )
      expect(MockBookingPageItem).toHaveBeenCalledTimes(0)
    })
  })

  describe('when meetingSchedulers provided', () => {
    it('renders section', () => {
      const meetingSchedule = {
        code: 'key',
        webResource: {
          text: ''
        }
      }
      const meetingSchedulers = {
        totalCount: 1,
        nodes: [meetingSchedule]
      }

      renderComponent({ loading, initialLoading, meetingSchedulers })

      expect(MockContainerLoader).toHaveBeenCalledTimes(1)
      expect(MockContainerLoader).toHaveBeenCalledWith(
        {
          loading,
          showSkeleton: initialLoading,
          skeletonComponent: expect.objectContaining({
            type: MockSectionWithDetailedListSkeleton,
            props: {
              title: 'Booking Pages',
              items: 1,
              columns: 1
            }
          }),
          children: expect.objectContaining({
            type: Container
          })
        },
        {}
      )
      expect(MockBookingPageItem).toHaveBeenCalledTimes(1)
      expect(MockBookingPageItem).toHaveBeenCalledWith(meetingSchedule, {})
    })
  })
})
