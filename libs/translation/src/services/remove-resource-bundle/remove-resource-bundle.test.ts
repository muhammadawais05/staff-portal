import { translations } from '../../mocks'
import { i18n } from '../i18n/i18n'
import { removeResourceBundle } from './remove-resource-bundle'

jest.mock('../i18n/i18n')

const mockedRemoveResourceBundle = i18n.removeResourceBundle as jest.Mock

describe('removeResourceBundle', () => {
  it('calls removeResourceBundle with proper data', () => {
    removeResourceBundle({ ns: 'app', translations })

    expect(mockedRemoveResourceBundle).toHaveBeenCalledTimes(4)
    expect(mockedRemoveResourceBundle).toHaveBeenNthCalledWith(
      1,
      'en',
      'app/namespace1'
    )
    expect(mockedRemoveResourceBundle).toHaveBeenNthCalledWith(
      2,
      'en',
      'app/namespace2'
    )
    expect(mockedRemoveResourceBundle).toHaveBeenNthCalledWith(
      3,
      'de',
      'app/namespace3'
    )
    expect(mockedRemoveResourceBundle).toHaveBeenNthCalledWith(
      4,
      'de',
      'app/namespace4'
    )
  })
})
