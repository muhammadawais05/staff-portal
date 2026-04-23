import { render, screen } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import SkypeField from './SkypeField'

jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  SkypeLink: ({ skypeId }: { skypeId: string }) => <span>{skypeId}</span>
}))

const arrangeTest = (props: ComponentProps<typeof SkypeField>) =>
  render(
    <TestWrapper>
      <SkypeField {...props} />
    </TestWrapper>
  )

describe('SkypeField', () => {
  describe('when there is no skype ID', () => {
    it('returns nothing', () => {
      arrangeTest({
        skypeId: null,
        additionalSkypeIds: []
      })

      expect(screen.queryByTestId('skype-field')).toBeNull()
    })
  })

  describe('when there is only one skype ID', () => {
    it('returns skype id', () => {
      const SKYPE = '1'

      arrangeTest({
        additionalSkypeIds: [],
        skypeId: SKYPE
      })

      expect(screen.getByText(SKYPE)).toBeInTheDocument()
      expect(
        screen.queryByTestId('additional-skype-ids')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there are multiple skype IDs', () => {
    it('returns skype id and a tooltip', () => {
      const SKYPE = '1'

      arrangeTest({
        additionalSkypeIds: ['2'],
        skypeId: SKYPE
      })

      expect(screen.getByText(SKYPE)).toBeInTheDocument()
      expect(screen.getByTestId('additional-skype-ids')).toBeInTheDocument()
    })
  })
})
