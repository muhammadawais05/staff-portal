import React, { ReactNode } from 'react'
import { render, screen, within } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import I18nProvider from './I18nProvider'
import { addSharedTranslations } from '../../services/add-shared-translations/add-shared-translations'

jest.mock('react-i18next', () => ({
  I18nextProvider: ({ children }: { children: ReactNode }) => (
    <div data-testid='I18nextProvider'>{children}</div>
  )
}))

jest.mock('../../services/add-shared-translations/add-shared-translations')

const translations = {
  en: { common: { save: 'Save' } },
  de: { common: { save: 'Speichern' } }
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <I18nProvider translations={translations}>
        <div data-testid='children' />
      </I18nProvider>
    </TestWrapper>
  )

describe('I18nProvider', () => {
  it('default render', () => {
    arrangeTest()

    expect(
      within(screen.getByTestId('I18nextProvider')).getByTestId('children')
    ).toBeInTheDocument()
    expect(addSharedTranslations).toHaveBeenCalledWith(translations)
  })
})
