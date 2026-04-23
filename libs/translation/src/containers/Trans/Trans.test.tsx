import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { Trans as TransI18next } from 'react-i18next'
import { TestWrapper } from '@staff-portal/test-utils'

import Trans from './Trans'
import I18nNsProvider from '../I18nNsProvider/I18nNsProvider'

jest.mock('react-i18next')

const arrangeTest = (props: ComponentProps<typeof Trans>) =>
  render(
    <TestWrapper>
      <I18nNsProvider ns='invoices'>
        <Trans {...props} />
      </I18nNsProvider>
    </TestWrapper>
  )

const mockedTransI18next = TransI18next as jest.Mock

describe('Trans', () => {
  beforeEach(() => {
    mockedTransI18next.mockImplementation(() => null)
  })

  it('passes key and does not prefix it', () => {
    arrangeTest({ i18nKey: 'common' })

    expect(mockedTransI18next).toHaveBeenCalledTimes(1)
    expect(mockedTransI18next).toHaveBeenNthCalledWith(
      1,
      { i18nKey: 'invoices/common' },
      {}
    )
  })

  it('passes key and prefixes it', () => {
    arrangeTest({ i18nKey: 'shared/common' })

    expect(mockedTransI18next).toHaveBeenCalledTimes(1)
    expect(mockedTransI18next).toHaveBeenNthCalledWith(
      1,
      { i18nKey: 'shared/common' },
      {}
    )
  })
})
