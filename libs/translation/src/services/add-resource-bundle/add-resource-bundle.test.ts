import { i18n } from '../i18n/i18n'
import { addResourceBundle } from './add-resource-bundle'
import { translations } from '../../mocks'

jest.mock('../i18n/i18n')

const mockedAddResourceBundle = i18n.addResourceBundle as jest.Mock

describe('addResourceBundle', () => {
  it('calls addResourceBundle with proper data', () => {
    addResourceBundle({ ns: 'app', translations })

    expect(mockedAddResourceBundle).toHaveBeenCalledTimes(4)
    expect(mockedAddResourceBundle).toHaveBeenNthCalledWith(
      1,
      'en',
      'app/namespace1',
      translations.en.namespace1
    )
    expect(mockedAddResourceBundle).toHaveBeenNthCalledWith(
      2,
      'en',
      'app/namespace2',
      translations.en.namespace2
    )
    expect(mockedAddResourceBundle).toHaveBeenNthCalledWith(
      3,
      'de',
      'app/namespace3',
      translations.de.namespace3
    )
    expect(mockedAddResourceBundle).toHaveBeenNthCalledWith(
      4,
      'de',
      'app/namespace4',
      translations.de.namespace4
    )
  })
})
