import { render } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { Page } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { useRefetchOnPathChange } from '@staff-portal/navigation'

import {
  MainMenuFragment,
  MainMenuItemFragment
} from '../SidebarMenu/data/get-main-menu/get-main-menu.staff.gql.types'
import SidebarMenuContent from './SidebarMenuContent'
import SidebarSubMenu from '../SidebarSubMenu'
import { useGetCounters } from './data/get-counters'
import { useGetActivePath } from './hooks'

const SIDEBAR_SUB_MENU_ID = 'SIDEBAR_SUB_MENU_ID'

jest.mock('./data/get-counters')
jest.mock('./hooks')
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  SidebarMenuLabel: ({ label }: { label: string }) => <div>{label}</div>
}))
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Page: {
    Sidebar: {
      Menu: ({ children }: { children: ReactNode[] }) => <div>{children}</div>,
      Item: jest.fn()
    }
  }
}))
jest.mock('../SidebarSubMenu', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useRefetchOnPathChange: jest.fn()
}))

const useRefetchOnPathChangeMock = useRefetchOnPathChange as jest.Mock
const useGetCountersMock = useGetCounters as jest.Mock
const useGetActivePathMock = useGetActivePath as jest.Mock
const SidebarSubMenuMock = SidebarSubMenu as unknown as jest.Mock
const SidebarItemMock = Page.Sidebar.Item as unknown as jest.Mock

const arangeTest = (
  mainMenu: MainMenuFragment[] = [],
  countersResponse = {}
) => {
  useGetCountersMock.mockReturnValue(countersResponse)
  SidebarItemMock.mockImplementation(
    ({ children, menu }: { children: ReactNode[]; menu?: ReactNode }) => (
      <div>
        {children} {menu}
      </div>
    )
  )

  return render(
    <TestWrapper>
      <SidebarMenuContent isThreeColumnsLayout expanded mainMenu={mainMenu} />
    </TestWrapper>
  )
}

describe('Sidebar Menu', () => {
  it('should call `useGetActivePath` to get the active path', () => {
    const MAIN_MENU: MainMenuFragment[] = []

    arangeTest(MAIN_MENU)

    expect(useGetActivePathMock).toHaveBeenCalledWith(MAIN_MENU)
  })

  it('should call `useRefetchOnPathChange`', () => {
    const refetch = jest.fn()

    arangeTest([], { refetch })

    expect(useRefetchOnPathChangeMock).toHaveBeenCalledWith([refetch])
  })

  it('should render items with children', () => {
    const items = [{}] as MainMenuItemFragment[]
    const label = 'TEST_LABEL'

    SidebarSubMenuMock.mockReturnValue(
      <div data-testid={SIDEBAR_SUB_MENU_ID} />
    )
    const { getByText, getByTestId } = arangeTest([{ label, items }])

    expect(SidebarItemMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({ collapsible: true })
    )
    expect(SidebarSubMenuMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({ items })
    )
    expect(getByTestId(SIDEBAR_SUB_MENU_ID)).toBeInTheDocument()
    expect(getByText(label)).toBeInTheDocument()
  })

  it('should render items without children', () => {
    const label = 'TEST_LABEL'
    const path = 'TEST_PATH'
    const { getByText } = arangeTest([{ label, path, items: [] }])

    expect(SidebarItemMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({ href: path, collapsible: false })
    )
    expect(getByText(label)).toBeInTheDocument()
    expect(SidebarSubMenuMock).not.toHaveBeenCalled()
  })

  it('should set selected items', () => {
    const path = 'TEST_PATH'

    useGetActivePathMock.mockReturnValue(path)
    arangeTest([{ label: '', path, items: [] }])

    expect(SidebarItemMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({ selected: true })
    )
  })
})
