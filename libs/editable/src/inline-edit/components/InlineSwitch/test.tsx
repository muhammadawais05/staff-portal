import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import InlineSwitch, { InlineSwitchProps } from './InlineSwitch'

const arrangeTest = ({ value, loading, onChange }: InlineSwitchProps) =>
  render(
    <TestWrapper>
      <InlineSwitch value={value} loading={loading} onChange={onChange} />
    </TestWrapper>
  )

describe('InlineSwitch', () => {
  describe('when checked', () => {
    it('sets value to true', () => {
      const ON_CHANGE = jest.fn()
      const CURRENT_VALUE = false

      arrangeTest({
        value: CURRENT_VALUE,
        onChange: ON_CHANGE
      })

      const checkbox = screen
        .getByTestId('inline-switch-editor-checkbox')
        .querySelector('input') as Element

      fireEvent.click(checkbox)
      expect(ON_CHANGE).toHaveBeenCalledWith(!CURRENT_VALUE)
    })
  })

  describe('when unchecked', () => {
    it('sets value to false', () => {
      const ON_CHANGE = jest.fn()
      const CURRENT_VALUE = true

      arrangeTest({
        value: CURRENT_VALUE,
        onChange: ON_CHANGE
      })

      const checkbox = screen
        .getByTestId('inline-switch-editor-checkbox')
        .querySelector('input') as Element

      fireEvent.click(checkbox)
      expect(ON_CHANGE).toHaveBeenCalledWith(!CURRENT_VALUE)
    })
  })

  describe('when is in a "loading" state', () => {
    it('shows loader', () => {
      arrangeTest({
        value: true,
        loading: true,
        onChange: () => null
      })

      expect(
        screen.getByTestId('inline-switch-editor-loader')
      ).toBeInTheDocument()
    })
  })
})
