import { act, render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import HelpButton, { Props } from './HelpButton'

const TITLE = 'Hello World'
const POPOVER_CONTENT = 'Some content'
const HELP_TEST_ID = 'help-button'
const CLOSE_TEST_ID = 'close-button'

const defaultProps = {
  title: TITLE,
  content: POPOVER_CONTENT
}

const arrangeTest = (
  props: Props = defaultProps,
  createPortalTarget = true
) => {
  if (createPortalTarget) {
    document.body.innerHTML = "<div id='help-button-portal' />"
  }

  return render(
    <>
      <TestWrapper>
        <HelpButton {...props} />
      </TestWrapper>
    </>
  )
}

describe('HelpButton', () => {
  it('should not display if target portal is missing', () => {
    arrangeTest(defaultProps, false)

    expect(screen.queryByTestId(HELP_TEST_ID)).not.toBeInTheDocument()
  })

  it('should display the help button', () => {
    arrangeTest()

    fireEvent.click(screen.getByTestId(HELP_TEST_ID))

    expect(screen.getByText(TITLE)).toBeInTheDocument()

    fireEvent.click(screen.getByTestId(HELP_TEST_ID))

    expect(screen.queryByTestId(TITLE)).not.toBeInTheDocument()
  })

  it('should close the help popover', () => {
    arrangeTest()

    fireEvent.click(screen.getByTestId(HELP_TEST_ID))

    expect(screen.getByText(TITLE)).toBeInTheDocument()

    fireEvent.click(screen.getByTestId(CLOSE_TEST_ID))

    expect(screen.queryByTestId(TITLE)).not.toBeInTheDocument()
  })

  describe('popover expanding by default', () => {
    it('expands help', async () => {
      const props = {
        ...defaultProps,
        isOpenByDefault: true
      }

      await act(async () => {
        arrangeTest(props)
      })

      expect(screen.getByText(POPOVER_CONTENT)).toBeInTheDocument()
    })

    it('does not expand help', () => {
      arrangeTest()

      expect(screen.queryByText(POPOVER_CONTENT)).not.toBeInTheDocument()
    })
  })

  describe('button text', () => {
    it('shows help label', () => {
      const props = {
        ...defaultProps,
        showBtnText: true
      }

      arrangeTest(props)

      expect(screen.getByTestId(HELP_TEST_ID)).toHaveTextContent(TITLE)
    })

    it('does not show help label', () => {
      arrangeTest()

      expect(screen.getByTestId(HELP_TEST_ID)).not.toHaveTextContent(TITLE)
    })
  })
})
