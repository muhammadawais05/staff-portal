import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { compileRecord } from '../../../template-compiler'
import PERFORMED_ACTIONS from '../../../../fixtures/history-graphql.json'
import MODEL_DESCRIPTIONS from '../../../../fixtures/model-descriptions-graphql.json'
import { Entry } from '../../types'
import HistoryList from './index'

const renderComponent = (props: ComponentProps<typeof HistoryList>) =>
  render(
    <TestWrapper>
      <HistoryList {...props} />
    </TestWrapper>
  )

describe('HistoryList', () => {
  describe('when the list has entries', () => {
    it('renders properly the list of entries', () => {
      const compiledEntries = PERFORMED_ACTIONS.map(performedAction => ({
        performedAction,
        literals: compileRecord(performedAction, MODEL_DESCRIPTIONS)
      })) as Entry[]

      renderComponent({ entries: compiledEntries })

      const historyEntries = screen.getAllByTestId(/entry-row-.*/i)

      expect(historyEntries).toHaveLength(24)
    })
  })

  describe('when the list is empty', () => {
    describe('when empty state is defined', () => {
      it('displays a message if the empty state is defined', () => {
        const EmptyMessage = (
          <span data-testid='no-results'>No results were found</span>
        )

        renderComponent({ entries: [], emptyState: { children: EmptyMessage } })

        expect(screen.getByTestId('no-results')).toBeInTheDocument()
      })
    })
  })
})
