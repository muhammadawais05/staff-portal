import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { DetailedList, SubSection } from '@staff-portal/ui'
import { Client } from '@staff-portal/graphql/staff'
import { CompanyStatus, ClientCardMatchers } from '@staff-portal/clients'

import { ClientListTaskCardDetails } from './ClientListTaskCardDetails'

jest.mock('@staff-portal/clients', () => ({
  CompanyStatus: jest.fn(),
  ClientCardMatchers: jest.fn()
}))
jest.mock('@staff-portal/ui', () => {
  const DetailedListMock = jest.fn() as unknown as {
    Row: jest.Mock
    Item: jest.Mock
  }

  DetailedListMock.Row = jest.fn()
  DetailedListMock.Item = jest.fn()

  return {
    DetailedList: DetailedListMock,
    SubSection: jest.fn()
  }
})

const CompanyStatusMock = CompanyStatus as jest.Mock
const ClientCardMatchersMock = ClientCardMatchers as jest.Mock
const SubSectionMock = SubSection as jest.Mock
const DetailedListMock = DetailedList as unknown as jest.Mock
const DetailedListRowMock = DetailedList.Row as unknown as jest.Mock
const DetailedListItemMock = DetailedList.Item as unknown as jest.Mock

const clientMock = {
  claimer: {
    fullName: Symbol(),
    webResource: {
      url: Symbol()
    }
  },
  investigations: Symbol(),
  cumulativeStatus: Symbol(),
  matchers: {
    edges: Symbol()
  }
} as unknown as Client

describe('ClientListTaskCardDetails', () => {
  it('default render', () => {
    SubSectionMock.mockImplementation(({ children }) => children)
    DetailedListMock.mockImplementation(({ children }) => children)
    DetailedListRowMock.mockImplementation(({ children }) => children)
    DetailedListItemMock.mockImplementation(({ children }) => children)
    CompanyStatusMock.mockReturnValue(null)
    ClientCardMatchersMock.mockReturnValue(null)

    render(<ClientListTaskCardDetails client={clientMock} />)

    expect(CompanyStatusMock).toHaveBeenCalledWith(
      {
        cumulativeStatus: clientMock.cumulativeStatus,
        investigations: clientMock.investigations
      },
      {}
    )

    expect(ClientCardMatchersMock).toHaveBeenCalledWith(
      {
        matchers: clientMock.matchers?.edges,
        prependValues: [
          expect.objectContaining({
            fullName: clientMock.claimer?.fullName,
            url: clientMock.claimer?.webResource.url
          })
        ]
      },
      {}
    )
  })
})
