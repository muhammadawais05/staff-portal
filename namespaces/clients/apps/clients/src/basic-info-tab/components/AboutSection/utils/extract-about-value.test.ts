import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import extractAboutValue from './extract-about-value'
import { GetClientAboutAndOperationQuery } from '../data'

const INTERNAL_ABOUT = 'client.about'
const BUYING_SIGNALS_ABOUT = 'client.buyingSignalsService.about'
const CLIENTOPEDIA_DESCRIPTION = 'client.clientopedia.description'

const getDataMock = (props?: {
  internalAbout?: string | null
  buyingSignalsAbout?: string | null
  clientopediaDescription?: string | null
}) => {
  const dataMock: GetClientAboutAndOperationQuery = {
    node: {
      id: 'id',
      about: props?.internalAbout,
      buyingSignalsService: {
        about: props?.buyingSignalsAbout
      },
      clientopedia: {
        description: props?.clientopediaDescription
      },
      operations: {
        patchClientProfile: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    }
  }

  return dataMock
}

describe('extractAbout', () => {
  describe('when has no data', () => {
    it.each([
      getDataMock({
        internalAbout: undefined,
        buyingSignalsAbout: undefined
      }),
      getDataMock({
        internalAbout: null,
        buyingSignalsAbout: null
      }),
      undefined
    ])('returns an empty string', data => {
      const value = extractAboutValue(data)

      expect(value).toBe('')
    })
  })

  describe.each([
    {
      condition: `has data on ${INTERNAL_ABOUT} only`,
      data: getDataMock({ internalAbout: INTERNAL_ABOUT }),
      expected: INTERNAL_ABOUT
    },
    {
      condition: `has data on ${BUYING_SIGNALS_ABOUT} only`,
      data: getDataMock({
        buyingSignalsAbout: BUYING_SIGNALS_ABOUT
      }),
      expected: BUYING_SIGNALS_ABOUT
    },
    {
      condition: `has data on ${CLIENTOPEDIA_DESCRIPTION} only`,
      data: getDataMock({
        clientopediaDescription: CLIENTOPEDIA_DESCRIPTION
      }),
      expected: CLIENTOPEDIA_DESCRIPTION
    },
    {
      condition: `has data on ${BUYING_SIGNALS_ABOUT} and ${CLIENTOPEDIA_DESCRIPTION}`,
      data: getDataMock({
        buyingSignalsAbout: BUYING_SIGNALS_ABOUT,
        clientopediaDescription: CLIENTOPEDIA_DESCRIPTION
      }),
      expected: BUYING_SIGNALS_ABOUT
    },
    {
      condition: 'has data on each possible field',
      data: getDataMock({
        internalAbout: INTERNAL_ABOUT,
        buyingSignalsAbout: BUYING_SIGNALS_ABOUT,
        clientopediaDescription: CLIENTOPEDIA_DESCRIPTION
      }),
      expected: INTERNAL_ABOUT
    }
  ])('when $condition', ({ data, expected }) => {
    it(`extracts data from ${expected}`, () => {
      const value = extractAboutValue(data)

      expect(value).toBe(expected)
    })
  })
})
