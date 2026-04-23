import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { SkeletonLoader } from '@toptal/picasso'
import {
  checkIfFieldIsForbidden,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import {
  useGetCompanyRepresentative,
  ActionsDropdown,
  MainSubsidiaryFlags
} from '@staff-portal/client-representatives'
import { HistoryButton } from '@staff-portal/chronicles'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import {
  OFACComplianceSection,
  OFAC_UPDATED
} from '@staff-portal/ofac-compliance'
import { NodeStatusMessageNotifications } from '@staff-portal/status-messages'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { OPPORTUNITY_LINKED, OPPORTUNITY_UNLINKED } from '@staff-portal/clients'
import { ROLE_FLAGS_UPDATED } from '@staff-portal/role-flags'

import ProfileSection from './containers/ProfileSection/ProfileSection'
import AboutSection from './containers/AboutSection/AboutSection'
import { OpportunitiesSection } from './components/OpportunitiesSection'
import Representative from './Representative'

jest.mock('@staff-portal/page-wrapper', () => ({
  ...jest.requireActual('@staff-portal/page-wrapper'),
  ContentWrapper: jest.fn()
}))

jest.mock('@toptal/picasso', () => {
  const skeletonLoaderMock = jest.fn() as unknown as {
    Button: Function
    Typography: Function
    Media: Function
    Header: Function
  }

  skeletonLoaderMock.Button = jest.fn()
  skeletonLoaderMock.Typography = () => null
  skeletonLoaderMock.Media = () => null
  skeletonLoaderMock.Header = () => null

  return {
    ...jest.requireActual('@toptal/picasso'),
    SkeletonLoader: skeletonLoaderMock
  }
})

jest.mock('./containers/AboutSection/AboutSection', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('./components/OpportunitiesSection', () => ({
  OpportunitiesSection: jest.fn()
}))

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  checkIfFieldIsForbidden: jest.fn(),
  encodeEntityId: jest.fn()
}))

jest.mock('./containers/ProfileSection/ProfileSection', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@staff-portal/client-representatives', () => ({
  ...jest.requireActual('@staff-portal/client-representatives'),
  useGetCompanyRepresentative: jest.fn(),
  ActionsDropdown: jest.fn(),
  MainSubsidiaryFlags: jest.fn()
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  useMessageListener: jest.fn()
}))

const QUERY_PARAMS = {
  id: {}
}

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useParams: () => QUERY_PARAMS
}))

jest.mock('@staff-portal/chronicles', () => ({
  ...jest.requireActual('@staff-portal/chronicles'),
  HistoryButton: jest.fn()
}))

jest.mock('@staff-portal/ofac-compliance', () => ({
  OFAC_UPDATED: 'OFAC_UPDATED',
  OFACComplianceSection: jest.fn()
}))

const HistoryButtonMock = HistoryButton as jest.Mock

const COMPANY_REPRESENTATIVE_QUERY = {
  representative: {
    operations: {}
  },
  loading: {},
  initialLoading: {}
}

const ENCODED_REPRESENTATIVE_ID = {}

const ContentWrapperMock = ContentWrapper as jest.Mock
const SkeletonLoaderButtonMock = SkeletonLoader.Button as unknown as jest.Mock
const useGetCompanyRepresentativeMock = useGetCompanyRepresentative as jest.Mock
const ActionsDropdownMock = ActionsDropdown as jest.Mock
const MainSubsidiaryFlagsMock = MainSubsidiaryFlags as jest.Mock
const ProfileSectionMock = ProfileSection as jest.Mock
const OFACComplianceSectionMock = OFACComplianceSection as unknown as jest.Mock
const AboutSectionMock = AboutSection as jest.Mock
const OpportunitiesSectionMock = OpportunitiesSection as jest.Mock
const encodeEntityIdMock = encodeEntityId as jest.Mock
const checkIfFieldIsForbiddenMock = checkIfFieldIsForbidden as jest.Mock
const useMessageListenerMock = useMessageListener as jest.Mock

const renderComponent = () => {
  return render(
    <TestWrapper>
      <Representative />
    </TestWrapper>
  )
}

describe('Representative', () => {
  beforeEach(() => {
    ContentWrapperMock.mockImplementation(({ children, actions }) => (
      <>
        {children}
        {actions}
      </>
    ))
    useGetCompanyRepresentativeMock.mockReturnValue(
      COMPANY_REPRESENTATIVE_QUERY
    )
    encodeEntityIdMock.mockReturnValue(ENCODED_REPRESENTATIVE_ID)
    HistoryButtonMock.mockReturnValue(null)
    ActionsDropdownMock.mockReturnValue(null)
    MainSubsidiaryFlagsMock.mockReturnValue(null)
    SkeletonLoaderButtonMock.mockReturnValue(null)
    checkIfFieldIsForbiddenMock.mockReturnValue(false)

    // sections

    ProfileSectionMock.mockReturnValue(null)
    OFACComplianceSectionMock.mockReturnValue(null)
    AboutSectionMock.mockReturnValue(null)
    OpportunitiesSectionMock.mockReturnValue(null)
  })

  it('requests representative info to display', () => {
    const refetch = Symbol('refetch')

    useGetCompanyRepresentativeMock.mockReturnValue({
      refetch
    })

    renderComponent()

    expect(useGetCompanyRepresentativeMock).toHaveBeenCalledTimes(1)
    expect(useGetCompanyRepresentativeMock).toHaveBeenCalledWith({
      representativeId: ENCODED_REPRESENTATIVE_ID
    })
    expect(useMessageListenerMock).toHaveBeenCalledTimes(3)
    expect(useMessageListenerMock).toHaveBeenNthCalledWith(
      1,
      [OPPORTUNITY_UNLINKED, OPPORTUNITY_LINKED],
      expect.any(Function)
    )
    expect(useMessageListenerMock).toHaveBeenNthCalledWith(
      2,
      OFAC_UPDATED,
      expect.any(Function)
    )
    expect(useMessageListenerMock).toHaveBeenNthCalledWith(
      3,
      ROLE_FLAGS_UPDATED,
      refetch
    )
  })

  describe('Page Actions', () => {
    describe('when loading', () => {
      it('renders loader for page actions', () => {
        renderComponent()

        expect(SkeletonLoaderButtonMock).toHaveBeenCalledTimes(1)
      })
    })

    describe('History Button', () => {
      describe('when data is loading', () => {
        it('does not render History button', () => {
          renderComponent()

          expect(HistoryButtonMock).toHaveBeenCalledTimes(0)
        })
      })

      describe('when data is loaded and user has permissions to see history', () => {
        it('renders History button', () => {
          useGetCompanyRepresentativeMock.mockReturnValue({
            ...COMPANY_REPRESENTATIVE_QUERY,
            representative: {
              ...COMPANY_REPRESENTATIVE_QUERY.representative,
              viewerCanViewHistory: true
            },
            initialLoading: false
          })
          renderComponent()

          expect(HistoryButtonMock).toHaveBeenCalledTimes(1)
          expect(HistoryButtonMock).toHaveBeenCalledWith(
            {
              entity: 'CompanyRepresentative',
              id: ENCODED_REPRESENTATIVE_ID
            },
            {}
          )
        })
      })

      describe('when data is loaded and user lacks permissions to see history', () => {
        it('does not render History button', () => {
          useGetCompanyRepresentativeMock.mockReturnValue({
            ...COMPANY_REPRESENTATIVE_QUERY,
            representative: {
              ...COMPANY_REPRESENTATIVE_QUERY.representative,
              viewerCanViewHistory: false
            },
            initialLoading: false
          })
          renderComponent()

          expect(HistoryButtonMock).toHaveBeenCalledTimes(0)
        })
      })
    })
  })

  describe('Browser Title', () => {
    describe('when loading', () => {
      it('changes to "Company Contact"', () => {
        useGetCompanyRepresentativeMock.mockReturnValue({
          ...COMPANY_REPRESENTATIVE_QUERY,
          representative: null
        })

        renderComponent()

        expect(ContentWrapperMock).toHaveBeenCalledTimes(1)
        expect(ContentWrapperMock).toHaveBeenCalledWith(
          expect.objectContaining({
            browserTitle: 'Company Contact'
          }),
          {}
        )
      })
    })

    describe('when loaded', () => {
      it.each([
        {
          fullName: 'representative-full-name',
          browserTitle: 'representative-full-name (Company Contact)'
        },
        { fullName: 'foo', browserTitle: 'foo (Company Contact)' }
      ])(
        'changes to "<fullName> (Company Contact)"',
        ({ fullName, browserTitle }) => {
          useGetCompanyRepresentativeMock.mockReturnValue({
            ...COMPANY_REPRESENTATIVE_QUERY,
            representative: {
              ...COMPANY_REPRESENTATIVE_QUERY.representative,
              fullName
            }
          })

          renderComponent()

          expect(ContentWrapperMock).toHaveBeenCalledTimes(1)
          expect(ContentWrapperMock).toHaveBeenCalledWith(
            expect.objectContaining({
              browserTitle
            }),
            {}
          )
        }
      )
    })
  })

  it('renders status messages', () => {
    renderComponent()

    expect(ContentWrapperMock).toHaveBeenCalledTimes(1)
    expect(ContentWrapperMock).toHaveBeenCalledWith(
      expect.objectContaining({
        additionalStatusMessages: expect.objectContaining({
          type: NodeStatusMessageNotifications,
          props: {
            id: ENCODED_REPRESENTATIVE_ID
          }
        })
      }),
      {}
    )
  })

  it('renders Profile Section', () => {
    renderComponent()

    expect(ProfileSectionMock).toHaveBeenCalledTimes(1)
    expect(ProfileSectionMock).toHaveBeenCalledWith(
      {
        ...COMPANY_REPRESENTATIVE_QUERY
      },
      {}
    )
  })

  it('renders About Section', () => {
    renderComponent()

    expect(AboutSectionMock).toHaveBeenCalledTimes(1)
    expect(AboutSectionMock).toHaveBeenCalledWith(
      { ...COMPANY_REPRESENTATIVE_QUERY },
      {}
    )
  })

  describe('OFAC Compliance section', () => {
    it('renders section with expected props passed', () => {
      renderComponent()

      expect(OFACComplianceSectionMock).toHaveBeenCalledTimes(1)
      expect(OFACComplianceSectionMock).toHaveBeenCalledWith(
        {
          nodeId: ENCODED_REPRESENTATIVE_ID,
          sectionVariant: 'withHeaderBar',
          listenedMessages: ['OFAC_UPDATED']
        },
        {}
      )
    })
  })

  describe('Opportunities section', () => {
    it('renders Opportunities Section', () => {
      renderComponent()

      expect(OpportunitiesSectionMock).toHaveBeenCalledTimes(1)
      expect(OpportunitiesSectionMock).toHaveBeenCalledWith(
        {
          ...COMPANY_REPRESENTATIVE_QUERY
        },
        {}
      )
    })

    it('does not render the section when not authorized', () => {
      checkIfFieldIsForbiddenMock.mockReturnValue(true)

      renderComponent()

      expect(OpportunitiesSectionMock).toHaveBeenCalledTimes(0)
    })
  })
})
