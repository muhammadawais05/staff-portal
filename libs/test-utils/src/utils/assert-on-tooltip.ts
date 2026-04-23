import { fireEvent, screen } from '@testing-library/react'

export const assertOnTooltip = (
  element: HTMLElement,
  assertCallback: (tooltip: HTMLElement) => void
) => {
  fireEvent.mouseOver(element)

  const tooltip = screen.getByRole('tooltip')

  assertCallback(tooltip)

  fireEvent.mouseOut(element)
}

/**
 * @deprecated test helpers shouldn't have hidden assertion
 */
export const assertOnTooltipText = (
  element: HTMLElement,
  text: string | RegExp
) => {
  assertOnTooltip(element, tooltip => {
    expect(tooltip).toHaveTextContent(text)
  })
}
