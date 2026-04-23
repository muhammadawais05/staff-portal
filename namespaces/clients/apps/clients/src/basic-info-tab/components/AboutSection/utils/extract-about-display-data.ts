import { GetClientAboutAndOperationQuery } from '../data'

const extractAboutDisplayData = (
  data: GetClientAboutAndOperationQuery | undefined
) => {
  const displayData: {
    internalAbout: string | null | undefined
    bssAbout: string | null | undefined
    clientopediaDescription: string | null | undefined
  } = {
    internalAbout: null,
    bssAbout: null,
    clientopediaDescription: null
  }

  if (data?.node) {
    const {
      node: { about, buyingSignalsService, clientopedia }
    } = data

    if (about) {
      displayData.internalAbout = about
    }

    if (buyingSignalsService?.about !== about) {
      displayData.bssAbout = buyingSignalsService?.about
    }

    if (clientopedia?.description !== about) {
      displayData.clientopediaDescription = clientopedia?.description
    }
  }

  return displayData
}

export default extractAboutDisplayData
