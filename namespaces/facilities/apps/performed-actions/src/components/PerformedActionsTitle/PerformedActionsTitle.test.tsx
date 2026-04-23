import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import PerformedActionsTitle, { Props } from './PerformedActionsTitle'
import { PERFORMED_ACTIONS_BASE_TITLE } from '../../config'

const arrangeTest = (props: Props) => {
  render(
    <TestWrapper>
      <PerformedActionsTitle {...props} />
    </TestWrapper>
  )
}

describe('PerformedActionsTitle', () => {
  const baseTitle = PERFORMED_ACTIONS_BASE_TITLE
  const fullTitle = `${baseTitle} for Timofei Kachalov`

  describe('when `entityLink` property is set', () => {
    it('renders a valid title', () => {
      arrangeTest({
        title: `${baseTitle} for`,
        entityLink: {
          text: 'Timofei Kachalov',
          url: 'www.example.com/talents/1234567'
        }
      })

      expect(
        screen.getAllByText(
          (content, element) => element?.textContent === fullTitle
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe('when `entityLink` property is not set', () => {
    it('renders a valid title', () => {
      arrangeTest({
        title: baseTitle,
        entityLink: undefined
      })

      expect(
        screen.getAllByText(
          (content, element) => element?.textContent === baseTitle
        )[0]
      ).toBeInTheDocument()
    })
  })
})
