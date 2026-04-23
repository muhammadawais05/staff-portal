import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { Table } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { Operation } from '@staff-portal/operations'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { getLegacyUrlWithRewrite } from '@staff-portal/routes'

import { topscreenPositionActivateEnabledFragmentMock } from '../TopscreenPositionsSection/data/get-topscreen-positions/topscreen-position-fragment.mock'
import TopscreenPositionLabel from '../TopscreenPositionLabel'
import TopscreenPositionItem from './TopscreenPositionItem'

jest.mock('../TopscreenPositionLabel')
jest.mock('@staff-portal/operations', () => ({
  Operation: jest.fn()
}))
jest.mock('@staff-portal/routes', () => ({
  getLegacyUrlWithRewrite: jest.fn()
}))

jest.mock(
  '../ActivateTopScreenPositionModal/hooks/use-activate-topscreen-position-modal',
  () => ({
    useActivateTopScreenPositionModal: () => ({ showModal: () => {} })
  })
)

const mockTopscreenPositionLabel = TopscreenPositionLabel as jest.Mock
const mockOperation = Operation as jest.Mock
const mockGetLegacyUrlWithRewrite = getLegacyUrlWithRewrite as jest.Mock

const createTopscreenTalentOperation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = () => {
  mockOperation.mockImplementation(({ children }) => children)
  mockTopscreenPositionLabel.mockReturnValue(null)
  mockGetLegacyUrlWithRewrite.mockReturnValue('dummy-link')

  render(
    <TestWrapper>
      <Table>
        <Table.Body>
          <TopscreenPositionItem
            position={topscreenPositionActivateEnabledFragmentMock}
            createTopscreenTalentOperation={createTopscreenTalentOperation}
          />
        </Table.Body>
      </Table>
    </TestWrapper>
  )
}

describe('TopscreenPositionItem', () => {
  it('renders position item with expected actions and operations', () => {
    arrangeTest()

    expect(mockOperation.mock.calls[0][0].operation).toEqual(
      topscreenPositionActivateEnabledFragmentMock.operations
        .activateTopscreenPosition
    )

    expect(mockOperation.mock.calls[1][0].operation).toEqual(
      createTopscreenTalentOperation
    )

    expect(screen.getByText('Activate')).toBeInTheDocument()
    expect(screen.getByText('Add New Talent')).toBeInTheDocument()
    expect(screen.getByText('Add New Talent').closest('a')).toHaveAttribute(
      'href',
      'dummy-link'
    )
  })
})
