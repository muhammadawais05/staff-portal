import { render } from '@toptal/picasso/test-utils'
import { act, renderHook } from '@testing-library/react-hooks'
import React, { ComponentProps } from 'react'

import CopyToClipBoardIcon from '.'
import { useClipboardEvents } from './CopyToClipBoardIcon'

jest.useFakeTimers()

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: args => args
  })
}))

const queryCommandSupported = jest.fn()
const execCommand = jest.fn()
const prompt = jest.fn()

Object.defineProperty(global.document, 'execCommand', { value: execCommand })
Object.defineProperty(global.document, 'queryCommandSupported', {
  value: queryCommandSupported
})
Object.defineProperty(global.window, 'prompt', { value: prompt })

const renderComponent = (props: ComponentProps<typeof CopyToClipBoardIcon>) =>
  render(<CopyToClipBoardIcon {...props} />)

describe('CopyToClipBoardIcon', () => {
  beforeEach(() => jest.clearAllMocks())

  it('default render', () => {
    const { container } = renderComponent({
      content: '123'
    })

    expect(container).toMatchSnapshot()
  })

  it('hooks are working', async () => {
    queryCommandSupported.mockReturnValue(true)
    execCommand.mockReturnValue(true)

    const { result } = renderHook(() => useClipboardEvents('123'))

    act(() => result.current.copy())

    expect(result.current.message).toBe('actions.copy.success')

    act(() => result.current.resetMessage())

    expect(result.current.message).toBe('actions.copy.copyToClipboard')

    act(() => result.current.copy())
    act(() => result.current.reset())

    // fast-forward message return after `reset` has been called
    act(() => {
      jest.runOnlyPendingTimers()
    })

    expect(result.current.message).toBe('actions.copy.copyToClipboard')
  })
})
