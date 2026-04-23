import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { Button } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import RejectCommitmentChangeRequestButton from './RejectCommitmentChangeRequestButton'

jest.mock('@staff-portal/jobs', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@staff-portal/communication-send-email', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

const ButtonMock = Button as unknown as jest.Mock

const defaultProps: ComponentProps<typeof RejectCommitmentChangeRequestButton> =
  {
    jobId: '123',
    jobTitle: 'job-title',
    commitmentChangeRequestId: 'some-id',
    disabled: false
  }

describe('RejectCommitmentChangeRequestButton', () => {
  beforeEach(() => {
    ButtonMock.mockImplementation(() => <div />)
  })
  it('renders as expected', () => {
    render(
      <TestWrapper>
        <RejectCommitmentChangeRequestButton {...defaultProps} />
      </TestWrapper>
    )

    expect(ButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({ disabled: false }),
      expect.anything()
    )
  })

  it('passes disabled state to the `Button`', () => {
    render(
      <TestWrapper>
        <RejectCommitmentChangeRequestButton
          {...defaultProps}
          disabled={true}
        />
      </TestWrapper>
    )

    expect(ButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({ disabled: true }),
      expect.anything()
    )
  })
})
