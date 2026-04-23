import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation, OperationType } from '@staff-portal/operations'

import UnlinkOpportunityModal from '../UnlinkOpportunityModal/UnlinkOpportunityModal'
import UnlinkOpportunityButton from './UnlinkOpportunityButton'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  Operation: jest.fn()
}))

const OperationMock = Operation as jest.Mock
const ButtonMock = Button as unknown as jest.Mock
const useModalMock = useModal as jest.Mock

describe('UnlinkOpportunityButton', () => {
  it('calls inner hooks and renders button with correct props passed', () => {
    const props = {
      opportunityId: Symbol() as unknown as string,
      representativeId: Symbol() as unknown as string,
      operation: Symbol() as unknown as OperationType
    } as ComponentProps<typeof UnlinkOpportunityButton>

    const IS_DISABLED = Symbol()
    const SHOW_MODAL = Symbol()

    useModalMock.mockReturnValue({ showModal: SHOW_MODAL })
    ButtonMock.mockReturnValue(null)
    OperationMock.mockImplementation(({ render: renderChildren }) =>
      renderChildren(IS_DISABLED)
    )

    render(<UnlinkOpportunityButton {...props} />)

    expect(useModalMock).toHaveBeenCalledWith(UnlinkOpportunityModal, {
      opportunityId: props.opportunityId,
      representativeId: props.representativeId
    })

    expect(ButtonMock).toHaveBeenCalledTimes(1)
    expect(ButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: IS_DISABLED,
        onClick: SHOW_MODAL,
        children: 'Unlink'
      }),
      {}
    )
  })
})
