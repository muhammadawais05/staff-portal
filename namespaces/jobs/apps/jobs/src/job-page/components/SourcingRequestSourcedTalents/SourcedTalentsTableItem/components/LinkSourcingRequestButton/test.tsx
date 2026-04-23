import React from 'react'
import { render } from '@testing-library/react'
import { when } from 'jest-when'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationType } from '@staff-portal/operations'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { LINK_SOURCING_REQUEST } from './data/link-sourcing-request'
import LinkSourcingRequestButton from '.'

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}
const JOB_ID = 'JOB_ID'
const TALENT_ID = 'TALENT_ID'

jest.mock('@staff-portal/data-layer-service')
jest.mock(
  '@staff-portal/talents-app/src/sourcing-requests-tab/components/LinkSourcingRequestModal/data/link-sourcing-request',
  () => ({
    __esModule: true,
    default: () => jest.fn(),
    useLinkSourcingRequest: () => jest.fn()
  })
)
jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(LINK_SOURCING_REQUEST, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          linkSourcingRequest: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
}

const arrangeTest = ({
  jobId,
  operation,
  talentId
}: {
  jobId: string
  operation: OperationType
  talentId: string
}) =>
  render(
    <TestWrapper>
      <LinkSourcingRequestButton
        jobId={jobId}
        operation={operation}
        talentId={talentId}
      />
    </TestWrapper>
  )

describe('Link Sourcing request button', () => {
  it('shows a link button', () => {
    mockSuccessImplementation()
    const { getByText } = arrangeTest({
      jobId: JOB_ID,
      operation: OPERATION,
      talentId: TALENT_ID
    })

    expect(getByText('Link')).toBeInTheDocument()
  })
  it('shows a disabled link button', () => {
    mockSuccessImplementation()
    const { getByText, getByTestId } = arrangeTest({
      jobId: JOB_ID,
      operation: Object.assign({}, OPERATION, {
        callable: OperationCallableTypes.DISABLED
      }),
      talentId: TALENT_ID
    })

    expect(getByText('Link')).toBeInTheDocument()
    expect(getByTestId('link-sourcing-request-button')).toBeDisabled()
  })
})
