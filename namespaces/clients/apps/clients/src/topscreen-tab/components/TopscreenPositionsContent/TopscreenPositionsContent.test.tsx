import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TableSkeleton } from '@staff-portal/ui'

import { topscreenPositionsColumns } from '../TopscreenPositionsTableHeader'
import TopscreenPositionsTable from '../TopscreenPositionsTable'
import { TopscreenPositionFragment } from '../TopscreenPositionsSection/data/get-topscreen-positions'
import { topscreenPositionsFragmentMock } from '../TopscreenPositionsSection/data/get-topscreen-positions/topscreen-position-fragment.mock'
import TopscreenPositionsContent from './TopscreenPositionsContent'

jest.mock('../TopscreenPositionsTable')
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  TableSkeleton: jest.fn()
}))

const mockTopscreenPositionsTable = TopscreenPositionsTable as jest.Mock
const mockTableSkeleton = TableSkeleton as unknown as jest.Mock

const arrangeTest = ({
  topscreenPositions,
  loading = false
}: {
  topscreenPositions?: TopscreenPositionFragment[]
  loading?: boolean
}) => {
  mockTopscreenPositionsTable.mockReturnValue(null)
  mockTableSkeleton.mockReturnValue(null)

  render(
    <TopscreenPositionsContent
      topscreenPositions={topscreenPositions}
      loading={loading}
    />
  )
}

describe('TopscreenPositionsContent', () => {
  describe('when data is loading', () => {
    it('renders loader', () => {
      const context = {}

      arrangeTest({ loading: true })

      expect(mockTableSkeleton).toHaveBeenCalledWith(
        {
          cols: topscreenPositionsColumns,
          rows: 5
        },
        context
      )
    })
  })

  describe('when there are no positions', () => {
    it('renders empty message', () => {
      arrangeTest({ topscreenPositions: [] })

      expect(screen.getByTestId('positions-empty')).toHaveTextContent(
        'This client has no TopScreen positions yet.'
      )
    })
  })

  describe('when list is not empty', () => {
    it('renders items', () => {
      const context = {}

      arrangeTest({ topscreenPositions: topscreenPositionsFragmentMock })

      expect(mockTopscreenPositionsTable).toHaveBeenCalledWith(
        {
          topscreenPositions: topscreenPositionsFragmentMock
        },
        context
      )
    })
  })
})
