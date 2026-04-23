import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import EmailComposerModeButton, { Props } from './EmailComposerModeButton'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <EmailComposerModeButton {...props} />
    </TestWrapper>
  )

describe('EmailComposerModeButton', () => {
  it.each([
    {
      buttonCaption: 'Switch to Preview Mode',
      isEditMode: true
    },
    {
      buttonCaption: 'Switch to Edit Mode',
      isEditMode: false
    }
  ])(
    'renders valid button caption and outputs valid `isEditMode` value on click',
    ({ buttonCaption, isEditMode }) => {
      const onClickMock = jest.fn()

      arrangeTest({
        isEditMode,
        onClick: onClickMock
      })

      expect(screen.getByText(buttonCaption)).toBeInTheDocument()

      fireEvent.click(screen.getByText(buttonCaption))

      expect(onClickMock).toHaveBeenCalledWith(!isEditMode)
    }
  )
})
