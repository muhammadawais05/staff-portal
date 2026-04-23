import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { useModal } from '@staff-portal/modals-service'

import LinkSourcingRequestButton from '../LinkSourcingRequestButton'
import LinkSourcingRequestModal from '../../LinkSourcingRequestModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

const useModalMock = useModal as jest.Mock
const showModal = jest.fn()

const TALENT_ID = '123'
const refetch = jest.fn()

const modalProps = {
  talentId: TALENT_ID,
  onLink: refetch
}

const buttonProps = {
  talentId: TALENT_ID,
  refetch,
  loading: false,
  operation: {
    messages: [],
    callable: OperationCallableTypes.ENABLED
  }
}

const arrangeTest = (props = buttonProps) => {
  useModalMock.mockReturnValue({ showModal })

  return render(
    <TestWrapper>
      <LinkSourcingRequestButton {...props} />
    </TestWrapper>
  )
}

describe('LinkSourcingRequestButton', () => {
  it('disables the button', () => {
    arrangeTest({
      ...buttonProps,
      operation: {
        messages: [],
        callable: OperationCallableTypes.DISABLED
      }
    })

    expect(
      screen.getByRole('button', { name: 'Link Sourcing Request' })
    ).toBeDisabled()
  })

  it('calls the modal with correct props', async () => {
    arrangeTest()

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(
      LinkSourcingRequestModal,
      modalProps
    )
  })
})
