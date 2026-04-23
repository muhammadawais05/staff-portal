import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import {
  useRepresentativePhonesEmails,
  EditableInformation,
  CallRecording,
  ClientAndEmploymentStatus,
  Email,
  Status,
  JobsWithAssignButton,
  LastLogin,
  RepresentativeFragment,
  TimeZone,
  LinkOverflow,
  PhoneContactsViewer
} from '@staff-portal/client-representatives'
import { render } from '@testing-library/react'

import RepresentativeContent from './RepresentativeContent'
import { getCommunicationOptions } from '../utils/get-communication-options'

jest.mock('../utils/get-communication-options', () => ({
  getCommunicationOptions: jest.fn()
}))
jest.mock('@staff-portal/client-representatives', () => ({
  useRepresentativePhonesEmails: jest.fn(),
  EditableInformation: jest.fn(),
  CallRecording: jest.fn(),
  ClientAndEmploymentStatus: jest.fn(),
  Email: jest.fn(),
  Status: jest.fn(),
  JobsWithAssignButton: jest.fn(),
  LastLogin: jest.fn(),
  RepresentativeFragment: jest.fn(),
  TimeZone: jest.fn(),
  LinkOverflow: jest.fn(),
  PhoneContactsViewer: jest.fn()
}))
jest.mock('@staff-portal/ui', () => {
  const mock = jest.fn() as unknown as {
    Row: Function
    Item: Function
  }

  mock.Row = jest.fn()
  mock.Item = jest.fn()

  return {
    DetailedList: mock
  }
})

const getCommunicationOptionsMock = getCommunicationOptions as jest.Mock
const useRepresentativePhonesEmailsMock =
  useRepresentativePhonesEmails as jest.Mock
const DetailedListMock = DetailedList as unknown as jest.Mock
const DetailedListRowMock = DetailedList.Row as unknown as jest.Mock
const DetailedListItemMock = DetailedList.Item as unknown as jest.Mock

const REPRESENTATIVE = {
  id: Symbol(),
  client: { webResource: Symbol() },
  position: Symbol(),
  linkedin: Symbol(),
  jobs: { nodes: Symbol() },
  information: Symbol(),
  noLongerPartOfCompany: Symbol(),
  operations: {
    assignCompanyRepresentativeToJob: Symbol(),
    updateCompanyRepresentativeProfile: Symbol()
  },
  mergedInto: {
    webResource: {
      url: Symbol(),
      text: Symbol()
    }
  },
  currentSignInAt: Symbol(),
  currentSignInIp: Symbol(),
  cumulativeStatus: Symbol(),
  ipLocation: Symbol(),
  timeZone: Symbol(),
  communicationOptions: [Symbol()],
  callRecordingAccepted: Symbol()
} as unknown as RepresentativeFragment
const EMAILS = Symbol()
const PHONE = [Symbol()]
const COMMUNICATIONS = Symbol()
const EMPTY_REPRESENTATIVE = {
  client: { webResource: Symbol() },
  operations: {
    assignCompanyRepresentativeToJob: Symbol(),
    updateCompanyRepresentativeProfile: Symbol()
  }
} as unknown as RepresentativeFragment

describe('RepresentativeContent', () => {
  beforeEach(() => {
    DetailedListMock.mockImplementation(({ children }) => children)
    DetailedListRowMock.mockImplementation(({ children }) => children)
    DetailedListItemMock.mockReturnValue(null)
  })

  it('calls detailed list components with expected props', () => {
    useRepresentativePhonesEmailsMock.mockReturnValue([PHONE, EMAILS])
    getCommunicationOptionsMock.mockReturnValue(COMMUNICATIONS)

    render(<RepresentativeContent representative={REPRESENTATIVE} />)

    expect(getCommunicationOptionsMock).toHaveBeenCalledTimes(1)
    expect(getCommunicationOptionsMock).toHaveBeenCalledWith(
      REPRESENTATIVE.communicationOptions
    )

    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Company',
        children: expect.objectContaining({
          type: ClientAndEmploymentStatus,
          props: {
            link: REPRESENTATIVE.client.webResource,
            noLongerPartOfCompany: REPRESENTATIVE.noLongerPartOfCompany
          }
        })
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Email',
        children: expect.objectContaining({
          type: Email,
          props: {
            emails: EMAILS,
          }
        })
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Portal Status',
        children: expect.objectContaining({
          type: Status,
          props: {
            status: REPRESENTATIVE.cumulativeStatus
          }
        })
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Position',
        children: REPRESENTATIVE.position
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Last login',
        children: expect.objectContaining({
          type: LastLogin,
          props: {
            currentSignInAt: REPRESENTATIVE.currentSignInAt,
            currentSignInIp: REPRESENTATIVE.currentSignInIp,
            ipLocation: REPRESENTATIVE.ipLocation
          }
        })
      },
      {}
    )

    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Phone',
        children: expect.objectContaining({
          type: PhoneContactsViewer,
          props: {
            nodes: PHONE,
            nodeData: { companyRepresentativeId: REPRESENTATIVE.id }
          }
        })
      },
      {}
    )

    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Time zone',
        children: expect.objectContaining({
          type: TimeZone,
          props: {
            timeZone: REPRESENTATIVE.timeZone
          }
        })
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'LinkedIn',
        children: expect.objectContaining({
          type: LinkOverflow,
          props: {
            link: {
              url: REPRESENTATIVE.linkedin,
              text: REPRESENTATIVE.linkedin
            },
            target: '_blank'
          }
        })
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Communication',
        children: COMMUNICATIONS
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Linked Jobs',
        children: expect.objectContaining({
          type: JobsWithAssignButton,
          props: {
            jobs: REPRESENTATIVE.jobs?.nodes,
            assignCompanyRepresentativeToJob:
              REPRESENTATIVE.operations.assignCompanyRepresentativeToJob,
            companyRepresentativeId: REPRESENTATIVE.id
          }
        })
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Call Recording',
        children: expect.objectContaining({
          type: CallRecording,
          props: {
            accepted: REPRESENTATIVE.callRecordingAccepted
          }
        })
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Information',
        children: expect.objectContaining({
          type: EditableInformation,
          props: {
            companyRepresentativeId: REPRESENTATIVE.id,
            operation:
              REPRESENTATIVE.operations.updateCompanyRepresentativeProfile,
            value: REPRESENTATIVE.information
          }
        })
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Merged into link',
        children: expect.objectContaining({
          type: LinkOverflow,
          props: {
            link: {
              url: REPRESENTATIVE.mergedInto?.webResource.url,
              text: REPRESENTATIVE.mergedInto?.webResource.text
            },
            target: '_blank'
          }
        })
      },
      {}
    )
  })

  it('returns null when there is no value', () => {
    useRepresentativePhonesEmailsMock.mockReturnValue([[], EMAILS])
    getCommunicationOptionsMock.mockReturnValue(COMMUNICATIONS)

    render(<RepresentativeContent representative={EMPTY_REPRESENTATIVE} />)

    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'Phone',
        children: null
      },
      {}
    )
    expect(DetailedListItemMock).toHaveBeenCalledWith(
      {
        label: 'LinkedIn',
        children: null
      },
      {}
    )
  })

  it('does not render Merged into link item, when there is no value', () => {
    useRepresentativePhonesEmailsMock.mockReturnValue([[], EMAILS])

    render(<RepresentativeContent representative={EMPTY_REPRESENTATIVE} />)

    expect(DetailedListItemMock).not.toHaveBeenCalledWith(12, {
      label: 'Merged into link'
    })
  })
})
