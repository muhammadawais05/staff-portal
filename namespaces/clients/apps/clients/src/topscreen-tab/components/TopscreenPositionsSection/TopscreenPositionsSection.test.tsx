import React from 'react'
import { cleanup, render, screen } from '@toptal/picasso/test-utils'

import { useGetTopscreenPositions } from '../TopscreenPositionsSection/data/get-topscreen-positions'
import AddNewTopscreenPositionButton from '../AddNewTopscreenPositionButton'
import TopscreenPositionsContent from '../TopscreenPositionsContent'
import TopscreenPositionsSection from './TopscreenPositionsSection'

jest.mock('../TopscreenPositionsContent')
jest.mock('../AddNewTopscreenPositionButton')
jest.mock('./data/get-topscreen-positions', () => ({
  useGetTopscreenPositions: jest.fn()
}))

const mockTopscreenPositionsContent = TopscreenPositionsContent as jest.Mock
const mockAddNewButton = AddNewTopscreenPositionButton as jest.Mock
const mockUseGetTopscreenPositions = useGetTopscreenPositions as jest.Mock

describe('TopscreenPositionsSection', () => {
  beforeEach(() => {
    mockTopscreenPositionsContent.mockReturnValue(null)
    mockAddNewButton.mockReturnValue(null)
  })

  afterEach(cleanup)

  it('renders content', () => {
    const context = {}
    const createTopScreenOperation = {}
    const topscreenPositions = {}
    const loading = false

    mockUseGetTopscreenPositions.mockImplementation(() => ({
      createTopScreenOperation,
      topscreenPositions,
      loading
    }))

    render(<TopscreenPositionsSection topscreenClientId='mockId' />)

    expect(mockAddNewButton).toHaveBeenCalledWith(
      {
        topscreenClientId: 'mockId',
        operation: createTopScreenOperation
      },
      context
    )
    expect(mockTopscreenPositionsContent).toHaveBeenCalledWith(
      {
        topscreenPositions,
        loading
      },
      context
    )
    expect(screen.getByText('TopScreen Positions')).toBeInTheDocument()
  })
})
