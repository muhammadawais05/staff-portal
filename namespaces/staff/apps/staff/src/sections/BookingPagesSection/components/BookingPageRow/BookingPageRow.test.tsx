import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { DetailedList, WebResourceLink } from '@staff-portal/ui'

import BookingPageRow from './BookingPageRow'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  WebResourceLink: jest.fn()
}))

type Props = ComponentProps<typeof BookingPageRow>

const renderComponent = (props: Props) =>
  render(
    <TestWrapper>
      <DetailedList>
        <BookingPageRow {...props} />
      </DetailedList>
    </TestWrapper>
  )

const MockWebResourceLink = WebResourceLink as jest.Mock

describe('BookingPageRow', () => {
  beforeEach(() => {
    MockWebResourceLink.mockReturnValueOnce(null)
  })

  describe('when flags are not provided', () => {
    it('does not render flags', () => {
      const webResource = {
        text: ''
      }

      renderComponent({ code: '', webResource })

      expect(MockWebResourceLink).toHaveBeenCalledTimes(1)
      expect(MockWebResourceLink).toHaveBeenCalledWith(
        {
          link: webResource
        },
        {}
      )
      expect(
        screen.queryByTestId('booking-page-item-flags')
      ).not.toBeInTheDocument()
    })
  })

  describe('when flags are provided', () => {
    it('renders flags', () => {
      const webResource = {
        text: ''
      }
      const flags = 'flags'

      renderComponent({ code: '', webResource, flags })

      expect(MockWebResourceLink).toHaveBeenCalledTimes(1)
      expect(MockWebResourceLink).toHaveBeenCalledWith(
        {
          link: webResource
        },
        {}
      )
      expect(screen.getByTestId('booking-page-item-flags')).toHaveTextContent(
        flags
      )
    })
  })
})
