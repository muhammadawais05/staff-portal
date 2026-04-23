import React, { ComponentProps } from 'react'
import {
  ColorType,
  Container,
  Info16,
  Tooltip,
  TypographyOverflow
} from '@toptal/picasso'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TooltipWithIcon from './TooltipWithIcon'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: jest.fn(),
  TypographyOverflow: jest.fn()
}))

const TooltipMock = Tooltip as unknown as jest.Mock
const TypographyOverflowMock = TypographyOverflow as unknown as jest.Mock

const renderComponent = (props: ComponentProps<typeof TooltipWithIcon>) =>
  render(
    <TestWrapper>
      <TooltipWithIcon {...props} />
    </TestWrapper>
  )

const CHILDREN = Symbol()
const TOOLTIP = Symbol()
const COLOR = Symbol() as unknown as ColorType

describe('TooltipWithIcon', () => {
  it('shows the content', () => {
    TypographyOverflowMock.mockReturnValue(null)

    renderComponent({ children: CHILDREN, color: COLOR })

    expect(TypographyOverflowMock).toHaveBeenCalledWith(
      expect.objectContaining({ color: COLOR, children: CHILDREN }),
      {}
    )
  })

  describe('when there is a tooltip', () => {
    it('shows the tooltip', () => {
      TypographyOverflowMock.mockReturnValue(null)
      TooltipMock.mockReturnValue(null)

      renderComponent({ children: CHILDREN, tooltip: TOOLTIP })

      expect(TooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          content: TOOLTIP,
          children: expect.objectContaining({
            type: Container,
            props: expect.objectContaining({
              children: expect.objectContaining({
                type: Info16
              })
            })
          })
        }),
        {}
      )
    })
  })

  describe('when there is no tooltip', () => {
    it('does not show a tooltip', () => {
      TypographyOverflowMock.mockReturnValue(null)

      renderComponent({ children: CHILDREN })

      expect(TooltipMock).not.toHaveBeenCalled()
    })
  })
})
