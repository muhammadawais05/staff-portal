import { render } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  DeleteContractButton,
  ResendContractButton,
  VerifyContractButton
} from '@staff-portal/contracts'

import JobContractItemHeader, { Props } from './JobContractItemHeader'
import { createJobContractFragmentMock } from '../../data/get-job-contracts/mocks'

jest.mock('@staff-portal/contracts', () => ({
  DeleteContractButton: jest.fn(),
  ResendContractButton: jest.fn(),
  VerifyContractButton: jest.fn()
}))

const VerifyContractButtonMock = VerifyContractButton as jest.Mock
const ResendContractButtonMock = ResendContractButton as jest.Mock
const DeleteContractButtonMock = DeleteContractButton as jest.Mock

const arrangeTest = (props: Props) => {
  render(
    <TestWrapper>
      <JobContractItemHeader {...props} />
    </TestWrapper>
  )
}

const CONTRACT = createJobContractFragmentMock()

describe('JobContractItemHeader', () => {
  beforeEach(() => {
    VerifyContractButtonMock.mockImplementation(() => <div />)
    ResendContractButtonMock.mockImplementation(() => <div />)
    DeleteContractButtonMock.mockImplementation(() => <div />)
  })

  it('displays VerifyContractButton and passes props correctly', () => {
    const onSuccessAction = jest.fn()

    arrangeTest({ contract: CONTRACT, onSuccessAction })

    const expectedProps: ComponentProps<typeof VerifyContractButton> = {
      contractId: CONTRACT.id,
      operation: CONTRACT.operations.verifyContract,
      onMutationSuccess: onSuccessAction
    }

    expect(VerifyContractButtonMock).toHaveBeenCalledWith(
      expectedProps,
      expect.anything()
    )
  })

  it('displays ResendContractButton and passes props correctly', () => {
    const onSuccessAction = jest.fn()

    arrangeTest({ contract: CONTRACT, onSuccessAction })

    const expectedProps: ComponentProps<typeof ResendContractButton> = {
      contractId: CONTRACT.id,
      operation: CONTRACT.operations.resendContract,
      hasLongLabel: true,
      onMutationSuccess: onSuccessAction
    }

    expect(ResendContractButtonMock).toHaveBeenCalledWith(
      expectedProps,
      expect.anything()
    )
  })

  it('displays DeleteContractButton and passes props correctly', () => {
    const onSuccessAction = jest.fn()

    arrangeTest({ contract: CONTRACT, onSuccessAction })

    const expectedProps: ComponentProps<typeof DeleteContractButton> = {
      contractId: CONTRACT.id,
      contractKind: CONTRACT.kind,
      contractStatus: CONTRACT.status,
      contractWebResource: CONTRACT.webResource,
      operation: CONTRACT.operations.destroyContract,
      onMutationSuccess: onSuccessAction
    }

    expect(DeleteContractButtonMock).toHaveBeenCalledWith(
      expectedProps,
      expect.anything()
    )
  })
})
