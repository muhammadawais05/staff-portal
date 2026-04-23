import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { Button } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import ApproveCommitmentChangeRequestButton from './ApproveCommitmentChangeRequestButton'

jest.mock('@staff-portal/jobs', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

const ButtonMock = Button as unknown as jest.Mock

const defaultProps: ComponentProps<
  typeof ApproveCommitmentChangeRequestButton
> = {
  jobId: 'job-id',
  commitmentChangeRequestId: 'some-id',
  disabled: false
}

describe('ApproveCommitmentChangeRequestButton', () => {
  beforeEach(() => {
    ButtonMock.mockImplementation(() => <div />)
  })

  it('renders as expected', () => {
    const { disabled } = defaultProps

    render(
      <TestWrapper>
        <ApproveCommitmentChangeRequestButton {...defaultProps} />
      </TestWrapper>
    )

    expect(ButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({ disabled }),
      expect.anything()
    )
  })

  it('passes disabled state to the `Button`', () => {
    render(
      <TestWrapper>
        <ApproveCommitmentChangeRequestButton
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
