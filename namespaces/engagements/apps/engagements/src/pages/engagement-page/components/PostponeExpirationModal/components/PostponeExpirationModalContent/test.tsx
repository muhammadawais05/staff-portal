import { when } from 'jest-when'
import React, { ComponentProps } from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@toptal/picasso/test-utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { PostponeEngagementExpirationDocument } from '../../data/postpone-engagement-expiration/postpone-engagement-expiration.staff.gql.types'
import PostponeExpirationModalContent from './PostponeExpirationModalContent'

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

const component = 'postpone-expiration-form'

jest.mock('@staff-portal/forms/FormDatePickerWrapper', () => ({
  __esModule: true,
  default: () => <div data-testid={`${component}-expiration-date`} />
}))

const hideModalMock = jest.fn()

const arrangeTest = (
  props?: Partial<ComponentProps<typeof PostponeExpirationModalContent>>
) => {
  const defaultProps: ComponentProps<typeof PostponeExpirationModalContent> = {
    engagementId: '123',
    hideModal: hideModalMock
  }

  return render(
    <TestWrapper>
      <PostponeExpirationModalContent {...defaultProps} {...props} />
    </TestWrapper>
  )
}

describe('PostponeExpirationModalContent', () => {
  beforeEach(() => {
    hideModalMock.mockClear()
  })

  it('postpones Engagement Expiration', async () => {
    when(mockUseMutation)
      .calledWith(PostponeEngagementExpirationDocument, expect.anything())
      .mockImplementation(() => [
        () => ({
          data: {
            postponeEngagementExpiration: {
              success: true,
              errors: []
            }
          }
        }),
        { loading: false }
      ])

    arrangeTest()

    expect(
      screen.queryByTestId(`${component}-expiration-date`)
    ).toBeInTheDocument()

    userEvent.type(screen.getByLabelText(/Comment/), 'some comment')

    userEvent.click(screen.getByTestId(`${component}-submit-button`))

    expect(
      await screen.findByText('Interview expiration was postponed.')
    ).toBeInTheDocument()
    expect(hideModalMock).toHaveBeenCalledTimes(1)
  })
})
