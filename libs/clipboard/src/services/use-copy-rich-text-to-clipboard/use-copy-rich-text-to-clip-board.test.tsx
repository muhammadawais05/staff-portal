import { Button } from '@toptal/picasso'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React, { useRef } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { useCopyRichTextToClipBoard } from './use-copy-rich-text-to-clip-board'

const BUTTON_LABEL = 'Copy Text'
const SUCCESS_MESSAGE = 'Success message'

type Props = {
  successMessage?: string
}

const TestComponent = ({ successMessage }: Props) => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { copyRichTextToClipboard } = useCopyRichTextToClipBoard()

  return (
    <>
      <div ref={targetRef}>
        <p>line</p>
        <a href='https://example.com'>link</a>
      </div>

      <Button
        onClick={() => {
          if (!targetRef.current) {
            return
          }

          copyRichTextToClipboard({ target: targetRef.current, successMessage })
        }}
      >
        {BUTTON_LABEL}
      </Button>
    </>
  )
}

const arrangeTest = (props: Props = {}) => {
  Object.assign(document, {
    execCommand: jest.fn().mockImplementation(() => true)
  })

  jest.spyOn(document, 'execCommand')

  return render(
    <TestWrapper>
      <TestComponent {...props} />
    </TestWrapper>
  )
}

describe('useCopyRichTextToClipBoard', () => {
  it('copies the text value and display success message', async () => {
    arrangeTest({ successMessage: SUCCESS_MESSAGE })

    fireEvent.click(screen.getByText(BUTTON_LABEL))

    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument()
  })

  it('copies the text value and without showing the success message', async () => {
    arrangeTest()

    fireEvent.click(screen.getByText(BUTTON_LABEL))

    expect(document.execCommand).toHaveBeenCalledWith('copy')
    expect(screen.queryByText(SUCCESS_MESSAGE)).not.toBeInTheDocument()
  })
})
