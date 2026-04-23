import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { DetailedList } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'

import SocialMediaItem from '../../../SocialMedia/components/SocialMediaItem'
import { adjustInputValues } from '../../../SocialMedia/utils/adjust-input-values'
import { ClientSocialMediaFragment } from '../../../SocialMedia/data'
import { CompanyExternalSourceType } from '../../../CompanyExternalSourceInfo'
import CompanyExternalSourceInfoLink from '../../../CompanyExternalSourceInfoLink'
import SocialMediaContent from '.'

const COMPANY = {
  id: Symbol(),
  linkedinLink: Symbol(),
  facebookLink: { text: Symbol() },
  crunchbaseLink: Symbol(),
  zoominfoProfileUrl: Symbol(),
  twitterLink: { text: Symbol() },
  operations: {
    patchClientProfile: Symbol()
  },
  buyingSignalsService: {
    twitter: { text: Symbol(), url: Symbol() },
    linkedin: { text: Symbol(), url: Symbol() },
    facebook: { text: Symbol(), url: Symbol() },
    crunchbase: { text: Symbol(), url: Symbol() }
  },
  clientopedia: {
    linkedinUrl: { text: Symbol(), url: Symbol() },
    zoominfoUrl: { text: Symbol(), url: Symbol() }
  }
}

const INITIAL_VALUES = { clientId: COMPANY.id }
const ADJUSTED_VALUES = {
  twitter: Symbol(),
  facebook: Symbol(),
  zoominfoProfile: Symbol(),
  linkedin: Symbol(),
  crunchbase: Symbol()
}

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

jest.mock('../../../SocialMedia/components/SocialMediaItem', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@staff-portal/operations', () => ({
  isOperationEnabled: jest.fn()
}))

jest.mock('../../../SocialMedia/utils/adjust-input-values', () => ({
  adjustInputValues: jest.fn()
}))

const HANDLE_CHANGE = () => {}
const USE_GET_CLIENT_SOCIAL_MEDIA = () => {}

jest.mock('../../utils', () => ({
  getClientSocialMediaHook: () => USE_GET_CLIENT_SOCIAL_MEDIA,
  useSocialMediaMutation: () => ({ handleChange: HANDLE_CHANGE })
}))

const DetailedListMock = DetailedList as unknown as jest.Mock
const DetailedListRowMock = DetailedList.Row as unknown as jest.Mock
const DetailedListItemMock = DetailedList.Item as unknown as jest.Mock
const SocialMediaItemMock = SocialMediaItem as unknown as jest.Mock
const adjustInputValuesMock = adjustInputValues as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock

describe('SocialMediaContent', () => {
  beforeEach(() => {
    DetailedListMock.mockImplementation(({ children }) => children)
    DetailedListRowMock.mockImplementation(({ children }) => children)
    DetailedListItemMock.mockImplementation(({ children }) => children)
    SocialMediaItemMock.mockReturnValue(null)
    adjustInputValuesMock.mockReturnValue(ADJUSTED_VALUES)
    isOperationEnabledMock.mockReturnValue(true)
  })

  it('renders a section with detailed list', () => {
    render(
      <TestWrapper>
        <SocialMediaContent
          companyDetails={COMPANY as unknown as ClientSocialMediaFragment}
        />
      </TestWrapper>
    )

    expect(adjustInputValuesMock).toHaveBeenCalledTimes(1)
    expect(adjustInputValuesMock).toHaveBeenCalledWith(COMPANY)

    expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)
    expect(isOperationEnabledMock).toHaveBeenCalledWith(
      COMPANY.operations.patchClientProfile
    )

    expect(screen.getByTestId('Section-title').textContent).toBe('Social Media')

    expect(SocialMediaItemMock).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: expect.objectContaining({
          type: CompanyExternalSourceInfoLink,
          props: {
            value: COMPANY.buyingSignalsService.twitter.text,
            url: COMPANY.buyingSignalsService.twitter.url,
            userValue: COMPANY.twitterLink.text,
            type: CompanyExternalSourceType.BSS
          }
        }),
        disabled: false,
        handleOnChange: HANDLE_CHANGE,
        initialValues: INITIAL_VALUES,
        name: 'twitter',
        queryValue: USE_GET_CLIENT_SOCIAL_MEDIA,
        value: ADJUSTED_VALUES.twitter,
        webResource: COMPANY.twitterLink
      }),
      {}
    )

    expect(SocialMediaItemMock).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        children: [
          expect.objectContaining({
            type: CompanyExternalSourceInfoLink,
            props: {
              value: COMPANY.buyingSignalsService.linkedin.text,
              url: COMPANY.buyingSignalsService.linkedin.url,
              userValue: ADJUSTED_VALUES.linkedin,
              type: CompanyExternalSourceType.BSS
            }
          }),
          expect.objectContaining({
            type: CompanyExternalSourceInfoLink,
            props: {
              value: COMPANY.clientopedia.linkedinUrl.text,
              url: COMPANY.clientopedia.linkedinUrl.url,
              userValue: ADJUSTED_VALUES.linkedin,
              type: CompanyExternalSourceType.CLIENTOPEDIA
            }
          })
        ],
        disabled: false,
        handleOnChange: HANDLE_CHANGE,
        initialValues: INITIAL_VALUES,
        name: 'linkedin',
        queryValue: USE_GET_CLIENT_SOCIAL_MEDIA,
        value: ADJUSTED_VALUES.linkedin,
        webResource: COMPANY.linkedinLink
      }),
      {}
    )

    expect(SocialMediaItemMock).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        children: expect.objectContaining({
          type: CompanyExternalSourceInfoLink,
          props: {
            value: COMPANY.buyingSignalsService.facebook.text,
            url: COMPANY.buyingSignalsService.facebook.url,
            userValue: COMPANY.facebookLink.text,
            type: CompanyExternalSourceType.BSS
          }
        }),
        disabled: false,
        handleOnChange: HANDLE_CHANGE,
        initialValues: INITIAL_VALUES,
        name: 'facebook',
        queryValue: USE_GET_CLIENT_SOCIAL_MEDIA,
        value: ADJUSTED_VALUES.facebook,
        webResource: COMPANY.facebookLink
      }),
      {}
    )

    expect(SocialMediaItemMock).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        children: expect.objectContaining({
          type: CompanyExternalSourceInfoLink,
          props: {
            value: COMPANY.buyingSignalsService.crunchbase.text,
            url: COMPANY.buyingSignalsService.crunchbase.url,
            userValue: ADJUSTED_VALUES.crunchbase,
            type: CompanyExternalSourceType.BSS
          }
        }),
        disabled: false,
        handleOnChange: HANDLE_CHANGE,
        initialValues: INITIAL_VALUES,
        name: 'crunchbase',
        queryValue: USE_GET_CLIENT_SOCIAL_MEDIA,
        value: ADJUSTED_VALUES.crunchbase,
        webResource: COMPANY.crunchbaseLink
      }),
      {}
    )

    expect(SocialMediaItemMock).toHaveBeenNthCalledWith(
      5,
      expect.objectContaining({
        children: expect.objectContaining({
          type: CompanyExternalSourceInfoLink,
          props: {
            value: COMPANY.clientopedia.zoominfoUrl.text,
            url: COMPANY.clientopedia.zoominfoUrl.url,
            type: CompanyExternalSourceType.CLIENTOPEDIA
          }
        }),
        disabled: false,
        handleOnChange: HANDLE_CHANGE,
        initialValues: INITIAL_VALUES,
        name: 'zoominfoProfile',
        queryValue: USE_GET_CLIENT_SOCIAL_MEDIA,
        value: COMPANY.zoominfoProfileUrl,
        webResource: {
          url: COMPANY.zoominfoProfileUrl,
          text: 'Go to zoominfo'
        }
      }),
      {}
    )
  })
})
