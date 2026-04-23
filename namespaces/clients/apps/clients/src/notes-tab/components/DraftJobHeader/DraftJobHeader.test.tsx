import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { OperationType } from '@staff-portal/operations'
import { TestWrapper } from '@staff-portal/test-utils'
import { NoteCardInfo } from '@staff-portal/ui'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import DraftJobDeleteButton from '../DraftJobDeleteButton'
import DraftJobEditButton from '../DraftJobEditButton'
import DraftJobHeader, { Props } from './DraftJobHeader'

jest.mock('@staff-portal/ui/src/components/NoteCard/components')
jest.mock('../DraftJobEditButton')
jest.mock('../DraftJobDeleteButton')

const mockDeleteButton = DraftJobDeleteButton as jest.Mock
const mockEditButton = DraftJobEditButton as jest.Mock
const mockNoteCardInfo = NoteCardInfo as jest.Mock

const OPERATION: OperationType = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const renderComponent = ({
  draftJobId = '1',
  createdAt,
  onEditClick = () => {}
}: Partial<Props> = {}) => {
  mockEditButton.mockImplementation(() => <></>)
  mockDeleteButton.mockImplementation(() => <></>)
  mockNoteCardInfo.mockImplementation(() => <></>)

  return render(
    <TestWrapper>
      <DraftJobHeader
        draftJobId={draftJobId}
        createdAt={createdAt}
        onEditClick={onEditClick}
        removeSalesDraftJobOperation={OPERATION}
        updateSalesDraftJobOperation={OPERATION}
      />
    </TestWrapper>
  )
}

describe('DraftJobHeader', () => {
  describe('when createdAt is missing', () => {
    it('hides the card infox', () => {
      const onEditClick = jest.fn()

      renderComponent({ onEditClick })

      expect(screen.getByText('Job')).toBeInTheDocument()
      expect(mockNoteCardInfo).not.toHaveBeenCalled()
      expect(mockEditButton).toHaveBeenCalledWith(
        {
          draftJobId: '1',
          operation: OPERATION,
          onClick: onEditClick
        },
        expect.anything()
      )
      expect(mockDeleteButton).toHaveBeenCalledWith(
        {
          draftJobId: '1',
          operation: OPERATION
        },
        expect.anything()
      )
    })
  })

  describe('when createdAt is passed', () => {
    it('shows the card infox', () => {
      const CREATED_AT = 'now'
      const onEditClick = jest.fn()

      renderComponent({ onEditClick, createdAt: CREATED_AT })

      expect(screen.getByText('Job')).toBeInTheDocument()
      expect(mockNoteCardInfo).toHaveBeenCalledWith(
        { createdAt: CREATED_AT, updatedAt: CREATED_AT, timeZone: undefined },
        expect.anything()
      )
      expect(mockEditButton).toHaveBeenCalledWith(
        {
          draftJobId: '1',
          operation: OPERATION,
          onClick: onEditClick
        },
        expect.anything()
      )
      expect(mockDeleteButton).toHaveBeenCalledWith(
        {
          draftJobId: '1',
          operation: OPERATION
        },
        expect.anything()
      )
    })
  })
})
