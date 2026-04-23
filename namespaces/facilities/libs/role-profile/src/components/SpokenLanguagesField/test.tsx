import { render, screen } from '@testing-library/react'
import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { TestWrapper } from '@staff-portal/test-utils'

import SpokenLanguagesField, { Props } from './SpokenLanguagesField'

const arrangeTest = ({ languages }: Props) =>
  render(
    <TestWrapper>
      <SpokenLanguagesField languages={languages} />
    </TestWrapper>
  )

describe('SpokenLanguagesField', () => {
  describe('when there are no languages', () => {
    it('shows a dash', async () => {
      arrangeTest({ languages: [] })

      const container = await screen.findByTestId('spoken-languages-field')

      expect(container).toHaveTextContent(NO_VALUE)
    })
  })

  describe('when there are languages', () => {
    it('lists the languages separated by comma', async () => {
      arrangeTest({
        languages: Array.from({ length: 10 }, (_, index) => ({
          id: 'Language name-' + index,
          name: 'Language name-' + index
        }))
      })

      const container = await screen.findByTestId('spoken-languages-field')

      expect(container).toHaveTextContent(/Language name-1, /)
    })
  })
})
