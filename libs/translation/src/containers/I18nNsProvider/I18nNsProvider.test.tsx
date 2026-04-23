import React, { ComponentProps, useContext } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { addResourceBundle } from '../../services/add-resource-bundle/add-resource-bundle'
import I18nNsProvider, { I18nNsProviderContext } from './I18nNsProvider'
import { translations } from '../../mocks'

jest.mock('../../services/add-resource-bundle/add-resource-bundle')

const Child = () => {
  const ns = useContext(I18nNsProviderContext)

  return <div>{ns}</div>
}

const arrangeTest = (props: Partial<ComponentProps<typeof I18nNsProvider>>) =>
  render(
    <TestWrapper>
      <I18nNsProvider ns='invoices' {...props}>
        <div data-testid='children'>
          <Child />
        </div>
      </I18nNsProvider>
    </TestWrapper>
  )

describe('I18nNsProvider', () => {
  it('default render', () => {
    arrangeTest({})

    expect(screen.getByTestId('children')).toHaveTextContent('invoices')
  })

  describe('when translations are not passed', () => {
    it('does not add resources', () => {
      arrangeTest({})

      expect(addResourceBundle).toHaveBeenCalledTimes(0)
    })
  })

  describe('when translations are passed', () => {
    it('adds resources', () => {
      arrangeTest({ translations })

      expect(addResourceBundle).toHaveBeenCalledTimes(1)
      expect(addResourceBundle).toHaveBeenNthCalledWith(1, {
        ns: 'invoices',
        translations
      })
    })
  })
})
