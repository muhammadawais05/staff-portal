import {
  HowDidYouHearValues,
  OperationCallableTypes,
  ReviewStatus
} from '@staff-portal/graphql/staff'

export const systemInformationDataMock = {
  id: 'VjEtQ2xpZW50LTUxODk2OA',
  reviewStatus: ReviewStatus.NONE,
  reviewLink: 'https://www.trustpilot.com/users/580e56d90000ff000a50a05a',
  lastAnsweredPromotion: {
    score: 10,
    updatedAt: '2016-09-26T13:20:20-04:00' as const,
    __typename: 'Promotion'
  },
  interestedIn: 'Product Managers',
  updatedAt: '2021-05-01T00:58:26+03:00' as const,
  representatives: {
    nodes: [
      {
        id: 'test-id',
        currentSignInAt: '2021-04-24T01:04:02+03:00' as const,
        currentSignInIp: '170.150.12.2',
        ipLocationV2: {
          cityName: 'Mexico City',
          countryName: 'Mexico'
        }
      }
    ],
    __typename: 'ClientRepresentativesConnection'
  },
  mobileAppEnabled: true,
  howDidYouHear: HowDidYouHearValues.SEARCH_ENGINE_RESULT,
  howDidYouHearDetails: 'Google',
  tosAcceptedAt: '2021-04-24T00:47:40+03:00' as const,
  applicationInfo: {
    id: 'test-id',
    attributes: [
      {
        key: 'origin',
        value: 'https://staging.toptal.net/',
        __typename: 'KeyValueStrings'
      },
      { key: 'ip', value: '185.237.75.69', __typename: 'KeyValueStrings' },
      {
        key: 'cookies',
        value:
          'chameleon_identity=7a706957-2b01-429c-8c49-b25df6bf2889; appinfo_id_status=doing_request',
        __typename: 'KeyValueStrings'
      },
      {
        key: 'user_agent',
        value:
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36',
        __typename: 'KeyValueStrings'
      },
      {
        key: 'accept_language',
        value: 'en-GB,en;q=0.9',
        __typename: 'KeyValueStrings'
      },
      { key: 'country', value: 'Ukraine', __typename: 'KeyValueStrings' },
      { key: 'country_code', value: 'UA', __typename: 'KeyValueStrings' },
      { key: 'continent_code', value: 'EU', __typename: 'KeyValueStrings' },
      { key: 'city', value: 'Kyiv', __typename: 'KeyValueStrings' },
      { key: 'state', value: 'Kyiv City', __typename: 'KeyValueStrings' },
      { key: 'state_code', value: '30', __typename: 'KeyValueStrings' },
      { key: 'postal_code', value: '04176', __typename: 'KeyValueStrings' },
      {
        key: 'connection_type',
        value: 'Cable/DSL',
        __typename: 'KeyValueStrings'
      },
      {
        key: 'operating_system',
        value: 'Macintosh',
        __typename: 'KeyValueStrings'
      },
      { key: 'browser', value: 'Chrome', __typename: 'KeyValueStrings' },
      { key: 'continent', value: 'Europe', __typename: 'KeyValueStrings' },
      { key: 'language', value: 'en-GB', __typename: 'KeyValueStrings' },
      {
        key: 'origin_host',
        value: 'staging.toptal.net',
        __typename: 'KeyValueStrings'
      },
      { key: 'organic?', value: 'false', __typename: 'KeyValueStrings' },
      {
        key: 'created_at',
        value: '2021-06-22T13:54:40.082Z' as const,
        __typename: 'KeyValueStrings'
      },
      { key: 'id', value: '184081781', __typename: 'KeyValueStrings' }
    ],
    webResource: {
      text: '',
      url: 'https://staging.toptal.net/platform/staff/application_infos/184081781',
      __typename: 'Link'
    },
    __typename: 'ApplicationInfo'
  },
  referrer: {
    id: 'test-id',
    fullName: 'Koelpin-Cummings CB',
    webResource: {
      text: 'Koelpin-Cummings CB',
      url: 'https://staging.toptal.net/platform/staff/companies/110458',
      __typename: 'Link'
    },
    __typename: 'Client'
  },
  createdAt: '2021-04-24T00:47:40+03:00' as const,
  claimedAt: '2021-04-24T00:48:24+03:00' as const,
  approvedAt: '2021-04-24T01:02:46+03:00' as const,
  billingVerifiedAt: '2021-04-24T01:06:55+03:00' as const,
  hiresCount: 2,
  claimableSince: '2021-04-24T00:48:22+03:00' as const,
  promotions: {
    webResource: {
      text: 'Promotions',
      url: 'https://staging.toptal.net/platform/staff/companies/2470489/promotions',
      __typename: 'Link'
    },
    __typename: 'PromotionsConnection'
  },
  operations: {
    patchClientProfile: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'ClientOperations'
  },
  __typename: 'Client'
}
