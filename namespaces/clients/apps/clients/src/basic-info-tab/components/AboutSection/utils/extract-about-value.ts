import { GetClientAboutAndOperationQuery } from '../data'

const extractAbout = (data: GetClientAboutAndOperationQuery | undefined) => {
  if (data?.node) {
    const {
      node: { about, buyingSignalsService, clientopedia }
    } = data

    return (
      about || buyingSignalsService?.about || clientopedia?.description || ''
    )
  }

  return ''
}

export default extractAbout
