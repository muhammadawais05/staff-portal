import { i18n } from '../i18n/i18n'
import { addSharedTranslations } from './add-shared-translations'

jest.mock('../i18n/i18n')

describe('getSharedResources', () => {
  it('modifies resources to include prefix', () => {
    addSharedTranslations({
      en: { actions: { click: 'Click' }, other: { footer: 'Footer' } },
      de: { actions: { click: 'Klicken' }, other: { footer: 'Fusszeile' } }
    })

    expect(i18n.addResourceBundle).toHaveBeenNthCalledWith(
      1,
      'en',
      'shared/actions',
      {
        click: 'Click'
      }
    )
    expect(i18n.addResourceBundle).toHaveBeenNthCalledWith(
      2,
      'en',
      'shared/other',
      {
        footer: 'Footer'
      }
    )
    expect(i18n.addResourceBundle).toHaveBeenNthCalledWith(
      3,
      'de',
      'shared/actions',
      {
        click: 'Klicken'
      }
    )
    expect(i18n.addResourceBundle).toHaveBeenNthCalledWith(
      4,
      'de',
      'shared/other',
      {
        footer: 'Fusszeile'
      }
    )
  })
})
