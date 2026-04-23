import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Table } from '@toptal/picasso'

import HistoryEntryTableRow from './HistoryEntryTableRow'

const renderComponent = (
  props?: Partial<ComponentProps<typeof HistoryEntryTableRow>>
) =>
  render(
    <TestWrapper>
      <Table>
        <Table.Body>
          <HistoryEntryTableRow
            content={['Text content of the entry']}
            comment='Entry comment'
            onClick={() => {}}
            dateFormatted='Jul 29, 2019 at 9:31 AM'
            {...props}
          />
        </Table.Body>
      </Table>
    </TestWrapper>
  )

describe('HistoryEntryTableRow', () => {
  describe('when row is not expanded', () => {
    it('renders content without comment and button', () => {
      renderComponent({ expanded: false })

      expect(screen.getByText('Text content of the entry')).toBeInTheDocument()

      expect(screen.getByText('Jul 29, 2019 at 9:31 AM')).toBeInTheDocument()

      expect(screen.queryByText('Entry comment')).not.toBeInTheDocument()

      expect(
        screen.queryByTestId('history-entry-table-row-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when row is expanded', () => {
    it('renders content with comment and button', () => {
      renderComponent({ expanded: true, isExpandable: true })

      expect(screen.getByText('Text content of the entry')).toBeInTheDocument()

      expect(screen.getByText('Jul 29, 2019 at 9:31 AM')).toBeInTheDocument()

      expect(screen.getByText('Entry comment')).toBeInTheDocument()

      expect(
        screen.getByTestId('history-entry-table-row-button')
      ).toBeInTheDocument()
    })
  })
})
