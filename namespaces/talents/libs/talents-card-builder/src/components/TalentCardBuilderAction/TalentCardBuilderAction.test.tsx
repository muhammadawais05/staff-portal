import React from 'react'
import { render, fireEvent, screen } from '@toptal/picasso/test-utils'

import TalentCardBuilderAction from './TalentCardBuilderAction'

describe('TalentCardBuilderAction', () => {
  describe('when is editing', () => {
    it('renders preview button', () => {
      const handleEdit = jest.fn()

      render(<TalentCardBuilderAction inEdit onEdit={handleEdit} />)

      fireEvent.click(screen.getByText('Preview Card'))

      expect(handleEdit).toHaveBeenCalled()
    })
  })

  describe('when not editing', () => {
    it('renders edit button', () => {
      const handleEdit = jest.fn()

      render(<TalentCardBuilderAction inEdit={false} onEdit={handleEdit} />)

      fireEvent.click(screen.getByText('Edit Card'))

      expect(handleEdit).toHaveBeenCalled()
    })
  })
})
