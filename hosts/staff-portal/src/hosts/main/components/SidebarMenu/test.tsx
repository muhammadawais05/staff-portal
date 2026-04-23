import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SidebarMenu from './SidebarMenu'
import { useGetMainMenu } from './data/get-main-menu'

const SIDEBAR_LOADER_ID = 'sidebar-loader'
const SIDEBAR_CONTENT_ID = 'sidebar-content'

jest.mock('react-resize-detector', () => ({
  useResizeDetector: () => ({
    width: 0
  })
}))

jest.mock('./data/get-main-menu')

jest.mock('../SidebarMenuLoader', () => ({
  __esModule: true,
  default: () => <div data-testid={SIDEBAR_LOADER_ID} />
}))

jest.mock('../SidebarMenuContent', () => ({
  __esModule: true,
  default: () => <div data-testid={SIDEBAR_CONTENT_ID} />
}))

const useGetMainMenuMock = useGetMainMenu as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <SidebarMenu isThreeColumnsLayout />
    </TestWrapper>
  )

describe('Sidebar Menu', () => {
  it('renders sidebar loader while data is loading', () => {
    useGetMainMenuMock.mockReturnValue({ loading: true })

    const { getAllByTestId, queryByTestId } = arrangeTest()

    expect(getAllByTestId(SIDEBAR_LOADER_ID)).toHaveLength(20)
    expect(queryByTestId(SIDEBAR_CONTENT_ID)).not.toBeInTheDocument()
  })

  it('renders menu content after the data has loaded', () => {
    useGetMainMenuMock.mockReturnValue({ loading: false, data: {} })

    const { getByTestId, queryByTestId } = arrangeTest()

    expect(queryByTestId(SIDEBAR_LOADER_ID)).not.toBeInTheDocument()
    expect(getByTestId(SIDEBAR_CONTENT_ID)).toBeInTheDocument()
  })
})
