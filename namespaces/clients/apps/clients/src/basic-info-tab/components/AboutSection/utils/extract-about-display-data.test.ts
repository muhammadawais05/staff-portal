import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { GetClientAboutAndOperationQuery } from '../data'
import extractAboutDisplayData from './extract-about-display-data'

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

describe('extactAboutDisplayData', () => {
  it(`extract data from ${INTERNAL_ABOUT}`, () => {
    const data = getDataMock({ internalAbout: INTERNAL_ABOUT })

    const { internalAbout } = extractAboutDisplayData(data)

    expect(internalAbout).toBe(INTERNAL_ABOUT)
  })

  describe(`when has no data on ${INTERNAL_ABOUT}`, () => {
    it(`extracts data from ${BUYING_SIGNALS_ABOUT}`, () => {
      const data = getDataMock({
        internalAbout: null,
        buyingSignalsAbout: BUYING_SIGNALS_ABOUT
      })

      const { bssAbout } = extractAboutDisplayData(data)

      expect(bssAbout).toBe(BUYING_SIGNALS_ABOUT)
    })

    it(`extracts data from ${CLIENTOPEDIA_DESCRIPTION}`, () => {
      const data = getDataMock({
        internalAbout: null,
        clientopediaDescription: CLIENTOPEDIA_DESCRIPTION
      })

      const { clientopediaDescription } = extractAboutDisplayData(data)

      expect(clientopediaDescription).toBe(CLIENTOPEDIA_DESCRIPTION)
    })
  })

  describe(`when has data on ${INTERNAL_ABOUT}`, () => {
    describe(`when ${INTERNAL_ABOUT} is different from ${BUYING_SIGNALS_ABOUT}`, () => {
      it(`extracts data from ${BUYING_SIGNALS_ABOUT}`, () => {
        const data = getDataMock({
          internalAbout: INTERNAL_ABOUT,
          buyingSignalsAbout: BUYING_SIGNALS_ABOUT
        })

        const { bssAbout } = extractAboutDisplayData(data)

        expect(bssAbout).toBe(BUYING_SIGNALS_ABOUT)
      })
    })

    describe(`when ${INTERNAL_ABOUT} is the same as ${BUYING_SIGNALS_ABOUT}`, () => {
      it(`returns null for displayData.bssAbout`, () => {
        const data = getDataMock({
          internalAbout: 'description',
          buyingSignalsAbout: 'description'
        })

        const { bssAbout } = extractAboutDisplayData(data)

        expect(bssAbout).toBeNull()
      })
    })

    describe(`when ${INTERNAL_ABOUT} is different from ${CLIENTOPEDIA_DESCRIPTION}`, () => {
      it(`extracts data from ${BUYING_SIGNALS_ABOUT}`, () => {
        const data = getDataMock({
          internalAbout: INTERNAL_ABOUT,
          clientopediaDescription: CLIENTOPEDIA_DESCRIPTION
        })

        const { clientopediaDescription } = extractAboutDisplayData(data)

        expect(clientopediaDescription).toBe(CLIENTOPEDIA_DESCRIPTION)
      })
    })

    describe(`when ${INTERNAL_ABOUT} is the same as ${CLIENTOPEDIA_DESCRIPTION}`, () => {
      it(`returns null for displayData.clientopediaDescription`, () => {
        const data = getDataMock({
          internalAbout: 'description',
          clientopediaDescription: 'description'
        })

        const { clientopediaDescription } = extractAboutDisplayData(data)

        expect(clientopediaDescription).toBeNull()
      })
    })
  })
})
