import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { DetailedList } from '@staff-portal/ui'
import { TestWrapper } from '@staff-portal/test-utils'

import { systemInformationDataMock } from '../../data/system-information-fragment.mock'
import {
  Origin,
  ReviewLink,
  Referrer,
  NPSScore,
  InterestedIn,
  LastLogin,
  HowDidYouHear,
  HowDidYouHearDetails
} from '../../components'
import {
  useSystemInformationMutation,
  getClientSystemInformationDataHooks
} from '../../utils'
import SystemInformationContent from '.'

jest.mock('@staff-portal/current-user')
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
jest.mock(
  '../../components',
  () => ({
    LastLogin: jest.fn(),
    NPSScore: jest.fn(),
    Origin: jest.fn(),
    Referrer: jest.fn(),
    ReviewLink: jest.fn(),
    InterestedIn: jest.fn(),
    HowDidYouHear: jest.fn(),
    HowDidYouHearDetails: jest.fn()
  })
)
jest.mock('../../utils', () => ({
  useSystemInformationMutation: jest.fn(),
  getClientSystemInformationDataHooks: jest.fn(),
  useClientHowDidYouHear: jest.fn(),
  useClientHowDidYouHearDetails: jest.fn()
}))

const handleChangeMock = jest.fn()
const useClientReviewLinkMock = jest.fn()
const useClientInterestedInMock = jest.fn()
const useClientHowDidYouHearMock = jest.fn()
const useClientHowDidYouHearDetailsMock = jest.fn()

const mockedDetailedList = DetailedList as unknown as jest.Mock
const mockedDetailedListRow = DetailedList.Row as unknown as jest.Mock
const mockedDetailedListItem = DetailedList.Item as unknown as jest.Mock
const mockedGetClientSystemInformationDataHooks =
  getClientSystemInformationDataHooks as unknown as jest.Mock
const mockedUseSystemInformationMutation =
  useSystemInformationMutation as unknown as jest.Mock
const mockedOrigin = Origin as unknown as jest.Mock
const mockedReviewLink = ReviewLink as unknown as jest.Mock
const mockedReferrer = Referrer as unknown as jest.Mock
const mockedNPSScore = NPSScore as unknown as jest.Mock
const mockedInterestedIn = InterestedIn as unknown as jest.Mock
const mockedLastLogin = LastLogin as unknown as jest.Mock
const mockedHowDidYouHear = HowDidYouHear as unknown as jest.Mock
const mockedHowDidYouHearDetails = HowDidYouHearDetails as unknown as jest.Mock

const renderComponent = (
  props: ComponentProps<typeof SystemInformationContent>
) => {
  mockedDetailedList.mockImplementation(({ children }) => children)
  mockedDetailedListRow.mockImplementation(({ children }) => children)
  mockedDetailedListItem.mockImplementation(({ label, value, children }) => (
    <div data-testid={label}>{value || children || NO_VALUE}</div>
  ))
  mockedUseSystemInformationMutation.mockImplementation(() => ({
    handleChange: handleChangeMock
  }))
  mockedGetClientSystemInformationDataHooks.mockImplementation(() => ({
    useClientReviewLink: useClientReviewLinkMock,
    useClientInterestedIn: useClientInterestedInMock,
    useClientHowDidYouHear: useClientHowDidYouHearMock,
    useClientHowDidYouHearDetails: useClientHowDidYouHearDetailsMock
  }))
  mockedOrigin.mockImplementation(() => null)
  mockedReviewLink.mockImplementation(() => null)
  mockedReferrer.mockImplementation(() => null)
  mockedNPSScore.mockImplementation(() => null)
  mockedInterestedIn.mockImplementation(() => null)
  mockedLastLogin.mockImplementation(() => null)
  mockedHowDidYouHear.mockImplementation(() => null)
  mockedHowDidYouHearDetails.mockImplementation(() => null)

  render(
    <TestWrapper>
      <SystemInformationContent {...props} />
    </TestWrapper>
  )
}

const systemInformation = systemInformationDataMock

describe('SystemInformationContent', () => {
  it('default render', () => {
    renderComponent({ systemInformation })

    expect(screen.getByTestId('Section-title')).toHaveTextContent(
      'System information'
    )

    expect(mockedOrigin).toHaveBeenCalledWith(
      {
        clientId: systemInformationDataMock.id
      },
      {}
    )
    expect(mockedReviewLink).toHaveBeenCalledWith(
      expect.objectContaining({
        handleChange: handleChangeMock,
        reviewLink: systemInformationDataMock.reviewLink,
        useClientReviewLink: useClientReviewLinkMock
      }),
      {}
    )
    expect(mockedReferrer).toHaveBeenCalledWith(
      {
        referrer: systemInformationDataMock.referrer
      },
      {}
    )
    expect(mockedNPSScore).toHaveBeenCalledWith(
      expect.objectContaining({
        lastAnsweredPromotion: systemInformationDataMock.lastAnsweredPromotion,
        promotions: systemInformationDataMock.promotions,
        timeZone: 'Europe/London'
      }),
      {}
    )
    expect(mockedInterestedIn).toHaveBeenCalledWith(
      expect.objectContaining({
        handleChange: handleChangeMock,
        interestedIn: systemInformationDataMock.interestedIn,
        useClientInterestedIn: useClientInterestedInMock
      }),
      {}
    )
    expect(mockedLastLogin).toHaveBeenCalledWith(
      expect.objectContaining({
        lastLoginDetails: systemInformationDataMock.representatives.nodes[0],
        timeZone: 'Europe/London'
      }),
      {}
    )
    expect(mockedHowDidYouHear).toHaveBeenCalledWith(
      expect.objectContaining({
        handleChange: handleChangeMock,
        howDidYouHear: systemInformationDataMock.howDidYouHear,
        useClientHowDidYouHear: useClientHowDidYouHearMock
      }),
      {}
    )
    expect(mockedHowDidYouHearDetails).toHaveBeenCalledWith(
      expect.objectContaining({
        handleChange: handleChangeMock,
        howDidYouHearDetails: systemInformationDataMock.howDidYouHearDetails,
        useClientHowDidYouHearDetails: useClientHowDidYouHearDetailsMock
      }),
      {}
    )
  })
})

describe.each([
  ['Review status', 'None'],
  ['Last edited', 'Apr 30, 2021 at 10:58 PM'],
  ['Approved on', 'Apr 23, 2021 at 11:02 PM'],
  ['Billing verified on', 'Apr 23, 2021'],
  ['Mobile app access', 'Enabled'],
  ['Past hires', '2'],
  ['Applied on', 'Apr 23, 2021 at 10:47 PM'],
  ['Claimed on', 'Apr 23, 2021 at 10:48 PM'],
  ['Terms of service', 'Accepted on Apr 23, 2021'],
  ['Claimable since', 'Apr 23, 2021 at 10:48 PM']
])('item', (label, value) => {
  it(`${label} should match`, () => {
    renderComponent({ systemInformation })

    expect(screen.getByTestId(label)).toHaveTextContent(value)
  })
})
