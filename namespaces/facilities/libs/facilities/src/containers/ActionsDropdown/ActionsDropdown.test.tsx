import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { MoreButton } from '@staff-portal/ui'

import ActionsDropdown from './ActionsDropdown'
import { ActionsDropdownProvider } from './containers/ActionsDropdownProvider/ActionsDropdownProvider'

jest.mock(
  './containers/ActionsDropdownProvider/ActionsDropdownProvider',
  () => ({
    ...jest.requireActual(
      './containers/ActionsDropdownProvider/ActionsDropdownProvider'
    ),
    ActionsDropdownProvider: jest.fn()
  })
)

const ActionsDropdownProviderMock = ActionsDropdownProvider as jest.Mock

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  MoreButton: jest.fn()
}))

const MoreButtonMock = MoreButton as jest.Mock

describe('ActionsDropdown', () => {
  beforeEach(() => {
    ActionsDropdownProviderMock.mockImplementation(({ children }) => children)
    MoreButtonMock.mockReturnValue(null)
  })

  it('renders provider, more button and children with expected props passed', () => {
    const props = {
      children: Symbol('children'),
      loading: Symbol('loading'),
      hidden: Symbol('hidden'),
      fullHeight: Symbol('fullHeight'),
      disablePopper: Symbol('disablePopper'),
      onSettled: Symbol('onSettled'),
      onStart: Symbol('onStart')
    } as unknown as ComponentProps<typeof ActionsDropdown>

    render(<ActionsDropdown {...props} />)

    expect(ActionsDropdownProviderMock).toHaveBeenCalledTimes(1)
    expect(ActionsDropdownProviderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        onStart: props.onStart,
        onSettled: props.onSettled
      }),
      {}
    )

    expect(MoreButtonMock).toHaveBeenCalledTimes(1)
    expect(MoreButtonMock).toHaveBeenCalledWith(
      {
        keepMounted: true,
        fullHeight: props.fullHeight,
        disablePopper: props.disablePopper,
        loading: props.loading,
        hidden: props.hidden,
        children: props.children
      },
      {}
    )
  })
})
