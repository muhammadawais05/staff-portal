import React from 'react'
import { fireEvent, screen, render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { navigateExternallyTo } from '@staff-portal/navigation'

import SkypeButton from './SkypeButton'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  navigateExternallyTo: jest.fn()
}))

describe('SkypeButton', () => {
  beforeEach(() => {
    jest.resetModules()
  })

  it('renders a button with expected props passed', async () => {
    const ButtonMock = jest.fn(() => null)

    jest.doMock('@toptal/picasso', () => ({
      Button: ButtonMock
    }))

    const SKYPE_ID = {} as string

    // eslint-disable-next-line promise/always-return
    return import('./SkypeButton').then(module => {
      const SkypeButtonComponent = module.default

      render(<SkypeButtonComponent skypeId={SKYPE_ID} />)

      expect(ButtonMock).toHaveBeenCalledTimes(1)
      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          titleCase: false,
          onClick: expect.any(Function),
          children: SKYPE_ID
        }),
        {}
      )
    })
  })

  describe('when button is clicked', () => {
    it('navigates to skype link', () => {
      const SKYPE_ID = 'test-skype'

      render(
        <TestWrapperWithMocks>
          <SkypeButton skypeId={SKYPE_ID} />
        </TestWrapperWithMocks>
      )

      fireEvent.click(screen.getByTestId('skype-button'))

      expect(navigateExternallyTo).toHaveBeenCalledTimes(1)
      expect(navigateExternallyTo).toHaveBeenCalledWith(`skype:${SKYPE_ID}`)
    })
  })
})
