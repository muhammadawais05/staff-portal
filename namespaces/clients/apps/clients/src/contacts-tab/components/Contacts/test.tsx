import React, { ComponentProps } from 'react'
import {
  act,
  fireEvent,
  render,
  waitForElementToBeRemoved,
  screen
} from '@toptal/picasso/test-utils'
import { getUrl, RouteContext, useNavigate } from '@staff-portal/navigation'
import { MockedResponse } from '@staff-portal/data-layer-service'
import {
  TestErrorBoundary,
  TestWrapperWithMocks
} from '@staff-portal/test-utils'
import MockDate from 'mockdate'
import { ContactType, PhoneCategory } from '@staff-portal/graphql/staff'
import {
  EditableInformation,
  PhoneContactsViewer
} from '@staff-portal/client-representatives'
import { DEFAULT_NAME } from '@staff-portal/client-representatives/src/mocks'

import {
  createGetClientContactsMock as mockContactsQuery,
  createGetClientContactsFailedMock as mockFailedContactsQuery
} from '../../data/get-client-contacts/mocks'
import Contacts from './Contacts'

jest.mock('@staff-portal/client-representatives', () => ({
  ...jest.requireActual('@staff-portal/client-representatives'),

  EditableInformation: ({
    value
  }: ComponentProps<typeof EditableInformation>) => (
    <div datatest-id='editable' data-name='information'>
      {value}
    </div>
  ),
  ActionsDropdown: () => <div data-testid='rep-actions' />,
  PhoneContactsViewer: jest.fn()
}))

jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserTimeZone: () => 'Europe/Moscow'
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useNavigate: jest.fn(),
  getUrl: jest.fn()
}))

jest.setTimeout(20000)

const PAGE_SIZE = 25

const useNavigateMock = useNavigate as jest.Mock
const getUrlMock = getUrl as jest.Mock
const PhoneContactsViewerMock = PhoneContactsViewer as jest.Mock

// so Edit button is clickable through
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),

  useRenderLazyOperation:
    ({ onSuccess }: { onSuccess: Function }) =>
    (renderChildren: (props: {}) => React.ReactElement) =>
      renderChildren({ checkOperation: onSuccess })
}))

const mockPagination = { offset: 0, limit: PAGE_SIZE }
const mockUrlParams: { page: number } = { page: 1 }

jest.mock('@staff-portal/filters', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/filters'),
  usePagination: () => ({
    page: mockUrlParams,
    limit: PAGE_SIZE,
    handlePageChange: (newPage: number) => {
      mockUrlParams.page = newPage
      mockPagination.offset = newPage * 10 - 10
    },
    pagination: mockPagination,
    resolving: false,
    normalizePage: () => {}
  })
}))

// mock this, otherwise the whole thing has to be wrapped with router
jest.mock('../AddContactButton', () => () => (
  <div data-testid='mock-add-contact-button' />
))

const clientId = 'doot-id'

const waitForFirstLoad = async () =>
  waitForElementToBeRemoved(() => screen.getByTestId('loader'))

const arrangeTest = (mocks: MockedResponse[], error = '') =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestErrorBoundary errorMessage={error}>
        <RouteContext.Provider value={path => ({ url: path })}>
          <Contacts companyId={clientId} />
        </RouteContext.Provider>
      </TestErrorBoundary>
    </TestWrapperWithMocks>
  )

describe('CompanyContactsSection', () => {
  beforeAll(() => {
    MockDate.set('2021-12-01')
  })

  beforeEach(() => {
    PhoneContactsViewerMock.mockReturnValue(null)
  })

  it('renders company contacts', async () => {
    const { queryByText } = arrangeTest([mockContactsQuery({ clientId }, [{}])])

    await waitForFirstLoad()

    expect(queryByText(DEFAULT_NAME)).toBeInTheDocument()
    expect(queryByText('Primary')).not.toBeInTheDocument()
  })

  describe('Subsidiary contacts checkbox', () => {
    it('is not rendered if there are no children companies', async () => {
      const { queryByText } = arrangeTest([
        mockContactsQuery({ clientId }, [{}])
      ])

      await waitForFirstLoad()

      expect(queryByText(/Show subsidiary contacts/)).not.toBeInTheDocument()
    })

    it('is rendered for companies with children', async () => {
      const { queryByText } = arrangeTest([
        mockContactsQuery({ clientId, hasChildren: true }, [{}])
      ])

      await waitForFirstLoad()

      expect(queryByText(/Show Subsidiary Contacts/)).toBeInTheDocument()
    })

    it('queries and renders subsidiary contacts when clicked', async () => {
      const { queryByText, findByLabelText } = arrangeTest([
        mockContactsQuery({ clientId, hasChildren: true }, [{}]),
        mockContactsQuery(
          { clientId, hasChildren: true },
          [
            {},
            {
              fullName: 'Descendant McSubsidiaryface',
              client: {
                id: 'anything-but-the-clientId',
                portalPermissionsEnabled: true,
                webResource: {
                  url: 'http://apollo.is.life',
                  text: 'War is Peace',
                  __typename: 'Link'
                },
                __typename: 'Client'
              }
            }
          ],
          { showDescendants: true }
        )
      ])

      await waitForFirstLoad()

      expect(queryByText('Descendant McSubsidiaryface')).not.toBeInTheDocument()
      expect(queryByText(DEFAULT_NAME)).toBeInTheDocument()

      fireEvent.click(await findByLabelText(/Show Subsidiary Contacts/))
      await act(() => Promise.resolve())

      expect(queryByText('Descendant McSubsidiaryface')).toBeInTheDocument()
      expect(queryByText('Subsidiary')).toBeInTheDocument()
      expect(queryByText(DEFAULT_NAME)).toBeInTheDocument()
    })
  })

  it('renders loader', async () => {
    const { getByTestId, queryByText } = arrangeTest([])

    expect(queryByText('Contacts')).toBeInTheDocument()
    expect(getByTestId('loader')).toBeInTheDocument()
  })

  it('renders Add Contact button', async () => {
    const { queryByTestId } = arrangeTest([mockContactsQuery({ clientId })])

    await waitForFirstLoad()

    expect(queryByTestId('mock-add-contact-button')).toBeInTheDocument()
  })

  describe('Pager URL params reset', () => {
    it('resets URL params when total count changes', async () => {
      const twoPagesOfReps = Array(PAGE_SIZE * 2)
        .fill(0)
        .map((_, index) => ({ fullName: `Countme Countmebaby ${index + 1}` }))

      const oneRep = mockContactsQuery(
        { clientId, hasChildren: true },
        [{ fullName: 'One McAndonly 1st' }],
        { showDescendants: false }
      )
      const manyRepsWithFilterPage1 = mockContactsQuery(
        { clientId, hasChildren: true },
        twoPagesOfReps,
        { showDescendants: true }
      )
      const manyRepsWithFilterPage2 = mockContactsQuery(
        {
          clientId,
          hasChildren: true,
          pagination: { offset: PAGE_SIZE, limit: PAGE_SIZE }
        },
        twoPagesOfReps,
        { showDescendants: true }
      )
      const oneRepNoFilterPage2 = mockContactsQuery(
        {
          clientId,
          hasChildren: true,
          pagination: { offset: PAGE_SIZE, limit: PAGE_SIZE }
        },
        [{ fullName: 'One McAndonly 2nd' }],
        { showDescendants: false }
      )

      const { queryByText, findByText, findByLabelText } = arrangeTest([
        oneRep,
        manyRepsWithFilterPage1,
        manyRepsWithFilterPage2,
        oneRepNoFilterPage2
      ])

      // render initial rep
      await waitForFirstLoad()
      expect(queryByText('One McAndonly 1st')).toBeInTheDocument()

      // toggle the filter, this renders first of two pages
      fireEvent.click(await findByLabelText(/Show Subsidiary Contacts/))
      await act(() => Promise.resolve())

      expect(queryByText('Countme Countmebaby 10')).toBeInTheDocument()
      expect(mockUrlParams).toStrictEqual({ page: 1 })

      // navigate to second page
      fireEvent.click(await findByText('Next'))
      await act(() => Promise.resolve())

      expect(queryByText('Countme Countmebaby 20')).toBeInTheDocument()
      expect(mockUrlParams).toStrictEqual({ page: 2 })

      // toggle the filter back while still on the second page
      // must return user back to the first page
      fireEvent.click(await findByLabelText(/Show Subsidiary Contacts/))
      await act(() => Promise.resolve())

      expect(mockUrlParams).toStrictEqual({ page: 1 })
    })
  })

  describe('representative traits', () => {
    it('marks main representative as primary', async () => {
      const { queryByText } = arrangeTest([
        mockContactsQuery({ clientId }, [
          { fullName: 'Main McMainface', main: true }
        ])
      ])

      await waitForFirstLoad()

      expect(queryByText('Main McMainface')).toBeInTheDocument()
      expect(queryByText('Primary')).toBeInTheDocument()
    })

    it('renders link to the parent company', async () => {
      const { queryByText, container } = arrangeTest([
        mockContactsQuery({ clientId }, [
          {
            fullName: 'Regular Mcdudeface',
            client: {
              id: 'appollo-is-love',
              portalPermissionsEnabled: true,
              webResource: {
                text: 'linkitylink',
                url: 'http://linkitylink',
                __typename: 'Link'
              },
              __typename: 'Client'
            }
          }
        ])
      ])

      await waitForFirstLoad()

      expect(queryByText('Regular Mcdudeface')).toBeInTheDocument()
      expect(queryByText('linkitylink')).toBeInTheDocument()
      expect(
        container.querySelector('[href="http://linkitylink"]')
      ).toBeInTheDocument()
    })

    it('shows if the contact is no longer with the company', async () => {
      const { queryByText } = arrangeTest([
        mockContactsQuery({ clientId }, [
          {
            noLongerPartOfCompany: true
          }
        ])
      ])

      await waitForFirstLoad()

      expect(
        queryByText('Contact no longer with the company')
      ).toBeInTheDocument()
    })

    it('handles representatives with no contacts at all', async () => {
      const { queryByText } = arrangeTest([
        mockContactsQuery({ clientId }, [
          {
            fullName: 'Nologin McAccountantface',
            contacts: {
              nodes: [],
              __typename: 'ContactConnection'
            }
          }
        ])
      ])

      await waitForFirstLoad()

      expect(queryByText('Nologin McAccountantface')).toBeInTheDocument()
    })

    it('renders actions', async () => {
      const { queryByTestId } = arrangeTest([
        mockContactsQuery({ clientId }, [{}])
      ])

      await waitForFirstLoad()

      expect(queryByTestId('rep-actions')).toBeInTheDocument()
    })

    describe('Edit contact', () => {
      it('renders Edit Contact link', async () => {
        const { queryByLabelText } = arrangeTest([
          mockContactsQuery({ clientId }, [{}])
        ])

        await waitForFirstLoad()

        expect(queryByLabelText('Edit Contact')).toBeInTheDocument()
      })

      it('remembers return path when Edit is clicked', async () => {
        const path = 'path'
        const navigate = jest.fn()

        useNavigateMock.mockReturnValue(navigate)
        getUrlMock.mockReturnValue(path)
        arrangeTest([mockContactsQuery({ clientId }, [{}])])

        await waitForFirstLoad()

        fireEvent.click(screen.getByLabelText('Edit Contact'))

        expect(useNavigateMock).toHaveBeenCalledTimes(1)
        expect(getUrlMock).toHaveBeenCalledTimes(1)
        expect(navigate).toHaveBeenCalledWith(
          `/company_representatives/0/edit?return_path=${path}`
        )
      })
    })

    it('renders information', async () => {
      const { queryByText } = arrangeTest([
        mockContactsQuery({ clientId }, [
          {
            fullName: 'Regular Mcdudeface',
            information: 'Woot woot'
          }
        ])
      ])

      await waitForFirstLoad()

      expect(queryByText('Regular Mcdudeface')).toBeInTheDocument()
      expect(queryByText('Woot woot')).toBeInTheDocument()
    })

    const PHONE_CONTACTS = [
      {
        id: 'phone-uno-id',
        value: '+1-BANANAPHONE',
        primary: true,
        phoneCategory: PhoneCategory.HOME,
        type: ContactType.PHONE,
        note: null,
        __typename: 'Contact' as const
      },
      {
        id: 'phone-dos-id',
        value: '+1-SHMLANANA-PHOME',
        primary: false,
        phoneCategory: PhoneCategory.OTHER,
        type: ContactType.PHONE,
        note: null,
        __typename: 'Contact' as const
      }
    ]

    it('passes phone contacts to phone viewer', async () => {
      arrangeTest([
        mockContactsQuery({ clientId }, [
          {
            // override encoded id for the sake of assertion
            id: 'rep-id',
            contacts: {
              nodes: PHONE_CONTACTS,
              __typename: 'ContactConnection'
            }
          }
        ])
      ])

      await waitForFirstLoad()

      expect(PhoneContactsViewerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          nodeData: { companyRepresentativeId: 'rep-id' },
          nodes: PHONE_CONTACTS
        }),
        expect.anything()
      )
    })

    it('renders timezone', async () => {
      const { queryByText } = arrangeTest([
        mockContactsQuery({ clientId }, [
          {
            fullName: 'Regular Mcdudeface',
            information: 'Woot woot'
          }
        ])
      ])

      await waitForFirstLoad()

      expect(
        queryByText('(UTC+03:00) Europe/Moscow, now 3:00 AM')
      ).toBeInTheDocument()
    })

    it('renders "Assign to Job" button', async () => {
      arrangeTest([mockContactsQuery({ clientId }, [{}])])

      await waitForFirstLoad()

      expect(screen.getByText(/Assign to Job/)).toBeEnabled()
    })

    it('renders "Merged Into"', async () => {
      const { container, getByText } = arrangeTest([
        mockContactsQuery({ clientId }, [
          {
            mergedInto: {
              id: 'test-id',
              webResource: {
                url: 'http://wooot.merged.reppo',
                text: 'Merged McContactface',
                __typename: 'Link'
              },
              __typename: 'CompanyRepresentative'
            }
          }
        ])
      ])

      await waitForFirstLoad()

      expect(getByText(/Merged McContactface/)).toBeInTheDocument()
      expect(
        container.querySelector('[href="http://wooot.merged.reppo"]')
      ).toBeInTheDocument()
    })
  })

  it('throws an error if query errors out', async () => {
    // suppress console error
    jest.spyOn(console, 'error').mockImplementation(() => {})
    const errorMessage = 'Error: Computer says no'

    const { queryByText } = arrangeTest(
      // TODO: TestErrorBoundary could catch and render actual error
      // but it doesn't so mock TestErrorBoundary message too
      [mockFailedContactsQuery(clientId, errorMessage)],
      errorMessage
    )

    await waitForFirstLoad()

    expect(queryByText(errorMessage)).toBeInTheDocument()
  })
})
