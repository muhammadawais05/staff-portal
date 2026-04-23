import { copyToClipboard } from '.'

const queryCommandSupported = jest.fn()
const execCommand = jest.fn()
const setMessage = jest.fn()
const translate = jest.fn()
const prompt = jest.fn()

Object.defineProperty(global.document, 'execCommand', { value: execCommand })
Object.defineProperty(global.document, 'queryCommandSupported', {
  value: queryCommandSupported
})
Object.defineProperty(global.window, 'prompt', { value: prompt })

describe('copyToClipboard', () => {
  beforeEach(() => jest.clearAllMocks())

  it('copy to clipboard', () => {
    queryCommandSupported.mockReturnValue(true)
    execCommand.mockReturnValue(true)

    copyToClipboard(translate, '123', setMessage)

    expect(translate).toHaveBeenCalledWith('actions.copy.success')
    expect(execCommand).toHaveBeenCalled()
    expect(queryCommandSupported).toHaveBeenCalled()
    expect(setMessage).toHaveBeenCalled()
    expect(prompt).not.toHaveBeenCalled()
  })

  it('copy to clipboard error', () => {
    queryCommandSupported.mockReturnValue(true)
    execCommand.mockReturnValue(false)

    copyToClipboard(translate, '123', setMessage)

    expect(translate).toHaveBeenCalledWith('actions.copy.error')
    expect(execCommand).toHaveBeenCalled()
    expect(queryCommandSupported).toHaveBeenCalled()
    expect(setMessage).toHaveBeenCalled()
    expect(prompt).not.toHaveBeenCalled()
  })

  it('copy to clipboard manual', () => {
    queryCommandSupported.mockReturnValue(false)
    execCommand.mockReturnValue(false)

    copyToClipboard(translate, '123', setMessage)

    expect(translate).toHaveBeenCalledWith('actions.copy.manualPrompt')
    expect(execCommand).not.toHaveBeenCalled()
    expect(queryCommandSupported).toHaveBeenCalled()
    expect(setMessage).not.toHaveBeenCalled()
    expect(prompt).toHaveBeenCalled()
  })
})
