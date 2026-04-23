import { render } from '@testing-library/react'
import React from 'react'
import { createMemoryHistory } from 'history'
import { Router } from '@staff-portal/navigation'
import * as config from '@staff-portal/config'
import { useMonitoringService } from '@staff-portal/monitoring-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { CurrentUser, useGetCurrentUser } from '@staff-portal/current-user'
import { createGetServerTimeZoneMock } from '@staff-portal/date-time-utils/src/mocks'

import Chrome from './Chrome'
import { useGetChromeData } from '../../data/get-chrome'
import { GetChromeQuery } from '../../data/get-chrome/get-chrome.staff.gql.types'

jest.mock('@staff-portal/monitoring-service')
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  navigateExternallyTo: jest.fn()
}))

jest.mock('../../data/get-chrome')
jest.mock('@staff-portal/operational-issues', () => ({
  OperationalIssuesButton: () => <div data-testid='operational-issues-button' />
}))
jest.mock('../../containers/SummarySidebar/SummarySidebar', () => ({
  __esModule: true,
  default: () => <div data-testid='summary-sidebar' />
}))
jest.mock(
  '../../containers/SummarySidebar/components/SummarySidebarLoader/SummarySidebarLoader',
  () => ({
    __esModule: true,
    default: () => <div data-testid='summary-sidebar-loader' />
  })
)
jest.mock('../../components', () => ({
  HeaderMenu: () => <div data-testid='header-menu' />,
  SidebarMenu: () => <div data-testid='sidebar-menu' />,
  UserSearch: () => <div data-testid='user-search' />,
  BottomContent: () => <div data-testid='bottom-content' />
}))

const useMonitoringServiceMock = useMonitoringService as jest.Mock
const useGetChromeDataMock = useGetChromeData as jest.Mock
const useGetCurrentUserMock = useGetCurrentUser as jest.Mock

const arrangeTest = ({
  chromeData = {
    viewer: { permits: {}, availableTools: {} }
  } as GetChromeQuery,
  currentUserData = {},
  routerProps: { initialRoute } = {}
}: {
  chromeData?: Partial<GetChromeQuery>
  currentUserData?: Partial<CurrentUser>
  routerProps?: { initialRoute?: string }
}) => {
  window.scrollTo = jest.fn()
  window.Element.prototype.scrollIntoView = jest.fn()

  const history = createMemoryHistory({
    initialEntries: initialRoute ? [initialRoute] : undefined
  })
  const serverTimeZoneMock = createGetServerTimeZoneMock({
    timeZoneName: '(UTC-05:00) America - New York'
  })

  useGetChromeDataMock.mockReturnValue({ loading: false, data: chromeData })
  useGetCurrentUserMock.mockReturnValue(currentUserData)

  return render(
    <TestWrapperWithMocks mocks={[serverTimeZoneMock]}>
      <Router history={history}>
        <Chrome>
          <div />
        </Chrome>
      </Router>
    </TestWrapperWithMocks>
  )
}

describe('Chrome', () => {
  it('uses monitoring service', async () => {
    const USER_ID = 'VjEtVGVzdC0xMjM'
    const CHAMELEON_PARTICIPANT_UUID = '1234'

    const logRocketIsEnabledValueBackup = config.LOG_ROCKET_IS_ENABLED
    const userTrackingIsEnabledValueBackup = config.USER_TRACKING_IS_ENABLED
    const userDataDogIsEnabledValueBackup = config.DATA_DOG_IS_ENABLED

    Object.defineProperty(config, 'LOG_ROCKET_IS_ENABLED', {
      get: () => true
    })
    Object.defineProperty(config, 'USER_TRACKING_IS_ENABLED', {
      get: () => true
    })
    Object.defineProperty(config, 'DATA_DOG_IS_ENABLED', {
      get: () => true
    })

    arrangeTest({
      chromeData: {
        viewer: {
          chameleonParticipantUuid: CHAMELEON_PARTICIPANT_UUID,
          permits: {}
        }
      } as GetChromeQuery,
      currentUserData: { id: USER_ID }
    })

    expect(useMonitoringServiceMock).toHaveBeenCalledWith(
      { id: USER_ID, decodedId: '123' },
      {
        chameleonParticipantUuid: CHAMELEON_PARTICIPANT_UUID,
        USER_TRACKING_IS_ENABLED: true,
        LOG_ROCKET_IS_ENABLED: true,
        DATA_DOG_IS_ENABLED: true
      }
    )

    Object.defineProperty(config, 'LOG_ROCKET_IS_ENABLED', {
      get: () => logRocketIsEnabledValueBackup
    })
    Object.defineProperty(config, 'USER_TRACKING_IS_ENABLED', {
      get: () => userTrackingIsEnabledValueBackup
    })
    Object.defineProperty(config, 'DATA_DOG_IS_ENABLED', {
      get: () => userDataDogIsEnabledValueBackup
    })
  })

  it('right side panel should be visible', async () => {
    const { getByTestId } = arrangeTest({
      chromeData: {
        viewer: {
          availableTools: {},
          permits: { handleRoleMetrics: true }
        }
      } as GetChromeQuery
    })

    expect(getByTestId('header-menu')).toBeInTheDocument()
    expect(getByTestId('summary-sidebar')).toBeInTheDocument()
  })

  it('right side panel should be hidden', async () => {
    const { queryByTestId } = arrangeTest({})

    expect(queryByTestId('summary-sidebar')).not.toBeInTheDocument()
  })

  it('shows quick user search and operational issues button', async () => {
    const { getByTestId } = arrangeTest({
      chromeData: {
        viewer: {
          availableTools: {},
          permits: { viewMyOperationalIssues: true, useQuicksearch: true }
        }
      } as GetChromeQuery
    })

    expect(getByTestId('operational-issues-button')).toBeInTheDocument()
    expect(getByTestId('user-search')).toBeInTheDocument()
  })

  it('hides quick user search and operational issues button if not permitted', async () => {
    const { queryByTestId } = arrangeTest({})

    expect(queryByTestId('operational-issues-button')).not.toBeInTheDocument()
    expect(queryByTestId('user-search')).not.toBeInTheDocument()
  })
})
