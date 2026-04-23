import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import UnlinkSourcingRequestButton from '.'

jest.mock('../UnlinkSourcingRequestModal', () => ({
  __esModule: true,
  default: () => <div data-testid='unlink-sourcing-request-modal' />
}))
jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useModal: jest.fn()
}))
jest.mock('@staff-portal/operations/src/components/LazyOperation')

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: ['']
}
const SOURCING_TALENT_REQUEST_ID = 'SOURCING_TALENT_REQUEST_ID'
const TALENT_FULL_NAME = 'TALENT_FULL_NAME'

const arrangeTest = (
  props: ComponentProps<typeof UnlinkSourcingRequestButton>
) =>
  render(
    <TestWrapper>
      <UnlinkSourcingRequestButton {...props} />
    </TestWrapper>
  )

const useModalMock = useModal as jest.Mock

describe('UnlinkSourcingRequestButton', () => {
  it('default render', () => {
    useModalMock.mockReturnValue({ isOpen: false })

    arrangeTest({
      sourcingTalentRequestId: SOURCING_TALENT_REQUEST_ID,
      talentFullName: TALENT_FULL_NAME,
      operation: OPERATION
    })

    expect(
      screen.getByTestId('LazyOperation-initialOperation')
    ).toHaveTextContent(JSON.stringify(OPERATION))
    expect(
      screen.getByTestId('unlink-sourcing-request-button')
    ).toHaveTextContent('Unlink')
  })
  it('displays modal', () => {
    useModalMock.mockReturnValue({ isOpen: true })

    arrangeTest({
      sourcingTalentRequestId: SOURCING_TALENT_REQUEST_ID,
      talentFullName: TALENT_FULL_NAME,
      operation: OPERATION
    })

    expect(
      screen.getByTestId('unlink-sourcing-request-modal')
    ).toBeInTheDocument()
  })
})
