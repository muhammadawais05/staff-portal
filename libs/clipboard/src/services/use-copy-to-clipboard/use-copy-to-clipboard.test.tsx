import { Button } from '@toptal/picasso'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useCopyToClipBoard } from './use-copy-to-clipboard'

const BUTTON_LABEL = 'Copy Text'
const CLIPBOARD_TEXT = 'Some generic text'
const SUCCESS_MESSAGE = 'Success message'

type Props = {
  data: string
  successMessage?: string
}

const TestComponent = ({ data, successMessage }: Props) => {
  const { copyToClipboard } = useCopyToClipBoard()

  return (
    <Button onClick={() => copyToClipboard({ data, successMessage })}>
      {BUTTON_LABEL}
    </Button>
  )
}

const arrangeTest = (props: Props) => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => {}
    }
  })

  jest.spyOn(navigator.clipboard, 'writeText')

  return render(
    <TestWrapper>
      <TestComponent {...props} />
    </TestWrapper>
  )
}

describe('useCopyToClipBoard', () => {
  it('copies the text value and display success message', async () => {
    arrangeTest({ data: CLIPBOARD_TEXT, successMessage: SUCCESS_MESSAGE })

    fireEvent.click(screen.getByText(BUTTON_LABEL))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(CLIPBOARD_TEXT)
    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument()
  })

  it('copies the text value and without showing the success message', async () => {
    arrangeTest({ data: CLIPBOARD_TEXT })

    fireEvent.click(screen.getByText(BUTTON_LABEL))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(CLIPBOARD_TEXT)
    expect(screen.queryByText(SUCCESS_MESSAGE)).not.toBeInTheDocument()
  })
})
